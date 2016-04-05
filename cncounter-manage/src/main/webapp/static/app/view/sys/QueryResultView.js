Ext.define("ESSM.view.sys.QueryResultView",{
	extend: "Ext.panel.Panel",
	alias : "widget.queryResultView",
    layout: 'border',
    items: [{
        region: 'north',
        xtype: 'queryResultForm',
        height: 120,
        split: true,
        //html: '欢迎登录!',
        margins: '0 5 5 5'
    },{
        title: '查询结果',
        name : 'resultPanel',
        region: 'center',
        xtype: 'panel',
        layout: 'fit',
        margins: '5 5 0 0',
        html:'没有Result。'
    }]

});

