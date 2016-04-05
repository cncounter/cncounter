/**
 * Created by jeffer on 2015/8/19.
 */
Ext.define('ESSM.model.market.Scheme',{
    extend: 'Ext.data.Model',
    fields: ['id', 'schemeName', 'schemeMean', 'schemeBeginTime',
        'schemeEndTime', 'schemeAmount', 'schemeComment', 'createTime', 'operatorName','userList','planName','planId'
        ,'districtId','cityId','provinceId','districtName','cityName','provinceName','schemeAddr','schemeType','schemeTypename','dictName'
    ]
});