/**
 * Created by jeffer on 2015/8/19.
 */
Ext.define('ESSM.model.market.Plan',{
    extend: 'Ext.data.Model',
    fields: ['id','planName','planBeginTime', 'planEndTime', 'createTime', 'operatorName','planInfo','remarkInfo'
    ]
});