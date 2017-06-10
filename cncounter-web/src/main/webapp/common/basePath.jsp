<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%><%

	String __port = "" + request.getServerPort();
	String path = request.getContextPath();
	String basePath = "//" + request.getServerName();
	if(__port.equals("80") || __port.equals("443") ){
	} else {
		basePath += ":" + request.getServerPort();
	}
	basePath += "/";
%><%--
使用方式: <%@include file="basePath.jsp"%>
--%>