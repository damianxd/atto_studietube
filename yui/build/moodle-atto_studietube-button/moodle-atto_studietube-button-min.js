YUI.add("moodle-atto_studietube-button",function(Y,NAME){var COMPONENTNAME="atto_studietube",IMAGETEMPLATE='<img src="{{url}}" alt="{{alt}}" {{#if width}}width="{{width}}" {{/if}}{{#if height}}height="{{height}}" {{/if}}{{#if presentation}}role="presentation" {{/if}}style="{{alignment}}{{margin}}{{customstyle}}"{{#if classlist}}class="{{classlist}}" {{/if}}{{#if id}}id="{{id}}" {{/if}}/>';Y.namespace("M.atto_studietube").Button=Y.Base.create("button",Y.M.editor_atto.EditorPlugin,[],{_currentSelection:null,initializer:function(){var t=this;window.addEventListener("message",function(e){t._handleMedia(e,t)},!1),this.addButton({icon:"studietube",iconComponent:COMPONENTNAME,callback:this._displayDialogue})},_displayDialogue:function(){var e=this.getDialogue({headerContent:"Studietube",width:"600px",height:"500px",focusAfterHide:!0}),t=Y.Node.create("<iframe></iframe>");t.setStyles({height:"400px",border:"none",width:"100%"}),t.setAttribute("src","//www.skoletube.dk/app/bluebird/1?passtype=direct&idcaller="+this.editor._yuid),e.set("bodyContent",t).show(),this.markUpdated()},_handleMedia:function(event,obj){if("https://www.skoletube.dk"===event.origin||"http://www.skoletube.dk"===event.origin){var self=obj;ret=eval(event.data),"undefined"!=typeof ret[3]&&ret[3]===obj.editor._yuid&&(src="//www.skoletube.dk/e/"+ret[0]+"/0?nopanel=tru",newhtml=Y.Node.create('<div style="width: 100%;height:0;position:relative;padding-bottom:56.25%;"><iframe src="'+src+'" style="width:100%;height:100%;position:absolute;top:0;left: 0; " frameborder="0" border="0" scrolling="no" allowfullscreen="1"></iframe></div>'),self.editor.appendChild(newhtml),self.markUpdated(),this.getDialogue({focusAfterHide:null}).hide())}}},{ATTRS:{disabled:{value:!0},area:{value:{}}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});
