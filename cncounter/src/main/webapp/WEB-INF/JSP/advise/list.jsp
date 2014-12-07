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
			     <form id="input_form" class="form-advise" role="form" method="post" action="<%=path %>/advise/ajax/addadvise.json">
			       <h2 class="form-advise-heading">意见与建议</h2>
					<br/>
					<%-- 这里需要替换为 ueditor... --%>
					<textarea tabindex="3" id="content" name="content" rows="8" cols="40"></textarea>
					<br/>
			       <input type="text" class="form-control" placeholder="输入用户名/邮箱" required>
			       <br/>
			       <button class="btn btn-lg btn-primary btn-block ajaxsubmit" type="button">确定</button>
			     </form>
			</div>
			<div><br/><br/></div>
			
			<div class="list-group">
			   <a href="#" class="list-group-item active">
			      <h4 class="list-group-item-heading">
			         建议标题
			      </h4>
			   </a>
			   <a href="#" class="list-group-item">
			      <h4 class="list-group-item-heading">
			         建议标题
			      </h4>
			      <p class="list-group-item-text">
			         建议的内容
			      </p>
			      <p class="list-group-item-text">
			        联系信息: renfufei. 邮箱: renfufei@qq.com
			      </p>
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