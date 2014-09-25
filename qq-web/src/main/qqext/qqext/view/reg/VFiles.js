/**
 * Панелька "Документы заявителя" формы "Регистрация запроса"
 */

Ext.define('qqext.view.reg.VFiles', {
	alias: 'VFiles',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'hawk_common.cmp.FilesList'
	],
	title: 'Документы заявителя',
//	height: 130,
	collapsible: true,
	collapsed: true,
	titleCollapse: true,
	animCollapse: true,
	hideCollapseTool: true,
	disabledCls: '',
	cls: 'collapse_section',
	header: {
		icon: 'images/transp.png'
	},
	initComponent: function() {
		Ext.apply(this, {
			items: [Ext.create('hawk_common.cmp.FilesList', {
					editMode: true})]
		});
		this.callParent();
	},
	setViewOnly: function(status) {
		this.items.getAt(0).attachButton.setDisabled(status);
	}
});
