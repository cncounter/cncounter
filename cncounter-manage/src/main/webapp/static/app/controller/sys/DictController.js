Ext.define('ESSM.controller.sys.DictController', {
	extend  : 'Ext.app.Controller',
	views : ['sys.DictView','sys.DictForm'],
	stores : ['sys.DictStore'],
	models : ['sys.Dict'],
	refs : [{
		ref : 'form',
		selector : 'dictForm'
	},{
		ref : 'grid',
		selector : 'dictView'
	}],
	getMainView : function(){
		return this.getView('sys.DictView');
	},
	
	init : function() {
		this.control({

			'dictView': {
				'itemdblclick':function (grid,row){
					this.onUpdateDict();
				}
			},
			'dictView button[action=create]' : {
				click : this.onCreateDict
			}
		});
	},
	
	/**
	 *新增字典
	 */
	onCreateDict : function() {
		var me = this;
		//打开窗口
		wr.openFormWin({
			title : '新增用户',
			items : {
				xtype : 'dictForm'
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
					Ext.Msg.alert('保存失败', '添加字典信息失败！');
				}
			});
		});
		
	},
	
	/**
	 *更新字典
	 */
	onUpdateDict : function() {
		var records = this.getGrid().getSelectionModel().getSelection(),
		me = this;
		if(records.length==0) {
			Ext.MessageBox.alert('提示','请选择一条记录！');
			return;
		}
	var record = records[0];
	//打开窗口
	wr.openFormWin({
		title : '更新字典项',
		items : {
			xtype : 'dictForm'
		}
	},function(form,win) {
		form.form.submit({
			url : me.getGrid().getStore().getProxy().api.update,
			method : 'post',
			waitMsg : '正在保存数据...',
			success : function(form,action) {
				win.close();
				me.getGrid().getStore().load();
			},
			failure : function(form,action) {
				Ext.Msg.alert('保存失败', '更新字典信息失败！');
			}
		});
	});
	this.getForm().loadRecord(record);
	},
	
	/**
	 * 删除字典
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
		me.getStore('sys.DictStore').loadPage(1,{
			params : values
		});
	}
});