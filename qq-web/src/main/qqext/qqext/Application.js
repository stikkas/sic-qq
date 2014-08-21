Ext.define('qqext.Application', {
	name: 'qqext',
	extend: 'Ext.app.Application',
	appFolder: 'qqext',
	views: [
		'qqext.view.VTitleBar'
	],
	controllers: [
		'qqext.controller.Main', 'qqext.controller.LeftMenu', 'qqext.controller.TitleMenu'
	],
	stores: [
		// TODO: add stores here
	]
});
