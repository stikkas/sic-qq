Ext.define('qqext.controller.Main', {
			extend : 'qqext.controller.ParentController',
			views : ['qqext.view.VTitleBar'],
			requires:['qqext.model.qq.JournalItem','qqext.model.qq.SearchResultItem'],
			currentModel:null,
			searchParams:null,
			init : function() {
				console.log('initialization of application');
				console.log('start store\'s initialization..');
				var kput = new Object();
				kput['resultOfAnswer'] = 'Q_DICT_RESULT_ANSER';
				kput['applicantCategory'] = 'Q_DICT_APP_CATEGORY';
				kput['applicantType'] = 'Q_DICT_APPLICANT_TYPE';
				kput['inboxDocDeliveryType'] = 'QQ_TRANSMISSION_MODE';
				kput['inboxDocExecOrg'] = 'ORG_STRUCTURE';
				kput['answerForm'] = 'Q_DICT_ANSWER_FORM';
				kput['docType'] = 'Q_DICT_DOC_TYPES';
				kput['queryType'] = 'Q_DICT_QUEST_TYPE';
				kput['storageTerritory'] = 'Q_DICT_STORAGE';
				kput['tematicOfAnswer'] = 'Q_DICT_THEMATIC_ANSW';
				kput['diffCategory'] = 'Q_DICT_DIFF_CATEGORY';
				kput['coordinationStage'] = 'Q_DICT_THE_EHDORSEMENT';
				kput['literas'] = 'QQ_ORG_STRUCT_LITERAS';
				kput['allUsers'] = 'QQ_USERS';
				kput['journalApplicantFilterStore'] = "QQ_JOURNAL_APPLICANT_FILTER";
				kput['journalExecutors'] = 'QQ_JOURNAL_EXECUTOR';
				kput['Q_DICT_QUESTION_STATUSES'] = 'Q_DICT_QUESTION_STATUSES';
//				kput['statuses'] = 
				for (var key in kput) {
					console.log('Initialization of store with storeId: ' + key);
					var t = Ext.create('qqext.store.DictValuesStore', {
								storeId : key,
								dictCode : kput[key]
							});
					Ext.regStore(key, t);
				}
				var searchStoreParam = {
					storeId:'searchResults',
					url:'api/Search',
					model:'qqext.model.qq.SearchResultItem'
				}
				var journalStoreParm = {
					storeId:'journal',
					url:'api/Journal',
					pageSize:10,
					remoteSort:true,
					model:'qqext.model.qq.JournalItem',
					remoteFilter:true
				}
				Ext.regStore('searchResults',Ext.create('qqext.store.CustomStore',searchStoreParam));
				Ext.regStore('journal',Ext.create('qqext.store.CustomStore',journalStoreParm));
				
				
				
			}
		});
