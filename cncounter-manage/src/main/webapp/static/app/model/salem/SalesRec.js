/**
 * Created by jeffer on 2015/8/19.
 */
Ext.define('ESSM.model.salem.SalesRec',{
    extend: 'Ext.data.Model',
    fields: ['id','chanceName','userId','phaseId',
        'saleChanceSource','userDemand','remarkInfo',
        'deleteStatus','createTime','updateTime',
        'createEmpId','updateEmpId','areaCode',
        'currContactDate','currContactWay',
        'beginContactTime','endContactTime','managerId',
        'userName','managerName',
        'kv.trackRecordId',
        'userIntent', 'userSex', 'userPhoneNo', 'intentInvestTime', 'intentAmount', 'investProjectCode', 'investProjectName',
        'dealAmount', 'intentProjectType','csoId','nextContactWay','nextContactTime','contactRecord']
});