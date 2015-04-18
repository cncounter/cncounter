<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>二维码生成 - 中国计数cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
			<p class="h1">二维码在线生成</p>
			<div>
				<form id="input_form" action="<%=basePath %>qrcode/ajax/genqrcode.json" method="post">
					宽: <input tabindex="1" name="width" name="width" value="300" > px
					<br/>
					高: <input tabindex="2" name="height" name="height" value="300" > px
					<br/>
					<span>请输入需要转换的内容:</span>
					<br/>
					<textarea tabindex="3" id="content" name="content" rows="8" cols="36"></textarea>
					<br/>
				</form>
					<button tabindex="4" id="btn_generate_qrcode"
						 type="button" class="btn btn-primary">生成</button>
			</div>
			<div>
			<br/>
			</div>
			<div class="qrcode-jpeg-area">
				<a id="qrcode_img_anchor" target="_blank">
					<img id="qrcode_img" alt="" src="" class="qrcode-img img-responsive center-block hide">
				</a>
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
			var $qrcode_img_anchor = $("#qrcode_img_anchor");
			var $input_form = $("#input_form");
			var $content = $("#content");
			var $width = $("input[name=width]");
			var $height = $("input[name=height]");
			//
			var href = window.location.href;
			$content.val(href);
			//
			$btn_generate_qrcode.bind("click", function(e){
				//
				var content = $content.val();
				var width = $width.val();
				var height = $height.val();
				if(!content){
					alert("内容不能为空!");
					return;
				}
				//
				var url = $input_form.attr("action");
				var data = {
					content : content
					,
					width : width
					,
					height : height
				};
				
				var successCallback = function (message) {
		        	   var meta = message["meta"] || "";
		        	   //
		        	   var uuid = meta["uuid"];
		        	   var src = meta["src"];
		        	   var href = meta["href"] || src;
		        	   $qrcode_img.attr("src", src).removeClass("hide");
		        	   $qrcode_img_anchor.attr("href", href).removeClass("hide");
				    };
				//
				var errorCallback = function (jqXHR, textStatus, errorThrown) {
				    	// 把错误吃了
				        alert("网络请求失败");
				    };
				//
				postAjax(url, data, successCallback,errorCallback,1);
				//
			});
		});
	</script>
</body>
</html>