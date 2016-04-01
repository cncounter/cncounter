
$(function(){
    //
    var $loginemail = $("#loginemail");
    var $loginpassword = $("#loginpassword");
    var $repassword = $("#repassword");
    var $btn_signup = $("#btn_signup");
    //
    initBindEvents();
    //
    function initBindEvents(){
        //
        $btn_signup.bind("click", reg_click_handler);
        // 加载md5工具.js
        // $.getScript("/static/js/md5-util.js");
        loadMd5Utils();
    };
    //
    function reg_click_handler(e){
        //
        var loginemail = $loginemail.val();
        var loginpassword = $loginpassword.val();
        var repassword = $repassword.val();
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
        if(!repassword){
            $repassword.focus();
            return;
        }
        if(loginpassword != repassword){
            $repassword.focus();
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
        ajaxRequestSignup(data);
    }
    //
    function ajaxRequestSignup(data){
        //
        var url = "/openapi/signup.json";
        //
        postAjax(url, data, successCallback, null, true);
        //
        function successCallback(data){
            //
            // 自动登录?
            // 跳转
            if(data.status){
                // 成功
                window.location.replace("login.php");
            } else {
                // 显示信息
            }


        };

    };
});