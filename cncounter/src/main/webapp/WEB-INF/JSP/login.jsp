<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>用户登录 - CNCounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
<jsp:include page="/common/header.jsp"></jsp:include>
  <div class="container-fluid">
  	<%-- 必须AJAX --%>
     <form class="form-signin" role="form" method="post" action="<%=path %>/login.php">
       <h2 class="form-signin-heading">用户登录</h2>
       <div>
         <label for="loginemail">
                   登录邮箱: 
         </label>
         <input id="loginemail" name="loginemail"   type="text" class="form-control" placeholder="输入登录邮箱" required autofocus>
       </div>
       <div>
         <label for="loginpassword">
                   登录密码:
         </label>
         <input id="loginpassword" name="loginpassword" type="password" autocomplete="off"  class="form-control" placeholder="请输入密码"  required>
       </div>
       <div class="checkbox">
         <label>
           <input name="rememberme" type="checkbox" value="0">记住我
         </label>
         <span style="float:right;"><a href="<%=path %>/password_reset.php">忘记密码</a></span>
       </div>
       <button class="btn btn-lg btn-primary btn-block" type="submit">登录 CNCounter</button>
       <a class="btn btn-lg btn-warning btn-block"  href="<%=path %>/signup.php">没有账号?点击注册</a>
     </form>
  </div> <!-- /container -->
</body>
</html>
