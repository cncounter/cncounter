Ext.define('ESSM.model.vm.WechatService',{
	extend: 'Ext.data.Model',
	fields: [
		"id","userCode","userName","nickName","userSex","userSource","attentionTime",
		"provinceId","cityId","district_id","country_code","country_name","createTime","updateTime",
		"userSourceType","wechatNo","headPhotoUrl","processingState",
		'kv.provinceId','kv.cityId','kv.districtId'
	]
});