<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%

%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>测试Chart.js - cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
	<jsp:include page="/common/Chart.js.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container">
		<div class="content_left">
			<p class="h1">测试Chart.js  - 天朝计数</p>
		   	<h1>
		   		<a target="_blank" href="../index.jsp">
		   		测试目录页
		   		</a>
		   	</h1>
		   	<h1>
		   		<a target="_blank" href="./testChartjs.jsp">
		   		&lt;&lt;测试Chart.js
		   		</a>
		   	</h1>
		   	<h1>
		   		<a target="_blank" href="./PolarArea.jsp">
		   		极地区域图
		   		</a>
		   	</h1>
		   	<h1>
		   		<a target="_blank" href="./Doughnut.jsp">
		   		环形图
		   		</a>
		   	</h1>
		<div>
			<canvas id="myChart" width="400" height="400"></canvas>
		</div>
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
	<script type="text/javascript">
		// 为了创建图表，我们要实例化一个Chart对象。为了完成前面的步骤，首先需要需要传入一个绘制图表的2d context
		//Get the context of the canvas element we want to select
		//var ctx = document.getElementById("myChart").getContext("2d");
		//var myNewChart = new Chart(ctx).PolarArea(data);
		
		// 以用jQuery获取canvas的context
		//Get context with jQuery - using jQuery's .get() method.
		var ctx = $("#myChart").get(0).getContext("2d");
		//This will get the first returned node in the jQuery collection.
		var myNewChart = new Chart(ctx);
		
		//
		var data = [
			{
				value : 30,
				color: "#D97041"
			},
			{
				value : 90,
				color: "#C7604C"
			},
			{
				value : 24,
				color: "#21323D"
			},
			{
				value : 58,
				color: "#9D9B7F"
			},
			{
				value : 82,
				color: "#7D4F6D"
			},
			{
				value : 8,
				color: "#584A5E"
			}
		];
		// 绘制一幅极地区域图（Polar area chart）
		new Chart(ctx).PolarArea(data);
	</script>
</body>
</html>