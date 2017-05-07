

/**
 *权限资源类
 */
Ext.define('ESSM.store.sys.PermissionStore',{
    extend: 'Ext.data.TreeStore',
    autoLoad : true,
    model: 'ESSM.model.sys.Permission',

    proxy:{
        type:'ajax',
        url:'rest/sys/permission/getAllMenuButton.json'
    },

    findRecord : function(prop, value){
        return this.getRootNode().findChild(prop,value);
    }
});
