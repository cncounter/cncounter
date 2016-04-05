Ext.define('ESSM.model.vm.OtherChannel',{
	extend: 'Ext.data.Model',
	fields: ['id','userCardNo','userCardType','userName','userSex','userSource','userJob',
		'userBirthday','userPhoneNo','telephoneOne','telephoneTwo','userEmail','userZipCode','userQq',
		'provinceId','cityId','districtId','userAddress','houseInfo','carInfo','createTime','updateTime',
		'headPhotoUrl','userSourceType','userMarriageStatus','userEducation','userSalary','deleteStatus',
		'userRegisterIp','userIndustry','wechatNo','ownerId','channelId','loginName','countryCode','countryName',
		'nickName','attentionTime','processingState',
		'kv.provinceId','kv.cityId','kv.districtId'
	]
});