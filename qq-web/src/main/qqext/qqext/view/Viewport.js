Ext.define('qqext.view.Viewport', {
	extend: 'Ext.container.Viewport',
	// requires : ['Ext.layout.container.Fit'],
	name: 'qq-viewport',
	layout: {
		type: 'border'
	},
	initComponent: function() {
		var me = this;

		var btnsCard = [{text: 'Вернуться в поиск', action: 'back_to_search'},
			{text: 'Редактировать', action: 'edit'},
			{text: 'Сохранить', action: 'save'},
			{text: 'Удалить', action: 'delete'},
			{text: 'Регистрация', action: 'register'}];


		var btnsSearch = [{text: 'Добавить', action: 'add_query'},
			{text: 'Поиск', action: 'start_search'},
			{text: 'Очистить', action: 'clear'}];

		var m = Ext.create('qqext.view.VTitleBar', {
			region: 'north',
			buttons: btnsSearch
		});

		var y = Ext.create('qqext.view.VLeftMenuSearch', {
			region: 'west',
			margin: '0 10 0 0'
		});
		// var mainCont = Ext.create('qqext.view.reg.VRegForm',{
		// region:'center'
		// });
		// var mainCont = Ext.create('qqext.view.notify.VNotify', {
		// region : 'center'
		// });
		// var mainCont =
		// Ext.create('qqext.view.transmission.VTransmission',{
		// region:'center'
		// });

		// var mainCont = Ext.create('qqext.view.exec.VExecForm',{
		// region:'center'
		// });

		//var mainCont = Ext.create('qqext.view.journal.VJournalForm', {
		//			region : 'center'
		//		});


		var mainCont = Ext.create('qqext.view.search.VSearchForm', {
			region: 'center'
		});

		Ext.applyIf(me, {
			items: [m, y, mainCont]

		});

		// var k1 = Ext.create('qqext.view.exec.cmp.DeliveryTypeCount');
		// var k2 = Ext.create('qqext.view.exec.cmp.DeliveryTypeCount');
		// var k3 = Ext.create('qqext.view.exec.cmp.DeliveryTypeCount');
		// var k4 = Ext.create('qqext.view.exec.cmp.DeliveryTypeCount');

		// Ext.applyIf(me,{
		// items:[k1,k2,k3,k4]
		// });

		me.callParent(arguments);
	}
});
