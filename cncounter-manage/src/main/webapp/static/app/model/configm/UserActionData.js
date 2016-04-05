Ext.define('ESSM.model.configm.UserActionData', {
    extend: 'Ext.data.Model',
    fields: [
        "id","userId","realName","projectTypeCode","projectTypeName",
        "projectCode","projectName","userActionType","userActionName",
        "enterTime","leaveTime","createTime","updateTime","userSex","userBirthday"
    ]
});