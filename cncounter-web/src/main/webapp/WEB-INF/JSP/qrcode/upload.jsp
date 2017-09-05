<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@include file="../basePath.jsp"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>二维码图片在线识别 - CN计数-cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
	<%-- jquery.fileupload-lib--%>
	<script src="<%=basePath %>static/jquery.fileupload/js/vendor/jquery.ui.widget.js"></script>
	<script src="<%=basePath %>static/jquery.fileupload/js/jquery.iframe-transport.js"></script>
	<script src="<%=basePath %>static/jquery.fileupload/js/jquery.fileupload.js"></script>
    <link  href="<%=basePath %>static/jquery.fileupload/css/jquery.fileupload.css" rel="stylesheet">
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
			<p class="h1">二维码图片在线识别  [<a target="_blank" href="input.php">在线生成</a>]</p>

			<div>
                <div>上传图片:
                    <span class="btn btn-success fileinput-button">
                        <i class="glyphicon glyphicon-plus"></i>
                        <span>选择本地图片</span>
                        <!-- The file input field used as target for the file upload widget -->
                        <input id="fileupload" type="file" accept="image/*" name="image_file" data-url="<%=basePath %>qrcode/ajax/parseimage.json">
                    </span>
                </div>
                <br/>
                <div>或者</div>

                <form id="input_form" action="<%=basePath %>qrcode/ajax/parseurl.json" method="post">
                <div>网络图片地址: <input tabindex="1" id="image_url" name="image_url" >
                    <button tabindex="4" id="btn_parse_url"
                            type="button" class="btn btn-primary"> 解析 </button>
                </div>

                </form>
			</div>
			<div class="qrcode-jpeg-area">
				<div>解析结果:</div>
                <textarea tabindex="3" id="content" name="content" rows="4" cols="36"></textarea>
                <br/>
			</div>
            <div>
                <br/>
                <div>
                    <a id="btn_redirect"  tabindex="5" style="margin-left: 10px;" class="btn btn-warning"> 点击跳转>> </a>
                </div>
            </div>
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
	
	<script type="text/javascript">
		// 此处JS应该归拢收集
		$(function(){
			//
			var $btn_parse_url = $("#btn_parse_url");
			var $btn_redirect = $("#btn_redirect");
			var $input_form = $("#input_form");
			var $content = $("#content");
			var $image_url = $("input[name=image_url]");
			//
			$content.bind("focus", function(e){
				// 选中
				$content[0] && $content[0].select && $content[0].select();
			});
            // 上传图片
            $('#fileupload').fileupload({
                //url: url,
                dataType: 'json',
                done: function (e, resp) {

                    var data = resp.result || {};
                    var meta = data.meta || {};
                    var qrcodeInfo = meta.qrcodeInfo || "";
                    if(qrcodeInfo){
                        $content.val(qrcodeInfo);
                    } else {
                        $content.val(data.info);
                    }
                    $image_url.val("");
                }
            });
			//
			$btn_parse_url.bind("click", function(e){
				//
				var image_url = $image_url.val();
				if(!image_url){
					alert("地址不能为空!");
					return;
				}
				//
				var url = $input_form.attr("action");
				var data = {
                    image_url : image_url
				};
				
				var successCallback = function (message) {
                    message = message || {};
                    var meta = message.meta || {};
                    var qrcodeInfo = meta.qrcodeInfo || "";
                    if(qrcodeInfo){
                        $content.val(qrcodeInfo);
                    } else {
                        $content.val(message.info);
                    }
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