/**
 * 
 */
Ext.define('hawk_common.cmp.FileListItem', {
	extend : 'Ext.Component',
	item : null,
	disableCtrl:false,
	initComponent : function() {
		var me = this;
		var template = '<table><tr><td><a class="black_font mar_l_20" href="' + me.item.get('link') + '" target="_blank">'
				+ me.item.get('name') + '</a></td><td id="' + me.getId() + 'btn'
				+ '"></td></tr></table>';
		me.renderTpl = template;
		me.callParent(arguments);
	},
	listeners : {
		afterrender : function(th, eop) {
			th['delBtn'] = Ext.create('Ext.Button', {
				cls : 'del_small',
				tooltip:'Удалить файл',
				disabled:th.disableCtrl,
				renderTo : th.getId() + 'btn',
				handler : function() {
					th.item.destroy({
						callback:function(rec,act){
							if (act.success){
								th.ownerCt.remove(th);
							}else{
								Ext.Msg.show({
									title: 'Ошибка',
									msg: act.error.status+': '+act.error.statusText,
									buttons: Ext.Msg.OK,
									icon: Ext.Msg.ERROR
								});
							}
						}
					});
					
				}
			});
		}
	}
});