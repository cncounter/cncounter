
Ext.define('ESSM.controller.sys.RoleController', {
	extend  : 'Ext.app.Controller',
	requires : ['ESSM.ux.DeptTreePicker'],
	views   : ['sys.RoleView'],
	models  : ['sys.Role'],
	stores  : ['sys.RoleStore'],
	
	refs :[{
		ref : 'grid',
		selector : 'roleView'
	}],
	
	getMainView : function(){
		return this.getView('sys.RoleView');
	},
	
	init : function() {
		this.control({
			'roleView' : {
				//选择行事件
				'selectionchange' : function(view,records,eOpts) {
				
					if(records.length>0) {
						this.getGrid().down('button[action=update]').setDisabled(false);
						this.getGrid().down('button[action=delete]').setDisabled(false);
					} else {
						this.getGrid().down('button[action=update]').setDisabled(true);
						this.getGrid().down('button[action=delete]').setDisabled(true);
					}
				},
				'itemdblclick':function (grid,row){
					this.updateRole();
				}
			},
			//新建
			'roleView  button[action=create]': {
				click : this.createRole
			},
			//更新
			'roleView  button[action=update]': {
				click : this.updateRole
			},
			//删除
			'roleView  button[action=delete]': {
				click : this.deleteRole
			}
			
		});
	},
	/**
	 *创建一个新的form表单 
	 */
	roleForm : function(){
		return Ext.create('Ext.form.Panel',{
			width : 350,
			bodyPadding: '10',
			border : 0,
			fieldDefaults: {
		        msgTarget: 'side',
		        labelWidth: 90,
		        anchor    : '100%'
		    }, 
		    items : [{
		    	name:'id',
				xtype: 'textfield',
				hidden:true
		    },{
		    	xtype : 'textfield',
		    	fieldLabel: '<span style="color:red">*</span>角色代码',
		    	name: 'code',
                allowBlank: false,
                id:'role_code',
                tooltip: '请输入角色代码'
		    },{
		    	xtype : 'textfield',
		    	fieldLabel: '<span style="color:red">*</span>角色名称',
		    	name: 'name',
                allowBlank: false,
                tooltip: '请输入角色名称',
                validator:function(value){
                	if(value.length <= 20){
						return true;
					}else{
						return "角色名称长度<=20";
					}
                }
		    },
				{
					xtype: "combo",
					name: "roleType",
					forceSelection: true,
					editable : false,
					fieldLabel: "<span style='color:red'>*</span>角色分类",
					fields: ['dictValue', 'dictName'],
					queryMode: 'local',
					emptyText:'请选择...',
					displayField: 'dictName',
					valueField: 'dictValue',
					allowBlank:false,
					store: Ext.create('ESSM.store.sys.DictStore', {
						autoLoad : true,
						remoteSort : true,
						fields: ['dictValue', 'dictName'],
						proxy : {
							type: 'ajax',
							api : {
								read : 'rest/achieve/dict/listBy.json?catagory='+'role_type'
							},
							actionMethods: {
								read   : 'POST'
							},
							reader: {
								type: 'json',
								root:'data',
								messageProperty:'message'
							}
						}
					}),
					listeners: {
						select: {
							fn: function(combo, records, eOpts){
								if(records[0].data.dictValue!=1){
									combo.up().down("[name=departCode]").setVisible(false);
								}else{
									combo.up().down("[name=departCode]").setVisible(true);
								}
							}
						}
					}
				},
				{
					xtype:'deptTreePicker',
					displayField : 'deptName',
					valueField : 'deptCode',
					fieldLabel: "部门",
					orceSelection : true,// 只能选择下拉框里面的内容
					editable : false,// 不能编辑
					name: 'departCode',
					store: Ext.create('Ext.data.TreeStore', {
						nodeParam:'node',
						fields: ['deptName','deptCode','dtype'],
						root: {
							name:'',
							node:'',
							expanded: true
						},
						proxy: {
							type: 'ajax',
							url: 'rest/sys/department/newDeptTree.json'
						}
					})
				},




				{
		    	fieldLabel : '备注说明',
		    	xtype : 'textareafield',
		    	name : 'description',
		    	validator:function(value){
		    		if(value.length <= 30){
						return true;
					}else{
						return "备注说明长度<=30";
					}
                }
		    },{
				fieldLabel: '是否有效',
				name: 'status',
				xtype: 'checkboxfield',
				uncheckedValue : 0,
				inputValue : 1,
				checked : true,
				boxLabel : '是'
			}]
		}); 
	},
	
	/**
	 * 新增角色
	 */
	createRole : function() {
		var me = this;
		wr.openFormWin({
			title : '新增角色',
			items : me.roleForm()
		},function(form,win){
			form.form.submit({
				url : me.getGrid().getStore().getProxy().api.create,
				method : 'post',
				waitMsg : '正在保存数据...',
				success : function(form,action) {
					form.reset();
					win.close();
					me.getGrid().getStore().load();
				},
				failure : function(form,action) {
					Ext.Msg.alert('保存失败', action.result.message+'！');
				}
			});
		});
	},
	
	/**
	 *更新角色 
	 */
	updateRole : function() {
		var me = this,
		    record = this.getGrid().getSelectionModel().getLastSelected(),
			editForm = me.roleForm();
		//打开更新窗口
		wr.openFormWin({
			title : '更新角色',
			items : editForm
		},function(form,win){
			form.form.submit({
				url : me.getGrid().getStore().getProxy().api.update,
				method : 'post',
				waitMsg : '正在保存数据...',
				success : function(form,action) {
					form.reset();
					win.close();
					var records = me.getGrid().getSelectionModel().getSelection();
					 me.getGrid().getSelectionModel().deselect(records);
					me.getGrid().getStore().load();
				},
				failure : function(form,action) {
					Ext.Msg.alert('保存失败', '更新资源信息失败！');
				}
			});
		});
		editForm.loadRecord(record);
		editForm.queryById('role_code').setReadOnly(true);
		var store=editForm.down("[name=roleType]").store;
		store.load({
			callback: function(records, operation, success) {
				editForm.query("[name=roleType]")[0].setValue(record.data.roleType+"");
			},
			scope: this
		});
	},
	
	/**
	 *删除角色 
	 */
	deleteRole : function() {
		var record = this.getGrid().getSelectionModel().getLastSelected();
		if (null == record) {
			Ext.Msg.alert("提示信息", "请选择要删除的角色!");
		}else {
			url = this.getGrid().getStore().getProxy().api['destroy'],
            		me = this;

            		Ext.MessageBox.confirm('提示','您确实要删除选定的记录吗？', function(btn){
            			if(btn=='yes'){
            				Ext.Ajax.request({
            					url : url,
            					params : {id : record.get('id')},
            					success:function(r,e){
            						var obj=Ext.decode(r.responseText);
            						if(obj.success){
            							Ext.MessageBox.alert("成功","删除成功！");
            							me.getGrid().getStore().load();
            							me.getGrid().down('button[action=update]').setDisabled(true);
            							me.getGrid().down('button[action=delete]').setDisabled(true);
            						}else{
            							Ext.MessageBox.alert("失败",obj.message);
            						}
            					}
            				});
            			}
            		});
		}

	}
});