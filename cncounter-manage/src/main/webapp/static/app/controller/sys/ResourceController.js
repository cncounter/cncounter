Ext.define('ESSM.controller.sys.ResourceController', {
	extend  : 'Ext.app.Controller',
	requires : ['Ext.XTemplate','Ext.ux.TreePicker'],

	models  : ['sys.Resource'],
	views   : ['sys.ResourceView','sys.ResourceForm','sys.ResourceQouteForm'],
	stores  : ['sys.ResourceStore'],

	refs : [ {
		ref : 'form',
		selector : 'resourceForm'
	}, {
		ref : 'qouteForm',
		selector : 'resourceQouteForm'
	},{
		ref : 'grid',
		selector : 'resourceView'
	}],
	/**
	 *获取主界面
	 */
	getMainView : function() {
		return this.getView('sys.ResourceView');
	},

	init : function() {
		this.control({
			//'resourceView' : {
			//	//选择行事件
			//	'select' : function(view,record,item,index,e,oPts) {
			//		this.getGrid().down('button[action=update]').setDisabled(false);
			//		this.getGrid().down('button[action=delete]').setDisabled(false);
			//	}
			//},
			//新建
			'resourceView  button[action=create]': {
				click : this.createResource
			},
			//更新
			'resourceView  button[action=update]': {
				click : this.updateResource
			},
			//删除
			'resourceView  button[action=delete]': {
				click : this.deleteResource
			},
			//引用
			'resourceView  button[action=qoute]': {
				click : this.quoteResource
			},


			'resourceForm button[action=select]' : {
				click : this.showIconView
			}
		});

	},

	/**
	 *创建资源
	 */
	createResource : function(btn) {
		var me = this;
		//打开窗口
		wr.openFormWin({
			title : '新增资源',
			items : {
				xtype : 'resourceForm'
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
					Ext.Msg.alert('保存失败', '添加资源信息失败！');
				}
			});
		});
		var content = me.getForm().queryById('parentCodeContent');
		content.add({
			xtype:'treepicker',
			displayField : 'name',
			valueField : 'code',
			id : 'parentCodeContentAdd',
			fieldLabel: '上级资源',
			width : 350,
			store : me.getGrid().getStore(),
			name: 'parentCode',
			listeners:{
				select:function(f, v,  e){
					me.getForm().getForm().findField('parentId').setValue(v.data.id);
				}
			}
		});
		me.getForm().queryById('parentCodecancel').on('click',function(){
			me.getForm().queryById('parentCodeContentAdd').setValue("");

		});

	},

	quoteResource:function(btn){
		var records = this.getGrid().getSelectionModel().getSelection(),
			me = this;
		if(records.length==0) {
			Ext.MessageBox.alert('提示','请选择一条记录！');
			return;
		}
		var rids=[];
		for(var i= 0;i<records.length;i++){
			rids.push(records[i].data.id);
		}
		//打开窗口
		wr.openFormWin({
			title : '引用资源',
			items : {
				xtype : 'resourceQouteForm'
			}
		},function(form,win) {
			form.form.submit({
				url : me.getGrid().getStore().getProxy().api.qoute,
				params:{
					rids:rids
				},
				method : 'post',
				waitMsg : '正在保存数据...',
				success : function(form,action) {
					form.reset();
					win.close();
					me.getGrid().getStore().load();


				},
				failure : function(form,action) {
					var obj = eval ("(" + action.response.responseText + ")");
					Ext.Msg.alert('保存失败', obj.message);
				}
			});
		});
		var content = me.getQouteForm().queryById('qouteCodeContent');
		content.add({
			xtype:'treepicker',
			displayField : 'name',
			valueField : 'code',
			id : 'qouteCodeContentAdd',
			fieldLabel: '添加到资源',
			width : 320,
			store : me.getGrid().getStore(),
			name: 'parentCode',
			listeners:{
				select:function(f, v,  e){
					me.getQouteForm().down("[name=id]").setValue(v.data.id);
				}
			}
		});
		me.getQouteForm().queryById('qouteCodecancel').on('click',function(){
			me.getQouteForm().queryById('qouteCodeContentAdd').setValue("");

		});
	},

	/**
	 * 更新资源
	 */
	updateResource : function(btn) {
		var records = this.getGrid().getSelectionModel().getSelection(),
			me = this;
		if(records.length==0) {
			Ext.MessageBox.alert('提示','请选择一条记录！');
			return;
		}
		var record = records[0];
		//打开窗口
		wr.openFormWin({
			title : '更新资源',
			items : {
				xtype : 'resourceForm'
			}
		},function(form,win) {
			form.form.submit({
				url : me.getGrid().getStore().getProxy().api.update,
				method : 'post',
				waitMsg : '正在保存数据...',
				success : function(form,action) {
					form.reset();
					win.close();
					me.getGrid().getSelectionModel().deselect(records);
					me.getGrid().getStore().load();
				},
				failure : function(form,action) {
					Ext.Msg.alert('保存失败', '更新资源信息失败！');
				}
			});
		});
		this.getForm().loadRecord(record);
		//this.getForm().getForm().findField('code').setReadOnly(true);
		this.getForm().queryById('parentCodecancel').hide();
		//添加上级资源选择项
		this.getForm().queryById('parentCodeContent').add(
			Ext.create('Ext.ux.TreePicker',{
				xtype:'treepicker',
				displayField : 'name',
				valueField : 'code',
				fieldLabel: '上级资源',
				anchor : '60%',
				store : me.getGrid().getStore(),
				value : record.get('parentCode'),
				name: 'parentCode'
			})
		);
		this.getForm().getForm().findField('parentCode').setReadOnly(true);
		//显示 iconCls 
		if(record.get('iconCls') && record.get('iconCls')!=null) {
			var iconView = me.getForm().queryById('viewIcon');
			iconView.removeAll();
			iconView.add({
				border : false,
				html : '<div class="icon-item '+record.get('iconCls')+'"></div>'
			});
			me.getForm().getForm().findField('iconCls').setValue(record.get('iconCls'));
		}
	},
	/**
	 * 删除记录
	 */
	deleteResource : function(btn) {
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
					success:function(response){
						var data = response.responseText;
						var obj = eval ("(" + data + ")");
						if(obj.success){
							Ext.MessageBox.alert("成功","删除成功！");
							me.getGrid().getStore().load();
						}else{
							Ext.MessageBox.alert("失败","删除失败！");
						}
						//me.getGrid().setLoading(true);
						//me.getGrid().down('button[action=update]').setDisabled(true);
						//me.getGrid().down('button[action=delete]').setDisabled(true);
					}
				});
			}
		});
	},
	//选择icon 窗体
	showIconView : function(btn) {
		var me = this;
		var view = Ext.create('Ext.view.View', {
			store: Ext.create('Ext.data.Store',{
				fields : ['iconCls'],
				data : [
					{'iconCls':'performance'},
					{'iconCls':'manager'},
					{'iconCls':'archievement'},
					{'iconCls':'cimopen'},
					{'iconCls':'cimquery'},
					{'iconCls':'recharge'},
					{'iconCls':'widthdraw'},
					{'iconCls':'tradeorder'},
					{'iconCls':'aimregister'},
					{'iconCls':'review'},
					{'iconCls':'publish'},
					{'iconCls':'asset'},
					{'iconCls':'department'},
					{'iconCls':'office'},
					{'iconCls':'level'},
					{'iconCls':'resource'},
					{'iconCls':'sysrole'},
					{'iconCls':'sysuser'},
					{'iconCls':'permission'},
					{'iconCls':'sysdict'},
					{'iconCls':'proceeds'},
					{'iconCls':'param'},
					{'iconCls':'logger'},
					{'iconCls':'article'},
					{'iconCls':'banner'},
					{'iconCls':'add'},
					{'iconCls':'delete'},
					{'iconCls':'edit'},
					{'iconCls':'award-star-bronze-1'},
					{'iconCls':'feed'},
					{'iconCls':'chart-bar-link'},
					{'iconCls':'book-open-mark'}
				]
			}),
			tpl: Ext.create('Ext.XTemplate',
				'<tpl for=".">',
				'<div class="{iconCls} icon-item"></div>',
				'</tpl>'
			),
			parent : btn.up('window'),
			itemSelector: 'div.icon-item',
			overItemCls : 'icon-over',
			emptyText: '没有可用的图标'
		});
		//创建窗体
		Ext.create('Ext.window.Window',{
			width : 300,
			title : '选择图标',
			modal : true,
			border : false,
			items : view,
			buttons : [{
				text : '关闭',
				handler : function(btn){
					btn.up('window').close();
				}
			}]
		}).show();

		view.on('itemclick',me.selectIconCls);
	},
	selectIconCls :  function(view,record) {
		view.up('window').hide();
		var form = this.parent.down('form'),
			iconView = form.queryById('viewIcon');
		iconView.removeAll();
		iconView.add({
			border : false,
			html : '<div class="icon-item '+record.get('iconCls')+'"></div>'
		});
		form.getForm().findField('iconCls').setValue(record.get('iconCls'));
	}
});