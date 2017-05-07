/**
 *获取产品列表
 */
Ext.define('ESSM.store.base.ProjectListStore',{
	extend: 'Ext.data.Store',
	autoLoad : true,
	model : 'ESSM.model.configm.Project',
	remoteSort : true,
	pageSize : 20,
	proxy : {
		type: 'ajax',
		api : {
			read : 'rest/crm/projects/queryBy.json'//获取产品列表
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
		limitParam : 'pageSize',
		pageParam :'page',
		listeners : {
		}

	}
});
