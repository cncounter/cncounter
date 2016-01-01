<%@page import="com.cncounter.cncounter.config.WebSiteConfig"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%><%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()	+ path + "/";
	
%>
	<link href="<%=basePath %>static/image/favicon.ico" rel="bookmark" type="image/x-icon" /> 
	<link href="<%=basePath %>static/image/favicon.ico" rel="icon" type="image/x-icon" /> 
	<link href="<%=basePath %>static/image/favicon.ico" rel="shortcut icon" type="image/x-icon" />
	
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
<%
	String jqv = "1.9.1"; // jQuery版本
	String bsv = "3.3.4"; // BootStrap版本
	// 根据参数设置,决定是从本机还是从CDN获取CSS,JS资源
	boolean debugmode = WebSiteConfig.isDEBUG_MODE();
	if(debugmode){
%>
	<script src="<%=basePath %>static/jquery/<%=jqv%>/jquery.min.js"></script>
	<script src="<%=basePath %>static/bootstrap/<%=bsv%>/js/bootstrap.min.js"></script>
	<link  href="<%=basePath %>static/bootstrap/<%=bsv%>/css/bootstrap.min.css" rel="stylesheet">
	<link  href="<%=basePath %>static/bootstrap/<%=bsv%>/css/bootstrap-theme.min.css" rel="stylesheet">
<%
	} else {
	//
%>
	<!-- 百度CDN公共库参考地址 : http://developer.baidu.com/wiki/index.php?title=docs/cplat/libs -->
	<!-- 引入 jQuery -->
	<script src="http://libs.baidu.com/jquery/<%=jqv%>/jquery.min.js"></script>
	<!-- BootStrap JS -->
	<script src="http://cdn.bootcss.com/bootstrap/<%=bsv%>/js/bootstrap.min.js"></script>
	<!-- BootStrap -->
	<link href="http://cdn.bootcss.com/bootstrap/<%=bsv%>/css/bootstrap.min.css" rel="stylesheet">
	<!-- BootStrap theme -->
	<link href="http://cdn.bootcss.com/bootstrap/<%=bsv%>/css/bootstrap-theme.min.css" rel="stylesheet">
<%
	}
%>

	<!-- 本站的JS工具类 -->
	<script src="<%=basePath %>static/js/cncounter-util.js?v=1"></script>
	<!-- 本站CSS样式 -->
	<link href="<%=path%>/static/css/main.css" rel="stylesheet" type="text/css" />