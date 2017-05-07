Ext.define("ESSM.view.sys.DictView",{
	extend: "Ext.grid.Panel",
	alias : "widget.dictView",
	store : 'sys.DictStore',
	viewConfig : {
		loadMask : true
	}
,
	tbar : [{
		xtype : 'authcbutton',
		action : 'create',
		iconCls : 'add',
		disabled : false,
		text :'新增'
	}
//		,
//		{
//		xtype : 'authcbutton',
//		action : 'update',
//		iconCls : 'edit',
//		disabled : true,
//		text :'修改'
//	}
	//,{
	//	xtype : 'authcbutton',
	//	action :'delete',
	//	iconCls : 'delete',
	//	disabled : false,
	//	text : '删除'
	//}
	],
	columns: [
		{ header: 'id', dataIndex: 'id',hidden:true},
    	{ header: '字典名称', dataIndex: 'dictName',width:150},
    	{ header :'字典值',dataIndex : 'dictValue',width:150},
    	{ header :'字典类型值',dataIndex : 'dictCatagoryCode',width:150},
		{ header :'字典类型',dataIndex : 'dictCatagoryName',width:150},
    	{ header :'是否启用',dataIndex : 'dictStatus',width:150,
    		renderer : function(value) {
				if(value===0) {
					return '是';
				}else if(value===1) {
					return '否';
				}else{
					return "删除";
				}
    		}
    	},
	],
	bbar :{
		xtype : 'pagingtoolbar',
		store : 'sys.DictStore',
		displayInfo: true,
		displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
		emptyMsg: '无数据'
	}

});

