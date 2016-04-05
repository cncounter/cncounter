
Ext.define('ESSM.model.salem.Salesopportunity',{
	extend: 'Ext.data.Model',
	fields: ['id','chanceName','userId','phaseId',
	'saleChanceSource','userDemand','remarkInfo',
	'deleteStatus','createTime','updateTime',
	'createEmpId','updateEmpId','areaCode',
	'currContactDate','currContactWay',
	'beginContactTime','endContactTime','managerId','userClass','currContactHours',
	'userName','manageName','managerName','kv.userSex','kv.userPhoneNo','kv.userIntent','kv.intentAmount','kv.intentInvestTime',
		'kv.userSource','kv.userSourceName','kv.userClassName','kv.userClass','kv.userName','kv.userClass','kv.currContactHours',
	'kv.trackRecordId','kv.investProjectCode','kv.allocationDate','kv.userSource','kv.currContactWay','kv.investProjectName',
	'userIntent', 'userSex', 'userPhoneNo', 'intentInvestTime', 'intentAmount', 'investProjectCode', 'investProjectName',
		'dealAmount', 'intentProjectType','csoId','nextContactTime','userClass','projectCode','projectName','userSource',
		'loginId','flag'

	]
});

/*Ext.define('ESSM.model.salem.Salesopportunity',{
	extend: 'Ext.data.Model',
	fields: ['id','userIntent','intentAmount','intentInvestTime',
	'nextContactTime','nextContactWay','currContactDate','currContactWay',
	'beginContactTime','endContactTime','managerId','remarkInfo',
	'userId','createEmpId','updateEmpId','createTime','updateTime','userName','managerName']
});*/
