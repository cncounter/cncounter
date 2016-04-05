/**
 * Area-地区
 */
Ext.define('ESSM.model.dict.Area',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'code', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'parentCode', type: 'int'},
        {name: 'level', type: 'int'}
    ]
});