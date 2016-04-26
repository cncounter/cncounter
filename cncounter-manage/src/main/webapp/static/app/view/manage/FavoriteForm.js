/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
/**
 * form - 收藏
 */
Ext.define("ESSM.view.manage.FavoriteForm",{
	extend:"Ext.form.Panel",
	alias:"widget.favoriteForm",
	width:600,
	bodyPadding: '10',
	border : 0,
	fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 90,
        anchor : '80%'
    },
    initComponent : function(){
		this.items =  [
			{
				xtype: 'textfield',
				fieldLabel: '自增ID',
				// hidden:true,
				// allowBlank: false,
				tooltip: '请输入自增ID',
				name:'id'
			},
			{
				xtype: 'textfield',
				fieldLabel: '用户ID',
				// hidden:true,
				// allowBlank: false,
				tooltip: '请输入用户ID',
				name:'userId'
			},
			{
				xtype: 'textfield',
				fieldLabel: '类别,0为首页通用',
				// hidden:true,
				// allowBlank: false,
				tooltip: '请输入类别,0为首页通用',
				name:'type'
			},
			{
				xtype: 'textfield',
				fieldLabel: '标题',
				// hidden:true,
				// allowBlank: false,
				tooltip: '请输入标题',
				name:'title'
			},
			{
				xtype: 'textfield',
				fieldLabel: '内容',
				// hidden:true,
				// allowBlank: false,
				tooltip: '请输入内容',
				name:'content'
			},
			{
				xtype: 'textfield',
				fieldLabel: '链接',
				// hidden:true,
				// allowBlank: false,
				tooltip: '请输入链接',
				name:'url'
			},
			{
				xtype: 'textfield',
				fieldLabel: '创建者ID',
				// hidden:true,
				// allowBlank: false,
				tooltip: '请输入创建者ID',
				name:'createId'
			},
			{
				xtype: 'textfield',
				fieldLabel: '更新者ID',
				// hidden:true,
				// allowBlank: false,
				tooltip: '请输入更新者ID',
				name:'updateId'
			},
			{
				xtype: 'textfield',
				fieldLabel: '创建时间',
				// hidden:true,
				// allowBlank: false,
				tooltip: '请输入创建时间',
				name:'createTime'
			},
			{
				xtype: 'textfield',
				fieldLabel: '更新时间',
				// hidden:true,
				// allowBlank: false,
				tooltip: '请输入更新时间',
				name:'updateTime'
			},
			{
				xtype: 'textfield',
				fieldLabel: '乐观锁版本号',
				// hidden:true,
				// allowBlank: false,
				tooltip: '请输入乐观锁版本号',
				name:'version'
			}		],
		this.callParent();
	}
});