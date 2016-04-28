/**
 *主界面布局
 */
Ext.define("ESSM.view.MainView", {
	extend : "Ext.container.Viewport",
	alias : "widget.mainView",
	requires : [
		'Ext.ux.portal.PortalPanel',
		'Ext.ux.TabReorderer','Ext.ux.TabCloseMenu'],
	layout : 'border', //border布局
	items : [{
		xtype : 'panel',
		id : 'mainTop',
		height : 50,
		border:0,
		bodyStyle: {
			background: '#ffc',
			background: 'url(static/skin/neptune/images/bn1.jpg) no-repeat #3793d2'
		},
		region:'north',
        split : true ,
		layout : 'border',
		items : [{
			xtype : 'container',
			region : 'center',
			layout : {
				type: 'hbox',
				align: 'middle'
			},
			padding : '0 0 0 10',
			items :{
				xtype : 'component',
				style: {
					fontWeight: 'bold',
					fontSize : '20px',
					color: '#FFFFFF'
				},
				html :''
			}

		},{
			xtype : 'panel',
			region: 'east',
			bodyStyle: {
				background: 'url(static/skin/neptune/images/bn2.jpg) no-repeat #3793d2'
			},
			width : 400,
			border:0,
			defaults : {
				margin : '0 10 0 0'
			},
			layout : {
				type: 'hbox',
				pack: 'end',
				align: 'middle'
			},
			items:[{
				xtype: 'button',
                action: 'resetpwd',
				iconCls : 'key',
				text: '修改密码',
                handler : function() {
                    var me = this;
                    var title = '修改密码';
                    //
                    var user= wr.user;
                    debug(user);
                    if(!user || !user.userId || user.userId < 1){
                        Ext.MessageBox.alert("错误", "请重新登陆");
                        return;
                    }

                    var win = getEditWin(title, saveFn, me);
                    if (win){
                        win.show();
                    }
                    //
                    function saveFn(formPanel){
                        //
                        var me = this;
                        //
                        var form = formPanel.getForm();
                        if (!form.isValid()) {
                            return;
                        }
                        //
                        var params = getFormParam(formPanel);
                        //
                        if(!params){
                            return;
                        }
                        // 其实已经是 not blank 了
                        if(!params.newPassword){
                            Ext.MessageBox.alert('提示' ,'请输入新密码！');
                            return;
                        } else if(!params.rePassword){
                            Ext.MessageBox.alert('提示' ,'请再次输入新密码！');
                            return;
                        } else if(params.newPassword != params.rePassword){
                            Ext.MessageBox.alert('提示' ,'两次新密码不一致！');
                            return;
                        }
                        //
                        // 判断密码等级
                        var securityLevelFlag = ESSM.passwordLevel(params.newPassword);
                        if(securityLevelFlag < 2){
                            Ext.MessageBox.alert('提示' ,'不能用纯数字或纯字母作为密码！');
                            return;
                        }
                        //
                        var loadMask = new Ext.LoadMask(formPanel, {msg : '正在处理...'});
                        loadMask.show();
                        //
                        Ext.Ajax.request({
                            url : 'rest/login/modifyPass.json',  //地址
                            method : 'POST',
                            params : params,
                            success : function(response) {
                                //
                                var result = ESSM.processResultData(response) || "";

                                if(result.status) {
                                    Ext.MessageBox.alert('提示',
                                        result.message || "操作成功");
                                    formPanel.up("window").close();
                                } else {
                                    Ext.MessageBox.alert('提示',
                                        result.message || "操作失败");
                                }
                            },
                            callback :  function() {
                                loadMask.hide();
                            }
                        });
                        function getFormParam(formPanel){
                            if(!formPanel){
                                return {};
                            }
                            var me = this;
                            //
                            var password = "";
                            var newPassword = "";
                            var rePassword = "";
                            //
                            var password_textfield = formPanel.query("textfield[name=password]")[0];
                            var newPassword_textfield = formPanel.query("textfield[name=newPassword]")[0];
                            var rePassword_textfield = formPanel.query("textfield[name=rePassword]")[0];
                            //
                            if(password_textfield){
                                password = password_textfield.getValue();
                            }
                            if(newPassword_textfield){
                                newPassword = newPassword_textfield.getValue();
                            }
                            if(rePassword_textfield){
                                rePassword = rePassword_textfield.getValue();
                            }
                            //
                            var params = {
                                password : password,
                                newPassword : newPassword,
                                rePassword : rePassword
                            };
                            //
                            return params;
                        }
                    };

                    function getEditWin(optional, saveFn, saveFnContext){
                        var form = Ext.create('ESSM.view.sys.ModifyPwdForm',{
                            flex:8,
                            saveFn : saveFn,
                            saveFnContext : saveFnContext
                        });
                        if(!form){
                            return null;
                        }
                        if(window.record){
                            window.setTimeout(function(){
                                form.loadRecord(record);
                                var remarkInfo = record.data.remarkInfo;
                                var remarkInfo_area = form.query("textareafield[name=remarkInfo]")[0];
                                if(remarkInfo_area){
                                    remarkInfo_area.setValue(remarkInfo || "");
                                }
                            }, 10);
                        }
                        //
                        var winCfg = {
                            title :  title || '编辑',
                            layout:{
                                type:'vbox',
                                align:'stretch'
                            },
                            items :[form],
                            height: 260,
                            width: 400,
                            //maximized : true,
                            modal : true,
                            border : 0,
                            waitMsgTarget : true,
                            buttonAlign :  'center'
                        };
                        var win = new Ext.window.Window(winCfg);
                        return win;
                    };

                }
			},



                {
				xtype: 'button',
				iconCls : 'decline',
				text: '安全退出',
				handler : function() {
					Ext.MessageBox.confirm('提示','是否确定退出？', function(btn){
						if(btn=='yes'){
                            window.location.href= './login.jsp';
						}
					});
				}
			}]
		}]
	},{
		xtype : 'container',
		height : 18,
		region : 'south',
		padding : '0 10',
		layout : {
			type: 'hbox',
			align: 'middle'
		},
		defaults : {
			style: {
				color: '#FFFFFF'
			}
		},
		items : [{
			xtype : 'component',
			html : '<img src="'+ (wr.ctx ? (wr.ctx+'/') : '' ) +'static/skin/default/icons/user_b.png" border="0" align="absmiddle">'
			+ '&nbsp;'+wr.user.name +'&nbsp;('+wr.role.name+')'
		}]
	},
        {
            xtype : 'panel',
            width : 240,
            layout : 'card',
            bodyCls : ["iScroll"],
            split : true ,
            region:'west',
            items : [
                {
                    xtype : 'panel',
                    name : "cardPanel",
                    width : 240,
                    layout : 'fit',
                    //autoScroll:true,
                    //bodyCls : ["iScroll"],
                    items : [
                        {
                            xtype : 'panel',
                            id : 'sysMenu',
                            title : '功能导航',
                            width : 235,
                            collapsible: true, //是否可以折叠
                            layout : 'accordion',
                            layoutConfig : {
                                animate : true,   //开启默认动画效果
                                titleCollapse: true,    //设置为点击整个标题栏都可以收缩
                                activeOnTop: true   //展开的面板总是在最顶层
                            }
                        }
                    ]
                },
                {
                    xtype : 'panel',
                    width : 240,
                    layout : 'vbox',
                    autoScroll:true,
                    style : {
                        overflowY : "auto"
                    },
                    bodyCls : ["iScroll"],
                    items : [
                        {
                            xtype : 'panel',
                            id : 'sysMenuBack',
                            title : '功能导航',
                            width : 235,
                            //height : 800,
                            collapsible: true, //是否可以折叠
                            layout : 'accordion',
                            layoutConfig : {
                                animate : true,   //开启默认动画效果
                                titleCollapse: true,    //设置为点击整个标题栏都可以收缩
                                activeOnTop: true   //展开的面板总是在最顶层
                            }
                        }
                    ]
                }
            ]
        }, {
		xtype : 'tabpanel',
		id : 'mainTabPanel',
		activeTab : 0,
		margins: '2 0 0 0',
		region : 'center',

		plugins: [
			Ext.create('Ext.ux.TabReorderer'),
			Ext.create('Ext.ux.TabCloseMenu', {
				closeTabText: '关闭面板',
				closeOthersTabsText: '关闭其他',
				closeAllTabsText: '关闭所有',
				maxText: 15,
				pageSize: 5
			})
		],

		split : true,
		items : [ {
			title : '起始页',
			iconCls : 'home',
			xtype : 'panel',
			defaults: {
				margin:50,
				width:'90%'
			},
			items: [{xtype : 'quickView'}]

		}]
	}]
});

