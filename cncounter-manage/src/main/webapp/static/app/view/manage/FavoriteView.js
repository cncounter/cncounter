/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
/**
 * view - 收藏
 */
Ext.define("ESSM.view.manage.FavoriteView",{
	extend: "Ext.panel.Panel",
	alias : "widget.favoriteView",
    requires : [
        'ESSM.store.manage.FavoriteStore',
        "ESSM.view.manage.FavoriteGrid",
        "ESSM.view.manage.FavoriteForm"
    ],
	tbar : [
		{
			xtype : 'authcbutton',
			action : 'create',
			iconCls : 'add',
			disabled : false,
			text :'新增'
		},
		{
			xtype : 'authcbutton',
			action : 'update',
			iconCls : 'edit',
			disabled : true,
			text :'修改'
		}
		,{
			xtype : 'authcbutton',
			action :'delete',
			iconCls : 'delete',
			disabled : false,
			text : '删除'
		}
	],
	items : [
		{
			xtype : "FavoriteGrid",
			anchor: "100% -60",
			border : false
		}
	]
});