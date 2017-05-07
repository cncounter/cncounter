<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<title>比特币实时价格 - CNCounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
			<p class="h1">比特币实时价格: </p>
			<form action="../crossorigion/jsonproxy.json" method="get" id="form">
			<span>接口地址:</span>
			<br/>
				<textarea tabindex="1" id="_tourl" name="_tourl" rows="6" cols="36"
					>http://api.coindesk.com/v1/bpi/currentprice.json</textarea>
			</form>
			<br/>
			<button tabindex="2" id="btn_execute"
				 type="button" class="btn btn-primary">查询</button>
			<br/>
			<span>响应JSON:</span>
			<br/>
			<textarea tabindex="3" id="content" name="content" rows="6" cols="36"></textarea>
			<br/>
			<button tabindex="4" id="btn_parse"
				 type="button" class="btn btn-primary">解析</button>
			<br/>
			<span>解析后的结果:</span>
			<br/>
			<textarea tabindex="6" id="result" name="result" rows="6" cols="36"></textarea>
			<script type="text/javascript">
				//
				$(function(){
					//
					var $form = $("#form");
					var $_tourl = $("#_tourl");
					var $content = $("#content");
					var $result = $("#result");
					var $btn_execute = $("#btn_execute");
					var $btn_parse = $("#btn_parse");
					
					//
					$btn_execute.click(excuteQuery);
					$btn_parse.click(parseContent);
					//
					function excuteQuery(callback, context){
						//
						var context = context || window;
						//
						var url = $form.attr("action");
						var data = $form.serialize();
						
						//
						function successCallback(message){
							//
							//var text = JSON.stringify(message,2);
							$content.val(message);
							//
							if(callback){
								callback.call(context, message);
							}
						};
						function errorCallback(jqXHR, textStatus, errorThrown){
							alert("请求失败!");
						};

						getAjax(url, data, successCallback, errorCallback);
					};
					//
					function parseContent(){
						//
						var result = "";
						//
						var content = $content.val();
						//
						var obj = parseJSON2Object(content) || {};
						//
						if("string" === typeof obj){
							obj = parseJSON2Object(obj) || {};
						}
						//
						var bpi = obj["bpi"] || {};
						var time = obj["time"] || {};
						var updated = time["updated"];
						if(updated){
							try{
								updated = new Date(updated);
							} catch(ex){}
							result += "更新时间: " + date2Str(updated) + "\n";
						}
						//
						var USD = bpi["USD"];
						var GBP = bpi["GBP"];
						var EUR = bpi["EUR"];
						//
						result += "比特币实时价格: \n";
						//
						if(USD){
							result += "USD: " + USD["rate"] + "\n";
						}
						if(GBP){
							result += "GBP: " + GBP["rate"] + "\n";
						}
						if(EUR){
							result += "EUR: " + EUR["rate"] + "\n";
						}
						// 人民币. 根据美元转换.
						//
						// 
						$result.val(result);
					};
					//
					//
					function autoCall(){
						window.setTimeout(function (){
							//
							excuteQuery(function(){
								window.setTimeout(parseContent, 1*1000);
							});
						}, 2*1000);
						window.setTimeout(excuteQuery, 1*1000);
					};
					autoCall();
				});
				//
			</script>
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
</body>
</html>