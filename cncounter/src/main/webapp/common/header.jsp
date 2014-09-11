<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%
	String h_path = request.getContextPath();
	String h_basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()	+ h_path + "/";
%>
	<div class="header">
		<div class="">
			<a href="<%=h_path %>/">天朝计数器</a>
		</div>
		<hr/>
	</div>