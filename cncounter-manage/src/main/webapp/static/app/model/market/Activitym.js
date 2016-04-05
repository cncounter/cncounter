/**
 * Created by jeffer on 2015/8/19.
 */
Ext.define('ESSM.model.market.Activitym',{
    extend: 'Ext.data.Model',
    fields: ['id', 'activityName', 'activityInfo', 'updateTime',
        'createTime', 'creatorName', 'creatorId', 'activityType', 'provinceId','cityId','districtId','activityAddress'
        ,'deleteStatus','activityStatus','activityTime','deptCode','updatorId','updatorName',
        'deptName','provinceName','cityName','districtName','dictName','dictName2','activityClass','dictName3','dealProbability',
        'activityCustomerNum','dealCustomerNum','dealAmount'
    ]
});