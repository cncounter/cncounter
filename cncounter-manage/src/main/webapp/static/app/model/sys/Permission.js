/**
 *资源菜单类
 */
Ext.define('ESSM.model.sys.Permission',{
    extend: 'Ext.data.Model',
    fields: ['id','code','name','type','parentCode','sort','status','text','checked','leaf','expanded']
});

