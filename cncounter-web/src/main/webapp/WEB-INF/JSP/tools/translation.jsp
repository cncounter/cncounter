<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="../basePath.jsp"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>CNC全文翻译 - CNCounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="left col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<p class="h1">CNC全文翻译(有道API): </p>
			<p>说明: 全文翻译.请按照markdown语法整理。</p>
			<br/>
            <div class="left col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div>
                    英文:
                </div>
                <div>
                    <textarea id="text_original"  class="form-control" rows="8"
                    ></textarea>
                </div>
                <br/>
                <div>
                    <button id="btn_translate" class="btn btn-default btn-info right">翻译 &gt;&gt;</button>
                </div>
            </div>
            <div class="left col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div>
                    中文:
                </div>
                <div>
                    <textarea id="text_translation" class="form-control" rows="8"
                            ></textarea>
                </div>
                <br/>
                <div>
                    <button id="btn_copy"  class="btn btn-default btn-warning right">复制</button>
                </div>
            </div>
		</div>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
    <script type="text/javascript">
        //
        $(function(){
            //
            var $text_original = $("#text_original");
            var $text_translation = $("#text_translation");
            //
            var $btn_copy = $("#btn_copy");
            var $btn_translate = $("#btn_translate");
            //
            $btn_translate.click(excuteQuery);
            $btn_copy.click(excuteCopy);
            //
            function excuteQuery(){
                //
                var text_original = $text_original.val();
                if(!text_original){
                    return;
                }
                //
                var url = "<%=basePath %>tools/translation/english.json";
                var data = {
                    text_original : text_original
                };
                //
                function successCallback(message){
                    var meta = message["meta"];
                    var text_translation = meta["text_translation"];
                    $text_translation.text(text_translation);
                };
                function errorCallback(jqXHR, textStatus, errorThrown){
                    alert("请求失败!");
                };

                postAjax(url, data, successCallback, errorCallback, 1);
            };
            //
            function excuteCopy(){
                //
                var content = $text_translation.val() || "";
                try{
                    content && copy(content);
                } catch(ex){
                    //
                    try{
                        var content0=$text_translation[0];
                        content0.select(); // 选择对象
                        document.execCommand("Copy"); // 执行浏览器复制命令
                    } catch(ex2){
                        alert("复制失败,请使用 Chrome浏览器");
                    }
                }
            };
        });
        //
    </script>
</body>
</html>