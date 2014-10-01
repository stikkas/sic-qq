/**
 * панель для отображения статуса запроса
 */

Ext.define('qqext.view.StatusPanel', {
	extend: 'Ext.container.Container',
	alias: 'StatusPanel',
	requires: ['qqext.factory.ImageLabel'],
	layout: 'vbox',
        cls:'reg_panel',
	initComponent: function() {
		var createCmp = Ext.create,
				ns = qqext,
				url = 'images/status/',
				statuses = ns.stats,
				stats = createCmp('Ext.util.MixedCollection'),
				me = this;

		Ext.getStore('Q_DICT_QUESTION_STATUSES').load({callback: function(records) {
				records.forEach(function(record) {
					var id = record.get('id'),
							name = record.get('name');

					switch (record.get('code')) {
						case statuses.onreg:
							stats.insert(0, id, createCmp('ImageLabel',
									url + 'onreg.png', name));
							break;
						case statuses.reg:
							stats.insert(2, id, createCmp('ImageLabel',
									url + 'reg.png', name));
							break;
						case statuses.onexec:
							stats.insert(4, id, createCmp('ImageLabel',
									url + 'onexec.png', name));
							break;
						case statuses.exec:
							stats.insert(6, id, createCmp('ImageLabel',
									url + 'exec.png', name));
							break;
						case statuses.trans:
							stats.insert(8, id, createCmp('ImageLabel',
									url + 'trans.png', name));
							break;
						case statuses.notify:
							stats.insert(10, id, createCmp('ImageLabel',
									url + 'notify.png', name));
					}
				});
				stats.insert(1, "ar1", createCmp('ImageLabel', url + 'arrow.png', ''));
				stats.insert(3, "ar2", createCmp('ImageLabel', url + 'arrow.png', ''));
				stats.insert(5, "ar3", createCmp('ImageLabel', url + 'arrow.png', ''));
				stats.insert(7, "ar4", createCmp('ImageLabel', url + 'arrow.png', ''));
				stats.insert(9, "ar5", createCmp('ImageLabel', url + 'arrow.png', ''));

				stats.each(function(it) {
					me.add(it);
				});
				me.setVisible(false);
			}});

		me.callParent();
		/**
		 *  Отображает статус запроса
		 *  @param {String} label
		 */
		me.setStatus = function(label) {
			this.setVisible(false);
			if (label === undefined) {
				var index = stats.indexOfKey(qqext.request.get('status')),
						items = [];
				if (index < 7) {
					for (var i = 0; i <= index; ++i)
						items.push(i);
				} else {
					items.push(0);
					items.push(1);
					items.push(2);
					for (var i = 7; i <= index; ++i)
						items.push(i);
				}
				this.setVisible(true, items);
			}
		};
	},
	/**
	 * Устанавливает видимыми нужные элементы статуса
	 * @param {Boolean} stat true - показать, false - скрыть
	 * @param {Number[]} items порядковые номера элементов над которые будет производится операция
	 */
	setVisible: function(stat, items) {
		var its = this.items;
		if (items) {
			for (var i = 0; i < items.length; ++i)
				its.getAt(items[i]).setVisible(stat);
		} else {
			its.each(function(it) {
				it.setVisible(stat);
			});
		}
	}
});

