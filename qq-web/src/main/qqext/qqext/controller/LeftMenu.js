/**
 * Переключение режимов интерфейса по событиям кнопок левого меню.
 */
Ext.define('qqext.controller.LeftMenu', {
	extend : 'qqext.controller.ParentController',
	views : ['qqext.view.VLeftMenuSearch'],
	currentQueryFormSection : '',
	init : function() {
		this.control({
					'button[action=journal]' : {
						click : this.goJournal
					},
					'button[action=search]' : {
						click : this.goSearch
					},
					'button[action=reports]' : {
						click : this.goReports
					},
					'button[action=q_registration]' : {
						click : this.goRegistration
					},
					'button[action=q_notification]' : {
						click : this.goNotification
					},
					'button[action=q_transmission]' : {
						click : this.goTransmission
					},
					'button[action=q_execution]' : {
						click : this.goExecution
					}
				});
	},

	getSearchTitle : function() {
		var btnsSearch = new Array();

		btnsSearch[btnsSearch.length] = {
			text : 'Добавить',
			action : 'add_query'
		};
		btnsSearch[btnsSearch.length] = {
			text : 'Поиск',
			action : 'start_search'
		};
		btnsSearch[btnsSearch.length] = {
			text : 'Очистить',
			action : 'clear'
		}

		var m = Ext.create('qqext.view.VTitleBar', {
					region : 'north',
					buttons : btnsSearch
				});
		return m;
	},
	goJournal : function() {
		var me = this;
		me.clearVp();
		var m = me.getSearchTitle();
		var leftMenu = Ext.create('qqext.view.VLeftMenuSearch', {
					region : 'west'
				});
		var mainCont = Ext.create('qqext.view.journal.VJournalForm', {
					region : 'center'
				});
		me.getVp().add(m, leftMenu, mainCont);
		
		Ext.getStore('journal').load();
	},
	goSearch : function() {
		var me = this;
		me.clearVp();
		var m = me.getSearchTitle();
		var leftMenu = Ext.create('qqext.view.VLeftMenuSearch', {
					region : 'west'
				});
		var paramsModel = me.getSearchParams();
		var mainCont = Ext.create('qqext.view.search.VSearchForm', {
					region : 'center'
				})
		mainCont.loadRecord(paramsModel);
		me.getVp().add(m, leftMenu, mainCont);
	},
	goReports : function() {
		var me = this;
		me.clearVp();
		var m = me.getSearchTitle();
		var leftMenu = Ext.create('qqext.view.VLeftMenuSearch', {
					region : 'west'
				});
		me.getVp().add(m, leftMenu);
	},
	// левый блок меню переключения данных карточки запроса
	goRegistration : function() {
		var me = this;
		me.syncModel();
		if (me.currentQueryFormSection == 'REGISTRATION') {
			console.log('already registration');
			return;
		} else {
			me.dropMainCont();
			var mainCont = Ext.create('qqext.view.reg.VRegForm', {
						region : 'center'
					});
			me.getVp().add(mainCont);
			mainCont.loadRecord(me.getModel());
			me.currentQueryFormSection = 'REGISTRATION';
		}
	},
	goNotification : function() {
		var me = this;
		me.syncModel();
		if (me.currentQueryFormSection == 'NOTIFICATION') {
			console.log('already notification');
			return;
		} else {
			me.dropMainCont();
			var mainCont = Ext.create('qqext.view.notify.VNotify', {
						region : 'center'
					});
			me.getVp().add(mainCont);
			var model = me.getModel();
			me.currentQueryFormSection = 'NOTIFICATION';
			if (!model.getNotification()) {
				console
						.debug('model.getNotification undefined, creating new instance');
				var n = Ext.create('qqext.model.qq.Notification');
				model.setNotification(n);
				mainCont.loadRecord(n);
			} else {
				console.log('notification: '
						+ model.getNotification().getData());
				mainCont.loadRecord(model.getNotification());
			}
		}
	},
	goTransmission : function() {
		var me = this;
		me.syncModel();
		if (me.currentQueryFormSection == 'TRANSMISSION') {
			console.log('already transmission');
			return;
		} else {
			me.dropMainCont();
			var mainCont = Ext.create('qqext.view.transmission.VTransmission',
					{
						region : 'center'
					});
			me.getVp().add(mainCont);
			var model = me.getModel();
			var transmission = model.getTransmission();
			mainCont.loadRecord(transmission);
			me.currentQueryFormSection = 'TRANSMISSION';
		}
	},
	goExecution : function() {
		var me = this;
		me.syncModel();
		if (me.currentQueryFormSection == 'EXECUTION') {
			console.log('already execution');
			return;
		} else {
			me.dropMainCont();
			var mainCont = Ext.create('qqext.view.exec.VExecForm', {
						region : 'center'
					});
			
			me.getVp().add(mainCont);

			
			mainCont.loadRecord(me.getModel());
			me.currentQueryFormSection = 'EXECUTION';
		}
	}

});