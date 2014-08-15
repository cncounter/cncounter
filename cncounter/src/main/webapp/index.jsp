<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="com.cncounter.util.spring.SpringContextHolder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
//ApplicationContext context = SpringContextHolder.getApplicationContext();
//System.out.println(context.getClass().getName());
//
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>欢迎您 - cncounter</title>
</head>
<body>
	<p>天朝计数</p>
	<h2>
		<a target="_blank" href="http://cncounter.duapp.com">在线访问地址</a>
	</h2>
	<h2>
		<a target="_blank" href="./druid/weburi.html">Druid监控页面</a>
	</h2>
</body>
</html>