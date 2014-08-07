/**
 * 
 */
Ext.define('hawk_common.cmp.DateField', {
    extend : 'Ext.form.field.Date',
    format : 'd.m.Y',
    altFormats : '',
    xtype:'hawkDateField',
    validateOnChange : false,
    allowBlank : true,
    maxLength : 10,
    cls : 'width50',
    enforceMaxLength : true,
    maskRe : /[0-9\.]/,
    startDay: 1,
    minText: 'Минимальное значение даты - {0}',
    maxText: 'Максимальное значение даты - {0}',
    invalidText: "{0} не является правильной датой - дата должна быть указана в формате дд.мм.гггг",
    listeners : {
        change : function(comp, nVal, oVal, opts) {
	        if (oVal && nVal) {
		        if (oVal.length && nVal.length) {
			        if (nVal.length <= oVal.length) {
				        // При удалении символов код установке точек не нужен.
				        return;
			        } else {
				        var diff = nVal.substr(oVal.length, nVal.length - oVal.length);
			        }
		        }
	        }
	        if (nVal) {
		        if (nVal.length == 5) {
			        var rawNewValue = '';
			        if (nVal.substr(2, 1) != '.') {
				        rawNewValue = nVal.substr(0, 2) + '.' + nVal.substr(2, nVal.length - 2);
			        } else {
				        rawNewValue = nVal;
			        }
			        if (rawNewValue.substr(4, 1) != '.') {
				        rawNewValue = rawNewValue.substr(0, 5) + '.' + rawNewValue.substr(5, rawNewValue.length - 5);
			        }
			        if (rawNewValue instanceof Date) {
				        comp.setValue(rawNewValue);
			        } else {
				        comp.setRawValue(rawNewValue);
			        }
		        }
	        }
        }
    }
});