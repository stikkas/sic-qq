/**
 * Основной контроллер нашего приложения.
 */
Ext.define('qqext.controller.Main', {
	extend: 'Ext.app.Controller',
	views: ['qqext.view.VTitleBar'],
	requires: [
		'qqext.model.JournalItem',
		'qqext.model.SearchResultItem',
		'qqext.store.DictValuesStore',
		'qqext.store.CustomStore',
		'hawk_common.store.UserLocalStorage'
	],
	/**
	 * Активная модель, иницилизируется в {@link qqext.Menu} после создания.
	 * Функция вызывается при нажатии на кнопку 'Добавить' в верхнем меню.
	 */
	currentModel: null,
	searchParams: null,
	init: function () {
		var createCmp = Ext.create,
				kput = {
					resultOfAnswer: 'Q_DICT_RESULT_ANSER',
					applicantCategory: 'Q_DICT_APP_CATEGORY',
					applicantType: 'Q_DICT_APPLICANT_TYPE',
					inboxDocDeliveryType: 'QQ_TRANSMISSION_MODE',
					answerForm: 'Q_DICT_ANSWER_FORM',
					docType: 'Q_DICT_DOC_TYPES',
					queryType: 'Q_DICT_QUEST_TYPE',
					storageTerritory: 'Q_DICT_STORAGE',
					tematicOfAnswer: 'Q_DICT_THEMATIC_ANSW',
					diffCategory: 'Q_DICT_DIFF_CATEGORY',
					coordinationStage: 'Q_DICT_THE_EHDORSEMENT',
//					literas: 'QQ_ORG_STRUCT_LITERAS',
//					allUsers: 'QQ_USERS',
					journalApplicantFilterStore: 'QQ_JOURNAL_APPLICANT_FILTER',
					journalExecutors: 'QQ_JOURNAL_EXECUTOR'
//					Q_DICT_QUESTION_STATUSES: 'Q_DICT_QUESTION_STATUSES'
				};

		for (var key in kput)
			createCmp('DictValuesStore', key, kput[key]);

		createCmp('qqext.store.CustomStore', {
			storeId: 'searchResults',
			url: '/qq-web/api/Search',
			pageSize: 12,
			model: 'qqext.model.SearchResultItem',
			remoteSort: true
		});
		createCmp('qqext.store.CustomStore', {
			storeId: 'journal',
			url: '/qq-web/api/Journal',
			pageSize: 25,
			remoteSort: true,
			model: 'qqext.model.JournalItem',
			remoteFilter: true
		});
	}
});
