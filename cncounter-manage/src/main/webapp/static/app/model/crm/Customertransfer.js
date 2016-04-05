/**
 * Created by  on 2015/8/15.
 */
Ext.define('ESSM.model.crm.Customertransfer',{
    extend: 'Ext.data.Model',
    fields: ['id','userCode','userCardNo','userCardType','userName',
        'userSex','userSource','userJob','groupId','levelId',
        'userBirthday','userBirthdayStr','userActiveWay','userContactInfo',
        'telephoneOne','telephoneTwo','userEmail','userZipCode','userQq',
        'province','city','district','userAddress','userSalary','houseInfo',
        'carInfo','managerId','createTime','updateTime','operatorId','operatorName',
        'headPhotoUrl','userStatus','lostReason','createTimeStr','updateTimeStr', 'managerName']
});

