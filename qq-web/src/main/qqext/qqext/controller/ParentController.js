/**
 * Прародитель контроллеров. Зачем он нужен не понятно. Лишняя ступень в нашем
 * шатле.
 */

Ext.define('qqext.controller.ParentController', {
	extend: 'Ext.app.Controller',
	requires: [
		'qqext.model.qq.SearchCritery',
		'qqext.Constants'
	],
	refs: [{
			ref: 'vp',
			selector: 'viewport'
		}],
	clearSearchParams: function() {
		qqext.Constants.mainController.searchParams = null;
	},
	getSearchParams: function() {
		var controller = qqext.Constants.mainController,
				model = controller.searchParams;

		if (!model)
			model = controller.searchParams = Ext.create('qqext.model.qq.SearchCritery');

		return model;
	},
	clearVp: function() {
		var me = this;
		for (var i = me.getVp().items.length - 1; i >= 0; i--) {
			var t = me.getVp().items.getAt(i);
			me.getVp().remove(t);
			t.destroy();
		}
	},
	dropMainCont: function() {
		var me = this;
		var vp = me.getVp();
		var delItems = me.getVp().items.getAt(2);
		vp.remove(delItems);
		delItems.destroy();
	},
	getMainCont: function() {
		var me = this,
				targetItem = me.getVp().items.getAt(2);

		return targetItem;
	},
	/**
	 * Синхронизация данных на форме с моделью
	 */
	syncModel: function() {
		var me = this,
				model = qqext.Constants.mainController.currentModel,
				currentForm = me.getMainCont();

		switch (currentForm.$className) {
			case 'qqext.view.reg.VRegForm' :
				{
					currentForm.updateRecord(model);
					break;
				}
			case 'qqext.view.notify.VNotify' :
				{
					currentForm.updateRecord(model.getNotification());
					break;
				}
			case 'qqext.view.transmission.VTransmission' :
				{
					currentForm.updateRecord(model.getTransmission());
					break;
				}
			case 'qqext.view.exec.VExecForm' :
				{
					currentForm.updateRecord(model);
					break;
				}
			default :
				{
					console.debug('switch class name: ' + currentForm.$className);
				}
		}
	},
	getModel: function() {
		return qqext.Constants.mainController.currentModel;
	},
	initNewModel: function() {
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