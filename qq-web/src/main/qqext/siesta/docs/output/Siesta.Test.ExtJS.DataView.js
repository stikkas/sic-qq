Ext.data.JsonP.Siesta_Test_ExtJS_DataView({"tagname":"class","name":"Siesta.Test.ExtJS.DataView","autodetected":{},"files":[{"filename":"DataView.js","href":"DataView.html#Siesta-Test-ExtJS-DataView"}],"members":[{"name":"getFirstItem","tagname":"method","owner":"Siesta.Test.ExtJS.DataView","id":"method-getFirstItem","meta":{}},{"name":"waitForViewRendered","tagname":"method","owner":"Siesta.Test.ExtJS.DataView","id":"method-waitForViewRendered","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Siesta.Test.ExtJS.DataView","short_doc":"This is a mixin, with helper methods for testing functionality relating to ExtJS dataviews. ...","component":false,"superclasses":[],"subclasses":[],"mixedInto":["Siesta.Test.ExtJS"],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Mixed into</h4><div class='dependency'><a href='#!/api/Siesta.Test.ExtJS' rel='Siesta.Test.ExtJS' class='docClass'>Siesta.Test.ExtJS</a></div><h4>Files</h4><div class='dependency'><a href='source/DataView.html#Siesta-Test-ExtJS-DataView' target='_blank'>DataView.js</a></div></pre><div class='doc-contents'><p>This is a mixin, with helper methods for testing functionality relating to ExtJS dataviews. This mixin is being consumed by <a href=\"#!/api/Siesta.Test.ExtJS\" rel=\"Siesta.Test.ExtJS\" class=\"docClass\">Siesta.Test.ExtJS</a></p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-getFirstItem' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Siesta.Test.ExtJS.DataView'>Siesta.Test.ExtJS.DataView</span><br/><a href='source/DataView.html#Siesta-Test-ExtJS-DataView-method-getFirstItem' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Siesta.Test.ExtJS.DataView-method-getFirstItem' class='name expandable'>getFirstItem</a>( <span class='pre'>view</span> ) : Ext.Element<span class=\"signature\"></span></div><div class='description'><div class='short'>Utility method which returns the first view element. ...</div><div class='long'><p>Utility method which returns the first view element.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>view</span> : Ext.view.View/String<div class='sub-desc'><p>An Ext.view.View instance or a ComponentQuery</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Ext.Element</span><div class='sub-desc'><p>The first element of the view</p>\n</div></li></ul></div></div></div><div id='method-waitForViewRendered' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Siesta.Test.ExtJS.DataView'>Siesta.Test.ExtJS.DataView</span><br/><a href='source/DataView.html#Siesta-Test-ExtJS-DataView-method-waitForViewRendered' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Siesta.Test.ExtJS.DataView-method-waitForViewRendered' class='name expandable'>waitForViewRendered</a>( <span class='pre'>view, callback, scope, timeout</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Waits for the items of a dataview to render and then calls the supplied callback. ...</div><div class='long'><p>Waits for the items of a dataview to render and then calls the supplied callback.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>view</span> : Ext.view.View/String<div class='sub-desc'><p>An Ext.view.View instance or a ComponentQuery</p>\n</div></li><li><span class='pre'>callback</span> : Function<div class='sub-desc'><p>A function to call when the condition has been met.</p>\n</div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'><p>The scope for the callback</p>\n</div></li><li><span class='pre'>timeout</span> : Int<div class='sub-desc'><p>The maximum amount of time to wait for the condition to be fulfilled. Defaults to the <a href=\"#!/api/Siesta.Test.ExtJS-cfg-waitForTimeout\" rel=\"Siesta.Test.ExtJS-cfg-waitForTimeout\" class=\"docClass\">Siesta.Test.ExtJS.waitForTimeout</a> value.</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});