<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isErrorPage="true"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>出错提示</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
    出错提示. <br>
    <%=exception.getMessage() %><br/>
    <%=exception %><br/><span style="color: #3366ff;"><!-- 这是JSP中的内置对象exception --></span>



    <%=request.getAttribute("ex") %><br><span style="color: #3366ff;"><!-- 这是SpringMVC放在返回的Model中的异常对象 --></span>



    <%=request.getAttribute("javax.servlet.error.status_code") %><span style="color: #3366ff;"><!-- HttpServletResponse返回的错误码信息，因为前面已经配置了NumberFormatException的错误码返回值为888，所以这里应该显示888 --></span>


  </body>
</html>