Ext.define('ESSM.model.salem.SalesProcessData', {
    extend: 'Ext.data.Model',
    fields: [
        "id","userId","realName","projectTypeCode","projectTypeName",
        "projectCode","projectName","userActionType","userActionName",
        "enterTime","leaveTime","createTime","updateTime",
        "referrer","spentTime","visitorIp","mobile","successFlag","userSex","userBirthday"
    ]
});