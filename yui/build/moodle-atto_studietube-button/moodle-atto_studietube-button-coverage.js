
var __cov_sd97xwJ2ErEDo85sb8_SFw = (Function('return this'))();
if (!__cov_sd97xwJ2ErEDo85sb8_SFw.__coverage__) { __cov_sd97xwJ2ErEDo85sb8_SFw.__coverage__ = {}; }
__cov_sd97xwJ2ErEDo85sb8_SFw = __cov_sd97xwJ2ErEDo85sb8_SFw.__coverage__;
if (!(__cov_sd97xwJ2ErEDo85sb8_SFw['build/moodle-atto_studietube-button/moodle-atto_studietube-button.js'])) {
   __cov_sd97xwJ2ErEDo85sb8_SFw['build/moodle-atto_studietube-button/moodle-atto_studietube-button.js'] = {"path":"build/moodle-atto_studietube-button/moodle-atto_studietube-button.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":41},"end":{"line":1,"column":60}}},"2":{"name":"(anonymous_2)","line":61,"loc":{"start":{"line":61,"column":17},"end":{"line":61,"column":28}}},"3":{"name":"(anonymous_3)","line":64,"loc":{"start":{"line":64,"column":43},"end":{"line":64,"column":58}}},"4":{"name":"(anonymous_4)","line":72,"loc":{"start":{"line":72,"column":22},"end":{"line":72,"column":33}}},"5":{"name":"(anonymous_5)","line":94,"loc":{"start":{"line":94,"column":18},"end":{"line":94,"column":39}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":132,"column":61}},"2":{"start":{"line":30,"column":0},"end":{"line":40,"column":17}},"3":{"start":{"line":43,"column":0},"end":{"line":129,"column":3}},"4":{"start":{"line":62,"column":8},"end":{"line":62,"column":24}},"5":{"start":{"line":64,"column":8},"end":{"line":64,"column":102}},"6":{"start":{"line":64,"column":60},"end":{"line":64,"column":91}},"7":{"start":{"line":65,"column":8},"end":{"line":69,"column":11}},"8":{"start":{"line":73,"column":8},"end":{"line":78,"column":11}},"9":{"start":{"line":80,"column":8},"end":{"line":80,"column":56}},"10":{"start":{"line":81,"column":8},"end":{"line":85,"column":11}},"11":{"start":{"line":86,"column":8},"end":{"line":86,"column":117}},"12":{"start":{"line":88,"column":8},"end":{"line":89,"column":24}},"13":{"start":{"line":91,"column":8},"end":{"line":91,"column":27}},"14":{"start":{"line":95,"column":8},"end":{"line":98,"column":9}},"15":{"start":{"line":97,"column":12},"end":{"line":97,"column":19}},"16":{"start":{"line":100,"column":8},"end":{"line":100,"column":23}},"17":{"start":{"line":102,"column":8},"end":{"line":102,"column":31}},"18":{"start":{"line":104,"column":8},"end":{"line":107,"column":9}},"19":{"start":{"line":106,"column":12},"end":{"line":106,"column":19}},"20":{"start":{"line":109,"column":8},"end":{"line":109,"column":63}},"21":{"start":{"line":111,"column":8},"end":{"line":111,"column":275}},"22":{"start":{"line":113,"column":8},"end":{"line":113,"column":41}},"23":{"start":{"line":114,"column":8},"end":{"line":114,"column":27}},"24":{"start":{"line":116,"column":8},"end":{"line":118,"column":18}}},"branchMap":{"1":{"line":95,"type":"if","locations":[{"start":{"line":95,"column":8},"end":{"line":95,"column":8}},{"start":{"line":95,"column":8},"end":{"line":95,"column":8}}]},"2":{"line":95,"type":"binary-expr","locations":[{"start":{"line":95,"column":12},"end":{"line":95,"column":56}},{"start":{"line":95,"column":60},"end":{"line":95,"column":103}}]},"3":{"line":104,"type":"if","locations":[{"start":{"line":104,"column":8},"end":{"line":104,"column":8}},{"start":{"line":104,"column":8},"end":{"line":104,"column":8}}]},"4":{"line":104,"type":"binary-expr","locations":[{"start":{"line":104,"column":11},"end":{"line":104,"column":40}},{"start":{"line":104,"column":44},"end":{"line":104,"column":71}}]}},"code":["(function () { YUI.add('moodle-atto_studietube-button', function (Y, NAME) {","","// This file is part of Moodle - http://moodle.org/","//","// Moodle is free software: you can redistribute it and/or modify","// it under the terms of the GNU General Public License as published by","// the Free Software Foundation, either version 3 of the License, or","// (at your option) any later version.","//","// Moodle is distributed in the hope that it will be useful,","// but WITHOUT ANY WARRANTY; without even the implied warranty of","// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the","// GNU General Public License for more details.","//","// You should have received a copy of the GNU General Public License","// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.","","/**"," * Atto mod for Lærit.dk"," *"," * @package    atto_studietube"," * @copyright  2019 Damian Alarcon"," * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later"," */","","/**"," * @module moodle-atto_studietube-button"," */","","var COMPONENTNAME = 'atto_studietube',","    // @codingStandardsIgnoreStart","    IMAGETEMPLATE = '' +","        '<img src=\"{{url}}\" alt=\"{{alt}}\" ' +","            '{{#if width}}width=\"{{width}}\" {{/if}}' +","            '{{#if height}}height=\"{{height}}\" {{/if}}' +","            '{{#if presentation}}role=\"presentation\" {{/if}}' +","            'style=\"{{alignment}}{{margin}}{{customstyle}}\"' +","            '{{#if classlist}}class=\"{{classlist}}\" {{/if}}' +","            '{{#if id}}id=\"{{id}}\" {{/if}}' +","            '/>';","    // @codingStandardsIgnoreEnd","","Y.namespace('M.atto_studietube').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {","","    /**","     * A reference to the current selection at the time that the dialogue","     * was opened.","     *","     * @property _currentSelection","     * @type Range","     * @private","     */","    _currentSelection: null,","","    /**","     * Add event listeners.","     *","     * @method initializer","     */","","    initializer: function() {","        var self = this;","","        window.addEventListener(\"message\", function(event){ self._handleMedia(event, self); }, false);","        this.addButton({","            icon: 'studietube',","            iconComponent: COMPONENTNAME,","            callback: this._displayDialogue","        });","    },","    ","    _displayDialogue: function() {","        var dialogue = this.getDialogue({","            headerContent: 'Studietube',","            width: '600px',","            height: '500px',","            focusAfterHide: true","        });","","        var iframe = Y.Node.create('<iframe></iframe>');","        iframe.setStyles({","            height: '400px',","            border: 'none',","            width: '100%'","        });","        iframe.setAttribute('src', '//www.studietube.dk/app/bluebird/1?passtype=direct&idcaller='+this.editor._yuid);","","        dialogue.set('bodyContent', iframe)","                .show();","","        this.markUpdated();","    },","    ","    _handleMedia: function(event, obj) {","        if (event.origin !== \"https://www.studietube.dk\" && event.origin !== \"http://www.studietube.dk\")","        {","            return;","        }","     ","        var self = obj;","    ","        ret = eval(event.data);","        ","        if(typeof ret[3] === 'undefined' || ret[3] !== obj.editor._yuid)","        {","            return;","        }","        ","        src = '//www.studietube.dk/e/'+ret[0]+'/0?nopanel=tru';","        ","        newhtml = Y.Node.create('<div style=\"width: 100%;height:0;position:relative;padding-bottom:56.25%;\"><iframe src=\"'+src+'\" style=\"width:100%;height:100%;position:absolute;top:0;left: 0; \" frameborder=\"0\" border=\"0\" scrolling=\"no\" allowfullscreen=\"1\"></iframe></div>');","","        self.editor.appendChild(newhtml);","        self.markUpdated();","        ","        this.getDialogue({","            focusAfterHide: null","        }).hide();","    }","}, {","    ATTRS: {","        disabled: {","            value: true","        },","        area: {","            value: {}","        }","    }","});","","","}, '@VERSION@', {\"requires\": [\"moodle-editor_atto-plugin\"]});","","}());"]};
}
__cov_sd97xwJ2ErEDo85sb8_SFw = __cov_sd97xwJ2ErEDo85sb8_SFw['build/moodle-atto_studietube-button/moodle-atto_studietube-button.js'];
__cov_sd97xwJ2ErEDo85sb8_SFw.s['1']++;YUI.add('moodle-atto_studietube-button',function(Y,NAME){__cov_sd97xwJ2ErEDo85sb8_SFw.f['1']++;__cov_sd97xwJ2ErEDo85sb8_SFw.s['2']++;var COMPONENTNAME='atto_studietube',IMAGETEMPLATE=''+'<img src="{{url}}" alt="{{alt}}" '+'{{#if width}}width="{{width}}" {{/if}}'+'{{#if height}}height="{{height}}" {{/if}}'+'{{#if presentation}}role="presentation" {{/if}}'+'style="{{alignment}}{{margin}}{{customstyle}}"'+'{{#if classlist}}class="{{classlist}}" {{/if}}'+'{{#if id}}id="{{id}}" {{/if}}'+'/>';__cov_sd97xwJ2ErEDo85sb8_SFw.s['3']++;Y.namespace('M.atto_studietube').Button=Y.Base.create('button',Y.M.editor_atto.EditorPlugin,[],{_currentSelection:null,initializer:function(){__cov_sd97xwJ2ErEDo85sb8_SFw.f['2']++;__cov_sd97xwJ2ErEDo85sb8_SFw.s['4']++;var self=this;__cov_sd97xwJ2ErEDo85sb8_SFw.s['5']++;window.addEventListener('message',function(event){__cov_sd97xwJ2ErEDo85sb8_SFw.f['3']++;__cov_sd97xwJ2ErEDo85sb8_SFw.s['6']++;self._handleMedia(event,self);},false);__cov_sd97xwJ2ErEDo85sb8_SFw.s['7']++;this.addButton({icon:'studietube',iconComponent:COMPONENTNAME,callback:this._displayDialogue});},_displayDialogue:function(){__cov_sd97xwJ2ErEDo85sb8_SFw.f['4']++;__cov_sd97xwJ2ErEDo85sb8_SFw.s['8']++;var dialogue=this.getDialogue({headerContent:'Studietube',width:'600px',height:'500px',focusAfterHide:true});__cov_sd97xwJ2ErEDo85sb8_SFw.s['9']++;var iframe=Y.Node.create('<iframe></iframe>');__cov_sd97xwJ2ErEDo85sb8_SFw.s['10']++;iframe.setStyles({height:'400px',border:'none',width:'100%'});__cov_sd97xwJ2ErEDo85sb8_SFw.s['11']++;iframe.setAttribute('src','//www.studietube.dk/app/bluebird/1?passtype=direct&idcaller='+this.editor._yuid);__cov_sd97xwJ2ErEDo85sb8_SFw.s['12']++;dialogue.set('bodyContent',iframe).show();__cov_sd97xwJ2ErEDo85sb8_SFw.s['13']++;this.markUpdated();},_handleMedia:function(event,obj){__cov_sd97xwJ2ErEDo85sb8_SFw.f['5']++;__cov_sd97xwJ2ErEDo85sb8_SFw.s['14']++;if((__cov_sd97xwJ2ErEDo85sb8_SFw.b['2'][0]++,event.origin!=='https://www.studietube.dk')&&(__cov_sd97xwJ2ErEDo85sb8_SFw.b['2'][1]++,event.origin!=='http://www.studietube.dk')){__cov_sd97xwJ2ErEDo85sb8_SFw.b['1'][0]++;__cov_sd97xwJ2ErEDo85sb8_SFw.s['15']++;return;}else{__cov_sd97xwJ2ErEDo85sb8_SFw.b['1'][1]++;}__cov_sd97xwJ2ErEDo85sb8_SFw.s['16']++;var self=obj;__cov_sd97xwJ2ErEDo85sb8_SFw.s['17']++;ret=eval(event.data);__cov_sd97xwJ2ErEDo85sb8_SFw.s['18']++;if((__cov_sd97xwJ2ErEDo85sb8_SFw.b['4'][0]++,typeof ret[3]==='undefined')||(__cov_sd97xwJ2ErEDo85sb8_SFw.b['4'][1]++,ret[3]!==obj.editor._yuid)){__cov_sd97xwJ2ErEDo85sb8_SFw.b['3'][0]++;__cov_sd97xwJ2ErEDo85sb8_SFw.s['19']++;return;}else{__cov_sd97xwJ2ErEDo85sb8_SFw.b['3'][1]++;}__cov_sd97xwJ2ErEDo85sb8_SFw.s['20']++;src='//www.studietube.dk/e/'+ret[0]+'/0?nopanel=tru';__cov_sd97xwJ2ErEDo85sb8_SFw.s['21']++;newhtml=Y.Node.create('<div style="width: 100%;height:0;position:relative;padding-bottom:56.25%;"><iframe src="'+src+'" style="width:100%;height:100%;position:absolute;top:0;left: 0; " frameborder="0" border="0" scrolling="no" allowfullscreen="1"></iframe></div>');__cov_sd97xwJ2ErEDo85sb8_SFw.s['22']++;self.editor.appendChild(newhtml);__cov_sd97xwJ2ErEDo85sb8_SFw.s['23']++;self.markUpdated();__cov_sd97xwJ2ErEDo85sb8_SFw.s['24']++;this.getDialogue({focusAfterHide:null}).hide();}},{ATTRS:{disabled:{value:true},area:{value:{}}}});},'@VERSION@',{'requires':['moodle-editor_atto-plugin']});
