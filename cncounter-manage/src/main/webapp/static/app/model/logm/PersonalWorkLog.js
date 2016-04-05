Ext.define('ESSM.model.logm.PersonalWorkLog',{
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'workTheme',//主题
        'workStartTime',//开始时间
        'workEndTime',//结束时间
        'workStatus',//工作状态
        'workType',//工作类型
        'deleteStatus',//创建状态
        'workInfo',//工作内容
        'operatorId',//创建者ID
        'createTime',
        'upTime'
    ]
});