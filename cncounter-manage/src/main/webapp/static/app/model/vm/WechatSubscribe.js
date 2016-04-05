Ext.define('ESSM.model.vm.WechatSubscribe',{
	extend: 'Ext.data.Model',
	fields: ['id','userCode','userName','nickName','userSex','userSource','attentionTime','provinceId',
		'cityId','districtId','countryCode','countryName','createTime','updateTime','headPhotoUrl',
		'userSourceType','wechatNo','processingState',
		'kv.provinceId','kv.cityId','kv.districtId'
	]
});