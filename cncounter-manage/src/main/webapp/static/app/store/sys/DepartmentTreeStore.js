//展示所有树结构
Ext.define('ESSM.store.sys.DepartmentTreeStore',{
	extend: 'Ext.data.TreeStore',
	autoLoad : true,
	model: 'ESSM.model.sys.Department',
	proxy : {
		type: 'ajax',
		url: 'rest/sys/department/newDeptTree.json'
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