Ext.data.JsonP.qqext_controller_Main({"tagname":"class","name":"qqext.controller.Main","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"Main.js","href":"Main.html#qqext-controller-Main"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.app.Controller","mixins":[],"requires":["hawk_common.store.UserLocalStorage","qqext.model.qq.JournalItem","qqext.model.qq.Question","qqext.model.qq.SearchCritery","qqext.model.qq.SearchResultItem","qqext.store.CustomStore","qqext.store.DictValuesStore"],"uses":[],"members":[{"name":"currentModel","tagname":"property","owner":"qqext.controller.Main","id":"property-currentModel","meta":{}},{"name":"searchParams","tagname":"property","owner":"qqext.controller.Main","id":"property-searchParams","meta":{"private":true}},{"name":"views","tagname":"property","owner":"qqext.controller.Main","id":"property-views","meta":{"private":true}},{"name":"activateComponent","tagname":"method","owner":"qqext.controller.Main","id":"method-activateComponent","meta":{}},{"name":"clearSearchParams","tagname":"method","owner":"qqext.controller.Main","id":"method-clearSearchParams","meta":{"private":true}},{"name":"dropMainCont","tagname":"method","owner":"qqext.controller.Main","id":"method-dropMainCont","meta":{"private":true}},{"name":"getMainCont","tagname":"method","owner":"qqext.controller.Main","id":"method-getMainCont","meta":{"private":true}},{"name":"getModel","tagname":"method","owner":"qqext.controller.Main","id":"method-getModel","meta":{"private":true}},{"name":"getSearchParams","tagname":"method","owner":"qqext.controller.Main","id":"method-getSearchParams","meta":{"private":true}},{"name":"init","tagname":"method","owner":"qqext.controller.Main","id":"method-init","meta":{"private":true}},{"name":"syncModel","tagname":"method","owner":"qqext.controller.Main","id":"method-syncModel","meta":{}}],"code_type":"ext_define","id":"class-qqext.controller.Main","component":false,"superclasses":["Ext.app.Controller"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.app.Controller<div class='subclass '><strong>qqext.controller.Main</strong></div></div><h4>Requires</h4><div class='dependency'>hawk_common.store.UserLocalStorage</div><div class='dependency'><a href='#!/api/qqext.model.qq.JournalItem' rel='qqext.model.qq.JournalItem' class='docClass'>qqext.model.qq.JournalItem</a></div><div class='dependency'><a href='#!/api/qqext.model.qq.Question' rel='qqext.model.qq.Question' class='docClass'>qqext.model.qq.Question</a></div><div class='dependency'><a href='#!/api/qqext.model.qq.SearchCritery' rel='qqext.model.qq.SearchCritery' class='docClass'>qqext.model.qq.SearchCritery</a></div><div class='dependency'><a href='#!/api/qqext.model.qq.SearchResultItem' rel='qqext.model.qq.SearchResultItem' class='docClass'>qqext.model.qq.SearchResultItem</a></div><div class='dependency'><a href='#!/api/qqext.store.CustomStore' rel='qqext.store.CustomStore' class='docClass'>qqext.store.CustomStore</a></div><div class='dependency'><a href='#!/api/qqext.store.DictValuesStore' rel='qqext.store.DictValuesStore' class='docClass'>qqext.store.DictValuesStore</a></div><h4>Files</h4><div class='dependency'><a href='source/Main.html#qqext-controller-Main' target='_blank'>Main.js</a></div></pre><div class='doc-contents'><p>Основной контроллер (и единственный) нашего приложения.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-currentModel' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.controller.Main'>qqext.controller.Main</span><br/><a href='source/Main.html#qqext-controller-Main-property-currentModel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.controller.Main-property-currentModel' class='name expandable'>currentModel</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Активная модель, иницилизируется в qqext.Menu после создания. ...</div><div class='long'><p>Активная модель, иницилизируется в <a href=\"#!/api/qqext.Menu\" rel=\"qqext.Menu\" class=\"docClass\">qqext.Menu</a> после создания.\nФункция вызывается при нажатии на кнопку 'Добавить' в верхнем меню.</p>\n</div></div></div><div id='property-searchParams' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.controller.Main'>qqext.controller.Main</span><br/><a href='source/Main.html#qqext-controller-Main-property-searchParams' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.controller.Main-property-searchParams' class='name expandable'>searchParams</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-views' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.controller.Main'>qqext.controller.Main</span><br/><a href='source/Main.html#qqext-controller-Main-property-views' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.controller.Main-property-views' class='name expandable'>views</a> : Array<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>['qqext.view.VTitleBar']</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-activateComponent' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.controller.Main'>qqext.controller.Main</span><br/><a href='source/Main.html#qqext-controller-Main-method-activateComponent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.controller.Main-method-activateComponent' class='name expandable'>activateComponent</a>( <span class='pre'>target</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Если у пользователя нет прав, то компонент делается недоступным ...</div><div class='long'><p>Если у пользователя нет прав, то компонент делается недоступным</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : Ext.Component<div class='sub-desc'><p>в основном кнопки</p>\n</div></li></ul></div></div></div><div id='method-clearSearchParams' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.controller.Main'>qqext.controller.Main</span><br/><a href='source/Main.html#qqext-controller-Main-method-clearSearchParams' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.controller.Main-method-clearSearchParams' class='name expandable'>clearSearchParams</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-dropMainCont' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.controller.Main'>qqext.controller.Main</span><br/><a href='source/Main.html#qqext-controller-Main-method-dropMainCont' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.controller.Main-method-dropMainCont' class='name expandable'>dropMainCont</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getMainCont' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.controller.Main'>qqext.controller.Main</span><br/><a href='source/Main.html#qqext-controller-Main-method-getMainCont' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.controller.Main-method-getMainCont' class='name expandable'>getMainCont</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.controller.Main'>qqext.controller.Main</span><br/><a href='source/Main.html#qqext-controller-Main-method-getModel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.controller.Main-method-getModel' class='name expandable'>getModel</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-getSearchParams' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.controller.Main'>qqext.controller.Main</span><br/><a href='source/Main.html#qqext-controller-Main-method-getSearchParams' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.controller.Main-method-getSearchParams' class='name expandable'>getSearchParams</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.controller.Main'>qqext.controller.Main</span><br/><a href='source/Main.html#qqext-controller-Main-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.controller.Main-method-init' class='name expandable'>init</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-syncModel' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='qqext.controller.Main'>qqext.controller.Main</span><br/><a href='source/Main.html#qqext-controller-Main-method-syncModel' target='_blank' class='view-source'>view source</a></div><a href='#!/api/qqext.controller.Main-method-syncModel' class='name expandable'>syncModel</a>( <span class='pre'></span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Синхронизация данных на форме с моделью ...</div><div class='long'><p>Синхронизация данных на форме с моделью</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>объект контоллера (нужен для цепочных операций)</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});