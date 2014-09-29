<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.cncounter.test.duapp.TestMySQLConnection"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>环形图- cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
	<jsp:include page="/common/Chart.js.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container">
		<div class="content_left">
			<p class="h1">环形图（Doughnut chart）</p>
		   	<h1>
		   		<a target="_blank" href="./testChartjs.jsp">
		   		&lt;&lt;测试Chart.js
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
				value: 30,
				color:"#F7464A"
			},
			{
				value : 50,
				color : "#E2EAE9"
			},
			{
				value : 100,
				color : "#D4CCC5"
			},
			{
				value : 40,
				color : "#949FB1"
			},
			{
				value : 120,
				color : "#4D5360"
			}
		
		];
		//
		var options = {
			//Boolean - Whether we should show a stroke on each segment
			segmentShowStroke : true,
			
			//String - The colour of each segment stroke
			segmentStrokeColor : "#fff",
			
			//Number - The width of each segment stroke
			segmentStrokeWidth : 2,
			
			//The percentage of the chart that we cut out of the middle.
			percentageInnerCutout : 50,
			
			//Boolean - Whether we should animate the chart	
			animation : true,
			
			//Number - Amount of animation steps
			animationSteps : 100,
			
			//String - Animation easing effect
			animationEasing : "easeOutBounce",
			
			//Boolean - Whether we animate the rotation of the Doughnut
			animateRotate : true,
		
			//Boolean - Whether we animate scaling the Doughnut from the centre
			animateScale : false,
			
			//Function - Will fire on animation completion.
			onAnimationComplete : null
		};
		// 绘制一幅极地区域图（Polar area chart）
		new Chart(ctx).Doughnut(data,options);
	</script>
</body>
</html>