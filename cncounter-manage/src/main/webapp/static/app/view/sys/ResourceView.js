Ext.define("ESSM.view.sys.ResourceView",{
	extend: "Ext.tree.Panel",
	alias : "widget.resourceView",
	store : "sys.ResourceStore",
	useArrows : true,
	rootVisible : false,
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
		action :'qoute',
		iconCls : 'add',
		disabled : true,
		text : '引用'
	}],

	initComponent : function(){
		Ext.apply(this, {
			//store : Ext.create('ESSM.store.sys.ResourceStore'),
			columns : [{
				xtype: 'treecolumn',
				text: '名称',
				width : 200,
				sortable: false,
				dataIndex : 'name'
			},{
				text : '代码',
				width : 200,
				sortable: false,
				dataIndex:'code'
			},{
				text : '图标',
				dataIndex :'iconCls',
				align : 'center',
				width : 125,
				sortable: false,
				renderer : function(value) {
					if(value) {
						return '<div class="icon-item '+value+'"></div>';
					}
				}
			},{
				text :'菜单模块',
				dataIndex : 'type',
				align : 'center',
				width : 125,
				sortable: false,
				renderer : function(value) {
					if(value===1) {
						return '是';
					}else {
						return '否';
					}
				}
			},{
				text :'是否显示',
				sortable: false,
				dataIndex : 'status',
				renderer : function(value) {
					if(value===1) {
						return '是';
					}else if(value===0) {
						return '否';
					}else{
						return "删除";
					}
				}
			},{
				text :'排序',
				sortable: false,
				dataIndex : 'sort'
			},{
				text : '访问地址',
				width : 200,
				sortable: false,
				dataIndex:'uri'
			}]

		});
		this.callParent();
	}

});