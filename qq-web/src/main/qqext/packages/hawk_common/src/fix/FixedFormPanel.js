/**
 * 
 */
Ext.define('hawk_common.fix.FixedFormPanel', {
			override : 'Ext.form.Panel',
			disabled : false,
			setDisabled : function() {
				var me = this;
				me.disabled = arguments[0];
				for (var i = 0; i < me.items.length; i++) {
					me.items.getAt(i).setDisabled(arguments[0]);
				}
			},
			isDisabled : function() {
				return this.disabled;
			}
		})