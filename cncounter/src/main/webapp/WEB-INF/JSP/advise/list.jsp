<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<title>意见与建议 - 中国计数cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container">
		<div class="content_left">
			<div>
			       <h2 class="form-advise-heading">意见与建议</h2>
			</div>
			<div><br/><br/></div>
			
			
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<!-- 多说评论框 start -->
	<div class="ds-thread" data-thread-key="advise" data-title="意见与建议" data-url="<%=path %>/advise/list.php"></div>
	<!-- 多说评论框 end -->
	<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
	<script type="text/javascript">
	var duoshuoQuery = {short_name:"cncounter"};
	(function() {
		var ds = document.createElement('script');
		ds.type = 'text/javascript';ds.async = true;
		ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
		ds.charset = 'UTF-8';
		(document.getElementsByTagName('head')[0] 
		 || document.getElementsByTagName('body')[0]).appendChild(ds);
	})();
	</script>
	<!-- 多说公共JS代码 end -->
	<jsp:include page="/common/footer.jsp"></jsp:include>
	
	<script type="text/javascript">
		// 此处JS应该归拢收集
		$(function(){
			//
			var $ajaxsubmit = $(".ajaxsubmit");
			//
			var $input_form = $("#input_form");
			var $content = $("#content");
			//
			$ajaxsubmit.bind("click", function(e){
				//
				var content = $content.val();
				if(!content){
					alert("内容不能为空!");
					return;
				}
				//
				var data = $input_form.serialize();
				//
				var url = $input_form.attr("action");
				
				var successCallback = function (message) {
		        	   var meta = message["meta"] || "";
		        	   //
		        	   var uuid = meta["uuid"];
		        	   var url = meta["url"];
		        	   if(url){
		        		   window.location.href = url;
		        	   }
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