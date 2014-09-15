/**
 * Панель "Согласование документа"
 */
Ext.define('qqext.view.exec.VCoordination', {
	alias: 'VCoordination',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.HandlerButton',
		'qqext.view.exec.cmp.ComboDateTrash',
		'qqext.model.qq.Coordination'
	],
	title: 'Согласование документа',
	header: {
		icon: 'webapp/resources/images/fieldset/collapse-tool.png'
	},
	minHeight: 60,
	collapsible: true,
	titleCollapse: true,
	animCollapse: true,
	hideCollapseTool: true,
	comboTrashConfig: {
		store: 'coordinationStage',
		comboLabel: qqext.coordination.stage[1],
		dateLabel: qqext.coordination.date[1]
	},
	mOdel: null,
	initComponent: function() {
		var me = this,
				createCmp = Ext.create;
		Ext.applyIf(me, {
			items: [
				createCmp('FHandlerButton', 'add', function() {
					me.add(createCmp('ComboDateTrash',
							me.comboTrashConfig));
					me.mOdel.coordinations().add(createCmp('CoordinationModel'));
				})
			]
		});
		me.callParent();
	},
	updateRecord: function(model) {
		var me = this;
		for (var i = 0; i < model.coordinations().getCount(); i++) {
			var comp = me.items.getAt(i + 1);
			model.coordinations().getAt(i).set(qqext.coordination.stage[0], comp.getComboValue());
			model.coordinations().getAt(i)
					.set(qqext.coordination.date[0], comp.getDateValue());
		}
	},
	loadRecord: function(model) {
		var me = this;
		this.mOdel = model;
		for (var i = 0; i < model.coordinations().getCount(); i++) {
			var t = Ext.create('qqext.view.exec.cmp.ComboDateTrash',
					me.comboTrashConfig);
			me.add(t);
			t.setComboValue(model.coordinations().getAt(i).get(qqext.coordination.stage[0]));
			t.setDateValue(model.coordinations().getAt(i).get(qqext.coordination.date[0]));
		}
	},
	remove: function() {
		var me = this;
		var index = me.items.indexOf(arguments[0]);
		var delCoordination = me.mOdel.coordinations().getAt(index - 1);
		me.mOdel.coordinations().remove(delCoordination);
		me.callParent(arguments);
	}
});
