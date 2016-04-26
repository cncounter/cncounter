/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
/**
 * store - 收藏
 */
Ext.define('ESSM.store.manage.FavoriteStore',{
	extend: 'Ext.data.Store',
	// autoLoad : true,
	model : 'ESSM.model.manage.Favorite',
	remoteSort : true,
	pageSize : 20,
	proxy : {
		type: 'ajax',
		api : {
			read:'rest/manage/favorite/list.json',
			create:'rest/manage/favorite/add.json',
			update:'rest/manage/favorite/update.json',
			destroy:'rest/manage/favorite/delete.json',
		},
        actionMethods: {
            read   : 'POST' // by default GET
        },
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
		},
		limitParam : 'pageSize',
		pageParam :'page',

	},
	sorters : [{
		property : 'id',
		direction : 'asc'
	}]
});
