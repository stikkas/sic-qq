/**
 *  Компонент Date, позволяющий вводить дату и может находится как
 *  в режиме редактирования, так и в режиме просмотра.
 *
 */
Ext.define('qqext.cmp.Date', {
	alias: 'DateField',
	extend: 'Ext.form.field.Date',
	mixins: ['qqext.cmp.EditViewMode'],
	xtype: 'datefieldcmp',
	format: 'd.m.Y',
	enableKeyEvents: true,
	_getValue: function () {
		return Ext.Date.format(this.getValue(), 'd.m.Y');
	}/*,
	 listeners: {
	 keyPress: function kp(fd, evt) {
	 if (!kp.codes) {
	 kp.codes = '0,1,2,3,5,6,7,8,9,.'.split(',').map(function (cr) {
	 return cr.charCodeAt(0)
	 });
	 }
	 if (evt.getKey() === evt.BACKSPACE) {
	 if (kp.count)
	 --kp.count;
	 return;
	 }
	 if (evt.getKey() === evt.ENTER())
	 return;

	 var number = kp.codes.indexOf(evt.getCharCode());
	 if (!~number) {
	 evt.stopEvent();
	 return;
	 }
	 if (kp.count === undefined)
	 kp.count = 0;
	 switch (kp.count) {
	 case 0:
	 if (number > 3) {
	 evt.stopEvent();
	 return;
	 }
	 kp.last = number;
	 break;
	 case 1:
	 if ((kp.last === 0 && (number < 1 || number > 9)) ||
	 ((kp.last === 1 || kp.last === 2) && number > 9) ||
	 (kp.last === 3 && (number !== 0 || number !== 1))) {
	 evt.stopEvent();
	 return;
	 }
	 break;
	 case 2:
	 case 5:
	 if (number !== 9) {
	 evt.stopEvent();
	 return;
	 }
	 break;
	 case 9:
	 evt.stopEvent();
	 return;
	 }
	 ++kp.count;
	 }
	 }
	 */
});
