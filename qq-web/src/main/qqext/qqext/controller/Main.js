/**
 * Основной контроллер (и единственный) нашего приложения.
 */
Ext.define('qqext.controller.Main', {
	extend: 'Ext.app.Controller',
	views: ['qqext.view.VTitleBar'],
	requires: [
		'qqext.model.qq.JournalItem',
		'qqext.model.qq.SearchResultItem',
		'qqext.model.qq.SearchCritery',
		'qqext.model.qq.Question',
		'qqext.store.DictValuesStore',
		'qqext.store.CustomStore',
		'qqext.Constants'
	],
	/**
	 * Активная модель, иницилизируется в {@link qqext.Menu} после создания.
	 * Функция вызывается при нажатии на кнопку 'Добавить' в верхнем меню.
	 */
	currentModel: null,
	searchParams: null,
	init: function() {
		var kput = {
			resultOfAnswer: 'Q_DICT_RESULT_ANSER',
			applicantCategory: 'Q_DICT_APP_CATEGORY',
			applicantType: 'Q_DICT_APPLICANT_TYPE',
			inboxDocDeliveryType: 'QQ_TRANSMISSION_MODE',
			inboxDocExecOrg: 'ORG_STRUCTURE',
			answerForm: 'Q_DICT_ANSWER_FORM',
			docType: 'Q_DICT_DOC_TYPES',
			queryType: 'Q_DICT_QUEST_TYPE',
			storageTerritory: 'Q_DICT_STORAGE',
			tematicOfAnswer: 'Q_DICT_THEMATIC_ANSW',
			diffCategory: 'Q_DICT_DIFF_CATEGORY',
			coordinationStage: 'Q_DICT_THE_EHDORSEMENT',
			literas: 'QQ_ORG_STRUCT_LITERAS',
			allUsers: 'QQ_USERS',
			journalApplicantFilterStore: 'QQ_JOURNAL_APPLICANT_FILTER',
			journalExecutors: 'QQ_JOURNAL_EXECUTOR',
			Q_DICT_QUESTION_STATUSES: 'Q_DICT_QUESTION_STATUSES'
		}

		for (var key in kput)
			Ext.regStore(key, Ext.create('qqext.store.DictValuesStore', {
				storeId: key,
				dictCode: kput[key]
			}));
		Ext.regStore('searchResults', Ext.create('qqext.store.CustomStore', {
			storeId: 'searchResults',
			url: 'api/Search',
			model: 'qqext.model.qq.SearchResultItem'
		}));
		Ext.regStore('journal', Ext.create('qqext.store.CustomStore', {
			storeId: 'journal',
			url: 'api/Journal',
			pageSize: 10,
			remoteSort: true,
			model: 'qqext.model.qq.JournalItem',
			remoteFilter: true
		}));

		qqext.Constants.mainController = this;
	},
	clearSearchParams: function() {
		this.searchParams = null;
	},
	getSearchParams: function() {
		var me = this;
		if (!me.searchParams)
			me.searchParams = Ext.create('qqext.model.qq.SearchCritery');
		return me.searchParams;
	},
	dropMainCont: function() {
		var me = this;
		var vp = me.getVp();
		var delItems = me.getVp().items.getAt(2);
		vp.remove(delItems);
		delItems.destroy();
	},
	getMainCont: function() {
		return qqext.Constants.getCurrentForm();
	},
	/**
	 * Синхронизация данных на форме с моделью
	 * @return {Object} объект контоллера (нужен для цепочных операций)
	 */
	syncModel: function() {
		var
				me = this,
				model = me.currentModel,
				currentForm = me.getMainCont();

		switch (currentForm.$className) {
			case 'qqext.view.reg.VRegForm' :
				currentForm.updateRecord(model);
				break;
			case 'qqext.view.notify.VNotify' :
				currentForm.updateRecord(model.getNotification());
				break;
			case 'qqext.view.transmission.VTransmission' :
				currentForm.updateRecord(model.getTransmission());
				break;
			case 'qqext.view.exec.VExecForm' :
				currentForm.updateRecord(model);
				break;
			default :
				console.debug('switch class name: ' + currentForm.$className);
		}
		return me;
	},
	getModel: function() {
		return this.currentModel;
	}
});
