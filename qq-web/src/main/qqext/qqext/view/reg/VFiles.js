/**
 * Панелька "Документы заявителя" формы "Регистрация запроса"
 */

Ext.define('qqext.view.reg.VFiles', {
	extend: 'qqext.view.StyledPanel',
	requires: [
		'hawk_common.cmp.FileList'
	],
	title: 'Документы заявителя',
	height: 130,
	collapsible: true,
	titleCollapse: true,
	animCollapse: true,
	hideCollapseTool: true,
	disabledCls: '',
	header: {
		icon: 'webapp/resources/images/fieldset/collapse-tool.png'
	},
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [Ext.create('hawk_common.cmp.FileList')]
		});
		me.callParent(arguments);
	}
});