/**
 *快捷方式
 */
Ext.define('ESSM.view.ClickView',{
	extend : "Ext.view.View",
	alias : "widget.quickView",

	store: Ext.create('Ext.data.Store',{
		fields : ['iconCls','iconName'],
		data : [
			{'iconCls':'sys_resource','iconName':'权限设置'},
			{'iconCls':'sys_role','iconName':'角色设置'},
			{'iconCls':'sys_user','iconName':'用户设置'},
            {'iconCls':'sys_permission','iconName':'权限分配'},
			{'iconCls':'sys_dict','iconName':'字典表维护'},
            {'iconCls':'gb_article','iconName':'文章管理'},
			{'iconCls':'gb_banner','iconName':'轮播管理'}
		]
	}),
	tpl: Ext.create('Ext.XTemplate',
		'<div><h1 style="text-align: center">欢迎使用CNC后台管理系统</h1></div>',
		'<div style="float: left">',
		'<tpl for=".">',
		'<div id="{iconCls}" class="{iconCls} icons-item icons-hide">',
		'<div class="text-item">{iconName}</div>',
		'</div>',
		'</tpl>',
		'</div>'

	),
	itemSelector: 'div.icons-item',
	overItemCls : 'icons-over',
	listeners:{
		viewready:function(){
			var menus  = [];
			menus.push("sys_resource");
			menus.push("sys_role");
			menus.push("sys_user");
			menus.push("gb_article");
			menus.push("sys_permission");
			menus.push("sys_dict");
			menus.push("gb_banner");
			Ext.Array.each(ESSM.resoures, function (item, index) {
				for(var i=0;i<menus.length;i++){
					var menurpc = menus[i].replace("_",":");
					if(item["code"] == menurpc){
						var  elm = document.getElementById(menus[i]);
						elm.className = menus[i] + " icons-item ";
					}
				}
			});
		},
		itemclick:function(view,record){
			var menu = record.get("iconCls").replace("_",":");
			ESSM.controller.MainController.create().fireMenu(menu);
		}
	}
});

