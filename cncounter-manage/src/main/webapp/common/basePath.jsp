<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%

	String __port = "" + request.getServerPort();
	String __path = request.getContextPath();
	String basePath = "//" + request.getServerName();
	if(__port.equals("80") || __port.equals("443") ){
	} else {
		basePath += ":" + request.getServerPort();
	}
	basePath += "/" + __path;
%>
<%--
使用方式: <%@include file="basePath.jsp"%>
--%>