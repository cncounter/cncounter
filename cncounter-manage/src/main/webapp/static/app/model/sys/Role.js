
/**
 *角色管理model
 */
Ext.define('ESSM.model.sys.Role',{
	extend: 'Ext.data.Model',
	fields: ['id','code','name','status','description','createTime','modifyTime','departCode','roleType','departName','roleTypeName']
});
