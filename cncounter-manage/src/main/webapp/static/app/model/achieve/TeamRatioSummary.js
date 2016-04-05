Ext.define('ESSM.model.achieve.TeamRatioSummary',{
    extend: 'Ext.data.Model',
    fields: [
        "id", "achievementRole", "achievementPeriod", "achievementPeriodTitle",
        "achievementTarget", "achievementTargetName", "indicatorCode", "indicatorTitle",
        "goalValue", "salesAmount", "restAmount", "ratio", "bonus",
        "achievementRule", "achievementRuleName", "deleteStatus",
        "achievementStartTime", "achievementEndTime", "createTime", "updateTime"
    ]
});