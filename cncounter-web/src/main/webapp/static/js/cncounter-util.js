//
var CNC = CNC || function(){};
CNC.prototype = {

};
CNC.currentScript = document.currentScript;

// 刷新本页面
function refreshPage(){
	location.reload();
};

// 加载同目录下的 md5-utils;
function loadMd5Utils(){
	//
	var scs = document["scri" + "pts"];
	//
	var cncuntilsName = "cncounter-util.js";
	var md5utilsName = "md5-util.js";
	//
	var cncJsUrl = "";
	var md5JsUrl = "";
	if(CNC.currentScript){
		cncJsUrl = CNC.currentScript.src;
	} else {
		//
		for(var sc in scs){
			var src = sc.src;
			if(!src){
				continue;
			}
			if(src.indexOf(cncuntilsName) > -1){
				cncJsUrl = src;
				break;
			}
		}
	}
	md5JsUrl = cncJsUrl.replace(cncuntilsName, md5utilsName);
	// 加载md5工具.js
	md5JsUrl && $.getScript(md5JsUrl);
};




//////////////////////////////////////////////////////////////////////////////////////
///////// 工具函数
//////////////////////////////////////////////////////////////////////////////////////

// 调试
function debug(obj) {
	try{
		// 只适用于具有console的浏览器
		if(!window["console"] || !window["console"]["dir"] || !window["console"]["info"]){  return;	}
		var params = Array.prototype.slice.call(arguments, 0);
		for(var i=0; i < params.length; i++){
			if ("object" === typeof params[i] ) {
				window["console"]["dir"](params[i]);
			} else {
				window["console"]["info"](params[i]);
			}
		}
	} catch (ex){
		// 吃掉异常
	}
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


/****************************************************
 *
 *			cookie相关的函数
 *
 ****************************************************/

// 获取cookie值(key)
function getCookie(cookieName){
	//获取cookie字符串
	var strCookie=document.cookie;
	//将多cookie切割为多个名/值对
	var arrCookie=strCookie.split("; ");
	var cookieValue = null;
	//遍历cookie数组,处理每个cookie对
	for(var i=0;i<arrCookie.length;i++){
		var arr=arrCookie[i].split("=");
		//找到cookie,并返回它的值
		if(cookieName==arr[0]){
			cookieValue=unescape(arr[1]);
			break;
		}
	}
	//
	if(!cookieValue){
		cookieValue = "";
	}
	cookieValue = decodeURIComponent(cookieValue);
	//
	return cookieValue;
};

// 设置cookie值(key,value)
function setCookie(cookieName, cookieValue, expiredays, domain){
	// 0 比较特殊
	if(0 === cookieValue){
		cookieValue = 0;
	} else if(!cookieValue){
		cookieValue = "";
	}
	// 编码
	cookieValue = encodeURIComponent(cookieValue);
	//获取cookie字符串
	var cookieStr= cookieName + "=" + cookieValue;

    // 过期时间
    if(expiredays && !isNaN(expiredays)){
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        cookieStr += "; expires="+exdate.toGMTString();
    }
    // 域名
    //domain = domain || document.domain;
    if(domain){
        cookieStr += "; path=" + "/";
        cookieStr += "; domain="+domain;
    }

	// 保存本地 cookie
	document.cookie = cookieStr;

	// 返回设置后的值
	return cookieValue;
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