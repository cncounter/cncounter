
/**
    搜索建议的Combo.基本上完全兼容, 使用方式与Combo下拉框一样.
    需要后台程序根据keyword进行搜索建议.

 组件使用方式:
    {
        xtype: 'searchCombo',
        fieldLabel: 'XXXX属性',
        name: 'xxxxName',
        editable: true,
        displayField: 'xxxName',
        valueField: 'xxxID'
        searchWordKey : "keyword", // 搜索的属性名称
        searchSizeKey : "searchSize", // 传递数量的KEY
        searchSize : 5, // 返回的数量
        store: Ext.create('XXX.xxx.xxxStore', {
            proxy : {
                type: 'ajax',
                api : {
                    read : 'xxx/xxx/listBy.json'
                },
                actionMethods: {
                    read   : 'POST'
                },
                reader: {
                    type: 'json',
                    root:'data',
                    totalProperty: 'totalCount',
                    messageProperty:'message'
                },
                extraParams: {
                    xxxname : 'xxxvalue'
                }
            }
        })
    }
    //
    // 记得使用:
    // requires : ["ESSM.view.base.SearchComboBox"]

 // Contoller 使用方式, 类似下面这样:
 //
 var acType = "";
 var acTypeName = "";
 var acTypeCombo = me.getXXXForm().query('searchCombo[name=acType]')[0];
 if(acTypeCombo){
	acType = acTypeCombo.getValue();
	acTypeName = acTypeCombo.getRawValue();
}
 如果要监听事件,应该监听 select 事件
 select( Ext.form.field.ComboBox combo, Array records, Object eOpts );
 */
Ext.define("ESSM.view.base.SearchComboBox",{
    extend: "Ext.form.field.ComboBox",
    alias : ["widget.searchCombo", "widget.searchComboBox"],
    editable: true,
    enableKeyEvents : true,
    searchWordKey : "keyword", // 搜索的属性名称
    searchSizeKey : "searchSize", // 传递数量的KEY
    searchSize : 5, // 返回的数量
    searchPageKey:"searchPage",
     searchPage:1,
    prevKeyWord : null,
    initComponent : function() {
        //
        var keyup = "keypress";
        var change = "change";
        var active = "active";
        this.addListener(keyup, this.keyupFn, this)
        this.addListener(change, this.keyupFn, this)
        this.addListener(active, this.keyupFn, this)
        this.callParent();
    }
    , keyupFn : function(combo, e){
        //
        var store = this.getStore && this.getStore();
        if(!store){  return; }
        //
        var proxy = store.getProxy();
        if(!proxy){ return; }
        // 获取输入的文本内容
        var text = this.getRawValue() || "";
        text = text.trim().replace(/\w/g, "");
        if(text == this.prevKeyWord){
            return;
        }
        //
        this.prevKeyWord = text;
        // 设置到参数里面
        var extraParams = proxy.extraParams || {};
        proxy.extraParams = extraParams;
        //
        var searchWordKey = this.searchWordKey;
        var searchSizeKey = this.searchSizeKey;
        var searchPageKey = this.searchPageKey;
        var searchSize = this.searchSize || 5;
        var searchPage= this.searchPage || 1;
        // 设置到参数里面
        extraParams[searchWordKey] = text;
        extraParams[searchSizeKey] = searchSize;
         extraParams[searchPageKey] = searchPage;

        // 使用 store 加载
        store.load();
    }

});

