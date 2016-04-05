/**
 * 项目附件表
 */
Ext.define('ESSM.model.crm.Group',{
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'groupName',
        'groupCode',
        'markInfo',
        'createTime',
        'updateTime',
        'operatorId',
        'operatorName'

    ]
});