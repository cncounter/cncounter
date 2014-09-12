<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>欢迎您 - cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container">
		<div class="content_left">
			<p class="h1">天朝计数</p>
			<h2>
				<a target="_self" href="http://cncounter.duapp.com">在线访问地址</a>
			</h2>
			<h2>
				<a target="_blank" href="http://blog.cncounter.com/cncounter/">GitHub项目首页</a>
			</h2>
			<h2>
				<a target="_self" href="./qrcode/input.php">二维码生成</a>
			</h2>
			<h2>
				<a target="_blank" href="http://developer.baidu.com/apm/index">应用性能监测中心</a>
			</h2>
			<h2>
				<a target="_blank" href="./druid/weburi.html">Druid监控页面</a>
			</h2>
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
</body>
</html>