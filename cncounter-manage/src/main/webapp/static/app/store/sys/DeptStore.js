Ext.define('ESSM.store.sys.DeptStore',{
	extend: 'Ext.data.Store',
	autoLoad : true,
	model: 'ESSM.model.sys.Department',
		remoteSort : true,
		pageSize : 20,
		proxy : {
			type: 'ajax',
			api : {
				read : 'rest/sys/department/listAll.json'//获取指标
			},
			actionMethods: {
				// by default GET
				read   : 'POST'
			},
			reader: {
				type: 'json',
				root : 'data',
				totalProperty: 'totalCount'
			}
			,
			limitParam : 'pageSize'

		}
	});
