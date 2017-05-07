
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
        window.location.href = "login.jsp";
    };
});


Ext.application({
    name:"QueryLog",
    launch:function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                Ext.create("ESSM.view.sys.QueryResultView")
            ]
        });

    }
});