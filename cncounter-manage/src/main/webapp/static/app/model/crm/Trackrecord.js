
/**
 *客户管理model
 */
Ext.define('ESSM.model.crm.Trackrecord',{
	extend: 'Ext.data.Model',
	fields: ['id','userIntent','intentAmount','intentInvestTime','phaseId',
	'nextContactTime','nextContactWay','currContactDate','currContactWay',
	'beginContactTime','endContactTime','managerId','remarkInfo','contactRecord',
	'userId','createEmpId','updateEmpId','createTime','updateTime','userName','managerName','kv.userSex','kv.userPhoneNo',
	'dealAmount','investProjectName','investProjectCode','intentProjectType'
	]
});
