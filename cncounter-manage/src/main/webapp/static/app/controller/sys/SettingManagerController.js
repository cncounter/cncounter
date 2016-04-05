
Ext.define('ESSM.controller.sys.SettingManagerController', {
		extend  : 'Ext.app.Controller',
		requires : ['Ext.ux.TreePicker'],

		views :  ['crm.SettingManagerView','crm.ManagerForm','crm.PosManagerForm'],
		models : ['crm.Manager'],
		stores : ['crm.SettingManagerStore'],

		//tree grid
		refs :[{
			ref : 'form',
			selector : 'managerForm'
		},{
			ref : 'posForm',
			selector : 'posManagerForm'
		},{
			ref : 'grid',
			selector : 'settingManagerView settingManagerGridView'
		},{
			ref : 'tree',
			selector : 'settingManagerView settingDeptTree'
		}],
		/**
		 *主界面
		 */
		getMainView : function(){

			return this.getView('crm.SettingManagerView');
		},
		departCode:'',
		departName:'',
		init : function() {
			this.control({
				'settingManagerGridView' : {
					//选择行事件
					'selectionchange' : function(view,records,eOpts) {
						/*	debugger;
						 if(records.length==0) {
						 this.getGrid().down('button[action=update]').setDisabled(true);
						 this.getGrid().down('button[action=delete]').setDisabled(true);
						 //this.getGrid().down('button[action=leave]').setDisabled(true);
						 } else {
						 this.getGrid().down('button[action=update]').setDisabled(false);
						 this.getGrid().down('button[action=delete]').setDisabled(false);
						 //this.getGrid().down('button[action=leave]').setDisabled(true);
						 }*/
					}
				},
				'settingManagerGridView button[action=create]' : {
					click : this.onCreateManager
				},
				'settingManagerGridView button[action=createteam]' : {
					click : this.onCreateTeamManager
				},
				//角色授予
				'settingManagerGridView  button[action=update]': {
					click : this.updateManager
				},
				//同步用户
				'settingManagerGridView  button[action=sycUser]' : {
					click : this.sycUser
				}// 重置密码
				,
				'settingManagerGridView  button[action=posupdate]': {

					click : this.posUpdateManager
				},
				//删除
				'settingManagerGridView  button[action=delete]': {
					click : this.deleteManager
				},
				//删除
				'settingManagerGridView  button[action=leave]': {
					click : this.leaveManager
				},
				'settingDeptTree' : {
					'itemclick' : this.onNodeClick,
					'load': this.onTreeLoad
				}
			});
		},
		onTreeLoad : function(view,record,item,index,e){
			//
			var tree = this.getTree();

			var mainView = this.getMainView();
			var rootNode = tree.getRootNode();
			/**
			 * 在树上所有的节点上加上监听事件　
			 * 如果判断为根节点，就执行此方法，如果判断不是根节点
			 * 择只执行一次逻辑判断
			 */
			rootNode.on('expand',function(obj){
				if(obj==tree.getRootNode()){
					var rootNode = obj;
					var childNodes = rootNode.childNodes;
					for(var i=0;i<childNodes.length;i++){
						childNodes[i].expand();
						var gradsonNodes = childNodes[i].childNodes;
						for(var j=0;j<gradsonNodes.length;j++){
							gradsonNodes[j].expand();
						}
					}
				}
			});
			//debug(this,tree,grid);
			//tree.onExpandAllClick.call(tree);
		},
		/**
		 *选择角色
		 */
		onNodeClick : function(view,record,item,index,e){
			var deptCode = record.raw.deptCode;
			var deptName = record.raw.deptName;
			loadMask = new Ext.LoadMask(this.getMainView(),{msg : '正在加载权限信息...'}),
				me = this;
			me.getGrid().getStore('crm.SettingManagerStore').loadPage(1,{
				params: {
					departCode:deptCode
				}
			});
			this.departCode = deptCode;
			this.departName = deptName;
			Ext.getCmp("departCode_id1").setValue(deptCode);
		},

		/**
		 *新增客户经理
		 * @param {Object} btn
		 */
		onCreateManager : function() {
			if(this.departCode == null || this.departCode == "" || this.departName == null || this.departName == ""){
				alert("请选择部门！");
				return;
			}

			var me = this;
			var wn ;
			wr.openFormWin({
				title : '新增客户经理',
				items : {
					xtype : 'managerForm'
				}
			},function(form,win){
				wn = win;
				form.form.submit({
					url : me.getGrid().getStore().getProxy().api.create,
					method : 'post',
					waitMsg : '正在保存数据...',
					success : function(form,action) {
						form.reset();
						win.close();
						me.getGrid().getStore('crm.SettingManagerStore').loadPage(1,{
							params: {
								departCode:me.departCode
							}
						});
					}
				});
			});
			Ext.getCmp('type').setValue(4);
			Ext.getCmp('departCode').setValue(this.departCode);

			Ext.getCmp('departName').setValue(this.departName);
			//Ext.getCmp('departName1').setValue(this.departName);
			Ext.getCmp('roleCode').setValue("financial_adviser");
			var managerstore = this.getForm().store;
			managerstore.removeAll(true);
			var turl = "rest/manager/user/getManageUserByDepartCode.json";
			Ext.Ajax.request({
				url : turl,

				params : {departCode:this.departCode},
				success:function(response){
					var result = Ext.JSON.decode(response.responseText,true);
//                if(result.success ==  true){
					var managers= result;
					if(managers.length ==  0){
						return;
					}
					for(var i=0;i<managers.length;i++){
						var record = [{
							id:managers[i].id,
							realName:managers[i].realName
						}];
						managerstore.loadData(record,true);
					}
//                }
				}
			});
//		var content = me.getForm().queryById('parentCodeContent');
//		content.add({
//			xtype:'treepicker',
//			displayField : 'deptName',
//			valueField : 'deptCode',
//			fieldLabel: '部门',
//			width : 400,
//			//store : Ext.create('ESSM.store.sys.DepartmentStore'),
//			store : me.getTree().getStore(),
//			listeners:{
//				select:function(f, v,  e){
//					me.getForm().getForm().findField('departCode').setValue(v.data.deptCode);
//					me.getForm().getForm().findField('departName').setValue(v.data.deptName);
//				}
//			}
//		});
		},

		/**
		 *新增团队经理
		 * @param {Object} btn
		 */
		onCreateTeamManager : function() {
			if(this.departCode == null || this.departCode == "" || this.departName == null || this.departName == ""){
				alert("请选择部门！");
				return;
			}
			var me = this;
			wr.openFormWin({
				title : '新增团队经理',
				items : {
					xtype : 'managerForm'
				}
			},function(form,win){

				form.form.submit({
					url : me.getGrid().getStore().getProxy().api.create,
					method : 'post',
					waitMsg : '正在保存数据...',
					success : function(form,action) {
						form.reset();
						win.close();
						me.getGrid().getStore('crm.SettingManagerStore').loadPage(1,{
							params: {
								departCode:me.departCode
							}
						});
					}
				});
			});
			Ext.getCmp('type').setValue(4);
			Ext.getCmp('departCode').setValue(this.departCode);
			Ext.getCmp('departName').setValue(this.departName);
			Ext.getCmp('departCode').setDisplayField(this.departName);
			//Ext.getCmp('departName1').setValue(this.departName);
			Ext.getCmp('roleCode').setValue("team_manager");
			Ext.getCmp('leader').hide();
//		var content = me.getForm().queryById('parentCodeContent');
//		content.add({
//			xtype:'treepicker',
//			displayField : 'deptName',
//			valueField : 'deptCode',
//			fieldLabel: '部门',
//			width : 400,
//			//store : Ext.create('ESSM.store.sys.DepartmentStore'),
//			store : me.getTree().getStore(),
//			listeners:{
//				select:function(f, v,  e){
//					me.getForm().getForm().findField('departCode').setValue(v.data.deptCode);
//					me.getForm().getForm().findField('departName').setValue(v.data.deptName);
//				}
//			}
//		});
		},

		/**
		 *更新
		 */
		updateManager : function(){
			var me = this,
				record = me.getGrid().getSelectionModel().getLastSelected();
			if(record == undefined ) {
				Ext.MessageBox.alert('提示','请选择一条记录！');
				return;
			}
			//显示 form
			wr.openFormWin({
				title : '更新客户经理信息',
				items : {
					xtype : 'managerForm'
				}
			},function(form,win){
				form.form.submit({
					url : me.getGrid().getStore().getProxy().api.update,
					method : 'post',
					waitMsg : '正在保存数据...',
					success : function(form,action) {
						form.reset();
						win.close();
						me.getGrid().getStore('crm.SettingManagerStore').loadPage(1,{
							params: {
								departCode:me.departCode
							}
						});
						me.getGrid().getSelectionModel().deselect(record);
					},
					failure : function(form,action) {
						Ext.Msg.alert('保存失败', '更新资源信息失败！');
					}
				});
			});
			me.getForm().loadRecord(record);
			/*	Ext.getCmp('pass').setValue("password");
			 Ext.getCmp('pass1').setValue("password");
			 Ext.getCmp('pass').hide();
			 Ext.getCmp('pass1').hide();
			 Ext.getCmp('pospass').setValue("password");
			 Ext.getCmp('pospass1').setValue("password");
			 Ext.getCmp('pospass').hide();
			 Ext.getCmp('pospass1').hide(); */
			//Ext.getCmp('departName1').setValue(this.departName);
			Ext.getCmp('roles').hide();
//		var content = me.getForm().queryById('parentCodeContent');
//		content.add({
//			xtype:'treepicker',
//			displayField : 'deptName',
//			valueField : 'deptCode',
//			fieldLabel: '部门',
//			width : 400,
//			store : Ext.create('ESSM.store.sys.DepartmentStore'),
//			listeners:{
//				select:function(f, v,  e){
//					me.getForm().getForm().findField('departCode').setValue(v.data.deptCode);
//					me.getForm().getForm().findField('departName').setValue(v.data.deptName);
//				}
//			}
//		});


			var managerstore = this.getForm().store;
			managerstore.removeAll(true);
			var turl = "rest/manager/user/getManageUserByDepartCode.json";
			Ext.Ajax.request({
				url : turl,
				params : {departCode:this.departCode},
				success:function(response){
					var result = Ext.JSON.decode(response.responseText,true);
					var managers= result;
					if(managers.length ==  0){
						return;
					}
					for(var i=0;i<managers.length;i++){
						var leaders = [{
							id:managers[i].id,
							realName:managers[i].realName
						}];
						managerstore.loadData(leaders,true);
					}
					Ext.getCmp('leader').setValue(record.data.superLeaderCode);
				}
			});

			//设置角色setvalue
			Ext.Ajax.request({
				url: 'rest/manager/user/findRolesByUserId.json',
				params: {
					id: record.get('id')
				},
				success: function(response){
					var text = response.responseText,vals =[],obj=[];
					if(text){
						obj = eval ("(" + text + ")");
						vals = eval(text);
					}
					me.getForm().queryById("rolesids").setValue(vals);
				}
			});


			//获取角色code来展现数据
			Ext.Ajax.request({
				url: 'rest/manager/user/findRoleCodesByUserId.json',
				params: {
					id: record.get('id')
				},
				success: function(response){
					var text = response.responseText,vals =[],obj=[];
					if(text){
						obj = eval ("(" + text + ")");
						vals = eval(text);
					}
					var s= (""+vals).split(',');
					for(var i=0;i<s.length;i++){
						if(s[i] ==  'team_manager'){
							Ext.getCmp('leader').hide();
						}
					}
				}
			});

//
//		//移除下拉树中当前修改的节点
//		var treeStore = editForm.getForm().findField('parentCode').getStore(),
//			//获取当前修改的节点
//			modifyNode = treeStore.getRootNode().findChild('deptCode',record.get('deptCode'),true);
//		//移除下拉树中当前修改的节点
//		modifyNode.remove();
		},
		/**设置用pos机密码*/
		posUpdateManager : function(){
			var me = this,
				record = me.getGrid().getSelectionModel().getLastSelected();
			if(record == undefined ) {
				Ext.MessageBox.alert('提示','请选择一条记录！');
				return;
			}
			//显示 form
			wr.openFormWin({
				title : '设置POS机密码',
				items : {
					xtype : 'posManagerForm'
				}
			},function(form,win){
				var posPasswd1 = Ext.getCmp('posPasswd1').value;
				var posPasswd2 = Ext.getCmp('posPasswd2').value;
				if(posPasswd1!=posPasswd2){
					Ext.Msg.alert('提示', '输入的两次密码不一致，请重新输入');
					return;
				}
				form.form.submit({
					url : me.getGrid().getStore().getProxy().api.updatePosPasswd,
					method : 'post',
					waitMsg : '正在保存数据...',
					success : function(form,action) {
						form.reset();
						win.close();
						me.getGrid().getStore('crm.SettingManagerStore').loadPage(1,{
							params: {
								departCode:me.departCode
							}
						});
						me.getGrid().getSelectionModel().deselect(record);
					},
					failure : function(form,action) {
						Ext.Msg.alert('保存失败', '更新资源信息失败！');
					}
				});
			});
			me.getPosForm().loadRecord(record);
			Ext.getCmp('roles').hide();


			var managerstore = this.getPosForm().store;
			managerstore.removeAll(true);
			var turl = "rest/manager/user/getManageUserByDepartCode.json";
			Ext.Ajax.request({
				url : turl,
				params : {departCode:this.departCode},
				success:function(response){
					var result = Ext.JSON.decode(response.responseText,true);
					var managers= result;
					if(managers.length ==  0){
						return;
					}
					for(var i=0;i<managers.length;i++){
						var leaders = [{
							id:managers[i].id,
							realName:managers[i].realName
						}];
						managerstore.loadData(leaders,true);
					}
					Ext.getCmp('leader').setValue(record.data.superLeaderCode);
				}
			});

			//设置角色setvalue
			Ext.Ajax.request({
				url: 'rest/manager/user/findRolesByUserId.json',
				params: {
					id: record.get('id')
				},
				success: function(response){
					var text = response.responseText,vals =[],obj=[];
					if(text){
						obj = eval ("(" + text + ")");
						vals = eval(text);
					}
					me.getPosForm().queryById("rolesids").setValue(vals);
				}
			});


			//获取角色code来展现数据
			Ext.Ajax.request({
				url: 'rest/manager/user/findRoleCodesByUserId.json',
				params: {
					id: record.get('id')
				},
				success: function(response){
					var text = response.responseText,vals =[],obj=[];
					if(text){
						obj = eval ("(" + text + ")");
						vals = eval(text);
					}
					var s= (""+vals).split(',');
					for(var i=0;i<s.length;i++){
						if(s[i] ==  'team_manager'){
							Ext.getCmp('leader').hide();
						}
					}
				}
			});
		},

		/**
		 *删除
		 */
		deleteManager : function() {
			var record = this.getGrid().getSelectionModel().getLastSelected();
			if(record == undefined) {
				Ext.MessageBox.alert('提示','请选择一条记录！');
				return;
			}
			url = this.getGrid().getStore().getProxy().api['destroy'],
				me = this;

			Ext.MessageBox.confirm('提示','您确认要删除用户<font color="red">'+record.get('realName')+'</font>吗？', function(btn){
				if(btn=='yes'){
					Ext.Ajax.request({
						url : url,
						params : {id : record.get('id')},
						success:function(){
							Ext.MessageBox.alert("成功","删除成功！");
							//me.getGrid().setLoading(true);
							me.getGrid().getStore('crm.SettingManagerStore').loadPage(1,{
								params: {
									departCode:me.departCode
								}
							});
							me.getGrid().down('button[action=update]').setDisabled(true);
							me.getGrid().down('button[action=delete]').setDisabled(true);
						}
					});
				}
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
								maxValue:new Date(),
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
		 *离职
		 */
		leaveManager : function() {
			var record = this.getGrid().getSelectionModel().getLastSelected();
			if(record == undefined) {
				Ext.MessageBox.alert('提示','请选择一条记录！');
				return;
			}
			me = this;
			Ext.MessageBox.confirm('提示','您确认为此用户<font color="red">'+record.get('realName')+'</font>办理离职？', function(btn){
				if(btn=='yes'){
					Ext.Ajax.request({
						url : me.getGrid().getStore().getProxy().api.leave,
						params : {id : record.get('id')},
						success:function(){
							Ext.MessageBox.alert("成功","离职成功！");
							//me.getGrid().setLoading(true);

							me.getGrid().getStore('crm.SettingManagerStore').loadPage(1,{
								params: {
									departCode:me.departCode
								}
							});
							me.getGrid().down('button[action=update]').setDisabled(true);
							me.getGrid().down('button[action=delete]').setDisabled(true);
						}
					});
				}
			});
		}
	});