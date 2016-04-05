Ext.define("ESSM.view.sys.DepartmentView",{
	extend: "Ext.panel.Panel",
	store : 'sys.DepartmentStore',
	alias : "widget.departmentView",
	border : false,
	layout : 'border',
	items: [{
		region: 'north',            //子元素的方位：north、west、east、center、south
		xtype: "panel",
		tbar : [{
			xtype : 'authcbutton',
			action : 'create',
			iconCls : 'add',
			disabled : true,
			text :'新增'
		},{
			xtype : 'authcbutton',
			action : 'update',
			iconCls : 'edit',
			disabled : true,
			text :'修改'
		},{
			xtype : 'authcbutton',
			action :'delete',
			iconCls : 'delete',
			disabled : true,
			text : '删除'
		}],
		height: 35
	}, {
		region: 'west',
		xtype: "deptTree",
		width: 300,
		border : true

	}, {
		region: 'center',
		xtype: "departmentForm",
		//disabled: true,
		border : true
	}
	]

});

/**
 * 输入表单
 */
Ext.define("ESSM.view.sys.DepartmentForm",{
	extend:"Ext.form.Panel",
	alias:"widget.departmentForm",
	bodyPadding: '10',
	waitMsgTarget : true,
	border : 0,
	width : 600,
	buttonAlign : 'center',
	fieldDefaults: {
		msgTarget: 'side',
		labelWidth: 90
	},
	initComponent : function(){

		this.items =  [
			{
				name:'id',
				xtype: 'textfield',
				hidden:true
			},{
				name:'parentCode',
				xtype: 'textfield',
				hidden:true
			},{
			xtype: 'fieldcontainer',
			layout: 'column',
			fieldDefaults: {
				msgTarget: 'side',
				columnWidth : .5,
				labelWidth: 90
			},
			items : [{
				xtype: 'fieldcontainer',
				items:[{
					xtype:'textfield',
					fieldLabel: '<span style="color:red">*</span>部门名称',
					name: 'deptName',
					id:'deptInfo_name',
					anchor : '80%',
					allowBlank: false,
					tooltip: "请输入部门名称",
					validator : function(value){
						if(value.length <= 20){
							return true;
						}else{
							return "部门名称长度<=20";
						}
						
			        }
				}]
			}]
		},{
			xtype: 'fieldcontainer',
			layout: 'column',
			fieldDefaults: {
				msgTarget: 'side',
				columnWidth : .5,
				labelWidth: 90
			},
			items : [{
				xtype: 'fieldcontainer',
				items:[{
					xtype:'textfield',
					fieldLabel: '<span style="color:red">*</span>部门代码',
					name: 'deptCode',
					allowBlank: false,
					anchor : '80%',
					tooltip: '请输入部门代码'
				}]
			}]
		},{
			xtype: 'fieldcontainer',
			items:[{
				xtype:'textarea',
				fieldLabel: '备注说明',
				name: 'deptInfo',
				id : 'deptInfo_id',
				allowBlank: true,
				anchor : '80% -10',
				validator:function(value){
                	if(value.length <= 30){
						return true;
					}else{
						return "备注说明长度<=30";
					}
                }
			}]
		}, {
			xtype: 'fieldcontainer',
			items :[
				{
					xtype : 'authcbutton',
					action : 'save',
					iconCls : 'edit',
					style: {marginLeft:'20px'},
					width : 80,
					//disabled : true,
					text :'保 存'
				}/*,{
					xtype : 'authcbutton',
					action : 'cancel',
					iconCls : 'cancel',
					style: {marginLeft:'30px'},
					width : 80,
					//disabled : true,
					text :'取 消'
				}*/
			]
		}
		];
		this.callParent();
	}
});


/**
 * 部门树
 */
Ext.define('ESSM.view.sys.DeptTree', {
	extend: 'Ext.tree.Panel',
	alias : "widget.deptTree",
	title: '部门列表',
	rootVisible: false,
	useArrows: false,

	initComponent: function() {
		Ext.apply(this, {
			store: Ext.create('ESSM.store.sys.DepartmentTreeStore'),
			//store:Ext.create('ESSM.store.sys.PermissionStore'),
			viewConfig: {
				plugins: {
					ptype: 'treeviewdragdrop',
					containerScroll: true
				}
			}
		});

		this.callParent();
	}
});

/*

 var root = tree.getRootNode();

 var parent = root.appendChild({
 text: 'Child 1',
 leaf: true
 });
 */


