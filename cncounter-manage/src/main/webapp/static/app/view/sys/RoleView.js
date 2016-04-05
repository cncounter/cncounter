Ext.define("ESSM.view.sys.RoleView",{
	extend: "Ext.grid.Panel",
	alias : "widget.roleView",
	store : 'sys.RoleStore',
	
	viewConfig : {
		loadMask : true
	},
	tbar : [{
		xtype : 'authcbutton',
		action : 'create',
		disabled : true,
		iconCls : 'add',
		text :'新增'
	},{
		xtype : 'authcbutton',
		action : 'update',
		iconCls : 'edit',
		disabled : true,
		text :'修改'
	},{
		xtype : 'authcbutton',
		action :'delete',
		iconCls : 'delete',
		disabled : true,
		text : '删除'
	}],
	columns: [
    	{ header: '角色代码', dataIndex: 'code',align : 'center',width:'15%'},
    	{ header: '角色名称', dataIndex: 'name',align : 'center',width:'15%'},
    	{ header: '备注说明', dataIndex: 'description',align:'center',sortable:false,width:'30%'},
    	{header :'是否有效',sortable: false,dataIndex : 'status',align:'center',width:'10%',
			renderer : function(value) {
				if(value===1) {
					return '是';
				}else if(value===0) {
					return '否';
				}else{
					return "删除";
				}
			}
		},
		{header :'部门',sortable: false,dataIndex : 'departName',align:'center',width:'10%'},
		{header :'类型',sortable: false,dataIndex : 'roleTypeName',align:'center',width:'10%'},
        //{ header: '创建时间', dataIndex: 'createTime',align : 'center',width:'15%',
    		//renderer : function(value) {
		//		if(value && value!=null) {
		//			return Ext.Date.format(new Date(value),"Y-m-d H:i:s");
		//		}
		//	}
		//},
        //{ header: '更新时间', dataIndex: 'modifyTime',align : 'center',width:'15%',
    		//renderer : function(value) {
		//		if(value && value!=null) {
		//			return Ext.Date.format(new Date(value),"Y-m-d H:i:s");
		//		}
		//	}
		//}
        { header: '创建时间', dataIndex: 'createTime',align : 'center',width:'15%',xtype:'timestampcolumn'},
        { header: '更新时间', dataIndex: 'modifyTime',align : 'center',width:'15%',xtype:'timestampcolumn'}
	],
	bbar :{
		xtype : 'pagingtoolbar',
		store : 'sys.RoleStore',
		displayInfo: true,
		displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
		emptyMsg: '无数据'
	}
});