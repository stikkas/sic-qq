/**
 * панель для отображения статуса запроса
 */

Ext.define('qqext.view.StatusPanel', {
	extend: 'Ext.container.Container',
	alias: 'StatusPanel',
	requires: ['Ext.form.Label'],
	layout: 'vbox',
	initComponent: function() {
		this.items = [this._label = Ext.create('Ext.form.Label')];
		this.callParent();
	},
	/**
	 *  Устанавливает надпись
	 *  @param {String} label
	 */
	setStatus: function(label) {
		if (label === undefined)
			this._label.setText(Ext.getStore('Q_DICT_QUESTION_STATUSES').
					getById(qqext.request.get('status')).get('name'));
		else
			this._label.setText(label);
	}
});

