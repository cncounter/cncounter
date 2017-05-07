Ext.define('ESSM.controller.sys.UserController', {
	extend  : 'Ext.app.Controller',
	requires : ['Ext.ux.TreePicker'],
	views : ['sys.UserView','sys.UserForm'],
	stores : ['sys.UserStore','sys.RoleStore'],
	models : ['sys.User'],
	refs : [{
		ref : 'form',
		selector : 'userForm'
	},{
		ref : 'grid',
		selector : 'userView'
	}],
	getMainView : function(){
		return this.getView('sys.UserView');
	},
	
	init : function() {
		this.control({
			
			'userView button[action=create]' : {
				click : this.onCreateUser
			},
			//更新
			'userView button[action=update]': {
				click : this.onUpdateUser
			},
			//删除
			'userView button[action=delete]': {
				click : this.onDeleteUser
			},
			//查询
			'userView userFilter button[action=query]' : {
				click : this.onQuery
			},// 重置密码
            'userView textactioncolumn': {
                resetpwdclick: this.resetPwd
            },
			//同步用户
			'userView  button[action=sycUser]' : {
				click : this.sycUser
			}// 重置密码
		});
	},




	sycUser:function(){
		var me = this;
		wr.openFormWin({
			title : '同步基础数据',
			items : {
				xtype: 'form',
				layout: 'column',
				fieldDefaults: {
					msgTarget: 'side',
					columnWidth: .3,
					style : {
						marginLeft : '25px'
					},
					labelWidth: 90
				},
				items:[
					{
						style : {
							marginTop : '20px'
						},
						xtype: 'fieldcontainer',
						anchor: '60%  5%',
						items:[
							{
								xtype: "datefield",
								name: "beginDate",
								width :250,
								format: 'Y-m-d',
								fieldLabel: "开始时间",
								id:'synBaseBeginTime1',
								vtype : 'daterange',//daterange类型为上代码定义的类型
								endDateField : 'synBaseEndTime1'//必须跟endDate的id名相同
							},{
								xtype: "datefield",
								name: "endDate",
								width :250,
								format: 'Y-m-d',
								fieldLabel: "结束时间",
								id:'synBaseEndTime1',
								//axValue:new Date(),
								vtype : 'daterange',//daterange类型为上代码定义的类型
								startDateField : 'synBaseBeginTime1'
							}
						]
					}
				]
			}
		},function(form,win){
			form.form.submit({
				url : "rest/sys/user/synchronismUserData.json",
				method : 'post',
				waitMsg : '正在同步数据...',
				success : function(form,r) {
					form.reset();
					win.close();

					Ext.Msg.alert('操作成功', '通过接口同步基础数据信息成功');
				},
				failure : function(form,action) {
					Ext.Msg.alert('操作失败', '通过接口同步基础数据信息异常');
				}
			});
		});
	},

	/**
	 *新增用户 
	 */
	onCreateUser : function() {
		var me = this;
		//打开窗口
		wr.openFormWin({
			title : '新增用户',
			items : {
				xtype : 'userForm'
			}
		},function(form,win) {
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
		
		var content = me.getForm().queryById('departmentIdContent');
		var store = Ext.create('ESSM.store.sys.DepartmentTreeStore');
		content.add({
			xtype:'treepicker',
			displayField : 'deptName',
			valueField : 'deptCode',
			fieldLabel: '<span style="color:red">*</span>所属部门',
			forceSelection : true,
			width : 300,
			store : store,
			name: 'departCode',
			allowBlank: false,
	        tooltip: '请选择所选部门'
		});
		
	},
	
	/**
	 *更新用户信息 
	 */
	onUpdateUser : function() {
		var records = this.getGrid().getSelectionModel().getSelection(),
		me = this;
		if(records.length==0) {
			Ext.MessageBox.alert('提示','请选择一条记录！');
			return;
		}
	var record = records[0];
	//打开窗口
	wr.openFormWin({
		title : '更新用户',
		items : {
			xtype : 'userForm'
		}
	},function(form,win) {
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
	var pass = this.getForm().queryById('pass');
	pass.setDisabled(true);
	pass.setVisible(false);
	var pass1 = this.getForm().queryById('pass1');
	pass1.setDisabled(true);
	pass1.setVisible(false);
	this.getForm().queryById('user_username').setReadOnly(true);
	
	//设置角色setvalue
	Ext.Ajax.request({
	    url: 'rest/sys/user/findRolesByUserId.json',
	    params: {
	        id: record.get('id')
	    },
	    success: function(response){
	        var text = response.responseText,vals =[],obj=[];
	        if(text){
	            obj = eval ("(" + text + ")");
	        	vals = eval(text);
	        }
	        me.getForm().queryById("combo").setValue(vals);
//	        me.getForm().queryById("combo").select(vals);/
	    }
	});
	this.getForm().loadRecord(record);
	var store = Ext.create('ESSM.store.sys.DepartmentTreeStore');
	this.getForm().queryById('departmentIdContent').add(
			Ext.create('Ext.ux.TreePicker',{
				xtype:'treepicker',
				store : store,
				displayField : 'deptName',
				valueField : 'deptCode',
				fieldLabel: '<span style="color:red">*</span>所属部门',
				forceSelection : true,
				anchor : '60%',
				value : record.get('departCode'),
				width : 300,
				name: 'departCode',
				allowBlank: false,
		        tooltip: '请选择所属部门'
				
			})
		);
	
	
	
	
	

	},
	
	/**
	 * 删除用户信息
	 */
	onDeleteUser : function(){
		var records = this.getGrid().getSelectionModel().getSelection(),
			url = this.getGrid().getStore().getProxy().api['destroy'],
			me = this;
		if(records.length==0) {
			Ext.MessageBox.alert('提示','请选择一条记录！');
			return;
		}
		Ext.MessageBox.confirm('提示','您确实要删除选定的记录吗？', function(btn){
		if(btn=='yes'){
			Ext.Ajax.request({
				url : url,
				params : {id : records[0].get('id')},
				success:function(){
					Ext.MessageBox.alert("成功","删除成功！");
					me.getGrid().getStore().load();
				}
			});
		}
	});
	},
	
	/**
	 *查询 
	 */
	onQuery : function(btn) {
		var me = this,
		 	form = btn.up('form'),
			values = form.getForm().getValues();
		
		//查询
		me.getStore('sys.UserStore').loadPage(1,{
			params : values
		});
	}
    ,
    resetPwd : function (record, grid, rowIndex, colIndex, item, e) {
        //
        if(!record){
            return;
        }
        if(!record.data){
            return;
        }
        var data = {};
        Ext.apply(data, record.data);
        //
        data.newPassword = randomPassword(data.name);

        var resetPwdForm = Ext.create("ESSM.view.sys.ResetPwdForm", { });
        resetPwdForm.loadRecord({
            data : data,
            getData: function(){
                return this.data;
            }
        });
        //
        var win = Ext.create('Ext.window.Window', {
            title: '重置密码',
            height: 260,
            width: 480,
            layout: 'fit',
            buttonAlign: 'center',
            modal : true,
            items: [resetPwdForm],
            buttons: [
                {
                    text: '确定',
                    handler: resetHandler
                },{
                    text: '取消',
                    handler: function (btn) {
                        var w = btn.up('window');
                        w.close();
                    }
                }
            ]
        });
        //
        win.show();
        //
        function resetHandler(OKbtn) {
            //
            var form = resetPwdForm.getForm();
            var isValid = form.isValid();
            if(!isValid){
                return;
            }
            //
            var params = form.getValues();
            if(!params){
                return;
            }
            var name = params.name;
            if(!name){
                return;
            }

            Ext.MessageBox.confirm('提示','确定重置用户[' + name+']的密码？', function(btn){
                if(btn=='yes'){
                    //
                    url = "rest/sys/user/resetPwd.json";
                    //
                    Ext.Ajax.request({
                        url : url,
                        params : params,
                        success:function(){
                            Ext.MessageBox.alert("成功","重置密码成功！");
                            //
                            var w = OKbtn.up('window');
                            w.close();
                        }
                    });
                }
            });
            //
        };
        //
        function randomPassword(name){
            name = name || "pwd";
            name = name.substr(0,3);
            var r = 1000 + 9000 * Math.random();
            //
            return name + "_"+ r.toFixed(0);
        };
    }
});