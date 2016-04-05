Ext.define('ESSM.model.vm.Weibo',{
	extend: 'Ext.data.Model',
	fields: ['id','userCode','userName','nickName','userSex','userSource','attentionTime',
		'provinceId','cityId','districtId','countryCode','countryName',
		'createTime','updateTime','headPhotoUrl','userSourceType',
		'weiboNo','processingState','microBlogNo',
		'kv.provinceId','kv.cityId','kv.districtId'
	]
});