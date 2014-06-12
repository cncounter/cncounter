<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="com.cncounter.util.spring.SpringContextHolder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
ApplicationContext context = SpringContextHolder.getApplicationContext();
System.out.println(context.getClass().getName());
//
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>初始测试主页面 - cncounter</title>
</head>
<body>
	<p>用Maven创建web项目，测试Servlet</p>
	<h2>
		<a target="_blank" href="test/link.asp?action=login_input">登录</a>
	</h2>
	<h2>
		<a target="_blank" href="mvc/link.php">MVC_Link</a>
	</h2>
	<h2>
		<a target="_blank" href="mvc/welcome.php">MVC_Welcome</a>
	</h2>
	<h2>
		<a target="_blank" href="mvc/hello.php">MVC_Hello</a>
	</h2>
	<h2>
		<a target="_blank" href="druid/index.html">Druid监控页面</a>
	</h2>
	<h2>
		<a target="_blank" href="static/book/learning_java/exception.html">Java基础 : 异常</a>
	</h2>
</body>
</html>