Ext.define('hawk_common.store.CardSwitch', {
    extend : 'Ext.data.Store',
    storeId : 'ClaimCardSwitch',
    fields : [ 'id', 'status' ],
    autoLoad : false,
    pageSize : 1,
    targetStoreId : null,
    loadPage : function(idx) {
	    var me = this;
	    if (idx > this.getTotalCount()) {
		    this.loadPage(this.getTotalCount());
		    return;
	    }

	    var store = Ext.getStore(me.targetStoreId);

	    var loadRec = function() {
		    var i = (idx - 1) % store.pageSize;

		    var newRec = {
		        id : store.getAt(i).getId(),
		        status : store.getAt(i).get('status')
		    };
		    me.removeAll();
		    me.add(newRec);

		    me.currentPage = idx;
		    me.fireEvent('load', me, me.getAt(0), true);
	    };

	    var desiredPage = Math.floor((idx - 1) / store.pageSize) + 1;
	    if (store.currentPage != desiredPage)
		    store.loadPage(desiredPage, {
			    callback : loadRec
		    });
	    else
		    loadRec();
    },
    getTotalCount : function() {
	    var me = this;
	    var store = Ext.getStore(me.targetStoreId);
	    return store.getTotalCount();
    }
});