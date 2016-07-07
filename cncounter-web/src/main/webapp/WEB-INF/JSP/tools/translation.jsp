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
            <p class="h1">CNC全文翻译(<a target="_blank" href="http://fanyi.youdao.com/">有道API</a>): </p>
            <p>说明: 全文翻译.请按照markdown语法整理。</p>
            <br/>
            <div class="msg_area"></div>
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
                    <button id="btn_copy"  class="btn btn-default btn-warning right"
                            data-clipboard-action="copy" data-clipboard-target="#text_translation"
                            alt="Copy to clipboard"
                            >复制</button>
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
            if(window.Clipboard){
                var clipboard = new Clipboard("#btn_copy", {
                    text: function(trigger) { // 可以自定义返回的text
                        return $text_translation.val() || "";
                    }
                });
                clipboard.on('success', function(e) {
                    e.clearSelection();
                    return tip("复制成功");
                });

                clipboard.on('error', function(e) {
                    var content0=$text_translation[0];
                    content0.select(); // 选择对象
                    return tip("请使用 Ctrl + C 命令复制");
                });
            } else {
                $btn_copy.click(excuteCopy);
            }

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
                    tip("翻译成功");
                };
                function errorCallback(jqXHR, textStatus, errorThrown){
                    tip("请求失败!");
                };
                tip("后台正在执行翻译,请等待10-30秒!");
                postAjax(url, data, successCallback, errorCallback, 1);
            };
            // http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
			//
            function excuteCopy(){
                //
                var content = $text_translation.val() || "";
                if(!content){
                    return tip("没有内容");
                }
                if(window.clipboardData && window.clipboardData.setData){
                    try{ // IE
                        window.clipboardData.setData('Text', content);
                        return tip("复制成功");
                    } catch(ex){}
                }
                if (window.ffclipboard && window.ffclipboard.setText) {
                    try{ // FF -add-on
                        window.ffclipboard.setText(content);
                        return tip("复制成功");
                    } catch(ex){}
                }
                if(window.Components && window.Components.classes && window.Components.interfaces){
                    // FF text
                    var clipboardhelper = window.Components.classes["@mozilla.org/widget/clipboardhelper;1"];
                    if(clipboardhelper && window.Components.interfaces.nsIClipboardHelper){
                        //
                        try{ // FF Clipboard
                            var gClipboardHelper = clipboardhelper.getService(Components.interfaces.nsIClipboardHelper);
                            gClipboardHelper.copyString(content);
                            return tip("复制成功");
                        } catch(ex){}
                    }
                    // 参考 https://developer.mozilla.org/zh-CN/docs/Using_the_Clipboard
                    // 已过时
                }
                if(window.copy){
                    try{// Chrome console
                        content && copy(content);
                        return tip("复制成功");
                    } catch(ex){}
                }
                //
                if(document.execCommand){
					// 必须在用户直接事件处理器之中调用
					// var copySupported = document.queryCommandSupported('copy');
                    try{ // Chrome- execCommand
                        var content0=$text_translation[0];
                        content0.select(); // 选择对象
                        document.execCommand("Copy"); // 执行浏览器复制命令
                        return tip("复制成功");
                    } catch(ex2){}
                }
                //
                tip("请使用 Ctrl + C 命令复制");
            };
            function tip(msg, selector){
                selector = selector || ".msg_area";
                try{
                    var $msg_area = $(selector);
                    if($msg_area.length){
                        $msg_area.text(""+ msg);
                        $msg_area.removeClass("hide");
                        $msg_area.show();
                    } else if(window["layer"]){
                        window["layer"].msg(msg);
                    } else {
                        window.alert(msg);
                    }
                } catch(ex){}
            }
        });
        //
    </script>
</body>
</html>