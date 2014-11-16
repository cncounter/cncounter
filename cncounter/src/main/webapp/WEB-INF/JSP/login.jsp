<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%><%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<title>天朝计数器 - CNCounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
<jsp:include page="/common/header.jsp"></jsp:include>
  <div class="container">
     <form class="form-signin" role="form">
       <h2 class="form-signin-heading">账号登录</h2>
       <input type="email" class="form-control" placeholder="输入用户名/邮箱" required autofocus>
       <input type="password" class="form-control" placeholder="请输入密码" required>
       <div class="checkbox">
         <label>
           <input name="rememberme" type="checkbox" value="0"> 下次自动登录
         </label>
         
       </div>
       <ul class="nav nav-pills">
		  <li><a href="<%=path %>/forgotpass.php">忘记密码</a></li>
	   </ul>
       <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
       <ul class="nav nav-pills">
		  <li><a href="<%=path %>/signup.php">马上注册</a></li>
	   </ul>
     </form>
  </div> <!-- /container -->
</body>
</html>