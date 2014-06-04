<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String name = String.valueOf(request.getAttribute("name"));
String password = String.valueOf(request.getAttribute("password"));
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录结果页 - cncounter </title>
</head>
<body>
    <div>
    	<h2>name: <%=name %></h2>
    	<h2>password: <%=password %></h2>
    </div>
    <a target="_blank" href="../">首页</a>
</body>
</html>