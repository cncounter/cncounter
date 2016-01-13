<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="basePath.jsp"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>用户注册 - CNCounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
<jsp:include page="/common/header.jsp"></jsp:include>
  <div class="container-fluid">
  	<%-- 必须AJAX --%>
     <form class="form-signin" role="form" method="post" action="<%=path %>/login.php">
       <h2 class="form-signin-heading">用户注册</h2>
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
         <input id="loginpassword" name="loginpassword" type="password"  class="form-control" placeholder="请输入密码"  required>
       </div>
       <div>
         <label for="repassword">
                   确认密码:
         </label>
         <input id="repassword" name="repassword" type="password"  class="form-control" placeholder="请再次输入密码"  required>
       </div>
       <button class="btn btn-lg btn-primary btn-block" type="submit">确认注册CNCounter</button>
       <a class="btn btn-lg btn-warning btn-block"  href="<%=path %>/login.php">已有账号?点击登录</a>
     </form>
  </div> <!-- /container -->
</body>
</html>