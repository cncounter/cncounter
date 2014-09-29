<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()	+ path + "/";
%>
	<!-- 本站的JS工具类 -->
	<script src="<%=basePath %>static/js/Chart.js?v=1"></script>
	<!--[if lte IE 8]>
		<script src="<%=basePath %>static/js/excanvas.js"></script>
	<![endif]-->