StartTest(function(h){
	var q = Ext.create('qqext.model.qq.Question');
	q.set('inboxNum',1);
	q.set('status',1);
	q.set('regDate',new Date());
	q.set('litera',1);
	q.set('transferType',2);
	q.set('execOrg',2);
	q.set('registrator',2);
	q.set('questionType',0);
	q.set('plannedFinishDate',new Date());
	q.set('content','test test test');
	q.set('answerFormType',45);
	q.set('motivatedRefusal',false);
	q.set('requestObjectName','reqObjName');
	q.set('requestFatherName','on4estvo');
	q.set('request_object_birthyear',1984);
	q.set('createOrg','insoft');
	
	
	var t = Ext.create('qqext.model.qq.Transmission');
	t.set('responsibleForExecutionDate',new Date());
	t.set('executorDate',new Date());
	t.set('control',true);
	t.set('controlDateOfExecution',new Date());
	t.set('resulutionAuthor','test author');
	t.set('storageTerritory',0);
	t.set('storageName','name storage 1');

	q.setTransmission(t);
	
	
	
	
	var ap = Ext.create('qqext.model.qq.Applicant');
	ap.set('applicantType',7);
	ap.set('applicantObject',8);
	ap.set('name','name of applicant');
	ap.set('surname','surname of applicant');
	ap.set('fatherName','surname\'s father name');
	ap.set('birthYear',1988);
	ap.set('applicantCategory',4);
	ap.set('country','ru');
	ap.set('address','Moscow');
	ap.set('phone','28341');
	ap.set('inboxDocNum','test inbox doc num');
	ap.set('inboxDocDate',new Date());
	ap.set('nameOfJurPerson','jur name');
	ap.set('addendum','addenduuuum :-)');
	
	
	q.setApplicant(ap);
	
	
	var af1 = Ext.create('qqext.model.qq.AttachedFile');
	af1.set('fileName','fileName1');
	af1.set('fileType',3064);
		
	
	var af2 = Ext.create('qqext.model.qq.AttachedFile');
	af2.set('fileName','fileName2');
	af2.set('fileType',3064);
	
	q.files().add(af1);
	q.files().add(af2);
	
	var  noty = Ext.create('qqext.model.qq.Notification');
	noty.set('executor',61);
	noty.set('docType',3033);
	noty.set('deliveryType',3033);
	noty.set('notificationDate',new Date());
	
	q.setNotification(noty);
	
	var execinf = Ext.create('qqext.model.qq.ExecutionInfo');
	execinf.set('execDate',new Date());
	execinf.set('answerResult',3033);
	execinf.set('usageAnswer',3033);
	execinf.set('categoryComplexity',3033);
	
	q.setExecutionInfo(execinf);
	
	var deliveryAction1 = Ext.create('qqext.model.qq.DeliveryAction');
	deliveryAction1.set('docType',3033),
	deliveryAction1.set('numOfDocs',7);
	
	var deliveryAction2 = Ext.create('qqext.model.qq.DeliveryAction');
	deliveryAction2.set('docType',3033);
	deliveryAction2.set('numOfDocs',845);
	
	q.delActions().add(deliveryAction1);
	q.delActions().add(deliveryAction2);
	
	var usedMaterial1 = Ext.create('qqext.model.qq.UsedMaterial');
	usedMaterial1.set('fundNum',558);
	usedMaterial1.set('seriesNum',543);
	usedMaterial1.set('storageUnitNum',5);
	usedMaterial1.set('listNum',76);
	
	var usedMaterial2 = Ext.create('qqext.model.qq.UsedMaterial');
	usedMaterial2.set('fundNum',663);
	usedMaterial2.set('seriesNum',23);
	usedMaterial2.set('storageUnitNum',54);
	usedMaterial2.set('listNum',55);
	
	q.usedMaterials().add(usedMaterial1);
	q.usedMaterials().add(usedMaterial2);
	
	var coord1 = Ext.create('qqext.model.qq.Coordination');
	coord1.set('stage',8);
	coord1.set('stageDate',new Date());
	
	var coord2 = Ext.create('qqext.model.qq.Coordination');
	coord2.set('stage',9);
	coord2.set('stageDate',10);
	
	q.coordinations().add(coord1);
	q.coordinations().add(coord2);
	
	
	var sendAction1 = Ext.create('qqext.model.qq.SendAction');
	sendAction1.set('sendAction',1);
	sendAction1.set('sendDate',new Date());
	
	var sendAction2 = Ext.create('qqext.model.qq.SendAction');
	sendAction2.set('sendAction',2);
	sendAction2.set('sendDate',new Date());
	
	q.sendActions().add(sendAction1);
	q.sendActions().add(sendAction2);
	
	var wayToSend = Ext.create('qqext.model.qq.WayToSend');
	wayToSend.set('renewalNotice',new Date());
	wayToSend.set('ref_num','test ref num');
	wayToSend.set('note','note note note note ');
	q.setWayToSend(wayToSend);
	
	q.save();
});