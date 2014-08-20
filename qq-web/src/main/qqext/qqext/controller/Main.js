Ext.define('qqext.controller.Main', {
	extend: 'qqext.controller.ParentController',
	views: ['qqext.view.VTitleBar'],
	requires: [
		'qqext.model.qq.JournalItem',
		'qqext.model.qq.SearchResultItem',
		'qqext.Constants'
	],
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
	}
});
