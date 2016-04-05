Ext.define('ESSM.model.reportsm.SleepingCount',{
    extend: 'Ext.data.Model',
    fields: [
        'userId',
        'userName',
        'managerId',
        'managerName',
        'projectTypeId',//产品类型
        'projectTypeName',
        'projectId',
        'projectCode',//产品编码
        'projectName',
        'orderCount',//交易笔数
        'firstInvestTime',
        'lastInvestTime',
        'provinceId',
        'provinceName'
    ]
});

