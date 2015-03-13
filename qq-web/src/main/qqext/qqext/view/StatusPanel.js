/**
 * панель для отображения статуса запроса
 */

Ext.define('qqext.view.StatusPanel', {
	extend: 'Ext.container.Container',
	alias: 'StatusPanel',
	requires: ['qqext.factory.ImageLabel'],
	layout: 'vbox',
	cls: 'reg_panel',
	initComponent: function () {
		var createCmp = Ext.create,
				ns = qqext,
				url = 'images/status/',
				statuses = ns.stats,
				stats = createCmp('Ext.util.MixedCollection'),
				me = this;

		me.callParent();

		me.fill = function () {
			Ext.getStore(ns.stIds.stats).each(function (record) {
				var id = record.get('id'),
						name = record.get('text');
				switch (record.get('shortValue')) {
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
						/*
						 break;
						 case statuses.trans:
						 stats.insert(8, id, createCmp('ImageLabel',
						 url + 'trans.png', name));
						 break;
						 case statuses.notify:
						 stats.insert(10, id, createCmp('ImageLabel',
						 url + 'notify.png', name));
						 */
				}
			});
			var arurl = url + 'arrow.png';
			stats.insert(1, "ar1", createCmp('ImageLabel', arurl, ''));
			stats.insert(3, "ar2", createCmp('ImageLabel', arurl, ''));
			stats.insert(5, "ar3", createCmp('ImageLabel', arurl, ''));
//			stats.insert(7, "ar4", createCmp('ImageLabel', arurl, ''));
//			stats.insert(9, "ar5", createCmp('ImageLabel', arurl, ''));

			stats.each(function (it) {
				me.add(it);
			});
			me.setVisible(false);
		};

		/**
		 *  Отображает статус запроса
		 *  @param {String} label
		 */
		me.setStatus = function (label) {
			me.setVisible(false);
			if (label === undefined) {
				var index = stats.indexOfKey(qqext.request.get('status')),
						items = [];
//				if (index < 7) {
				for (var i = 0; i <= index; ++i)
					items.push(i);
//				} else {
//					items.push(0);
//					items.push(1);
//					items.push(2);
//					for (var i = 7; i <= index; ++i)
//						items.push(i);
//				}
				this.setVisible(true, items);
			}
		};
	},
	/**
	 * Устанавливает видимыми нужные элементы статуса
	 * @param {Boolean} stat true - показать, false - скрыть
	 * @param {Number[]} items порядковые номера элементов над которые будет производится операция
	 */
	setVisible: function (stat, items) {
		var its = this.items;
		if (items) {
			for (var i = 0; i < items.length; ++i)
				its.getAt(items[i]).setVisible(stat);
		} else {
			its.each(function (it) {
				it.setVisible(stat);
			});
		}
	}
});

