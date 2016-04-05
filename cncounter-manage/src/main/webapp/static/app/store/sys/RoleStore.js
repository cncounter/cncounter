Ext.define('ESSM.store.sys.RoleStore',{
	extend: 'Ext.data.Store',
	model: 'ESSM.model.sys.Role',
	autoLoad : true,
	remoteSort : true,
	pageSize : 20,
	proxy : {
		type: 'ajax',
		api : {
			read : 'rest/sys/role/read.json', //获取角色
			create :'rest/sys/role/insert.json',  //创建角色
			update : 'rest/sys/role/update.json', //更新角色
			destroy :'rest/sys/role/delete.json'  //删除角色
		},
		reader: {
			 type: 'json',
			 root: 'data',
			 totalProperty: 'totalCount'
		},
		
		limitParam : 'pageSize'
	}
	
});


