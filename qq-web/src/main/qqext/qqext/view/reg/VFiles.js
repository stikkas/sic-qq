/**
 * Панелька "Документы заявителя" формы "Регистрация запроса"
 */

Ext.define('qqext.view.reg.VFiles', {
	extend : 'Ext.form.Panel',
	title : 'Документы заявителя',
	height : 130,
	collapsible : true,
	titleCollapse : true,
	animCollapse : true,
	hideCollapseTool : true,
	disabledCls:'',
	header : {
		icon : 'build/production/qqext/resources/images/fieldset/collapse-tool.png'
	},
	initComponent:function(){
		var me = this;
		var fileList = Ext.create('hawk_common.cmp.FileList');
		Ext.apply(me,{
			items:[fileList]
		});
		me.callParent(arguments);
	}
});