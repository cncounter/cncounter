/**
 * 用户注销
 */
Ext.define('ESSM.store.sys.UserLogoffStore',{
	extend: 'Ext.data.Store',
	model : 'ESSM.model.sys.ManageUser',
    autoLoad : false,
	remoteSort : true,
	pageSize : 20,
	proxy : {
		type: 'ajax',
		api : {
			read : 'rest/manager/user/listByStatus.json'
		},
		actionMethods: {
			read   : 'POST'
		},
		extraParams:{
			status : 1
		},
		reader: {
			type: 'json',
			root : 'data',
			totalProperty: 'totalCount'
		}
		,
		limitParam : 'pageSize',
		pageParam :'page',
		listeners : {
		}

	}
});
