Ext.define("ESSM.view.base.ProjectListGrid", {
	extend: "Ext.grid.Panel",
	alias: "widget.projectListGrid",
	requires: ['ESSM.store.base.ProjectListStore'],
	//store: "configm.ProjectListStore",
	viewConfig: {
		loadMask: true
	},
	multiple : 0,
	initComponent : function(){
		this.selModel = Ext.create('Ext.selection.CheckboxModel', {mode: "SIMPLE", allowDeselect: true});
//		var multiple = this.multiple;
//		if(multiple == 1) {
//			this.selModel = Ext.create('Ext.selection.CheckboxModel', {mode: "SIMPLE", allowDeselect: true});
//		}else {
//			this.selModel = Ext.create('Ext.selection.CheckboxModel', {mode: "SINGLE", allowDeselect: true});
//		}
		this.store = Ext.create('ESSM.store.base.ProjectListStore', {});

		//
		var paging = Ext.create('Ext.toolbar.Paging', {
			store: this.store,
			displayInfo: true,
			displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
			emptyMsg: '无数据'
		});
		this.bbar = paging;
		//
		this.callParent();

	},
	selectedCallBack : function(data){
		//
	},
	tbar: [
		{
			xtype: 'textfield',
			name: "projectName",
			width : 325,
			allowBlank: false,
			readOnly : false,
			fieldLabel: "产品名称"
		},
		//{
		//	xtype: 'dictcombo',
		//	fieldLabel: '产品类型',
		//	name: 'userActionType',
		//	catagory : 'user_action_def',
		//	addall : 1,
		//	value: "",
		//	allowBlank: false,
		//	width : 325
		//},
		{
			xtype: 'button',
			action: 'query',
			iconCls: 'proceeds',
			text: '查询',
			listeners : {
				click : function(){
					var grid = this.up("grid");
					// store
					var store = grid.getStore();
					//
					var projectName = "";
					var projectName_input = grid.query("textfield[name=projectName]")[0];

					if(projectName_input){
						projectName = projectName_input.getValue();
					}
					debug("projectName:",projectName);
					var params = {
						'projectName' : projectName
					};
					store.proxy.extraParams = params;
					// 加载1页
					store.loadPage(1);
					//store.load({
					//	callback: function(records, options, success){
					//		Ext.Msg.alert('info', '加载完毕');
					//	}
					//});

				}
			}
		}, {
			xtype: 'button',
			action: 'reset',
			iconCls: 'publish',
			text: '重置',
			listeners : {
				click: function () {
					var grid = this.up("grid");
					// store
					var store = grid.getStore();
					//
					var projectName = "";
					var projectName_input = grid.query("textfield[name=projectName]")[0];
					projectName_input.setValue(" ");
					var params = {
						'projectName': projectName
					};
					store.proxy.extraParams = params;
					// 加载1页
					store.loadPage(1);

				}
			}
		}],


	columns: [
		{header: 'id', dataIndex: 'id', hidden: true},
		{header: '产品编号', dataIndex: 'projectCode', align:'center', width: 225},
		{header: '产品名称', dataIndex: 'projectName', align:'center', width: 225},
		{header: '产品类型编号', dataIndex: 'projectTypeCode', align:'center', width: 115},
		{header: '产品类型名称', dataIndex: 'projectTypeName', align:'center', width: 225},
		{header: '创建时间', dataIndex: 'createTime', align:'center', width: 175,
			renderer : function(value) {
				if(value) {
					return Ext.Date.format(new Date(value),"Y-m-d H:i:s");
				}
			}
		},
		{header: '更新时间', dataIndex: 'updateTime', align:'center', width: 175,
			renderer : function(value) {
				if(value) {
					return Ext.Date.format(new Date(value),"Y-m-d H:i:s");
				}
			}
		}
	],


	bbar: {
		xtype: 'pagingtoolbar',
		//store: 'salem.SalesProcessDataStore',
		store:'configm.ProjectListStore',
		displayInfo: true,
		displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
		emptyMsg: '无数据'
	}


});

