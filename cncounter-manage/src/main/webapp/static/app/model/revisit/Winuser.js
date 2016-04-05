
/**
 *客户管理model
 */
Ext.define('ESSM.model.revisit.Winuser',{
	extend: 'Ext.data.Model',
	fields: ['id','userCode','userCardNo','userCardType','userName',
	         'userSex','userSource','userJob','groupId','levelId',
	         'userBirthday','userBirthdayStr','userActiveWay','userPhoneNo',
	         'telephoneOne','telephoneTwo','userEmail','userZipCode','userQq',
	         'provinceId','cityId','districtId','userAddress','userSalary','houseInfo',
	         'carInfo','managerId','createTime','updateTime','operatorId','operatorName',
	         'headPhotoUrl','userStatus','lostReason','createTimeStr','updateTimeStr','manageName','managerName','createName']
});
