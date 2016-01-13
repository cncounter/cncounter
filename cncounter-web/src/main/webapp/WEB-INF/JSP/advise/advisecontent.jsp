<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@include file="../basePath.jsp"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>${advisetitle} - 中国计数cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
			<ul class="list-group">
			   <li class="list-group-item">
			   	<div>
			   		<div class="title">${advisetitle}</div>
			   		<div class="content">${advisecontent}</div>
			   		<div class="foot">联系信息: ${adviselinkman}. 邮箱: ${adviseemail}</div>
			   	</div>
			   </li>
			</ul>
			
			<div>
			     <form class="form-advise" role="form" method="post" action="<%=path %>/advise/.json">
			       <h2 class="form-advise-heading">意见与建议:</h2>
			       <input type="text" class="form-control" placeholder="输入用户名/邮箱" required>
					<br/>
					<%-- 这里需要替换为 ueditor... --%>
					<textarea tabindex="3" id="content" name="content" rows="8" cols="40"></textarea>
					<br/>
			       <button class="btn btn-lg btn-primary btn-block" type="submit">确定</button>
			     </form>
			</div>
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
	
	<script type="text/javascript">
		// 此处JS应该归拢收集
		$(function(){
			
		});
	</script>
</body>
</html>