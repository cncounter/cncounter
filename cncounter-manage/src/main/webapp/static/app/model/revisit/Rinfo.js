/**
 * Created by jeffer on 2015/8/19.
 */
Ext.define('ESSM.model.revisit.Rinfo',{
    extend: 'Ext.data.Model',
    fields: ['id', 'userName','userPhoneNo','userCardNo','userSource','realName','dictName',
         'createTime', 'operatorName','currVisitTime','userIntentId','areaName','telephoneOne','userSex','visitInfo','userInfoId','recodeCode','manageName'
    ]
});