<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<title>二维码生成 - 中国计数cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container">
		<div class="content_left">
			<p class="h1">二维码在线生成</p>
			<div>
				<form id="input_form" action="<%=basePath %>qrcode/ajax/genqrcode.json" method="post">
					宽: <input tabindex="1" name="width" name="width" value="400" > px
					<br/>
					高: <input tabindex="2" name="height" name="height" value="400" > px
					<br/>
					<span>请输入需要转换的内容:</span>
					<br/>
					<textarea tabindex="3" id="content" name="content" rows="8" cols="40"></textarea>
					<br/>
				</form>
					<button tabindex="4" id="btn_generate_qrcode">生成</button>
			</div>
			<div class="qrcode-jpeg-area">
				<img id="qrcode_img" alt="" src="" class="qrcode-img hide">
			</div>
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
	
	<script type="text/javascript">
		// 此处JS应该归拢收集
		$(function(){
			//
			var $btn_generate_qrcode = $("#btn_generate_qrcode");
			var $qrcode_img = $("#qrcode_img");
			var $input_form = $("#input_form");
			var $content = $("#content");
			//
			var href = window.location.href;
			$content.val(href);
			//
			$btn_generate_qrcode.bind("click", function(e){
				//
				var content = $content.val();
				if(!content){
					alert("content="+content);
					return;
				}
				//
				var url = $input_form.attr("action");
				var data = {
					content : content
				};
				
				var successCallback = function (message) {
		        	   var meta = message["meta"] || "";
		        	   //
		        	   var uuid = meta["uuid"];
		        	   var src = meta["src"];
		        	   $qrcode_img.attr("src", src).removeClass("hide");
				    };
				//
				var errotCallback = function (jqXHR, textStatus, errorThrown) {
				    	// 把错误吃了
				        alert("网络请求失败");
				    };
				//
				requestAjax(url, data, successCallback,errotCallback);
				//
			});
		});
	</script>
</body>
</html>