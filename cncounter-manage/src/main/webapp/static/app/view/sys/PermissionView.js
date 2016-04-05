Ext.define("ESSM.view.sys.PermissionView",{
	extend: "Ext.panel.Panel",
	alias : "widget.permissionView",
	border : false,
	layout : 'border',

	initComponent : function(){
		var me = this;

		this.items  =  [
			{
				xtype :'gridpanel',
                id : 'roleList',
                width : 350,
                region:'west',
				layout: 'fit',
                margins: '2 0 0 0',
				store: Ext.create('ESSM.store.sys.RoleStore', {
		        	model : 'ESSM.model.sys.Role',
		        	autoLoad:true,
				    proxy: {
				        type: 'ajax',
				        url: 'rest/sys/role/read.json',
				        extraParams: {
	                    	user: 'user'
	               		 },
				        reader: {
				            type: 'json',
				            root: 'data'
				        }
				    }
		        }),
				
				title : '按角色',
				columns: [
					{ header: 'id',  dataIndex: 'id',hidden:true},
					{ header: '角色代码',  dataIndex: 'code',flex:0.5},
					{ header: '角色名称',  dataIndex: 'name',flex:0.5}
				]

		},{
			xtype : 'sysCheckTree',
			region : 'center',
			layout: 'fit',
			split : true,
			////disabled : true,
			useArrows : true,
			rootVisible : false,
			viewConfig : {
				loadMask : true
			},
			tbar : [{
				xtype : 'authcbutton',
				action : 'update',
				iconCls : 'edit',
				disabled : true,
				text :'保存'
			}],
			listeners:{
				checkchange: function(node, state) {
					me.checkChildNodes(node,state);
                    me.checkParentNode(node,state);
				}
			}
		}];
		this.callParent();
	},

	checkChildNodes:function(node,state){
		if (node.hasChildNodes()) {
			for (var j = 0; j < node.childNodes.length; j++) {
				node.childNodes[j].set('checked', state);
				this.checkChildNodes(node.childNodes[j],state);
			}
		}
	},
    checkParentNode:function(node,state){
        //
        if(!state){
            return;
        }
        if(!node){
            return;
        }
        // 取得父节点
        var parentNode = node.parentNode;
        if(!parentNode){
            return;
        }
        // 递归往上选
        parentNode.set('checked', state);
        this.checkParentNode(parentNode,state);
    }
});

Ext.define('ESSM.view.sys.CheckTree', {
	extend: 'Ext.tree.Panel',
	alias : "widget.sysCheckTree",
	requires: [
		'Ext.data.TreeStore'
	],

	xtype: 'check-tree',
	rootVisible: false,
	useArrows: true,
	frame: true,

	initComponent: function(){
		Ext.apply(this, {
			store:Ext.create('ESSM.store.sys.PermissionStore')
		});
		this.callParent();
	}
});
