/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
/**
 * grid - 收藏
 */
Ext.define("ESSM.view.manage.FavoriteGrid", {
	extend: "Ext.grid.Panel",
	alias: "widget.favoriteGrid",
	store: "manage.FavoriteStore",
	viewConfig: {
		loadMask: true
	},
	initComponent : function(){
		this.selModel = Ext.create('Ext.selection.CheckboxModel', {mode: "SINGLE", allowDeselect: true});
		this.callParent();
	},
    tbar: [
		{
			xtype: 'authcbutton',
			action: 'create',
			iconCls: 'add',
			text: '新增'
		},
		{
			xtype : 'authcbutton',
			action : 'update',
			iconCls : 'edit',
			disabled : true,
			text :'修改'
		},
			{
			xtype : 'authcbutton',
			action :'delete',
			iconCls : 'delete',
			disabled : true,
			text : '删除'
		}
	],

	columns: [
				{
					header: '自增ID', 
					dataIndex: 'id', 
					width: 120,
					align:'center',
					// hidden: true,
					renderer : function(value, row, record) {
						if(value) {
							return value;
						}
						return "";
					}
				},
				{
					header: '用户ID', 
					dataIndex: 'userId', 
					width: 120,
					align:'center',
					// hidden: true,
					renderer : function(value, row, record) {
						if(value) {
							return value;
						}
						return "";
					}
				},
				{
					header: '类别,0为首页通用', 
					dataIndex: 'type', 
					width: 120,
					align:'center',
					// hidden: true,
					renderer : function(value, row, record) {
						if(value) {
							return value;
						}
						return "";
					}
				},
				{
					header: '标题', 
					dataIndex: 'title', 
					width: 120,
					align:'center',
					// hidden: true,
					renderer : function(value, row, record) {
						if(value) {
							return value;
						}
						return "";
					}
				},
				{
					header: '内容', 
					dataIndex: 'content', 
					width: 120,
					align:'center',
					// hidden: true,
					renderer : function(value, row, record) {
						if(value) {
							return value;
						}
						return "";
					}
				},
				{
					header: '链接', 
					dataIndex: 'url', 
					width: 120,
					align:'center',
					// hidden: true,
					renderer : function(value, row, record) {
						if(value) {
							return value;
						}
						return "";
					}
				},
				{
					header: '创建者ID', 
					dataIndex: 'createId', 
					width: 120,
					align:'center',
					// hidden: true,
					renderer : function(value, row, record) {
						if(value) {
							return value;
						}
						return "";
					}
				},
				{
					header: '更新者ID', 
					dataIndex: 'updateId', 
					width: 120,
					align:'center',
					// hidden: true,
					renderer : function(value, row, record) {
						if(value) {
							return value;
						}
						return "";
					}
				},
				{
					header: '创建时间', 
					dataIndex: 'createTime', 
					width: 120,
					align:'center',
					// hidden: true,
					renderer : function(value, row, record) {
						if(value) {
							return value;
						}
						return "";
					}
				},
				{
					header: '更新时间', 
					dataIndex: 'updateTime', 
					width: 120,
					align:'center',
					// hidden: true,
					renderer : function(value, row, record) {
						if(value) {
							return value;
						}
						return "";
					}
				},
				{
					header: '乐观锁版本号', 
					dataIndex: 'version', 
					width: 120,
					align:'center',
					// hidden: true,
					renderer : function(value, row, record) {
						if(value) {
							return value;
						}
						return "";
					}
				}	],
	bbar: {
		xtype: 'pagingtoolbar',
		store: 'manage.FavoriteStore',
		displayInfo: true,
		displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
		emptyMsg: '无数据'
	}
});