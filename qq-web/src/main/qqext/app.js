
Ext.Loader.setPath('qqext', 'qqext');
Ext.application({
	name: 'qqext',
	appFolder: 'qqext',
	extend: 'qqext.Application',
	autoCreateViewport: false,
	launch: function() {
		var v = Ext.create('qqext.view.Viewport', {
		});
	}
});
