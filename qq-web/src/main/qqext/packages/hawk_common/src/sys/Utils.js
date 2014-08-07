Ext.define('hawk_common.sys.Utils',
	{
		/**
		 * Реализация паттерна 'Одиночка'
		 * @type {boolean}
		 */
		singleton: true,
		/**
		 * Получает основные настройки
		 * @param {String} code - код
		 * @param {Function} callback - функция для вызова
		 * @returns {undefined}
		 */
		getCoreParameter: function(code, callback)
		{
			Ext.Ajax.request(
				{
					url: 'api/CoreParamsProvider',
					method: 'POST',
					params:
						{
							code: code
						},
					success: function(resp)
					{
						var value = Ext.decode(resp.responseText).msg;
						callback(value);
					}
				});
		}
	});