<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>Java-REPL-Web控制台 - CNCounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
			<p class="h1">Java-REPL-Web控制台: </p>
			<p>说明: 适合手机浏览器不方便调试的时候.</p>
			
			<span>Java-REPL脚本:</span>
			<br/>
			<iframe src="http://www.javarepl.com/embed.html" style="width: 720px; height: 350px; border: 0px"></iframe>
			
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
</body>
</html>