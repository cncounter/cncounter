/**
 *用户存储
 */
	Ext.define('ESSM.store.sys.UserStore',{
		extend: 'Ext.data.Store',
		autoLoad : true,
		model : 'ESSM.model.sys.User',
		remoteSort : true,
		pageSize : 20,
		proxy : {
			type: 'ajax',
			api : {
				read : 'rest/sys/user/read.json', //获取资源findAllUsers
				create :'rest/sys/user/create.json',//insertUser
				update : 'rest/sys/user/update.json',//updateUser
				destroy : 'rest/sys/user/delete.json'//deleteUserById
			},
			reader: {
				type: 'json',
				root : 'meta.rows',
				totalProperty: 'totalCount'
			}
			,
			limitParam : 'pageSize'

		},
		sorters : [{
			property : 'createTime',
			direction : 'desc'
		}]
	});
