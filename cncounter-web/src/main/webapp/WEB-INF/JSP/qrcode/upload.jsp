<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@include file="../basePath.jsp"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>二维码图片在线识别 - CN计数-cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
			<p class="h1">二维码图片在线识别</p>
			<div>


					<button tabindex="4" id="btn_generate_qrcode"
						 type="button" class="btn btn-primary"> 生　 成 </button>
                <a id="btn_redirect"  tabindex="5" style="margin-left: 10px;" class="btn btn-warning"> 点击跳转>> </a>
            </div>
			<div>
			<br/>
			</div>
			<div class="qrcode-jpeg-area">
                <textarea tabindex="3" id="content" name="content" rows="4" cols="36"></textarea>
                <br/>
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
			var $btn_redirect = $("#btn_redirect");
			var $qrcode_img = $("#qrcode_img");
			var $qrcode_img_anchor = $("#qrcode_img_anchor");
			var $input_form = $("#input_form");
			var $content = $("#content");
			var $width = $("input[name=width]");
			var $height = $("input[name=height]");
			//
			var href = window.location.href;
			$content.val(href);
			$content.bind("focus", function(e){
				// 选中
				$content[0] && $content[0].select && $content[0].select();
			});
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
            //
            $btn_redirect.bind("click", function(e){
                //
                var http = "http";
                var content = $content.val();
                if(!content){ return; }
                //
                if(0 === content.indexOf(http)){
                    window.open(content);
                } else if(0 === content.indexOf("//")){
                    window.open(location.protocol + content);
                } else {
                    window.open(location.protocol + "//"+content);
                }
            });
		});
	</script>
</body>
</html>