Ext.define('ESSM.model.configm.UserActionStat', {
    extend: 'Ext.data.Model',
    fields: [
        "id","userId","userCode","realName","mobile",
        "projectTypeCode","projectTypeName","projectCode","projectName",
        "userActionType","userActionName","projectAttentionDegree"
    ]
});