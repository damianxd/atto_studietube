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

    initializer: function() {
        var self = this;

        window.addEventListener("message", function(event){ self._handleMedia(event, self); }, false);
        this.addButton({
            icon: 'studietube',
            iconComponent: COMPONENTNAME,
            callback: this._displayDialogue
        });
    },
    
    _displayDialogue: function() {
        var dialogue = this.getDialogue({
            headerContent: 'Studietube',
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
        
        iframe.setAttribute('src', '//www.studietube.dk/app/bluebird/1?passtype=direct&notok=true&idcaller='+this.editor._yuid);

        dialogue.set('bodyContent', iframe)
                .show();

        this.markUpdated();
    },
    
    _handleMedia: function(event, obj) {
        this.getDialogue({
            focusAfterHide: null
        }).hide();
        
        if (event.origin !== "https://www.studietube.dk" && event.origin !== "http://www.studietube.dk"  && event.origin !== "http://www.skoletube.dk"  && event.origin !== "https://www.skoletube.dk")
        {
            return;
        }

        var ret = JSON.parse(event.data);
        
        if(typeof ret[3] === 'undefined' || !ret[3].includes(obj.editor._yuid))
        {
            return;
        }
        
        var html = '';
        if(this.get('full'))
        {
            html = '<div style="width:100%;height:0;position:relative;padding-bottom:56.25%;">';
            html += '<iframe src="//www.studietube.dk/e/'+ret[0]+'/0" ';
            html += 'style="width:100%;height:100%;position:absolute;top:0;left:0;" allowfullscreen webkitallowfullscreen ';
            html += 'mozAllowFullScreen frameborder="0" allow="encrypted-media"></iframe></div>';
        }
        else
        {
            html = '<div><img class="studietube" id="'+ret[0]+'" ';
            html += 'src="//www.studietube.dk/t/'+ret[0]+'"></div>';
        }

        this.get('host').insertContentAtFocusPoint(html);
        this.markUpdated();
    }
}, {
    ATTRS: {
        full: {
            value: false
        }
    }
});
