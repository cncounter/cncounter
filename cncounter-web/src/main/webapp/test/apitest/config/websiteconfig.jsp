<%@ page language="java" contentType="text/html; charset=UTF-8"
import="com.cncounter.cncounter.config.*"
	pageEncoding="UTF-8"%>
<%

StringBuffer requestURL = request.getRequestURL();
String currentPageURL = requestURL.toString();


String isdebugmode = request.getParameter("isdebugmode");
if(null != isdebugmode && !isdebugmode.trim().isEmpty()){
	// 判断权限 ... 
	// 获取值
	// 设置值
	// 提示信息
	System.out.println("isdebugmode="+isdebugmode);
	System.out.println("currentPageURL="+currentPageURL);
	
	//
	if("1".trim().equalsIgnoreCase(isdebugmode)){
		WebSiteConfig.ennableDebugMode(); // 启用调试模式
	} else if("0".trim().equalsIgnoreCase(isdebugmode)){
		WebSiteConfig.disableDebugMode(); // 禁用调试模式
	}
}

boolean isDebugMode  = WebSiteConfig.isDEBUG_MODE();


%>
<!DOCTYPE html>
<html>
<head>
	<title>WEB站点配置测试页- cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
		       <h2 class="form-signin-heading">WEB站点配置</h2>
		       
		       <div title="DEBUG模式">
		         <h3>当前处于: <%= isDebugMode ? "调试模式" : "运行状态" %></h3>
		         <a href="<%=currentPageURL%>?isdebugmode=1">
		           <button type="button" class="btn btn-success btn-block" >开启调试模式</button>
		         </a>
		         <p></p>
		         <a href="<%=currentPageURL%>?isdebugmode=0">
		           <button type="button" class="btn btn-warning btn-block" >关闭调试模式</button>
		         </a>
		       </div>
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
</body>
</html>