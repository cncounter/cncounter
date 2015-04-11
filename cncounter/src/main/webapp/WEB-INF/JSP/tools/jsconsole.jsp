<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>JavaScript控制台 - CNCounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
			<p class="h1">JavaScript控制台: </p>
			<p>说明: 适合手机浏览器不方便调试的时候.</p>
			
			<span>JavaScript脚本:</span>
			<br/>
			<textarea tabindex="3" id="content" name="content" rows="6" cols="36"></textarea>
			<br/>
			<button tabindex="4" id="btn_execute"
				 type="button" class="btn btn-primary">执行</button>
			<button tabindex="4" id="btn_clear"
				 type="button" class="btn btn-primary">清空</button>
			<script type="text/javascript">
				//
				$(function(){
					//
					init_console();
				});
				//
				function init_console(){
					var $content = $("#content");
					var $stdout = $("#stdout");
					var $btn_execute = $("#btn_execute");
					var $btn_clear = $("#btn_clear");
					//
					//
				};
				//
				function jsconsole(){
					//
				};
			</script>
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
</body>
</html>