/**
 * Area-地区
 */
Ext.define('ESSM.model.crm.Area',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'areaCode', type: 'int'},
        {name: 'areaName', type: 'string'},
        {name: 'parentAreaCode', type: 'int'},
        {name: 'areaLevel', type: 'int'}
    ]
});