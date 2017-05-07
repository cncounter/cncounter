

/**
 *资源菜单类
 */
Ext.define('ESSM.store.sys.ResourceStore',{
	extend: 'Ext.data.TreeStore',
	autoLoad : true,
	model: 'ESSM.model.sys.Resource',

	proxy : {
		type: 'ajax',
		api : {
			read : 'rest/sys/resource/read.json', //获取资源
			create : 'rest/sys/resource/create.json',  //创建资源
			update : 'rest/sys/resource/update.json', //更新资源
			destroy : 'rest/sys/resource/delete.json',  //删除资源
			qoute : 'rest/sys/resource/qoute.json'  //引用资源
		},
		reader: {
			type: 'json',
			root:'data'
		},
		listeners : {
			exception : function(proxy,response,error,eOpts ){
				wr.alertError("权限不足或请求出错！");
			}
		}
	},
	root : {
		text : '',
		parentId : '0',
		id: '',
		expanded : true
	},
	findRecord : function(prop, value){
		return this.getRootNode().findChild(prop,value);
	}
});
