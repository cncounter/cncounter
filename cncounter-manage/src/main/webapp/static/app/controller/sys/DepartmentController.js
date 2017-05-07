Ext.define('ESSM.controller.sys.DepartmentController', {
	extend  : 'Ext.app.Controller',
	requires : ['Ext.ux.TreePicker'],
	
	views :  ['sys.DepartmentView'],
	models : ['sys.Department'],
	stores : ['sys.DepartmentStore'],
	
	//tree grid
	refs :[{
		ref : 'deptView',
		selector : 'departmentView'
	},{
		ref : 'deptTree',
		selector : 'departmentView deptTree'
	},{
		ref : 'deptForm',
		selector : 'departmentView departmentForm'
	}
	],
	/**
	 *主界面 
	 */
	getMainView : function(){
		return this.getView('sys.DepartmentView');
	},
	
	init : function() {
		this.control({
			'deptTree' : {
				//选择行事件
				'selectionchange' : function(view,records) {
					if(records.length==0) { // 没有选中
						this.getDeptView().down('button[action=update]').setDisabled(true);
						this.getDeptView().down('button[action=delete]').setDisabled(true);
						var deptForm = this.getDeptForm();
						//deptForm.setDisabled(true);
						
					}
				},
				'select': function(view, record, index, eOpts ){
					//debug("select event");
				},
				'itemclick': function(view, record){//,item, index, e, eOpts
					//
					if(!record){
						return;
					}
					//
					var deptView = this.getDeptView();
					var deptForm = this.getDeptForm();
					// 更新按钮
//					deptView.down('button[action=update]').setDisabled(true);
					//
					var data = record.data;
					var canotDelete =  !!(data && data.children && data.children.length);
					if(canotDelete){
						deptView.down('button[action=delete]').disable(true);
					} else {
						deptView.down('button[action=delete]').enable(true);
					}
					//deptView.down('button[action=delete]').setDisabled(canotDelete);
					// 加载数据到Form
					deptForm.loadRecord(record);
					//deptForm.setDisabled(true);
					
				}
			},
			'departmentView button[action=create]' : { //添加
				click : this.onCreateDept
			},
			'departmentView  button[action=update]': {	//更新
				click : this.updateDept
			},
			'departmentView  button[action=delete]': { //删除
				click : this.deleteDept
			},
			'departmentView  button[action=save]': { //保存
				click : this.saveDept
			},
			'departmentView  button[action=cancel]': { //取消
				click : this.cancelSave
			}
		});
	},

	/**
	 *新增部门
	 */
	onCreateDept : function() {
		//
		var deptForm = this.getDeptForm();
		var deptTree = this.getDeptTree();
		//
		var record = deptTree.getSelectionModel().getLastSelected();
		//
		var parentCode = null; //
		if(!record){
			//
			Ext.MessageBox.confirm('没有选中部门','要增加顶级部门吗？', confirmHandler);
			//闭包函数
			function confirmHandler(btn){
				if(btn !='yes') {
					return;
				}
				parentCode = '0'; // 顶层部门
				addToForm();
			}
		} else {
			parentCode = record.data.deptCode;
			addToForm();
		}
		//
		function addToForm(){
			//
			var data = {
				'id': '',
				'deptCode': '',
				'deptName': '',
				'deptInfo': '',
				'parentCode': parentCode
			};
			//
			// 重置
			deptForm.getForm().reset();
			// 设置各个字段的值
			var newRecord = {
				data : data,
				getData: function (){
					return this.data;
				}
			};
			deptForm.loadRecord(newRecord);
			// 设置为可用
			//deptForm.setDisabled(false);
			
		}
	},
	
	/**
	 *更新 
	 */
	updateDept : function(){
		//
		var deptForm = this.getDeptForm();
		var deptTree = this.getDeptTree();
		//
		var record = deptTree.getSelectionModel().getLastSelected();
		if(record){
			deptForm.loadRecord(record);
		}
		// 设置为可用
		//deptForm.setDisabled(false);
		
		
		//
	},
	
	/**
	 *删除 
	 */
	deleteDept : function() {
		var me = this;
		var deptForm = this.getDeptForm();
		var deptTree = this.getDeptTree();
		//
		var record = deptTree.getSelectionModel().getLastSelected();
		//
		if(!record){
			Ext.Msg.alert('提示', '请选择要删除的部门节点！');
			return;
		}
		var data = record.data;
		if(data && data.children && data.children.length){
			Ext.Msg.alert('提示', '只能删除叶子节点！');
			return;
		}
		//
		Ext.MessageBox.confirm('提示','您确实要删除选定的记录吗？', confirmHandler);
		//
		//闭包函数, 选择节点非root 和非只读则可删除
		function confirmHandler(btn){
			if(btn !='yes') {
				return;
			}
			var data = record.data;
			var deptCode = data.deptCode;
			var id = data.id;
			//
			me.postAjax({
				url : 'rest/sys/department/delete.json',
				data : data,
				success : function(json){
					// 重新加载 tree
					deptTree.getStore().load({
						callback : function(){
							deptTree.expandAll();
							deptForm.getForm().reset();
							//deptForm.setDisabled(true);
							
						}
					});
				}
			});
		}
	},
	postAjax : function(param){
		//
		var me = this;
		if(!param){
			return;
		}
		var url = param.url;
		var data = param.data || {};
		var success = param.success ;
		var msg = param.msg || '正在与服务器通信...';
		//
		if(!url){
			return;
		}
		//
		var loadMask = new Ext.LoadMask(this.getDeptView(),{msg : msg});
		//保存数据
		loadMask.show();
		//
		var callback = function(response){
			loadMask.destroy();
			//
			var text = response.responseText;
			// process server response here
			var json = Ext.JSON.decode(text, true);
			var message = json.message || "操作执行失败";
			if(!json.success){
				// 提示失败
				Ext.Msg.alert('请求失败', message);
			}else{
				//成功,简单调用
				success && success.call(me,json);
			}
		};
		Ext.Ajax.request({
			url :url,
			method : 'POST',
			params : data,
			success : callback
		});
	},
	/**
	 * 保存
	 */
	saveDept : function(){

		//var me = this; // TODO
		var deptForm = this.getDeptForm();
		var deptTree = this.getDeptTree();
		var deptView = this.getDeptView();

		var form = deptForm.getForm();
		
		var deptName = deptView.queryById('deptInfo_name').getValue();
		if(deptName.length > 20){
			Ext.Msg.alert("提示","部门名称长度不能超过20！");
			return ;
		}
		var v = deptView.queryById('deptInfo_id').getValue();
		if(v.length > 30){
			Ext.Msg.alert("提示","备注说明长度不能超过30！");
			return ;
		}
		//
		var values = form.getValues();
		var url = 'rest/sys/department/insert.json';
		if(values.id){
			url = 'rest/sys/department/update.json';
		}
		
		//deptForm.setDisabled(true);
		this.postAjax({
			url : wr.ctx + url,
			data : values,
			success : function(json){
				// 重新加载 tree
				deptTree.getStore().load({
					callback : function(){
						deptTree.expandAll();
						
						//deptForm.setDisabled(true);
						var records = deptTree.getSelectionModel().getSelection();
						deptTree.getSelectionModel().deselect(records);
						deptView.down('button[action=update]').enable(true);
					}
				});
			}
		});
	},
	/**
	 * 取消保存
	 */
	cancelSave : function(){
		var deptForm = this.getDeptForm();
		
		//deptForm.setDisabled(true);
	}
});