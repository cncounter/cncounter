<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/common/basePath.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>登录- CNC-后台管理系统</title>
    <link href="static/ext/resources/css/ext-all-neptune.css" rel="stylesheet">
    <link href="static/skin/css/fssy.css" rel="stylesheet">
    <script src="static/ext/ext-all.js" type="text/javascript"></script>

</head>
<body>
<script type="text/javascript">
    Ext.onReady(function() {
        Ext.Loader.setConfig({enabled:true});
        Ext.QuickTips.init();
        Ext.form.Field.prototype.msgTarget = 'side';

        //登录表单
        var loginForm = Ext.create('Ext.form.Panel',{
            bodyPadding: '10',
            waitMsgTarget : true,
            fieldDefaults : {
                labelWidth : 65,
                anchor:'60%'
            },
            border : false,
            buttonAlign : 'center',
            items :[{
                xtype: 'fieldcontainer',
                layout: 'column',
                items :[{
                    xtype: 'textfield',
                    fieldLabel: '用户名',
                    name: 'name',
                    allowBlank: false,
                    columnWidth: 6/7,
                    tooltip: '请输入用户名',
                    blankText: '请输入用户名'
                }]
            },{
                xtype: 'fieldcontainer',
                layout: 'column',
                items :[{
                    xtype: 'textfield',
                    fieldLabel: '密&nbsp;&nbsp;&nbsp;&nbsp;码',
                    name: 'password',
                    inputType: 'password',
                    columnWidth: 6/7,
                    allowBlank: false,
                    tooltip: '请输入登录密码',
                    blankText: '密码不能为空'
                }]
            },{
                xtype: 'fieldcontainer',
                layout: 'column',
                items :[{
                    id : 'code',
                    xtype : 'textfield',
                    fieldLabel: '验证码',
                    name: 'code',
                    allowBlank: false,
                    columnWidth: 4/7,
                    tooltip: '请输入验证码',
                    blankText: '验证码不能为空'
                },{
                    id : 'valCode',
                    xtype : 'image',
                    src: "static/test/rest/valCode.png",
                    height:24,
                    columnWidth: 2/7,
                    listeners:{
                        el: {
                            click: function(t) {
                                //
                                if(t.target.src.indexOf("id")>0){
                                    var src = t.target.src;
                                    t.target.src = src.substr(0,src.indexOf("?")) + '?id=' + Math.random();
                                }else{
                                    t.target.src = t.target.src+'?id=' + Math.random();
                                }
                            }
                        }
                    }
                }]
            } ,{
                fieldLabel: '&nbsp;',
                name: 'rememberMe',
                xtype: 'checkboxfield',
                labelSeparator: '',
                uncheckedValue : 0,
                inputValue : 1,
                boxLabel : '记住我'
            }],
            buttons : [{
                text : '登录',
                type : 'submit',
                handler : doLogin
            },{
                text : '取消',
                handler : function(btn) {
                    btn.up('form').getForm().reset();
                    //window.location.href="./index.html";
                    //单点登录
                    window.location.href="./index.jsp";
                }
            }],
            listeners :{
                render : function(panel) {
                    panel.el.on('keypress',function(e){
                        if(e.getKey() == e.ENTER) {
                            doLogin();
                        }
                    });
                }
            }
        });

        function doLogin(btn) {
            var form = loginForm,
                    loadMask = new Ext.LoadMask(form,{msg : '正在进行登录,请稍候...'});
            if (form.getForm().isValid()) {
                loadMask.show();
                try{
                    formLogin();
                } catch(ex){
                    var message = "网络错误!";
                    showAlert(message, '登录失败');
                    loadMask.hide();
                }
            }

            //
            function showAlert(message, title, fn){
                title = title || "提示";
                Ext.Msg.show({
                    title : title, //
                    msg : message,
                    icon : Ext.MessageBox.ERROR,
                    buttons : Ext.MessageBox.OK,
                    fn: fn
                });
            };

            function formLogin(){
                //
                form.form.submit({
                    url :'static/test/rest/main/doLogin.json',
                    method :'POST',
                    timeout: 10*1000,
                    success: function(form, action) {

                        //window.location.href="./index.html";
                        //单点登录
                        window.location.href="./";
                    },
                    //失败
                    failure: function(form, action) {
                        var message = '';
                        if(!action){
                            message = "网络错误!";
                        } else if(200 != action.response.status){
                            message = "网络错误!";
                        } else{
                            processResp();
                        }
                        //
                        var code = Ext.getCmp("code");
                        code.setValue("");
                        code.focus();
                        //
                        var valCode = Ext.getCmp("valCode");
                        var src = valCode.getEl().dom.src;
                        //
                        if(src.indexOf("id")>0){
                            src = src.substr(0,src.indexOf("?")) + '?id=' + Math.random();
                        }else{
                            src = src+'?id=' + Math.random();
                        }
                        //
                        valCode.setSrc(src);
                        //
                        showAlert(message, '登录失败', function(){
                            code.focus();
                        });
                        loadMask.hide();
                        function processResp(){

                            try{
                                var resp = Ext.decode(action.response.responseText)
                                        || {
                                            meta : ""
                                        };
                            }catch(ex){
                            }
                            if(resp.meta.message=="1"){
                                message = "验证码错误!";
                            }else if(resp.meta.message=="2"){
                                message = "用户名异常!";
                            }else if(resp.meta.message=="3"){
                                message = "密码错误!";
                            }else if(resp.meta.message=="4"){
                                message = "未知账户!";
                            }else if(resp.meta.message=="5"){
                                message = "账户已锁!";
                            }else if(resp.meta.message=="6"){
                                message = "登陆错误次数过多!";
                            }else if(resp.meta.message=="7"){
                                message = "用户名或密码不正确!";
                            }
                        };
                    }
                });

            };
        }

        //定义窗体
        var win = Ext.create('Ext.window.Window',{
            id : 'win',
            layout : 'fit', //自适应布局
            align : 'center',
            title :'用户登录',
            width : 330,
            height : 212,
            resizable : false,
            draggable : false,
            border : false,
            maximizable : false,//禁止最大化
            closeAction : 'close',
            closable : false,//禁止关闭,
            items : loginForm
        });

        win.show();
    });
</script>
</body>
</html>