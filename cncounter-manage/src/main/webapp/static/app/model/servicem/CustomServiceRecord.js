Ext.define('ESSM.model.servicem.CustomServiceRecord',{
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'userInfoId',
        'userRealName',
        'managerId',
        'managerName',
        'solveLimitTime',
        'serviceTheme',
        'feedbackSource',
        'feedbackReason',
        'feedbackType',
        'feedbackPriority',
        'problemInfo',
        'solveProcessInfo',
        'solveStartTime',
        'solveEndTime',
        'solveResult',
        'userConfResult',
        'callBackConfResult',
        'updateTime',
        'createTime',
        'operatorId',
        'operatorName',
        'deleteStatus'
    ]
});

