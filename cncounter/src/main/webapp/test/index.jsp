<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>测试页面- cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container">
		<div class="content_left">
			<p class="h1">测试  - 天朝计数</p>
		   	<h1>
		   		<a target="_blank" href="./testmysql.jsp">
		   		测试MySQL
		   		</a>
		   	</h1>
		   	<h1>
		   		<a target="_blank" href="./testredis.jsp">
		   		测试redis
		   		</a>
		   	</h1>
		   	<h1>
		   		<a target="_blank" href="./testspring.jsp">
		   		测试spring
		   		</a>
		   	</h1>
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
</body>
</html>