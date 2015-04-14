
// 刷新本页面
function refreshPage(){
	location.reload();
};

// 解析JSON字符串为对象
function parseJSON2Object(text){
	var object = null;
	if(window["JSON"]){
		object = JSON.parse(text) || {};
	} else { // IE6, IE7
   		object = eval("("+ text + ")") || {};
	}
	return object;
};

		
// GET请求AJAX,工具方法
function getAjax(url, data, successCallback, errorCallback, isParseJSON, context){
	isParseJSON = isParseJSON || false;
	var type = "GET";
	return requestAjax(url, data, type, successCallback, errorCallback, isParseJSON, context);
};
//POST请求AJAX方法
function postAjax(url, data, successCallback, errorCallback, isParseJSON, context){
	isParseJSON = isParseJSON || false;
	var type = "POST";
	return requestAjax(url, data, type, successCallback, errorCallback, isParseJSON, context);
};
		
// 请求AJAX,工具方法
function requestAjax(url, data, type, successCallback, errorCallback, isParseJSON, context){
	//
	context = context || window;
	type = type || "POST";
	// 执行AJAX请求
	$.ajax({
	    url: url,
	    data: data,
        type: type,
	    success: function (message) {
	    	if(isParseJSON){
	    		message = parseJSON2Object(message);
	    	}
	   		if(successCallback){
	    	   successCallback.call(context, message);
	   		}
        	return false;
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	    	// 错误
	       if(errorCallback){
	    	   errorCallback.apply(context, arguments);
	       } else {
	    	   alert("操作失败!");
	       };
	    }
	});
};

// Date 转 str
function date2Str(d){
	// 
	var str = "";
	// 应该好好判断
	if("object" === typeof d){
		//
		var fullyear = d.getFullYear();
		var month = d.getMonth() + 1;
		var date = d.getDate();
		var hour = d.getHours();
		var minute = d.getMinutes();
		var second = d.getSeconds();
		//
		str += "" + fullyear;
		//
		str += "" + "-";
		if(month < 10){
			str += "" + "0";
		}
		str += "" + month;
		//
		str += "" + "-";
		if(date < 10){
			str += "" + "0";
		}
		str += "" + date;
		//
		str += "" + " ";
		if(hour < 10){
			str += "" + "0";
		}
		str += "" + hour;
		//
		str += "" + ":";
		if(minute < 10){
			str += "" + "0";
		}
		str += "" + minute;
		//
		str += "" + ":";
		if(second < 10){
			str += "" + "0";
		}
		str += "" + second;
	}
	return str;
};