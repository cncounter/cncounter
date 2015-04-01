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
	<jsp:include page="/common/clipboard.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container">
		<div class="content_left">
		
			<p class="h1"> 二维码显示</p>
			<div>
				<form id="input_form" action="<%=basePath %>qrcode/ajax/genqrcode.json" method="post">
					<span>二维码内容:</span>
					<br/>
					<textarea readonly="readonly" tabindex="3" id="content" name="content" rows="8" cols="36">${content}</textarea>
					<br/>
					
					<a id="btn_copy"  tabindex="4" class="btn btn-sm btn-success btn-block"> 点击复制 </a> 
				</form>
			</div>
			<div>
			<br/>
			</div>
			<div class="qrcode-jpeg-area">
				<span>二维码图片:</span>
				<br/>
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
		
	
		$(function(){
			//
			var $btn_copy = $("#btn_copy");
			var $content = $("#content");
			
			//
			setTimeout(function() {
				//set path
				ZeroClipboard.setMoviePath('http://davidwalsh.name/dw-content/ZeroClipboard.swf');
				//create client
				var clip = new ZeroClipboard.Client();
				//event
				clip.addEventListener('mousedown',function() {
					// 由JS自己控制
					var content = $content.val() || "";
					//
					if(!content){
						alert("复制的内容为空!");
						return;
					} else {
						// 由JS自己控制
						clip.setText(content);
					}
				});
				clip.addEventListener('complete',function(client,text) {
					alert("复制成功!"); // 这里应该修改为使用 msg
				});
				//glue it to the button
				clip.glue('btn_copy');
			}, 2000);
			
		});
	</script>
</body>
</html>