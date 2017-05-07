/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
/**
 *model - 收藏
 */
Ext.define('ESSM.model.manage.Favorite',{
	extend: 'Ext.data.Model',
	fields: [
	// 自增ID
	'id',
	// 用户ID
	'userId',
	// 类别,0为首页通用
	'type',
	// 标题
	'title',
	// 内容
	'content',
	// 链接
	'url',
	// 创建者ID
	'createId',
	// 更新者ID
	'updateId',
	// 创建时间
	'createTime',
	// 更新时间
	'updateTime',
	// 乐观锁版本号
	'version'	]
});

