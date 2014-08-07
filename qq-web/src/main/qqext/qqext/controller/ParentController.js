/**
 * 
 */

Ext.define('qqext.controller.ParentController', {
	extend : 'Ext.app.Controller',
	refs : [{
				ref : 'vp',
				selector : 'viewport'
			}],

	clearSearchParams : function() {
		this.getApplication().getController('qqext.controller.Main').searchParams = null;
	},
	getSearchParams : function() {
		var model = this.getApplication()
				.getController('qqext.controller.Main').searchParams;
		if (!model) {
			this.getApplication().getController('qqext.controller.Main').searchParams = Ext
					.create('qqext.model.qq.SearchCritery');
			model = this.getApplication()
					.getController('qqext.controller.Main').searchParams;
			console.log(model.getData());
		}
		return model;
	},

	clearVp : function() {
		var me = this;
		for (var i = me.getVp().items.length - 1; i >= 0; i--) {
			var t = me.getVp().items.getAt(i);
			me.getVp().remove(t);
			t.destroy();
		}
	},
	dropMainCont : function() {
		var me = this;
		var vp = me.getVp();
		var delItems = me.getVp().items.getAt(2);
		vp.remove(delItems);
		delItems.destroy();
	},
	getMainCont : function() {
		var me = this;

		var vp = me.getVp();

		var targetItem = me.getVp().items.getAt(2);

		return targetItem;
	},
	/**
	 * Синхронизация данных на форме с моделью
	 */
	syncModel : function() {
		var me = this;
		var model = this.getApplication()
				.getController('qqext.controller.Main').currentModel;
		var currentForm = me.getMainCont();
		console.log('currentForm class name: ' + currentForm.$className);
		var className = currentForm.$className;
		switch (className) {
			case 'qqext.view.reg.VRegForm' : {
				currentForm.updateRecord(model);
				break;
			}
			case 'qqext.view.notify.VNotify' : {
				currentForm.updateRecord(model.getNotification());
				break;
			}
			case 'qqext.view.transmission.VTransmission' : {
				currentForm.updateRecord(model.getTransmission());
				break;
			}
			case 'qqext.view.exec.VExecForm' : {
				currentForm.updateRecord(model);
				break;
			}
			default : {
				console.debug('switch class name: ' + className);
			}
		}
	},
	getModel : function() {
		var model = this.getApplication()
				.getController('qqext.controller.Main').currentModel;
		return model;
	},
	initNewModel : function() {
		var me = this;
		var model = Ext.create('qqext.model.qq.Question');
		var notification = Ext.create('qqext.model.qq.Notification');
		model.setNotification(notification);

		var applicant = Ext.create('qqext.model.qq.Applicant');
		model.setApplicant(applicant);

		var transmission = Ext.create('qqext.model.qq.Transmission');
		model.setTransmission(transmission);

		var execInfo = Ext.create('qqext.model.qq.ExecutionInfo');
		model.setExecutionInfo(execInfo);

		var wayToSend = Ext.create('qqext.model.qq.WayToSend');
		model.setWayToSend(wayToSend);

		this.getApplication().getController('qqext.controller.Main').currentModel = model;
		me.getMainCont().loadRecord(model);
	}

});