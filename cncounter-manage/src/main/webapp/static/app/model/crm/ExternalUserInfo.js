Ext.define('ESSM.model.crm.ExternalUserInfo',{
	extend: 'Ext.data.Model',
	fields: [
		"id","userName","userPhoneNo","provinceId","cityId","provinceName","cityName","userSource","investProjectCode",
		"investProjectName","remarkInfo","batchNo","createTime","userSource","operatorId","importStatus","importError",
		"supplierCode"
	]
});