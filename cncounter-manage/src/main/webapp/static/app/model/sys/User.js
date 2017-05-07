/**
 *用户model 
 */
Ext.define('ESSM.model.sys.User',{
	extend: 'Ext.data.Model',
	fields: ['id','name','realName','roles','phone','email','status','createTime',
	'updateTime','departCode','departName']
});

