<%@page import="org.springframework.context.ApplicationContext"%>
<%@page import="com.cncounter.util.spring.SpringContextHolder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
ApplicationContext context = SpringContextHolder.getApplicationContext();
String holdername = context.getClass().getName();
System.out.println(holdername);
//
%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>欢迎您 - cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
			<p class="h1">CN计数</p>
			<h1>
			<%=holdername %>
			</h1>
			<h2>
				<a target="_blank" href="http://cncounter.duapp.com">在线访问地址</a>
			</h2>
			<h2>
				<a target="_blank" href="./druid/weburi.html">Druid监控页面</a>
			</h2>
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
</body>
</html>