Ext.define("ESSM.view.sys.UserView",{
	extend: "Ext.grid.Panel",
	alias : "widget.userView",
	store : 'sys.UserStore',
	viewConfig : {
		loadMask : true
	},
	tbar : [{
		xtype : 'authcbutton',
		action : 'create',
		iconCls : 'add',
		disabled : true,
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
	},{
		xtype : 'authcbutton',
		action : 'sycUser',
		iconCls : 'add',
		text :'同步基础数据'
	}],
	
	columns: [
		{ header: 'id', dataIndex: 'id',hidden:true},
    	{ header: '用户名', dataIndex: 'name',width:150},
    	{ header :'真实姓名',dataIndex : 'realName',width:150},
    	{ header :'所属角色',dataIndex : 'roles',width:150},
    	{ header :'所属部门',dataIndex : 'departName',width:150},
    	{ header :'联系电话',dataIndex : 'phone',width:150},
    	{ header :'电子邮箱',dataIndex : 'email',width:150},
    	{ header: '创建时间', dataIndex: 'createTime',width:150,
    		renderer : function(value) {
				if(value && value!=null) {
					return Ext.Date.format(new Date(value),"Y-m-d H:i:s");
				}
			}
		},
    	{ header: '更新时间', dataIndex: 'updateTime',width:150,
    		renderer : function(value) {
				if(value && value!=null) {
					return Ext.Date.format(new Date(value),"Y-m-d H:i:s");
				}
			}
		}

	/**
	 * ,
	 {
        text: '操作',
        xtype : 'textactioncolumn',
        sortable: false,
        dataIndex: 'id',
        width : 150,
        items : [
            {
                text : '重置密码',
                eventName : "resetpwdclick",
                handler : function(grid, rowIndex, colIndex, item, e) {
                    //
                    var eventName = item.eventName || "resetpwdclick";
                    var record = grid.getStore().getAt(rowIndex);
                    this.fireEvent(eventName, record, grid , rowIndex, colIndex, item, e);
                    // 停止事件传播
                    e.stopPropagation();
                }
            }
        ]
    }
	 */



	],
	bbar :{
		xtype : 'pagingtoolbar',
		store : 'sys.UserStore',
		displayInfo: true,
		displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
		emptyMsg: '无数据'
	}

});

