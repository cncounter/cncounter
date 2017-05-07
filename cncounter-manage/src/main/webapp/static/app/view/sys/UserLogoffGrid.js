Ext.define("ESSM.view.sys.UserLogoffGrid", {
	extend: "Ext.grid.Panel",
	alias: "widget.userLogoffGrid",
	store: "sys.UserLogoffStore",
	viewConfig: {
		loadMask: true
	},
	initComponent : function(){
		this.selModel = Ext.create('Ext.selection.CheckboxModel', {mode: "SINGLE", allowDeselect: true});
		this.callParent();
	},
	tbar : [{
		xtype : 'authcbutton',
		action : 'logoff',
		iconCls : 'delete',
		align:"left",
		disabled : false,
		text :'注销'
	}],

	columns: [
		{header: 'id', dataIndex: 'id', hidden: true},
		{header: '员工编号', dataIndex: 'empCode', align:'center', width: 225},
		{header: '员工姓名', dataIndex: 'realName', align:'center', width: 225},
		{header: '员工性别', dataIndex: 'sex', align:'center', width: 115,
			renderer : function(value) {
				if(value == 0) {
					return "保密";
				} else if(value == 1){
					return "男";
				} else {if(value == 2)
					return "女";
				}
			}
		},
		{header: '登录名', dataIndex: 'name', align:'center', width: 225},
		{header: '所属角色', dataIndex: 'roles', align:'center', width: 255}
	],
	bbar: {
		xtype: 'pagingtoolbar',
		store: 'sys.UserLogoffStore',
		displayInfo: true,
		displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
		emptyMsg: '无数据'
	}


});

