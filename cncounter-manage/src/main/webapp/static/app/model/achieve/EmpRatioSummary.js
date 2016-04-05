Ext.define('ESSM.model.achieve.EmpRatioSummary',{
    extend: 'Ext.data.Model',
    fields: [
        "id", "achievementRole", "achievementPeriod", "achievementPeriodTitle",
        "achievementTarget", "achievementTargetName", "indicatorCode", "indicatorTitle",
        "goalValue", "salesAmount", "restAmount", "ratio", "bonus",
        "achievementRule", "achievementRuleName", "deleteStatus",
        "achievementStartTime", "achievementEndTime", "createTime", "updateTime"
    ]
});