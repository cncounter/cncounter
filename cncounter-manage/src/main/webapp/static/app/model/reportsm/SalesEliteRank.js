Ext.define('ESSM.model.reportsm.SalesEliteRank',{
    extend: 'Ext.data.Model',
    fields: [
        'sortNo',
        'managerId',
        'managerName',
        'performanceTotal',//业绩总和
        'performanceGoal',//业绩目标
        'performanceAchieveRate',//业绩完成比例
        'provinceId',
        'provinceName'
    ]
});

