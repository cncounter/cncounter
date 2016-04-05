/**
 * GridData对应的基础Store
 */
Ext.define('ESSM.store.base.GridDataBaseStore',{
    extend: 'Ext.data.Store',
    //autoLoad : true,
    listeners: {
        datachanged : function(store, eOpts){
            var reader = store.proxy.getReader() || {};
            var jsonData = reader.jsonData || {};
            var meta = jsonData.meta;
            var message = jsonData.message;
            if(meta){
                store.meta = meta; // 放置到 store 中
            }
            if(message){
                store.message = message; // 放置到 store 中
            }
        }
    },
    pageSize : 20
});
