Ext.define('ESSM.model.crm.UserLevel',{
	extend: 'Ext.data.Model',
	fields: [
        "id", "levelName", "levelCode", "investAmountFloor", "investAmountCeiling", "updateTime",
        "deleteStatus", "createTime", "operatorId", "operatorName"
	]
});