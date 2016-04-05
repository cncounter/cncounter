<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/common/basePath.jsp"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>用户登录 - CNCounter</title>
</head>
<body>
  <div class="container-fluid">
  	<%-- 必须AJAX --%>
     <form class="form-signin" role="form" method="post" action="<%=__path %>/login.php">
       <h2 class="form-signin-heading">用户登录</h2>
       <div>
         <label for="loginemail">
                   登录邮箱<span class="required">:</span>
         </label>
         <input id="loginemail" name="loginemail"   type="text" class="form-control" placeholder="输入登录邮箱" required autofocus>
       </div>
       <div>
         <label for="loginpassword">
                   登录密码<span class="required">:</span>
         </label>
         <input id="loginpassword" name="loginpassword" type="password" autocomplete="off"  class="form-control" placeholder="请输入密码"  required>
       </div>
       <div class="checkbox">
         <label>
           <input name="rememberme" type="checkbox" value="0">记住我
         </label>
         <span style="float:right;"><a href="<%=__path %>/password_reset.php">忘记密码</a></span>
       </div>
       <button id="btn_login" class="btn btn-lg btn-primary btn-block" type="button">登录 CNCounter</button>
       <a class="btn btn-lg btn-warning btn-block"  href="<%=__path %>/signup.php">没有账号?点击注册</a>
     </form>
  </div> <!-- /container -->
  <script src="/static/jsp_js/login.jsp.js"></script>
</body>
</html>
