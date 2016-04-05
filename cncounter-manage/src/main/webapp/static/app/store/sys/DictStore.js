/**
 *字典
 */
	Ext.define('ESSM.store.sys.DictStore',{
		extend: 'Ext.data.Store',
		autoLoad : true,
		model : 'ESSM.model.sys.Dict',
		remoteSort : true,
		pageSize : 20,
		proxy : {
			type: 'ajax',
			api : {
				read:'rest/achieve/dict/list.json',
				create:'rest/achieve/dict/create.json',
				update:'rest/achieve/dict/update.json'
				///read : 'rest/dict/read.json' //获取资源findAllUsers
//				create :'rest/sys/dict/create.json',//insertUser
//				update : 'rest/sys/dict/update.json',//updateUser
//				destroy : 'rest/sys/dict/delete.json'//deleteUserById
			},
			reader: {
				type: 'json',
				root: 'data',
				totalProperty: 'totalCount'
			}
			,
			limitParam : 'pParam.pageSize',
			pageParam :'pParam.page',

		},
		sorters : [{
			property : 'createTime',
			direction : 'desc'
		}]
	});
