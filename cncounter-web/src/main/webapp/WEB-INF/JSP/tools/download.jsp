<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@include file="../basePath.jsp"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>代理下载 - CN计数-cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
			<p class="h1">代理下载</p>
			<div>
				<form id="input_form" action="<%=basePath %>crossorigion/download/genfileurl.json" method="post">
					<span>请输入需要下载的URL地址:</span>
					<br/>
					<textarea tabindex="3" id="origfileurl" name="origfileurl" rows="4" cols="36"></textarea>
					<br/>
                    自定义文件名:
                    <br/>
                    <input tabindex="4" name="targetfilename" style="width: 100%;">
                    <br/>
				</form>
                <div style=" margin-top: 10px; ">
                    <button tabindex="4" id="btn_generate_link"
                            type="button" class="btn btn-primary"> 后台下载 </button>
                </div>
            </div>
			<div>
                <br/>
			</div>
			<div class="qrcode-jpeg-area">
				下载地址: <a id="file_download_anchor" target="_blank">
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
			var $btn_generate_link = $("#btn_generate_link");
			var $file_download_anchor = $("#file_download_anchor");
			var $input_form = $("#input_form");
			var $origfileurl = $("#origfileurl");
			var $targetfilename = $("input[name=targetfilename]");
			//
			var href = window.location.href;
			//
			$btn_generate_link.bind("click", function(e){
				//
				var origfileurl = $origfileurl.val();
				var targetfilename = $targetfilename.val();
				if(!origfileurl){
					layer.msg("url不能为空!");
					return;
				}
				//
				var url = $input_form.attr("action");
				var data = {
					origfileurl : origfileurl
					,
					targetfilename : targetfilename
				};
				
				var successCallback = function (message) {
                        var meta = message["meta"] || "";
                        var info = message["info"] || "";
                        layer.msg(info);
                        //
                        var downloadurl = meta["downloadurl"];
                        $file_download_anchor.attr("href", downloadurl);
                        $file_download_anchor.text(downloadurl);
                        // 循环探测. 是否已经成功
                        // var testURL = "/crossorigion/download/existsfile.json";
                    };
				//
				var errorCallback = function (jqXHR, textStatus, errorThrown) {
				    	// 把错误吃了
				        layer.msg("网络请求失败");
				    };
				//
				postAjax(url, data, successCallback,errorCallback,1);
				//
			});
		});
	</script>
</body>
</html>