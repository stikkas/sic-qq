/**
 * Статистика исполнения запросов федеральными архивами и СИЦ
 */

Ext.define('qqext.view.report.StatisticSic1', {
	extend: 'qqext.view.StyledPanel',
	alias: 'widget.statisticsic1',
	requires: [
		'hawk_common.cmp.DateField',
		'Ext.form.FieldContainer',
		'qqext.factory.DateField',
		'Ext.Date'
	],
	maxHeight: 100,
	width: '100%',
	title: 'Статистика исполнения запросов федеральными архивами и СИЦ',
	initComponent: function () {
		var me = this,
				ns = qqext,
				create = Ext.create,
				format = Ext.Date.format;
		me.items = [{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				fieldLabel: 'Период',
				cls: 'label_style',
				labelSeparator: '',
				items: [
					me._start = create('FDateField', 'с', 'startDate', {
						width: 120, 
						cls: 'width120', 
						allowBlank: false,
						listeners: {
							change: function (field, value) {
								if (field.isValid() && me._end.isValid()) {
									var endDate = me._end.getValue();
									me._btn.setDisabled(endDate.valueOf() < value.valueOf());
								} else {
									me._btn.setDisabled(true);
								}
							}
						}
					}),
					me._end = create('FDateField', 'по', 'startDate', {
						width: 120, cls: 'width120', allowBlank: false,
						listeners: {
							change: function (field, value) {
								if (field.isValid() && me._start.isValid()) {
									var startDate = me._start.getValue();
									me._btn.setDisabled(startDate.valueOf() > value.valueOf());
								} else {
									me._btn.setDisabled(true);
								}
							}
						}
					})]
			}];
		me.buttons = [
			this._btn = create('Ext.button.Button', {
				disabled: true,
				text: ns.labels.generate,
				handler: function (btn) {
					window.open(ns.urls.statexec + '?startDate=' + format(me._start.getValue(), 'Y-m-d') +
							'&endDate=' + format(me._end.getValue(), 'Y-m-d'));
				}

			})
		];
		me.callParent();
	}
});

