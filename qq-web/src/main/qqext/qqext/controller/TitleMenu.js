/**
 *
 */
Ext.define('qqext.controller.TitleMenu', {
	extend: 'qqext.controller.ParentController',
	init: function() {
		this.control({
			'button[action=edit]': {
				click: this.editQuestion
			},
			'button[action=save]': {
				click: this.saveQuestion
			},
			'button[action=delete]': {
				click: this.deleteQuestion
			},
			'button[action=register]': {
				click: this.regQuestion
			},
			'button[action=add_query]': {
				click: this.addQuery
			},
			'button[action=start_search]': {
				click: this.startSearch
			},
			'button[action=clear]': {
				click: this.clearSearch
			}
		});
	},
	editQuestion: function() {
		var me = this;
		var form = me.getMainCont();
		var disbl = form.isDisabled();
		disbl = !disbl;
		form.setDisabled(disbl);
		form.doLayout();
	},
	saveQuestion: function() {
		this.syncModel();
		var model = this.getModel();
		model.save(function(rec, op, suc) {
			console.log('is saving success?: ' + suc);
		});
	},
	deleteQuestion: function() {
		this.syncModel();
		var me = this;
		var model = this.getModel();
		model.destroy({
			success: function() {
				alert('Успешно удалено');
				me.getApplication()
						.getController('qqext.controller.LeftMenu')
						.goSearch();
			},
			failure: function() {
				alert('Ошибка при удалении');
			}
		});
	},
	regQuestion: function() {
		alert('Регистрировать');
	},
	addQuery: function() {
		var me = this;
		me.clearVp();
		var btnsCard = new Array();
		btnsCard[btnsCard.length] = {
			text: 'Вернуться в поиск',
			action: 'search'
		};
		btnsCard[btnsCard.length] = {
			text: 'Редактировать',
			action: 'edit'
		};
		btnsCard[btnsCard.length] = {
			text: 'Сохранить',
			action: 'save'
		};
		btnsCard[btnsCard.length] = {
			text: 'Удалить',
			action: 'delete'
		};
		btnsCard[btnsCard.length] = {
			text: 'Регистрация',
			action: 'register'
		}

		var title = Ext.create('qqext.view.VTitleBar', {
			region: 'north',
			buttons: btnsCard
		});
		var leftCardMenu = Ext.create('qqext.view.VLeftMenu', {
			region: 'west'
		});

		var mainCont = Ext.create('qqext.view.reg.VRegForm', {
			region: 'center'
		});
		me.getApplication().getController('qqext.controller.LeftMenu').currentQueryFormSection = 'REGISTRATION';
		me.getVp().add(title, leftCardMenu, mainCont);
		me.initNewModel();
	},
	clearSearch: function() {
		var me = this;
		var currentMainContCls = me.getMainCont().$className;
		console.log('currentMainContCls: ' + currentMainContCls);
		switch (currentMainContCls) {
			case 'qqext.view.search.VSearchForm' :
				Ext.getStore('searchResults').removeAll();
				me.clearSearchParams();
				var emptyParams = me.getSearchParams();
				var mainForm = me.getMainCont();
				mainForm.loadRecord(emptyParams);
				break;
			case 'qqext.view.journal.VJournalForm' :
				Ext.getStore('journal').filters.clear();
				me.getMainCont().clearCriterias();
				Ext.getStore('journal').loadPage(1);
				break;
			default :
				break;
		}
	},
	startSearch: function() {
		var model = this.getSearchParams();
		var mainCont = this.getMainCont();
		switch (mainCont.$className) {
			case 'qqext.view.search.VSearchForm' :
				mainCont.updateRecord(model);
				var dataWithoutNulls = model.getData();
				Ext.data.writer.Json
						.dropNullsAndUndefinedFields(dataWithoutNulls);
				Ext.getStore('searchResults').load({
					params: {
						q: Ext.encode(dataWithoutNulls)
					}
				});
				break;
			case 'qqext.view.journal.VJournalForm' :
				Ext.getStore('journal').reload();
				break;
			default :
				break;
		}

	}
});