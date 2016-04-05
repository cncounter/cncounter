/**
 * Created by jeffer on 2015/8/19.
 */
Ext.define('ESSM.model.market.Statis',{
    extend: 'Ext.data.Model',
    fields: ['id', 'schemeName', 'schemeMean', 'schemeBeginTime',
        'schemeEndTime', 'schemeAmount', 'schemeComment', 'createTime', 'operatorName','userList','planName','planId',
        "inAmount","realAmount","realEndTime","realBeginTime"
    ]
});