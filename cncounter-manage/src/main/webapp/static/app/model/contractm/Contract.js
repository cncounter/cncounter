Ext.define('ESSM.model.contractm.Contract', {
    extend: 'Ext.data.Model',
    fields: ['id', 'contractNo', 'contractName', 'agreementVersionNo',
        'userRealName', 'userCardType', 'userCardNo', 'signTime',
        'signType', 'contractPeriod', 'contractStartTime', 'contractEndTime',
        'contractStatus', 'operateEmpId', 'createTime', 'updateTime'
    ]
});