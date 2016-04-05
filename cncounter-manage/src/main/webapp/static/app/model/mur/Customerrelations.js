
/**
 *客户管理model
 */
Ext.define('ESSM.model.mur.Customerrelations',{
	extend: 'Ext.data.Model',
	fields: ['id','userCode','userCardNo','userCardType','userName',
	         'userSex','userSource','userJob','groupId','levelId',
	         'userBirthday','userBirthdayStr','userActiveWay','userContactInfo',
	         'telephoneOne','telephoneTwo','userEmail','userZipCode','userQq',
	         'province','city','district','userAddress','userSalary','houseInfo',
	         'carInfo','managerId','createTime','updateTime','operatorId','operatorName',
	         'headPhotoUrl','userStatus','lostReason','createTimeStr','updateTimeStr', 'managerName',
		'userPhoneNo','levelName','groupName', 'intentProjectType','provinceName','cityName','districtName',
		'investAmount','userSourceType','potentialUserStatus'
	]
});
