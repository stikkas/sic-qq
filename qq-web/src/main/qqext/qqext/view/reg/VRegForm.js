/**
 * Форма "Регистрация запроса" карточки запроса
 */

Ext.define('qqext.view.reg.VRegForm', {
			extend : 'Ext.container.Container',
			disabledCls:'',
			maskOnDisable:false,
			disabled:null,
			initComponent : function() {
				var me = this;
				var b = Ext.create('qqext.view.reg.VInboxDoc', {
							region : 'center',
							margin : '0 10 0 0'
						});
				var t = Ext.create('qqext.view.reg.VApplicant', {
							region : 'center',
							margin : '0 10 0 0'
						});
				var k = Ext.create('qqext.view.reg.VQuery', {
							margin : '0 10 0 0'
						});
				var p = Ext.create('qqext.view.reg.VQueryObject', {
							margin : '0 10 0 0'
						});
				var f = Ext.create('qqext.view.reg.VFiles');

				Ext.applyIf(me, {
							items : [b, t,  k, p, f],
							region : 'center',
							overflowY : 'auto'
						})
				me.callParent(arguments);
			},
			setDisabled:function(){
				var me = this;
				me.disabled = arguments[0];
				for (var i = 0 ; i < this.items.length;i++){
					me.items.getAt(i).setDisabled(me.disabled);
				}
			},
			isDisabled:function(){
				return this.disabled;
			},
			loadRecord:function(model){
				var me = this;
				me.items.getAt(0).loadRecord(model); //load model into qqext.view.reg.VInboxDoc
				var applicant;
				
				applicant = model.getApplicant();

				me.items.getAt(1).loadRecord(applicant);
				
				me.items.getAt(2).loadRecord(model);
				me.items.getAt(3).loadRecord(model);
				me.items.getAt(4).loadRecord(model);
			},
			updateRecord:function(model){
				var me = this;
				for (var i = 0 ; i < me.items.length;i++){
					if (me.items.get(i).$className!='qqext.view.reg.VApplicant'){
						me.items.getAt(i).updateRecord(model);
					}else{
						if (model.getApplicant && model.getApplicant()){
							console.log('обновление модели Applicant');
							me.items.getAt(i).updateRecord(model.getApplicant());
						}
					}
				}
			}
		});