
$(function(){
    //
    var $loginemail = $("#loginemail");
    var $loginpassword = $("#loginpassword");
    var $btn_login = $("#btn_login");
    //
    initBindEvents();
    //
    function initBindEvents(){
        //
        $btn_login.bind("click", reg_click_handler);
        // 加载md5工具.js
        // $.getScript("/static/js/md5-util.js");
        loadMd5Utils();
    };
    //
    function reg_click_handler(e){
        //
        var loginemail = $loginemail.val();
        var loginpassword = $loginpassword.val();
        //
        if(!loginemail){
            $loginemail.focus();
            return;
        } else if( !(/.+@.+/.test(loginemail))){
            // 判断符合email
            $loginemail.focus();
            return;
        }

        //
        if(!loginpassword){
            $loginpassword.focus();
            return;
        }
        // 对密码进行一次md5,避免传输明文
        loginpassword = md5(loginpassword);
        //
        var data = {
            loginemail : loginemail,
            loginpassword : loginpassword
        };
        //
        ajaxRequestLogin(data);
    }
    //
    function ajaxRequestLogin(data){
        //
        var url = "/system/login.json";
        //
        postAjax(url, data, successCallback, null, true);
        //
        function successCallback(data){
            //
            if(data.status){
                // 成功
                var meta = data.meta;
                var token = meta.token;
                // 写入 COOKIE
                token && setCookie("token",token);
                // 跳转
                window.location.replace("/");
            } else {
                // 显示信息
            }


        };

    };
});