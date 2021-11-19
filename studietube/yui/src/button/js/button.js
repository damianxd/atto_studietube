// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto mod for Lærit.dk
 *
 * @package    atto_studietube
 * @copyright  2019 Damian Alarcon
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_studietube-button
 */

var COMPONENTNAME = 'atto_studietube';

var CSS = {
        INPUTHEIGHT: 'atto_studietube_heightentry',
        INPUTSUBMIT: 'atto_studietube_submit',
        INPUTSIZE: 'atto_studietube_size',
        INPUTFULLSIZE: 'atto_studietube_fullsize',
        INPUTWIDTH: 'atto_studietube_widthentry'
    },
    REGEX = {
        ISPERCENT: /\d+%/,
        PROCESSST: /stdsts_holder(?: stdconfig-(?<id>[A-Za-z0-9]+)-(?<width>[0-9]+)-(?<height>[0-9]+)-(?<fullsize>([0-1]+)))/is
    },
    DEFAULT = {
        WIDTH: 560,
        HEIGHT: 314,
        FULLSIZE: 0,
    },
    TEMPLATE = '' +
            '<form class="atto_form">' +
                '<div class="mb-1">' +
                '<label class="" for="{{elementid}}_{{CSS.INPUTSIZE}}">{{get_string "size" component}}</label>' +
                '<div id="{{elementid}}_{{CSS.INPUTSIZE}}" class="form-inline {{CSS.INPUTSIZE}}">' +
                '<label class="accesshide" for="{{elementid}}_{{CSS.INPUTWIDTH}}">{{get_string "width" component}}</label>' +
                '<input type="text" class="form-control mr-1 input-mini {{CSS.INPUTWIDTH}}" ' +
                'id="{{elementid}}_{{CSS.INPUTWIDTH}}" size="4"/> x' +
                '<label class="accesshide" for="{{elementid}}_{{CSS.INPUTHEIGHT}}">{{get_string "height" component}}</label>' +
                '<input type="text" class="form-control ml-1 input-mini {{CSS.INPUTHEIGHT}}" ' +
                'id="{{elementid}}_{{CSS.INPUTHEIGHT}}" size="4"/>' +
                '<div class="form-check ml-2">' +
                '<input type="checkbox" class="form-check-input {{CSS.INPUTFULLSIZE}}" ' +
                'id="{{elementid}}_{{CSS.INPUTFULLSIZE}}" {{#if fullsize}}checked{{/if}}/>' +
                '<label class="form-check-label" for="{{elementid}}_{{CSS.INPUTFULLSIZE}}">' +
                '{{get_string "fullsize" component}}</label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<button class="btn btn-secondary {{CSS.INPUTSUBMIT}}" type="submit">' + '' +
                    '{{get_string "saveimage" component}}</button>' +
                '</div>' +
            '</form>',
            
    IFRAMETEMPLATE = '' +
            '<div class="stdsts_holder stdconfig-{{id}}-{{width}}-{{height}}-{{fullsize}} {{#if fullsize}}stdsts_fullsize{{/if}}" '+
            '{{#unless fullsize}}style="width:{{#if width}}{{width}}{{/if}}px;height:{{#if height}}{{height}}{{/if}}px;"{{/unless}} '+
            'contenteditable="false" '+
            'data-studietube-id="{{id}}" '+
            'data-studietube-config="{{width}}:{{height}}:{{fullsize}}">'+
            '<iframe src="//www.skoletube.dk/e/{{id}}/0" '+
            '{{#unless fullsize}}style="width:{{#if width}}{{width}}{{/if}}px;height:{{#if height}}{{height}}{{/if}}px;"{{/unless}} '+
            'allowfullscreen webkitallowfullscreen mozAllowFullScreen ' + 
            'frameborder="0" allow="encrypted-media">'+
            '</iframe>'+
            'Please activate Studietube filter'+
            '</div>';

