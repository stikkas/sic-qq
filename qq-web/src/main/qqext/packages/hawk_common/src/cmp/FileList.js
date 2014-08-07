/**
 * 
 */
Ext.define('hawk_common.cmp.FileList', {
			extend : 'Ext.container.Container',
			readOnly : true,
			submitForm : null,
			name:'fileList',
			addFileField : null,
			addFileField : null,
			autoShow:true,
			user:null,
			modelId:null,
			changeListener : function(th, value, eop) {
				if (!value) {
					return;
				}
				var docId = th.ownerCt.ownerCt.ownerCt.modelId;
				th.ownerCt.getComponent('docIdHidden').setValue(docId);
				th.ownerCt.submit({
							success : function(form, action) {
								if (action.result.loadedFiles == 1) {
									Ext.Msg.show({
												title : 'Информация',
												msg : 'Успешно загружено',
												buttons : Ext.Msg.OK,
												icon : Ext.Msg.INFO
											});
									var wnd = th.ownerCt.ownerCt.ownerCt;
									wnd.loadFileList(wnd.modelId,wnd.readOnly,wnd.fileType,wnd.storeId);
								}
							},
							failure : function(form, action) {
								Ext.Msg.show({
											title : 'Ошибка',
											msg : action.result,
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.ERROR
										});
							}
						});
			},

			loadFileList : function(id,readOnly,fileType,storeId) {
				var me = this;
				me.readOnly = readOnly;
				me.fileType = fileType;
				me.storeId = storeId;
				// нужно удалить имеющиеся на форме ссылки, если они есть
				var linksCount = me.items.length;
				if (me.items.length > 2) {
					for (var i = linksCount - 1; i >= 2; i--) {
						me.remove(me.getComponent(i));
					}
				}

				
				me.addFileField.setDisabled(readOnly);

				me.modelId = id;
				var store = Ext.getStore(storeId);
				store.load({
							params : {
								fileType : fileType,
								documentId : me.modelId
							},
							callback : function(recs, op, succ) {
								if (succ) {
									for (var i = 0; i < recs.length; i++) {
										var addLink = Ext.create(
												'hawk_common.cmp.FileListItem',
												{
													item : recs[i],
													disableCtrl : me.readOnly
												});
										me.add(addLink);
									}
								}
							}
						});
			},

			initComponent : function() {
				var me = this;
				var addFileField = Ext.create('Ext.form.field.File', {
							hideLabel : true,
							buttonOnly : true,
							buttonText : 'Добавить',
							cls : 'add_pict',
							listeners : {
								'change' : me.changeListener,
								'afterrender' : function(th, eop) {
									th.fileInputEl.set({
												multiple : 'multiple'
											});
								}
							}
						});
				me.addFileField = addFileField;
				var submitForm = Ext.create('Ext.form.Panel', {
							url : 'api/files/Upload',
							baseCls : '',
							items : [addFileField, {
										xtype : 'hidden',
										name : 'fileType',
										value : 'TEXT'
									}, {
										xtype : 'hidden',
										itemId : 'docIdHidden',
										name : 'documentId',
										value : null
									}]
						});
				me.submitForm = submitForm;
				me.addFileField = addFileField;
				var addBtnBar = Ext.create('Ext.toolbar.Toolbar', {
							items : [submitForm],
							cls : 'pict_menu'
						});

				var sep2 = Ext.create('Ext.menu.Separator', {
							width : '100%'
						});
				Ext.applyIf(me, {
							items : [addBtnBar, sep2]
						});
				me.callParent(arguments);
			}
		});