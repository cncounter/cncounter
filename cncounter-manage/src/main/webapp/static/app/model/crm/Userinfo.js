
/**
 *客户管理model
 */
Ext.define('ESSM.model.crm.Userinfo',{
	extend: 'Ext.data.Model',
	fields: ['id','userCode','userCardNo','userCardType','userName',
	         'userSex','userSource','userJob','groupId','levelId',
	         'userBirthday','userBirthdayStr','userActiveWay','userPhoneNo',
	         'telephoneOne','telephoneTwo','userEmail','userZipCode','userQq',
	         'provinceId','cityId','districtId','userAddress','userSalary','houseInfo',
	         'carInfo','managerId','createTime','updateTime','operatorId','operatorName',
	         'headPhotoUrl','userStatus','lostReason','createTimeStr','updateTimeStr','managerName'
	         ,'createName','levelName','groupName','userSourceType','userId','departCode'
	         ,'changeContext','changeReason','changeStatus','userIndustry','wechatNo',
		      'investProjectCode','investProjectName',
		'intentProjectType',
	         'approverName','createEmpName',
	         'userEducation','userMarriageStatus',
	         'kv.userIntent','kv.intentAmount','kv.intentInvestTime','kv.trackRecordId','kv.investProjectCode','kv.investProjectName',
		'potentialUserStatus','saleChannel','potentialUserStatusName','saleChannelName'
	         ,'authenticationStatus'
		,'authenticationStatusView'
	         ]
});
