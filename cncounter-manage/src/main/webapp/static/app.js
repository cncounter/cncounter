
var wr={};
wr.version = 1.0;
wr.ctx = '';
//全局配置
wr.winStyle = {buttonAlign : 'center'};
wr.path={};
wr.path.staticPath='';
wr.dict={};
//定义 ESSM
var ESSM = wr;
wr.DEFAULTPHOTO='/static/img/user/a_03.png';
wr.wrapContext = function(uri){
	if(0 == uri.indexOf("/")){
		uri = uri.substr(1); // 从 1 开始
	}
	var result = uri;
	if(!wr.ctx){
		result = uri; // 不要斜杠
	} else {
		result = wr.ctx + '/' + uri;
	}
	return result;
};

//自动加载mvc
Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath({
    'Ext.ux': 'static/ext/ux',
    'Ext.app' : 'static/ext/app'
});
Ext.require([
     'Ext.ux.statusbar.StatusBar',
     'Ext.ux.TabScrollerMenu',
     'Ext.state.*',
     'Ext.tip.QuickTipManager',
     'Ext.selection.CheckboxModel',
     'Ext.form.field.File',
     'Ext.form.Panel',
     'Ext.window.MessageBox'
]);
wr.msg = function(title, msg) {
        Ext.Msg.show({
            title: title,
            msg: msg,
            minWidth: 200,
            modal: true,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
    };


//设置ajax 超时时间
Ext.Ajax.timeout = 180000;

// ajax 全局异常
Ext.Ajax.on('requestexception', function(conn, response, options) {
    //
    var status = response.status;
    var responseText = response.responseText;
    var msg = '' + response.responseText ;
    var fn = function(){};
    if(401 == status){
        // 未授权
        msg = "没有权限执行此操作!";
    } else if(433 == status){
        // 未登录
        msg = "请重新登录!";
        fn = toLoginFn;
    }else if(413 == status){
        msg = "上传文件太大!";
    } else {
        msg = "网络或服务器错误!";
    }
	Ext.Msg.show({
        title : '系统异常',
        msg : msg,
        //width : 200,
        icon : Ext.MessageBox.ERROR,
        buttons : Ext.MessageBox.OK,
        fn : fn
	});
    //
    function toLoginFn(){
        window.location.href = "rest/login/logout.do";
    };
});  

//定义需要认证的按钮
Ext.define('WR.ux.AuthcButton',{
	extend : 'Ext.button.Button',
	xtype : 'authcbutton',
	permissionAllow : true,
	
	initComponent : function(){
		this.callParent();
		this.on('afterrender',function(btn,eOpts){
			var tabpanel = btn.up('tabpanel'),
				panel = tabpanel.getActiveTab(),
				action = btn.action,
				permission;
				
			//权限认证
			if(action!=undefined && action!='') {
				permission = panel.getId() +':' + action+".json";
				//验证
				btn.permissionAllow = btn.isPermissed(permission);
				if(btn.permissionAllow) {
					//btn.disable();
					btn.setDisabled(false)
				} 
			}	
		});
	},
	
	setDisabled : function(disabled) {
		if(this.permissionAllow) {
			this.callParent();
		}
	},
	
	disabed : function(silent){
		if(this.permissionAllow) {
			this.callParent();
		}
	},
	
	isPermissed : function(permission) {
		for(var i=0,l=wr.authorization.length;i<l;i++) {
			if(wr.authorization[i].code == permission) {
				return true;
			}
		}
		return false;
	}
	
});

//定义扩展TreeStore
Ext.define('WR.ux.TreeStore',{
	extend : 'Ext.data.TreeStore',
	 //恢复数据<增加方法>
    rejectChanges: function(){
        //恢复被删除的数据
        var me = this;
        Ext.each(this.removed, function(record){
        	if(record.removeContext==null) {
        		me.getRootNode().insertChild(record.removedFrom || 0 , record);
        	} else {
        		record.removeContext.insertChild(record.removedFrom || 0 , record);
        	}
        }, this);
        //恢复被修改的数据
        Ext.each(this.getUpdatedRecords(), function(record) {
            record.reject();
        }, this);

        //删除新添加的数据
        Ext.each(this.getNewRecords(),function(record){
        	record.remove();
        });

        //恢复所有数据到原始值
        this.rejectNode(this.getRootNode());

        this.removed = [];
    },

    rejectNode : function(node) {
    	var me = this;
    	node.reject();
    	Ext.each(node.childNodes,function(child){
    		me.rejectNode(child);
    	});
    },
    /**
     * 创建TreeStore的副本  copy。 <增加方法>
     */
    clone : function() {
    	var me = this,
    		root = me.getRootNode();
		return Ext.create('Ext.data.TreeStore',{
			root : me.getRootNode().copy(undefined,true)
		});
    }
});

Ext.define('WR.ux.form.Panel',{
	extend : 'Ext.form.Panel',

	border : 0,
	waitMsgTarget : true,
	bodyPadding: '10',
	header : false,
	buttonAlign : wr.winStyle.buttonAlign,

	/**
	 * 数据保存地址
	 */
	url : null,
	/***
	 * 加载数据配置
	 * 如：
	 * loader:{
	 * 	 url : '',
	 * 	 params : (),
	 * 	 success : function
	 * }
	 */
	loader : null,

	/**
	 * submit 成功后回调
	 */
	success : null,

	/**
	 *store 和服务器同步
	 */
	sync : null,

	buttons : [{
    	text : '保存',
    	handler : function() {
			var me   = this,
    			form = me.up('form');
    		if (form.getForm().isValid()) {
    			//store 同步保存数据
				if(form.sync && form.sync !==null && form.sync.store) {
					form.onSync(form);
				} else if(form.url && form.url !==null) {
					//url 保存
					form.onSubmit(form);
				}
    		 }
    	}
    },{
    	text : '取消',
    	handler : function(){
    		 var form = this.up('form');
    		 form.close();
   		}
	}],

	/**
	 *提交表单
	 *
	 */
	onSubmit : function(form,clientValidation) {
		var me = this;
		validation = clientValidation== undefined ?  true : clientValidation,
		form.submit({
			method : 'POST',
			waitMsg : '正在保存数据...',
			clientValidation : validation,
		 	//成功
		 	success: function(form, action) {
		 		if(me.success && me.success!==null ) {
		 			me.success(form,action);
		 		}
		 		me.close();
		 	},
		 	//失败
		 	failure: function(form, action) {
		 		if(action.result) {
		 			wr.alertError(action.result.message,'错误提示');
		 		}
		 	}
		 });
	},

	/**
	 * 数据同步至服务器
	 */
	onSync : function(form) {
		var me = this;
		//数据同步至服务器
		wr.sync({
			store : me.sync.store,
			target : me, //loading 要显示的目标
			loadingText : '数据保存中...',
			success : function(){
		 		if(me.success && me.success!==null ) {
		 			me.success(form);
		 		}
				me.close();
			},
			failure: function(batch, options) {
				wr.alertError(batch.proxy.getReader().jsonData.message,'错误提示');
			}
		});
	},

	/**
	 *关闭窗口
	 */
	close : function() {
		var win = this.up('window');
		if(win) {
			win.close();
		}
	},

	/**
	 * 显示 from
	 */
	show : function() {
		var me = this,
			//创建并显示
			win = Ext.create('Ext.window.Window',{
				title : me.title || '编辑窗口',
				modal : true,
				border : 0,
				items : [me]
			});
		win.show();
	},

	initComponent : function() {
		var me = this;
		//远程加载form数据
		if(me.loader && me.loader.url) {
			me.on('boxready',function(form){
				//load 数据
				me.load({
					url : me.loader.url || '',
					params: me.loader.params,
					waitMsg : '正在加载数据...',
					method  : me.loader.method  || 'GET',
					success : me.loader.success || false,
					//出错
					failure : function(form,action) {
						wr.alertError(action.result.message,'错误');
					}
				});
			});
		}
		me.callParent(arguments);
	}
});

/**
 *grid panel
 */
Ext.define('WR.ux.grid.Panel',{
	extend: "Ext.grid.Panel",
	alias: 'widget.wrgrid',
	//加载数据显示 loading
	viewConfig : {
		loadMask : true
	},

	//选择模式
	selType:'checkboxmodel',
	multiSelect:true,

	syncDelete : false,

	//监听事件
	listeners : {
		selectionchange : function(selmodel,records,eOpts){
			var me = this,
				btndelete = me.query('button[action=delete]'),
				btnupdate = me.query('button[action=update]');
			//按钮控制
			Ext.each(btnupdate,function(btn){
				btn.setDisabled(records.length!=1);
			});
			Ext.each(btndelete,function(btn){
				btn.setDisabled(records.length==0);
			});
		}
	},

	initComponent : function() {
		var me = this;
		me.callParent(arguments);
		me.on('render',function(grid){
			me.initGrid(grid);
		});
	},
	/**
	 * 初始化 Grid
	 */
	initGrid : function(grid) {
		var me = this,
			btndelete = grid.query('button[action=delete]'),
			btnupdate = grid.query('button[action=update]');
		//按钮控制
		Ext.each(btnupdate,function(btn){
			btn.setDisabled(true);
		});
		Ext.each(btndelete,function(btn){
			btn.setDisabled(true);
			btn.on('click',function(btn){
				me.onDeleteData.apply(me,btn);
			});
		});
	},

	/**
	 * 删除数据事件
	 */
	onDeleteData : function(btn) {
		//获取选择记录
		var me = this,
		    records = me.getSelectionModel().getSelection();
		if(records.length ==0 ) {
			return;
		}

		//删除信息
		Ext.MessageBox.confirm('提示','您确实要删除选定的记录吗？', function(btn){
			if(btn=='yes'){
				if(me.syncDelete) {
					me.getStore().remove(records);
					//数据同步至服务器
					wr.sync({
						store : me.getStore(),
						target : me, //loading 要显示的目标
						loadingText : '正在删除数据...'
					});
				} else {
					//url地址删除
					var ids = [],
						loadMask = new Ext.LoadMask(me,{msg : '正在删除数据...'});

					Ext.each(records,function(record){
						ids.push(record.getId());
					});
					loadMask.show();
					Ext.Ajax.request({
						url : me.getStore().getProxy().api.destroy,
						method : 'POST',
						params : {ids : ids},
						success :  function(response) {
							//删除成功
							me.getStore().remove(records);
							me.getStore().commitChanges();
						},
						callback :  function() {
							loadMask.hide();
						}
					});
				}
			}
		});
	}

});

/**
 *打开表单窗口   己不使用
 * @param {Object} options  配置参数
 * @param {Object} onSubmit 提交表单
 */
wr.openFormWin = function (options,onSubmit) {
    //
    debug("openFormWin(); 此方法有问题,禁止使用!");
    //
	var winOptions = {
		width : options.width,
		title : options.title || '系统提示',
		modal : true,
		border : 0,
		waitMsgTarget : true,
		//autoScroll: false,
		buttonAlign : options.buttonAlign || wr.winStyle.buttonAlign,
		items : options.items || {},
		buttons : [ {
        	text : '保存',
        	disabled : false,
        	handler : function(btn) {
        		var w,f;
        		w = btn.up('window');
        		f = w.down('form');
        		if (f.form.isValid()) {
        			if(onSubmit) {
        				onSubmit(f,w);
        			}
        		}
        	}
        }, {
        	text : '取消',
        	handler : function(btn){
        		var w,f;
        		w = btn.up('window');
        		f = w.down('form');
        		f.form.reset();
        		w.close();
       		}
    	}]
	};
	//创建并显示
	var win = Ext.create('Ext.window.Window',winOptions);
	win.show();
	if(options.load) {
		win.down('form').load({
			url : options.load.url || '',
			params: options.load.params,
			waitMsg : '正在加载数据...',
			method  : options.load.method  || 'GET',
			success : options.load.success || false,
			//出错
			failure : function(form,action) {
				wr.alertError(action.result.message,'错误');
			}
		});
	}
    var _form = win.down('form');
    if(options.callback){
        var context = options.context;
        options.callback.call(context, win, _form);
    }
	return win.down('form');
};

wr.openFormWinAgree = function (options,onSubmit,reasonForm,callback) {
	var winOptions = {
		width : options.width,
		title : options.title || '系统提示',
		modal : true,
		border : 0,
		waitMsgTarget : true,
		//autoScroll: false,
		buttonAlign : options.buttonAlign || wr.winStyle.buttonAlign,
		items : options.items || {},
		buttons : [ {
        	text : '审核',
        	disabled : false,
        	handler : function(btn) {
        		var w,f;
        		w = btn.up('window');
        		f = w.down('form');
        		//if (f.form.isValid()) {
        			if(onSubmit) {
        				onSubmit(f,w);
        			}
        		//}
        	}
        }, {
        	text : '拒绝',
        	handler : function(btn){
        		var w,f;
        		w = btn.up('window');
        		f = w.down('form');
     
        		wr.openFormWin({
			title : '拒绝信息',
			items : reasonForm
		},function(reasonForm,win){
			   callback(reasonForm);
		       reasonForm.form.reset();
        		w.close();
			    win.close();
		
		});

       		}
    	}, {
        	text : '关闭',
        	handler : function(btn){
        		var w,f;
        		w = btn.up('window');
        		f = w.down('form');
        		w.close();
       		}
    	}]
	};
	//创建并显示
	var win = Ext.create('Ext.window.Window',winOptions);
	win.show();
	if(options.load) {
		win.down('form').load({
			url : options.load.url || '',
			params: options.load.params,
			waitMsg : '正在加载数据...',
			method  : options.load.method  || 'GET',
			success : options.load.success || false,
			//出错
			failure : function(form,action) {
				wr.alertError(action.result.message,'错误');
			}
		});
	}
	return win.down('form');
};
/**
 * 添加详细框
 * @param {} options
 * @param {} onSubmit
 * @return {}
 * @author yh
 */
wr.openFormWinDetail = function (options,onSubmit) {
	var winOptions = {
		width : options.width,
		title : options.title || '系统提示',
		modal : true,
		border : 0,
		waitMsgTarget : true,
		//autoScroll: false,
		buttonAlign : options.buttonAlign || wr.winStyle.buttonAlign,
		items : options.items || {}
	
	};
	//创建并显示
	var win = Ext.create('Ext.window.Window',winOptions);
	win.show();
	if(options.load) {
		win.down('form').load({
			url : options.load.url || '',
			params: options.load.params,
			waitMsg : '正在加载数据...',
			method  : options.load.method  || 'GET',
			success : options.load.success || false,
			//出错
			failure : function(form,action) {
				wr.alertError(action.result.message,'错误');
			}
		});
	}
	return win.down('form');
};
/**
 *打开退件输入理由窗口 
 */
wr.openReasonWin = function(ok,title) {
	var title = title === undefined ? '退回' :  title;
	//输入框
	var reason = Ext.create('Ext.form.field.TextArea',{
		height : 80,
		width : 450,
		name : 'reason'
	});
	//窗口
	var win = Ext.create('Ext.window.Window',{
		title : '输入'+title+'原因',
		bodyPadding : '10',
		buttonAlign : 'center',
		items : [reason],
		buttons : [{
			text : '确定',
			handler : function() {
				win.close();
				//返回
				if(ok) {
					ok(reason.getValue());
				}
			}
		},{
			text : '取消',
			handler : function() {
				win.close();
			}
		}]
	});
	win.show();
};
/**
 * 显示错误信息  
 * @param {Object} msg   错误内容
 * @param {Object} title  窗口标题
 */
wr.alertError = function(msg,title) {
	Ext.Msg.show({  
        title : title || '错误提示',  
        msg : msg,  
        //width : 400,  
        icon : Ext.MessageBox.ERROR,  
        buttons : Ext.MessageBox.OK
	}); 
};

/**
 *检查签收返回
 */
wr.checkClaimResponse = function(response,grid,record){
   var result = Ext.JSON.decode(response.responseText,true);
   if(result && result.success) {
   		return true;
   }else {
   		wr.alertError(result.message);
   		switch(result.message) {
   			case '01' :
   				wr.alertError('该任务不存在！');
   				break;
   			case '02' :
   				wr.alertError('该任务己被签收！');
   				if(grid && record) {
   					grid.getStore().remove(record);
					grid.getStore().commitChanges();
   				}
   				break;
   			default:
   				wr.alertError(result.message);
   				break;
   		}
   }
};

wr.processResultData = function(response, successFn){
    var result = Ext.JSON.decode(response.responseText,true);
    if(result && result.success) {
        successFn && successFn(result);
    }else {
        result = result || "";
        var msg = result.message || "操作失败";
        wr.alertError(msg);
    }
    return result || false;
};


/**
 * 数据同步到服务器 
 * @param {Object} options  如: {store : store , target : myPanel, loadingText : '正在保存数据...', success : function(/成功回调/) ,failure : function(失败回调)}
 */
wr.sync = function(options) {
	if(options.store) {
		//创建loadMask
		var loadMask=null;
		if(options.target) {
			loadMask = new Ext.LoadMask(options.target,{msg :  options. loadingText || "数据保存中..."});
			loadMask.show();
		}
		options.store.sync({
			callback  :  function() {
				if(loadMask) {
					loadMask.hide();
				}
			},
			success : options.success,
			failure : function(batch,opts) {
				if(loadMask) {
					loadMask.hide();
				}
				//恢复数据
				if(this.rejectChanges) {
					this.rejectChanges();
				}
				 
				//显示
				wr.alertError(batch.proxy.getReader().jsonData.message,'系统异常');
				if(options.failure) {
					options.failure(batch,opts);
				}
			},
			scope  : options.store
		});
	}
};

var formatActionMsg = function(action) {
	switch(action) {
		case 'create' :
			return '新增数据失败！';
		case 'read':
			return '读取数据失败！';
		case 'update':
			return '更新数据失败！';
		case 'destroy':
			return '删除数据失败！';
		default:
			return '保存数据失败！';
	}
};
wr.TIMESTRZERO=' 00:00:00';
wr.YEARTRZERO='-01-01 00:00:00';
wr.dict = {};
/**
 * 获取数据字典
 * @Param String type   字典类型代码
 * @param String code   字典代码
 */
wr.getDict = function(type,code) {
	if(!type) {
		return [];
	}
	var dictInfo = wr.dict[type];
	if(code === undefined) {
		return dictInfo;
	}

	if(dictInfo === undefined) {
		return {};
	} else {
		for(var i=0,l=dictInfo.length;i<l;i++) {
			if(dictInfo[i].code == code) {
				return dictInfo[i];
			}
		}
	}
};


//启动程序
Ext.onReady(function(){
	Ext.tip.QuickTipManager.init();

	wr.ctx = '';
	Ext.Ajax.request({
		type:"POST",
		url:"static/test/rest/main/getUserMenu.json",
		dataType:"json",
		success: function(response){
			var result = Ext.JSON.decode(response.responseText,true);
			if(result.success == true){
				var res = [],fns = [],user=result.meta.user,roleNames=result.meta.roleNames;
                if(!user){
                    user = {
                        id : -1,
                        realName : "请重新登陆"
                    };
                    Ext.MessageBox.alert("错误", "请重新登陆", function(){
                        window.location.href = "rest/login/logout.do";
                    });
                }
				wr.user = {userId:user.id,name:user.realName,pwdEmpty:true};
				wr.role={name:roleNames};
				Ext.each(result.data,function(node){
					if(node.type == 1){
						res.push(node);
					}else{
						fns.push(node);
					}
				})
				wr.resoures = res;
				wr.authorization = fns;
			}else{
				wr.resoures = [];
				wr.authorization = [];
			}
			// load app
			loadApp();
		}
	});
});





/**
 * app  入口程序
 */
var loadApp = function(){
	Ext.application({
		name: 'ESSM',      //程序名称
		appFolder:'static/app',  //程序文件目录
		controllers:['MainController']  //main控制器 
	});
};
                            /**
						     * 判断是否为空
						     * @author yh
						     * @version v1.0.0
						     */
wr.isEmpty=function(param) {
	if (typeof param == "object") {
	if((param==null) || (Object.prototype.toString.call(param)==='[object Array]' && param.length==0) || (param.hasOwnProperty('length') && param.length==0)){
	return true;
	}
	 for (var name in param) {
		return false;
	 }
	  return true;
	 }
  return typeof param == "undefined" || typeof param == "string" && (param == "" || param == "undefined" || param == "0") || typeof param == "number" && (param == 0 || isNaN(param));
};
wr.formatForm=function(form,obj){
	var start={};
	var object={};
	for(var s in obj){
		if(!wr.isEmpty(form.getValues()[s]))
		object[s]=form.getValues()[s]+wr.TIMESTRZERO;
	}
	Ext.apply(start, form.getValues());
	Ext.apply(start, object);
	return start;
};

wr.seDate=function(form,obj){
	return wr.formatForm(form,obj);
};
wr.seDate_=function(form,params){
		var start={};
	  var object={};
	 for( var param in params){
						    	 var obj=params[param];
						    	 for( var p in obj){
						    	 	if(!wr.isEmpty(form.getValues()[param+'.'+p]))
						    	 	object[param+'.'+p]=form.getValues()[param+'.'+p]+wr.TIMESTRZERO;
						    	 }
						    }
		Ext.apply(start, form.getValues());
	Ext.apply(start, object);
	return start;				    
};
wr.se=function(form,other,obj){
	var start={};
	if(!wr.isEmpty(obj)){
	start=wr.seDate(form,obj);
	 Ext.apply(start, other);
	}
	else{
		 Ext.apply(start, form.getValues());
    Ext.apply(start, other);
	}
	return start;
};
wr.se_=function(form,other,obj){
	var start={};
	var object={};
	if(!wr.isEmpty(obj))
	start=wr.seDate_(form,obj);
		 for( var param in other){
						    	 var obj1=params[param];
						    	 for( var p in obj1){
						    	 	object[param+'.'+p]=obj1[p];
						    	 }
						    }
    Ext.apply(start, object);
	return start;
};

wr.getTime=function(arr,field){
	if(!wr.isEmpty( arr[field]))
		arr[field]=arr[field]+wr.TIMESTRZERO
	return arr;
};
/**
 * 按钮权限控制
 * @param thi
 */
//wr.checkAction = function(thi){
//	var items = thi.query('panel button');
//	Ext.each(wr.authorization,function(node){
//		Ext.each(items,function(item){
//			var act = node.code.substring(node.code.lastIndexOf(":")+ 1,node.code.indexOf("."));
//			if(thi.id == node.parentCode && item.action == act){
//				item.setDisabled(false);
//				//item.addClass("hidden")
//			}
//		})
//	});
//}



