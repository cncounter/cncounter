Ext.define('ESSM.model.configm.UserActionRule', {
    extend: 'Ext.data.Model',
    fields: [
        "id","userActionType","userActionName","weight","sortNo",
        "deleteStatus","createTime","updateTime"
    ]
});