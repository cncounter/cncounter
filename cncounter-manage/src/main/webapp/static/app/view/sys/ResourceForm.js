
Ext.define("ESSM.view.sys.ResourceForm",{
	extend:"Ext.form.Panel",
	alias:"widget.resourceForm",
	//frame: true,
	bodyPadding: '10',
	waitMsgTarget : true,
	border : 0,
	width : 800,
	buttonAlign : 'center',
	fieldDefaults: {
		msgTarget: 'side',
		labelWidth: 90
	},
	initComponent : function(){

		this.items =  [{
			name:'id',
			xtype: 'textfield',
			hidden:true
		},{
			name:'parentId',
			xtype: 'textfield',
			hidden:true
		},{
			
		xtype: 'fieldcontainer',
		layout: 'column',
		items : [{
			xtype: 'fieldcontainer',
			layout: 'column',
			id : 'parentCodeContent',
			fieldDefaults: {
				labelWidth: 90
			}
		},{
			border : false,
			width : 20,
			items : {border : false,html : '&nbsp;'}
		},{
			xtype : 'button',
			iconCls : 'window',
			id : 'parentCodecancel',
			text : '取消所选'
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
					fieldLabel: '资源代码',
					name: 'code',
					allowBlank: false,
					anchor : '80%',
					tooltip: '请输入资源代码'
				}]
			},{
				xtype: 'fieldcontainer',
				items:[{
					xtype:'textfield',
					fieldLabel: '资源名称',
					name: 'name',
					anchor : '80%',
					allowBlank: false,
					tooltip: "请输入资源名称",
					validator : function(value){
						if(value.length <= 20){
							return true;
						}else{
							return "资源名称长度<=20";
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
			items:[
				{
					xtype : 'hiddenfield',
					name : 'iconCls'
				},{
					xtype: 'fieldcontainer',
					layout: 'column',
					items : [{
						html : '资源icon:',
						border : false,
						width : 95
					},{
						border : false,
						width : 60,
						id : 'viewIcon',
						items : {border : false,html : '&nbsp;'}
					},{
						xtype : 'button',
						iconCls : 'window',
						action : 'select',
						text : '选择'
					}]
				},{
					xtype: 'fieldcontainer',
					items:[{
						xtype:'textfield',
						fieldLabel: '资源URI',
						name: 'uri',
						anchor : '80%',
						tooltip: "请输入资源URI"
					}]
				}
			]
		},{
			fieldLabel: '是否菜单模块',
			name: 'type',
			xtype: 'checkboxfield',
			uncheckedValue : 2,
			inputValue : 1,
			boxLabel : '是'
		}, {
			xtype: 'numberfield',
			fieldLabel: '排序',
			value : 0,
			width: 160,
			name: 'sort'
		},{
			fieldLabel: '是否显示',
			name: 'status',
			xtype: 'checkboxfield',
			uncheckedValue : 0,
			inputValue : 1,
			checked : true,
			boxLabel : '是'
		}],
		this.callParent();
	}
});