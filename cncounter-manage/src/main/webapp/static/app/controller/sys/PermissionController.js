
/**
 *权限操作类
 */
Ext.define('ESSM.controller.sys.PermissionController', {
	extend  :  'Ext.app.Controller',
	requires : ['Ext.ux.TreePicker'],
	views   :  ['sys.PermissionView'],
	models :   ['sys.Role','sys.Permission'],
	stores :   ['sys.RoleStore','sys.PermissionStore'],
	identity : false,
	identityType : 0,

	refs : [{
		ref :'main',
		selector : 'permissionView'
	},{
		ref : 'tab',
		selector : 'permissionView tabpanel'
	},{
		ref : 'permissionGrid',
		selector : 'permissionView treepanel'
	},{
		ref : 'roleList',
		selector : '#roleList'
	},{
		ref :'btnSave',
		selector : 'permissionView treepanel button[action=update]'
	}],
	/**
	 *获取主界面
	 */
	getMainView : function() {
		return this.getView('sys.PermissionView');
	},

	init : function() {
		this.control({
			'#roleList' : {
				'itemclick' : this.onRoleSelect
			},
			'permissionView treepanel button[action=update]' : {
				'click' : this.onSavePermission
			}
		});
	},

	/**
	 *选择角色
	 */
	onRoleSelect : function(view,record ,index) {
		var id = record.get('id'),
			loadMask = new Ext.LoadMask(this.getMain(),{msg : '正在加载权限信息...'}),
			me = this;
		loadMask.show();
		//类型
		me.identity = id;
		me.identityType = 0;

		Ext.Ajax.request({
			url : 'rest/sys/permission/rolePermissionMenu.json',
			params : {code : id},
			success : function(response,opts) {
				var permission = Ext.JSON.decode(response.responseText,true),
					store = me.getPermissionGrid().getStore();
				if(permission.success != undefined && permission.success == true){
					me.cleanCheckedAction(store.getRootNode());
					me.getCheckedAction(store.getRootNode(),permission.data);
				}else{
					wr.alertError("请重新登录！");
				}

			},
			callback : function(form, action){
				loadMask.destroy();
			}
		});
	},

	/**
	 * 获取选中的节点ID
	 * @param nodes
	 * @param sid
	 */
	getCheckedNode:function(nodes,sid){
		var my = this
		if(nodes.hasChildNodes()){
			Ext.each(nodes.childNodes,function(child){
				if(child.data.checked){
					sid.push(child.data.id);
				}
				my.getCheckedNode(child,sid);
			});
		}
	},

	/**
	 *保存权限信息
	 * @param {Object} btn  提示的按钮
	 */
	onSavePermission : function(btn) {
		if(!this.identity) {
			return;
		}
		//获取己选择的记录
		var checkedAct = [],
			ids = [],
			me = this,
			nodes = me.getPermissionGrid().getStore().getRootNode(),
			loadMask = new Ext.LoadMask(me.getMain(),{msg : '正在保存权限信息...'}),
			url,
			params={};

		//获取己选择的模块功能
		me.getCheckedNode(nodes,ids);
		if(me.identityType == 0) {
			//角色类型权限
			url = 'rest/sys/permission/update.json',
				params.code =  me.identity;
				params.arr =  ids.join(',');

		}
		//保存数据
		loadMask.show();
		Ext.Ajax.request({
			url :url,
			method : 'POST',
			params : params,
			jsonData : checkedAct,
			success: function(response){
				Ext.Msg.alert("成功","保存成功");
			},
			callback : function(){
				loadMask.destroy();
			}
		});
	},



	/**
	 *获取己选择的功能
	 * @param {TreeNode} node  节点
	 * @param {Array} checkedAct
	 */
	getCheckedAction : function(node,checkedAct) {
		var me = this;
		//是功能节点则取选中项
		Ext.each(checkedAct,function(item){
			if(item.id == node.data.id){
				//node.data.checked = true;
				node.set('checked', true);
			}
		})

		if(node.hasChildNodes()){
			Ext.each(node.childNodes,function(child){
				me.getCheckedAction(child,checkedAct);
			});
		}
	},

	/**
	 * 清空所选节点
	 * @param node
	 */
	cleanCheckedAction:function(node){
		var me = this;
		if(node){
			node.set('checked',false);
		}
		if(node.hasChildNodes()){
			Ext.each(node.childNodes,function(child){
				me.cleanCheckedAction(child);
			});
		}
	}

});