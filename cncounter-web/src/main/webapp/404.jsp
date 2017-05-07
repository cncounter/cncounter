<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ page import="com.cncounter.cncounter.config.WebSiteConfig"
%><%
	String uri = (String) request.getAttribute(WebSiteConfig.KEY_ORIG_REQUEST_URI);
	if(null != uri){
		// 这里获取到的是 404.jsp,坑
		if(uri.contains("?")){
			int index = uri.indexOf("?");
			uri = uri.substring(0, index);
		}
		if(uri.endsWith(".json")){
			// 返回JSON
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/html; charset=UTF-8");
%>{"actionvalue":"","clientaction":"","data":[],"errorcode":"0404","info":"404","meta":{},"status":0,"total":0}
<%
			// 不在继续往下执行
			return;
		}
	}
%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>404 - CNCounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
			<p class="h1">404 - CN计数器</p>
			<h2>
				<a target="_self" href="/">404!</a>
			</h2>
			<h2>
				<a target="_self" href="./qrcode/input.php">实用小程序二维码生成</a>
			</h2>
			<h2>
				<a target="_self" href="favorite/list/0.php">公共收藏夹</a>
			</h2>
			
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
</body>
</html>