Ext.define('qqext.Application', {
    name: 'qqext',
    extend: 'Ext.app.Application',
/*
    requires:[
        'hawk_common.controller.Main',
        'hawk_common.model.Model',
        'hawk_common.model.User',
        'hawk_common.cmp.FileList',
        'hawk_common.cmp.ReportFormatCombo',
        'hawk_common.cmp.Form',
        'hawk_common.cmp.PLoginForm',
        'hawk_common.cmp.SysChaptersBar',
        'hawk_common.cmp.CDateInterval',
        'hawk_common.cmp.ModeSwitch',
        'hawk_common.cmp.FileListItem',
        'hawk_common.cmp.YesNoCombo',
        'hawk_common.cmp.FileField',
        'hawk_common.cmp.ComboWithEmpty',
        'hawk_common.cmp.DateField',
        'hawk_common.cmp.FilesList',
        'hawk_common.sys.Consts',
        'hawk_common.sys.Utils',
        'hawk_common.store.CardSwitch',
        'hawk_common.store.UserLocalStorage',
        'hawk_common.fix.FixedField',
        'hawk_common.fix.FixedFormPanel',
        'hawk_common.fix.FixedDateField',
        'hawk_common.fix.FixedNumberField',
        'hawk_common.fix.FixedFieldContainer',
        'hawk_common.fix.FixedBaseField',
        'hawk_common.fix.FixedTextField',
        'hawk_common.fix.FixedFieldSet'
    ],
    */
    appFolder:'qqext',
    views: [
		'qqext.view.VTitleBar'
    ],
    controllers: [
        'qqext.controller.Main','qqext.controller.LeftMenu','qqext.controller.TitleMenu'
    ],
    stores: [
        // TODO: add stores here
    ]
});
