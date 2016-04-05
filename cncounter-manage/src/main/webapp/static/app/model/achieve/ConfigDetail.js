Ext.define('ESSM.model.achieve.ConfigDetail',{
    extend: 'Ext.data.Model',
    fields: [
        "id", "masterId", "detailName", "modelCode", "modelTitle",
        "modelFieldCode", "modelFieldTitle", "achievementType", "achievementTypeName",
        "floorRatio", "ceilingRatio", "bonusPercentage", "bonusValue",
        "deleteStatus", "createTime", "updateTime"
    ]
});