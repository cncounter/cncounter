<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<title>二维码显示 - 中国计数cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container">
		<div class="content_left">
		
			<a href="<%=basePath %>qrcode/input.php" class="btn btn-lg btn-warning btn-block">  &lt;&lt;返回 </a> 
			<p class="h1"> 二维码显示</p>
			<div>
				<form id="input_form" action="<%=basePath %>qrcode/ajax/genqrcode.json" method="post">
					<span>二维码内容:</span>
					<br/>
					<textarea readonly="readonly" tabindex="3" id="content" name="content" rows="8" cols="40">${content}</textarea>
					<br/>
				</form>
			</div>
			<div>
			<br/>
			</div>
			<div class="qrcode-jpeg-area">
				<a id="qrcode_img_anchor" target="_blank" href="<%=basePath %>rest/qrcode/${uuid}.jpeg">
					<img id="qrcode_img" alt="" src="<%=basePath %>rest/qrcode/${uuid}.jpeg" class="qrcode-img">
				</a>
			</div>
			<a href="<%=basePath %>qrcode/input.php" class="btn btn-lg btn-warning btn-block">  &lt;&lt;返回 </a> 
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
	
	<script type="text/javascript">
	</script>
</body>
</html>