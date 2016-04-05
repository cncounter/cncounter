Ext.define("ESSM.view.sys.UserLogoffView",{
	extend : "Ext.panel.Panel",
	alias : "widget.salesProcessDataView",
	border : false,
	layout : 'border',
	items : [ {
		region : 'north',
		xtype : "userLogoffForm",
		id : 'userLogoffForm'

	},{
		region : 'center',
		xtype : "userLogoffGrid",
		layout : 'fit',
		split : true,
		border : true
	} ]
});

