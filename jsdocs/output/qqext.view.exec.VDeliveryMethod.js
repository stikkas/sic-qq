Ext.data.JsonP.qqext_view_exec_VDeliveryMethod({"tagname":"class","name":"qqext.view.exec.VDeliveryMethod","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"VDeliveryMethod.js","href":"VDeliveryMethod.html#qqext-view-exec-VDeliveryMethod"}],"aliases":{},"alternateClassNames":[],"extends":"qqext.view.StyledPanel","mixins":[],"requires":["Ext.Component","Ext.form.FieldSet","hawk_common.cmp.FileList","qqext.factory.DateField","qqext.factory.HandlerButton","qqext.factory.TextArea","qqext.factory.TextField","qqext.model.qq.SendAction","qqext.view.exec.cmp.ComboDateTrash"],"uses":[],"members":[{"name":"bodyPadding","tagname":"property","owner":"qqext.view.StyledPanel","id":"property-bodyPadding","meta":{"private":true}},{"name":"border","tagname":"property","owner":"qqext.view.StyledPanel","id":"property-border","meta":{"private":true}},{"name":"comboTrashConfig","tagname":"property","owner":"qqext.view.exec.VDeliveryMethod","id":"property-comboTrashConfig","meta":{"private":true}},{"name":"layout","tagname":"property","owner":"qqext.view.StyledPanel","id":"property-layout","meta":{"private":true}},{"name":"mOdel","tagname":"property","owner":"qqext.view.exec.VDeliveryMethod","id":"property-mOdel","meta":{"private":true}},{"name":"margin","tagname":"property","owner":"qqext.view.StyledPanel","id":"property-margin","meta":{"private":true}},{"name":"minHeight","tagname":"property","owner":"qqext.view.exec.VDeliveryMethod","id":"property-minHeight","meta":{"private":true}},{"name":"title","tagname":"property","owner":"qqext.view.exec.VDeliveryMethod","id":"property-title","meta":{"private":true}},{"name":"initComponent","tagname":"method","owner":"qqext.view.exec.VDeliveryMethod","id":"method-initComponent","meta":{"private":true}},{"name":"loadRecord","tagname":"method","owner":"qqext.view.exec.VDeliveryMethod","id":"method-loadRecord","meta":{"private":true}},{"name":"remove","tagname":"method","owner":"qqext.view.exec.VDeliveryMethod","id":"method-remove","meta":{"private":true}},{"name":"setViewOnly","tagname":"method","owner":"qqext.cmp.PanelEditViewMode","id":"method-setViewOnly","meta":{}},{"name":"updateRecord","tagname":"method","owner":"qqext.view.exec.VDeliveryMethod","id":"method-updateRecord","meta":{"private":true}}],"code_type":"ext_define","id":"class-qqext.view.exec.VDeliveryMethod","component":false,"superclasses":["Ext.form.Panel","qqext.cmp.Panel","qqext.view.StyledPanel"],"subclasses":[],"mixedInto":[],"parentMixins":["qqext.cmp.PanelEditViewMode"],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.form.Panel<div class='subclass '><a href='#!/api/qqext.cmp.Panel' rel='qqext.cmp.Panel' class='docClass'>qqext.cmp.Panel</a><div class='subclass '><a href='#!/api/qqext.view.StyledPanel' rel='qqext.view.StyledPanel' class='docClass'>qqext.view.StyledPanel</a><div class='subclass '><strong>qqext.view.exec.VDeliveryMethod</strong></div></div></div></div><h4>Inherited mixins</h4><div class='dependency'><a href='#!/api/qqext.cmp.PanelEditViewMode' rel='qqext.cmp.PanelEditViewMode' class='docClass'>qqext.cmp.PanelEditViewMode</a></div><h4>Requires</h4><div class='dependency'>Ext.Component</div><div class='dependency'>Ext.form.FieldSet</div><div class='dependency'>hawk_common.cmp.FileList</div><div class='dependency'><a href='#!/api/qqext.factory.DateField' rel='qqext.factory.DateField' class='docClass'>qqext.factory.DateField</a></div><div class='dependency'><a href='#!/api/qqext.factory.HandlerButton' rel='qqext.factory.HandlerButton' class='docClass'>qqext.factory.HandlerButton</a></div><div class='dependency'><a href='#!/api/qqext.factory.TextArea' rel='qqext.factory.TextArea' class='docClass'>qqext.factory.TextArea</a></div><div class='dependency'><a href='#!/api/qqext.factory.TextField' rel='qqext.factory.TextField' class='docClass'>qqext.factory.TextField</a></div><div class='dependency'>qqext.model.qq.SendAction</div><div class='dependency'><a href='#!/api/qqext.view.exec.cmp.ComboDateTrash' rel='qqext.view.exec.cmp.ComboDateTrash' class='docClass'>qqext.view.exec.cmp.ComboDateTrash</a></div><h4>Files</h4><div class='dependency'><a href='source/VDeliveryMethod.html#qqext-view-exec-VDeliveryMethod' target='_blank'>VDeliveryMethod.js</a></div></pre><div class='doc-contents'><p>Панель формы \"Способ отправки\"</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-bodyPadding' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/qqext.view.StyledPanel' rel='qqext.view.StyledPanel' class='defined-in docClass'>qqext.view.StyledPanel</a><br/><a href='source/StyledPanel.html#qqext-view-StyledPanel-property-bodyPadding' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.StyledPanel-property-bodyPadding' class='name expandable'>bodyPadding</a> : Number<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>5</code></p></div></div></div><div id='property-border' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/qqext.view.StyledPanel' rel='qqext.view.StyledPanel' class='defined-in docClass'>qqext.view.StyledPanel</a><br/><a href='source/StyledPanel.html#qqext-view-StyledPanel-property-border' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.StyledPanel-property-border' class='name expandable'>border</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='property-comboTrashConfig' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryMethod'>qqext.view.exec.VDeliveryMethod</span><br/><a href='source/VDeliveryMethod.html#qqext-view-exec-VDeliveryMethod-property-comboTrashConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryMethod-property-comboTrashConfig' class='name expandable'>comboTrashConfig</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>{store: 'answerForm', comboLabel: 'Способ отправки', dateLabel: 'Дата'}</code></p></div></div></div><div id='property-layout' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/qqext.view.StyledPanel' rel='qqext.view.StyledPanel' class='defined-in docClass'>qqext.view.StyledPanel</a><br/><a href='source/StyledPanel.html#qqext-view-StyledPanel-property-layout' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.StyledPanel-property-layout' class='name expandable'>layout</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'vbox'</code></p></div></div></div><div id='property-mOdel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryMethod'>qqext.view.exec.VDeliveryMethod</span><br/><a href='source/VDeliveryMethod.html#qqext-view-exec-VDeliveryMethod-property-mOdel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryMethod-property-mOdel' class='name expandable'>mOdel</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-margin' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/qqext.view.StyledPanel' rel='qqext.view.StyledPanel' class='defined-in docClass'>qqext.view.StyledPanel</a><br/><a href='source/StyledPanel.html#qqext-view-StyledPanel-property-margin' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.StyledPanel-property-margin' class='name expandable'>margin</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;0 25 10 5&quot;</code></p></div></div></div><div id='property-minHeight' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryMethod'>qqext.view.exec.VDeliveryMethod</span><br/><a href='source/VDeliveryMethod.html#qqext-view-exec-VDeliveryMethod-property-minHeight' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryMethod-property-minHeight' class='name expandable'>minHeight</a> : Number<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>60</code></p></div></div></div><div id='property-title' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryMethod'>qqext.view.exec.VDeliveryMethod</span><br/><a href='source/VDeliveryMethod.html#qqext-view-exec-VDeliveryMethod-property-title' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryMethod-property-title' class='name expandable'>title</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'Способ отправки'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-initComponent' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryMethod'>qqext.view.exec.VDeliveryMethod</span><br/><a href='source/VDeliveryMethod.html#qqext-view-exec-VDeliveryMethod-method-initComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryMethod-method-initComponent' class='name expandable'>initComponent</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-loadRecord' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryMethod'>qqext.view.exec.VDeliveryMethod</span><br/><a href='source/VDeliveryMethod.html#qqext-view-exec-VDeliveryMethod-method-loadRecord' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryMethod-method-loadRecord' class='name expandable'>loadRecord</a>( <span class='pre'>model</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>model</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-remove' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryMethod'>qqext.view.exec.VDeliveryMethod</span><br/><a href='source/VDeliveryMethod.html#qqext-view-exec-VDeliveryMethod-method-remove' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryMethod-method-remove' class='name expandable'>remove</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-setViewOnly' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/qqext.cmp.PanelEditViewMode' rel='qqext.cmp.PanelEditViewMode' class='defined-in docClass'>qqext.cmp.PanelEditViewMode</a><br/><a href='source/PanelEditViewMode.html#qqext-cmp-PanelEditViewMode-method-setViewOnly' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.cmp.PanelEditViewMode-method-setViewOnly' class='name expandable'>setViewOnly</a>( <span class='pre'>mode</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Включает или выключает режим просмотра ...</div><div class='long'><p>Включает или выключает режим просмотра</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>mode</span> : Boolean<div class='sub-desc'><p>true - режим просмотра , false - обычный режим (редактирование)</p>\n</div></li></ul></div></div></div><div id='method-updateRecord' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryMethod'>qqext.view.exec.VDeliveryMethod</span><br/><a href='source/VDeliveryMethod.html#qqext-view-exec-VDeliveryMethod-method-updateRecord' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryMethod-method-updateRecord' class='name expandable'>updateRecord</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div></div></div></div></div>","meta":{}});