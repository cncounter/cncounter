<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="../common/basePath.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<title>意见与建议 - CN计数-cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="list-group">
		   <a href="#" class="list-group-item active">
		      <h4 class="list-group-item-heading">
		         入门网站包
		      </h4>
		   </a>
		   <a href="#" class="list-group-item">
		      <h4 class="list-group-item-heading">
		         免费域名注册
		      </h4>
		      <p class="list-group-item-text">
		         您将通过网页进行免费域名注册。
		      </p>
		   </a>
		   <a href="#" class="list-group-item">
		      <h4 class="list-group-item-heading">
		         24*7 支持
		      </h4>
		      <p class="list-group-item-text">
		         我们提供 24*7 支持。
		      </p>
		   </a>
		</div>
		<div class="list-group">
		   <a href="#" class="list-group-item active">
		      <h4 class="list-group-item-heading">
		         商务网站包
		      </h4>
		   </a>
		   <a href="#" class="list-group-item">
		      <h4 class="list-group-item-heading">
		         免费域名注册
		      </h4>
		      <p class="list-group-item-text">
		         您将通过网页进行免费域名注册。
		      </p>
		   </a>
		   <a href="#" class="list-group-item">
		      <h4 class="list-group-item-heading">24*7 支持</h4>
		      <p class="list-group-item-text">我们提供 24*7 支持。</p>
		   </a>
		</div>
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
		        	   $qrcode_img.attr("src", src).removeClass("hide");
		        	   $qrcode_img_anchor.attr("href", src).removeClass("hide");
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