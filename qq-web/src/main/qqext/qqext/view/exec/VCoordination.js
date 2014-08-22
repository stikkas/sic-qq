/**
 *
 */
Ext.define('qqext.view.exec.VCoordination', {
	extend: 'qqext.view.StyledPanel',
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
		comboLabel: 'Этап согласования документа',
		dateLabel: 'Дата'
	},
	mOdel: null,
	initComponent: function() {
		var me = this;
		var addBtn = Ext.create('Ext.Button', {
			text: 'add',
			handler: function() {
				var t = Ext.create(
						'qqext.view.exec.cmp.ComboDateTrash',
						me.comboTrashConfig);
				me.add(t);
				var coordinationModel = Ext
						.create('qqext.model.qq.Coordination');
				me.mOdel.coordinations().add(coordinationModel);
			}
		});
		Ext.applyIf(me, {
			items: [addBtn]
		});
		me.callParent(arguments);
	},
	updateRecord: function(model) {
		var me = this;
		for (var i = 0; i < model.coordinations().getCount(); i++) {
			var comp = me.items.getAt(i + 1);
			model.coordinations().getAt(i).set('stage', comp.getComboValue());
			model.coordinations().getAt(i)
					.set('stageDate', comp.getDateValue());
		}
	},
	loadRecord: function(model) {
		var me = this;
		this.mOdel = model;
		for (var i = 0; i < model.coordinations().getCount(); i++) {
			var t = Ext.create('qqext.view.exec.cmp.ComboDateTrash',
					me.comboTrashConfig);
			me.add(t);
			t.setComboValue(model.coordinations().getAt(i).get('stage'));
			t.setDateValue(model.coordinations().getAt(i).get('stageDate'));
		}
	},
	remove: function() {
		var me = this;
		var index = me.items.indexOf(arguments[0]);
		var delCoordination = me.mOdel.coordinations().getAt(index - 1);
		me.mOdel.coordinations().remove(delCoordination);
		me.callParent(arguments);
	}
})