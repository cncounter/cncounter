<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()	+ path + "/";
%>
	<!-- 百度CDN公共库参考地址 : http://developer.baidu.com/wiki/index.php?title=docs/cplat/libs -->
	<!-- 引入 jQuery -->
	<script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
	<!-- BootStrap JS -->
	<script src="http://cdn.bootcss.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
	<!-- BootStrap -->
	<link href="http://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
	<!-- BootStrap theme -->
	<link href="http://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap-theme.min.css" rel="stylesheet">
	<!-- 本站CSS样式 -->
	<link href="<%=path%>/static/css/main.css" rel="stylesheet" type="text/css" />