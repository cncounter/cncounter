/**
 * BaseStore 基础 Store
 */
Ext.define('ESSM.store.base.BaseStore',{
	extend: 'ESSM.store.base.GridDataBaseStore',
	autoLoad : true,
    initComponent : function(){

    },
	proxy : {
		type: 'ajax',
        url : null,
		actionMethods: {
			read   : 'POST'
		},
		reader: {
			type: 'json',
			root:'data',
			totalProperty: 'totalCount',
			messageProperty:'message'
		},
		limitParam : 'size'
	},
	sorters : [{
		property : 'id',
		direction : 'desc'
	}],
	pageSize : 20
});
