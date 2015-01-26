<%@page import="com.cncounter.cncounter.config.WebSiteConfig"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%><%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()	+ path + "/";
	
	// 根据参数设置,决定是从本机还是从CDN获取CSS,JS资源
	boolean debugmode = WebSiteConfig.isDEBUG_MODE();
%>
<%
	if(debugmode || true){
		%>
	<!-- 引入本地 ZeroClipboard -->
	<script src="<%=basePath %>static/js/ZeroClipboard.js"></script>
		<%
	} 
%>
