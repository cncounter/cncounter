
/**
 *客户管理model
 */
Ext.define('ESSM.model.crm.PotentialUserinfo',{
	extend: 'Ext.data.Model',
	fields: ['id','userCode','userCardNo','userCardType','userName',
	         'userSex','userSource','userJob','groupId','levelId',
	         'userBirthday','userBirthdayStr','birthdayReminder','userActiveWay','userPhoneNo',
	         'telephoneOne','telephoneTwo','userEmail','userZipCode','userQq',
	         'provinceId','cityId','districtId','userAddress','userSalary','houseInfo',
	         'carInfo','managerId','createTime','updateTime','operatorId','operatorName',
	         'headPhotoUrl','userStatus','lostReason','createTimeStr','updateTimeStr','managerName'
	         ,'createName','levelName','groupName','userSourceType','userId','departCode'
	         ,'changeContext','changeReason','changeStatus','userIndustry','wechatNo',
	         'approverName','createEmpName','earlyDays','errorMes',
	         'userEducation','userMarriageStatus','intentProjectType',
	         'kv.userIntent','kv.intentAmount','kv.intentInvestTime','kv.trackRecordId',
	         'remarkInfo','allocationDate','saleTurnsTimes','potentialUserStatus','userClass','userType',
			'provinceName','cityName','userSourceName','intentProjectType',    'investProjectCode','investProjectName',
		'intentProjectType','kv.investProjectCode','kv.investProjectName','potentialUserStatus','saleChannel','potentialUserStatusName'
		,'saleChannelName'
		,'authenticationStatus'
		,'authenticationStatusView'
	         ]
});
