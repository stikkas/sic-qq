Ext.define('qqext.Application', {
    name: 'qqext',
    extend: 'Ext.app.Application',
    requires:['hawk_common.fix.FixedBaseField','hawk_common.fix.FixedFieldContainer'
    ,'hawk_common.fix.FixedTextField','hawk_common.fix.FixedDateField','hawk_common.fix.FixedField',
    'hawk_common.fix.FixedFieldSet','hawk_common.fix.FixedFormPanel','qqext.fix.FixedJsonWriter'],
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
