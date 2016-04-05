//查询权限树
Ext.define('ESSM.store.sys.DepartmentStore',{
	extend: 'Ext.data.TreeStore',
	autoLoad : true,
	model: 'ESSM.model.sys.Department',
	proxy : {
		type: 'ajax',
		url: 'rest/sys/department/newDeptTreePermChild.json'
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