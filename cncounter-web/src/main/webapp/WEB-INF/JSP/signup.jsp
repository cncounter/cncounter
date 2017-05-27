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
     <form class="form-signin" role="form" method="post" action="<%=path %>/openapi/signup.json">
       <h2 class="form-signin-heading">用户注册</h2>
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
         <input id="loginpassword" name="loginpassword" type="text"  class="form-control" placeholder="输入登录密码"  required>
       </div>
         <br/>
         <div>
             <button id="btn_signup" class="btn btn-lg btn-primary btn-block" type="button">确认注册</button>
             <br/>
             <a class="btn btn-lg btn-warning btn-block"  href="<%=path %>/login.php">已有账号?点击登录</a>
         </div>
     </form>
  </div> <!-- /container -->
  <script src="<%=path %>/static/jsp_js/signup.jsp.js"></script>
</body>
</html>