Ext.define('ESSM.model.configm.UserActionCount', {
    extend: 'Ext.data.Model',
    fields: [
        "id","userId","realName","projectTypeCode","projectTypeName",
        "data", "weight",
        "projectCode","projectName","userActionType","userActionName",
        "enterTime","leaveTime","createTime","updateTime"
    ]
});