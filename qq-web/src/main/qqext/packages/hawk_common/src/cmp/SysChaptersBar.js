Ext.define('hawk_common.cmp.SysChaptersBar', {
    extend : 'Ext.container.Container',
    config : {
        selectedCls : 'active',
        selectedItemId : null
    },
    xtype : 'chaptersbar',
    initComponent : function() {
	    var me = this;
	    me.callParent(arguments);

	    var selectChapter = function(item) {
		    if (item == me.selectedItem)
			    return;

		    if (me.selectedItem)
			    me.selectedItem.removeCls(me.selectedCls);
		    me.selectedItem = item;
		    me.selectedItemId = item.id;
		    item.addCls(me.selectedCls);
		    item.fireEvent('chapterselect', item);
	    };

	    me.items.each(function(item) {
		    item.on('click', selectChapter);
	    });
	    me.on('render', function() {
		    me.items.each(function(item) {
			    if (item.id == me.selectedItemId)
				    selectChapter(item);
		    });
	    });
    }
});