Y.namespace('M.atto_studietube').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

    /**
     * Add event listeners.
     *
     * @method initializer
     */

    initializer: function () {
        var self = this;

        window.addEventListener("message", function (event) {
            self._handleMedia(event, self);
         }, false);
    
        this.addButton({
            icon: 'studietube',
            iconComponent: COMPONENTNAME,
            callback: this._displayDialogue
        });

        this.editor.delegate('click', this._handleClick, '.stdsts_holder', this);
        this.editor.delegate('click', this._displaySizeDiag, '.stdsts_holder', this);
        setTimeout(this.changeToTags(),500);
    },

    changeToTags: function () {
        this.replaceTags(this.editor.all('.stdsts_holder'));
    },

    replaceTags: function (nodelist) {
        nodelist.each(function(node) {
            var config = this._getstsconfig(node);
            
            var template = Y.Handlebars.compile(IFRAMETEMPLATE);
            newiframe = template({
                width: config.width,
                height: config.height,
                fullsize: Number(config.fullsize),
                id: config.id
            });

            node.replace(newiframe);
        }, this);
    },
    
    _getstsconfig: function (node)
    {
        found = node.getAttribute('class').match(REGEX.PROCESSST);

        if (typeof found.groups === 'undefined')
        {
            return;
        }

        if (typeof found.groups.width === 'undefined' || parseInt(found.groups.width) <= 0)
        {
            found.groups.width = DEFAULT.WIDTH;
        }

        if (typeof found.groups.height === 'undefined' || parseInt(found.groups.height) <= 0)
        {
            found.groups.height = DEFAULT.HEIGHT;
        }
        
        if (typeof found.groups.fullsize === 'undefined' || Number(found.groups.fullsize) <= 0)
        {
            found.groups.fullsize = DEFAULT.FULLSIZE;
        }
        
        return found.groups;
    },

    _displayDialogue: function () {
        this._dialogue = null;
        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('studietube', COMPONENTNAME),
            width: '600px',
            height: '500px',
            focusAfterHide: true
        });

        var iframe = Y.Node.create('<iframe></iframe>');
        iframe.setStyles({
            height: '400px',
            border: 'none',
            width: '100%'
        });

        iframe.setAttribute('src', '//www.studietube.dk/app/bluebird/1?passtype=complete&notok=true&noselector=true&idcaller=' + this.editor._yuid);

        dialogue.set('bodyContent', iframe).show();
    },
    
    _displaySizeDiag: function (e) {
        this._dialogue = null;
        // Store the current selection.
        this._currentSelection = e.target;
        if (this._currentSelection === false) {
            return;
        }

        // Reset the image dimensions.
        this._rawImageDimensions = null;

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('stsize', COMPONENTNAME),
            width: 'auto',
            focusAfterHide: null
        });

        dialogue.set('bodyContent', this._getDialogueContent()).show();
    },
    
    _getDialogueContent: function() {
        var template = Y.Handlebars.compile(TEMPLATE),
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                CSS: CSS,
                component: COMPONENTNAME
            }));

        this._form = content;

        this._applyProperties(this._form);
        this._form.one('.' + CSS.INPUTSUBMIT).on('click', this._changesize, this);
        this._form.one('.' + CSS.INPUTFULLSIZE).on('change', function(e) { this._lockfullsize(e.target); }, this);
        return content;
    },
    
    _applyProperties: function(form)
    {
        var config = this._getstsconfig(this._currentSelection);

        if (config.width) {
            form.one('.' + CSS.INPUTWIDTH).set('value', config.width);
        }
        if (config.height) {
            form.one('.' + CSS.INPUTHEIGHT).set('value', config.height);
        }
        if(config.fullsize) {
            form.one('.' + CSS.INPUTFULLSIZE).set('checked', true);
        }
        
        this._lockfullsize(form.one('.' + CSS.INPUTFULLSIZE));
    },
    
    _changesize: function(e) {
        var form = this._form,
            width = form.one('.' + CSS.INPUTWIDTH).get('value'),
            height = form.one('.' + CSS.INPUTHEIGHT).get('value'),
            fullsize = form.one('.' + CSS.INPUTFULLSIZE).get('checked'),
            host = this.get('host');

        e.preventDefault();
        
        this.getDialogue({
            focusAfterHide: null
        }).hide();
        
        if (!width.match(REGEX.ISPERCENT) && isNaN(parseInt(width, 10))) {
            form.one('.' + CSS.INPUTWIDTH).focus();
            return;
        }

        if (!height.match(REGEX.ISPERCENT) && isNaN(parseInt(height, 10))) {
            form.one('.' + CSS.INPUTHEIGHT).focus();
            return;
        }
        
        stsobj = this._currentSelection.getDOMNode();
        var template = Y.Handlebars.compile(IFRAMETEMPLATE);
        newiframe = template({
            width: width,
            height: height,
            fullsize: Number(fullsize),
            id: stsobj.getAttribute('data-studietube-id')
        });
        
        this._currentSelection.replace(newiframe);
        this.markUpdated();
    },
    
    _lockfullsize: function(fullsize)
    {
        var form = this._form;
        
        if(fullsize.get('checked'))
        {
            form.one('.' + CSS.INPUTWIDTH).set('disabled', true);
            form.one('.' + CSS.INPUTHEIGHT).set('disabled', true);
        }
        else
        {
            form.one('.' + CSS.INPUTWIDTH).set('disabled', false);
            form.one('.' + CSS.INPUTHEIGHT).set('disabled', false);
        }
    },
    
    _handleClick: function(e) {
        var image = e.target;
        var selection = this.get('host').getSelectionFromNode(image);
        if (this.get('host').getSelection() !== selection) {
            this.get('host').setSelection(selection);
        }
    },
    
    _handleMedia: function (event, obj) {
        this.getDialogue({
            focusAfterHide: null
        }).hide();
        
        if (event.origin !== "https://www.studietube.dk" && event.origin !== "http://www.studietube.dk" && event.origin !== "http://www.skoletube.dk" && event.origin !== "https://www.skoletube.dk")
        {
            return;
        }

        var ret = JSON.parse(event.data);
        if (typeof ret.idcaller === 'undefined' || !ret.idcaller.includes(obj.editor._yuid))
        {
            return;
        }
        
        if (typeof ret.extra === 'undefined')
        {
            ret.extra = {};
        }
        
        if (typeof ret.extra.width === 'undefined' || parseInt(ret.extra.width) <= 0)
        {
            ret.extra.width = DEFAULT.WIDTH;
        }
        
        if (typeof ret.extra.height === 'undefined' || parseInt(ret.extra.height) <= 0)
        {
            ret.extra.height = DEFAULT.HEIGHT;
        }

        var template = Y.Handlebars.compile(IFRAMETEMPLATE);
        html = template({
            width: ret.extra.width,
            height: ret.extra.height,
            fullsize: DEFAULT.FULLSIZE,
            id: ret.vkey
        });
        
        selectednode = this.get('host').insertContentAtFocusPoint(html);
        this.get('host').setSelection(this.get('host').getSelectionFromNode(selectednode));
        this.markUpdated();
        this._displaySizeDiag({'target': selectednode});
    }
}, {
    ATTRS: {
        full: {
            value: false
        }
    }
});
