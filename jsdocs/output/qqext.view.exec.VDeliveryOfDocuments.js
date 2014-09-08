Ext.data.JsonP.qqext_view_exec_VDeliveryOfDocuments({"tagname":"class","name":"qqext.view.exec.VDeliveryOfDocuments","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"VDeliveryOfDocuments.js","href":"VDeliveryOfDocuments.html#qqext-view-exec-VDeliveryOfDocuments"}],"aliases":{},"alternateClassNames":[],"extends":"qqext.view.StyledPanel","mixins":[],"requires":["Ext.form.FieldContainer","Ext.form.FieldSet","Ext.grid.Panel","Ext.grid.plugin.CellEditing","hawk_common.cmp.DateField","hawk_common.fix.FixedTextField","qqext.factory.HandlerButton","qqext.model.qq.DeliveryAction","qqext.model.qq.UsedMaterial","qqext.view.exec.cmp.DeliveryTypeCount"],"uses":[],"members":[{"name":"bodyPadding","tagname":"property","owner":"qqext.view.StyledPanel","id":"property-bodyPadding","meta":{"private":true}},{"name":"border","tagname":"property","owner":"qqext.view.StyledPanel","id":"property-border","meta":{"private":true}},{"name":"grid","tagname":"property","owner":"qqext.view.exec.VDeliveryOfDocuments","id":"property-grid","meta":{"private":true}},{"name":"layout","tagname":"property","owner":"qqext.view.StyledPanel","id":"property-layout","meta":{"private":true}},{"name":"mOdel","tagname":"property","owner":"qqext.view.exec.VDeliveryOfDocuments","id":"property-mOdel","meta":{"private":true}},{"name":"margin","tagname":"property","owner":"qqext.view.StyledPanel","id":"property-margin","meta":{"private":true}},{"name":"minHeight","tagname":"property","owner":"qqext.view.exec.VDeliveryOfDocuments","id":"property-minHeight","meta":{"private":true}},{"name":"title","tagname":"property","owner":"qqext.view.exec.VDeliveryOfDocuments","id":"property-title","meta":{"private":true}},{"name":"initComponent","tagname":"method","owner":"qqext.view.exec.VDeliveryOfDocuments","id":"method-initComponent","meta":{"private":true}},{"name":"loadRecord","tagname":"method","owner":"qqext.view.exec.VDeliveryOfDocuments","id":"method-loadRecord","meta":{"private":true}},{"name":"remove","tagname":"method","owner":"qqext.view.exec.VDeliveryOfDocuments","id":"method-remove","meta":{"private":true}},{"name":"setViewOnly","tagname":"method","owner":"qqext.cmp.PanelEditViewMode","id":"method-setViewOnly","meta":{}},{"name":"updateRecord","tagname":"method","owner":"qqext.view.exec.VDeliveryOfDocuments","id":"method-updateRecord","meta":{"private":true}}],"code_type":"ext_define","id":"class-qqext.view.exec.VDeliveryOfDocuments","component":false,"superclasses":["Ext.form.Panel","qqext.cmp.Panel","qqext.view.StyledPanel"],"subclasses":[],"mixedInto":[],"parentMixins":["qqext.cmp.PanelEditViewMode"],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.form.Panel<div class='subclass '><a href='#!/api/qqext.cmp.Panel' rel='qqext.cmp.Panel' class='docClass'>qqext.cmp.Panel</a><div class='subclass '><a href='#!/api/qqext.view.StyledPanel' rel='qqext.view.StyledPanel' class='docClass'>qqext.view.StyledPanel</a><div class='subclass '><strong>qqext.view.exec.VDeliveryOfDocuments</strong></div></div></div></div><h4>Inherited mixins</h4><div class='dependency'><a href='#!/api/qqext.cmp.PanelEditViewMode' rel='qqext.cmp.PanelEditViewMode' class='docClass'>qqext.cmp.PanelEditViewMode</a></div><h4>Requires</h4><div class='dependency'>Ext.form.FieldContainer</div><div class='dependency'>Ext.form.FieldSet</div><div class='dependency'>Ext.grid.Panel</div><div class='dependency'>Ext.grid.plugin.CellEditing</div><div class='dependency'>hawk_common.cmp.DateField</div><div class='dependency'>hawk_common.fix.FixedTextField</div><div class='dependency'><a href='#!/api/qqext.factory.HandlerButton' rel='qqext.factory.HandlerButton' class='docClass'>qqext.factory.HandlerButton</a></div><div class='dependency'>qqext.model.qq.DeliveryAction</div><div class='dependency'>qqext.model.qq.UsedMaterial</div><div class='dependency'><a href='#!/api/qqext.view.exec.cmp.DeliveryTypeCount' rel='qqext.view.exec.cmp.DeliveryTypeCount' class='docClass'>qqext.view.exec.cmp.DeliveryTypeCount</a></div><h4>Files</h4><div class='dependency'><a href='source/VDeliveryOfDocuments.html#qqext-view-exec-VDeliveryOfDocuments' target='_blank'>VDeliveryOfDocuments.js</a></div></pre><div class='doc-contents'><p>Панелька \"Выдача документа\" формы \"Исполнение запроса\"</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-bodyPadding' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/qqext.view.StyledPanel' rel='qqext.view.StyledPanel' class='defined-in docClass'>qqext.view.StyledPanel</a><br/><a href='source/StyledPanel.html#qqext-view-StyledPanel-property-bodyPadding' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.StyledPanel-property-bodyPadding' class='name expandable'>bodyPadding</a> : Number<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>5</code></p></div></div></div><div id='property-border' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/qqext.view.StyledPanel' rel='qqext.view.StyledPanel' class='defined-in docClass'>qqext.view.StyledPanel</a><br/><a href='source/StyledPanel.html#qqext-view-StyledPanel-property-border' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.StyledPanel-property-border' class='name expandable'>border</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='property-grid' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryOfDocuments'>qqext.view.exec.VDeliveryOfDocuments</span><br/><a href='source/VDeliveryOfDocuments.html#qqext-view-exec-VDeliveryOfDocuments-property-grid' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryOfDocuments-property-grid' class='name expandable'>grid</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-layout' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/qqext.view.StyledPanel' rel='qqext.view.StyledPanel' class='defined-in docClass'>qqext.view.StyledPanel</a><br/><a href='source/StyledPanel.html#qqext-view-StyledPanel-property-layout' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.StyledPanel-property-layout' class='name expandable'>layout</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'vbox'</code></p></div></div></div><div id='property-mOdel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryOfDocuments'>qqext.view.exec.VDeliveryOfDocuments</span><br/><a href='source/VDeliveryOfDocuments.html#qqext-view-exec-VDeliveryOfDocuments-property-mOdel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryOfDocuments-property-mOdel' class='name expandable'>mOdel</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-margin' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/qqext.view.StyledPanel' rel='qqext.view.StyledPanel' class='defined-in docClass'>qqext.view.StyledPanel</a><br/><a href='source/StyledPanel.html#qqext-view-StyledPanel-property-margin' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.StyledPanel-property-margin' class='name expandable'>margin</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>&quot;0 25 10 5&quot;</code></p></div></div></div><div id='property-minHeight' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryOfDocuments'>qqext.view.exec.VDeliveryOfDocuments</span><br/><a href='source/VDeliveryOfDocuments.html#qqext-view-exec-VDeliveryOfDocuments-property-minHeight' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryOfDocuments-property-minHeight' class='name expandable'>minHeight</a> : Number<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>height:'auto', ...</div><div class='long'><p>height:'auto',</p>\n<p>Defaults to: <code>60</code></p></div></div></div><div id='property-title' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryOfDocuments'>qqext.view.exec.VDeliveryOfDocuments</span><br/><a href='source/VDeliveryOfDocuments.html#qqext-view-exec-VDeliveryOfDocuments-property-title' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryOfDocuments-property-title' class='name expandable'>title</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>'Выдача документов'</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-initComponent' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryOfDocuments'>qqext.view.exec.VDeliveryOfDocuments</span><br/><a href='source/VDeliveryOfDocuments.html#qqext-view-exec-VDeliveryOfDocuments-method-initComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryOfDocuments-method-initComponent' class='name expandable'>initComponent</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-loadRecord' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryOfDocuments'>qqext.view.exec.VDeliveryOfDocuments</span><br/><a href='source/VDeliveryOfDocuments.html#qqext-view-exec-VDeliveryOfDocuments-method-loadRecord' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryOfDocuments-method-loadRecord' class='name expandable'>loadRecord</a>( <span class='pre'>model</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>model</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-remove' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryOfDocuments'>qqext.view.exec.VDeliveryOfDocuments</span><br/><a href='source/VDeliveryOfDocuments.html#qqext-view-exec-VDeliveryOfDocuments-method-remove' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryOfDocuments-method-remove' class='name expandable'>remove</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-setViewOnly' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/qqext.cmp.PanelEditViewMode' rel='qqext.cmp.PanelEditViewMode' class='defined-in docClass'>qqext.cmp.PanelEditViewMode</a><br/><a href='source/PanelEditViewMode.html#qqext-cmp-PanelEditViewMode-method-setViewOnly' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.cmp.PanelEditViewMode-method-setViewOnly' class='name expandable'>setViewOnly</a>( <span class='pre'>mode</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Включает или выключает режим просмотра ...</div><div class='long'><p>Включает или выключает режим просмотра</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>mode</span> : Boolean<div class='sub-desc'><p>true - режим просмотра , false - обычный режим (редактирование)</p>\n</div></li></ul></div></div></div><div id='method-updateRecord' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.view.exec.VDeliveryOfDocuments'>qqext.view.exec.VDeliveryOfDocuments</span><br/><a href='source/VDeliveryOfDocuments.html#qqext-view-exec-VDeliveryOfDocuments-method-updateRecord' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.view.exec.VDeliveryOfDocuments-method-updateRecord' class='name expandable'>updateRecord</a>( <span class='pre'>model</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>model</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});