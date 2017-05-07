var CNC = CNC || function(){};

;(function(){
    //
    CNC.currentScript = document.currentScript;
    CNC = $.extend(CNC, {
        msg : msg,
        delayMsg : delayMsg,
        delay : delay,
        isIE : isIE,
        redirect : redirect,
        localSession : localSession
    });
    // 显示旧有的消息
    delayMsg();


    function msg(info){
        window.layer && layer.msg(info);
    };
    function delayMsg(info){
        var key = "_delayedMsg";
        // 保存
        if(undefined !== info){
            return localSession(key , info || "");
        } else {
            info = localSession(key);
            localSession(key, null);
            //
            if(info){
                delay(function(){msg(info);});
            }
        }
    };
    function delay(fn, timeout){
        timeout = timeout || 10;
        window.setTimeout(fn, timeout);
    };
    function redirect(url, timeout){
        delay(function(){
            window.location.replace(url);
        });
    };

    //
    function localSession(key, value){
        if(!window.sessionStorage){
            return;
        }
        var oldValue = sessionStorage.getItem(key);
        if(undefined === value){
            return oldValue;
        } else if(null === value){
            return sessionStorage.removeItem(key);
        };;
        sessionStorage.setItem(key, value);
    };
	function isIE(ver){
		var b = document.createElement('b')
		b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
		return b.getElementsByTagName('i').length === 1
	};
})();

// 刷新本页面
function refreshPage(){
	location.reload();
};

// 下载文件
function downloadFile(url, data){
    if(!url || !data){ return; }
    // 把参数组装成 form的  input
    var inputs = '';
    //data = typeof data == 'string' ? data : jQuery.param(data);
    //jQuery.each(data.split('&'), function () {
    //    var pair = this.split('=');
    //    inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
    //});
    foreachProperty(data, function(name, value){
        if(!name){ return; }
        if(0 !== value && !value){ return; }
        inputs += '<input type="hidden" name="' + name + '" value="' + value + '" />';
    });
    //
    var frameId = "_download";
    createIframe(frameId);
    // request发送请求
    jQuery('<form action="' + url + '" method="post" target="'+ frameId +'" >' + inputs + '</form>')
        .appendTo('body').submit().remove();


    function createIframe(id, src){
        var iframe  = document.getElementById(id);
        if(iframe){
            return iframe;
        }
        iframe  = document.createElement("iframe");
        iframe.id = id;
        iframe.name = id;
        iframe.style.display="none";
        document.body.appendChild(iframe);
        //
        return iframe;
    };

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



// 跳转到HTTPS(参数:需要跳转的域名)
function toHttps(REDIRECT_HOSTNAME){
    var HTTP_PROTOCOL = "http:";
    var HTTPS_PROTOCOL = "https:";
    //
    var protocol = location.protocol;
    var hostname = location.hostname;
    var href = location.href;
    if(REDIRECT_HOSTNAME === hostname && HTTP_PROTOCOL === protocol){
        // 替换为https
        var url = href.replace(HTTP_PROTOCOL, HTTPS_PROTOCOL);
        location.replace(url);
    }
};


function hashCode(str){

    var hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

// 遍历对象属性
function foreachProperty(obj, fn){
    if(!obj || !fn){return;}
    for (var name in obj) {
        if(!name){continue;}
        var isSelfProperty = Object.prototype.hasOwnProperty.call(obj, name);
        if (isSelfProperty) { // 自有属性,回调
            var value = obj[name];
            var result = fn(name, value, obj);
            if(false === result){break;}
        }
    }
};

// 解析地址栏中的查询参数
function parseQueryParam(){
    var params = {};
    var search = location.search;
    if(!search){return params;}
    search = search.replace("?","");
    if(!search){return params;}
    var searchArray = search.split("&");
    for(var i=0; i<searchArray.length; i++){
        var p = searchArray[i];
        if(!p){continue;}
        var pArray = p.split("=");
        if(!pArray || pArray.length != 2){
            continue;
        }
        var name = pArray[0];
        var value = pArray[1];
        params[name] = value;
    }
    //
    return params;
};
// 包装 GET参数,待完善
function wrapGetUrl(path, params){
    foreachProperty(params, function(name,value){
        if(!path.indexOf("?")<0){
            path = path + "?";
        } else {
            path = path + "&";
        }
        path = path + "" + name + "=" + value;
    });
    return path;
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
	if(!text){
		return object;
	}
	if(text.toString && text === text.toString()){
		if(window["JSON"]){
			object = JSON.parse(text) || {};
		} else { // IE6, IE7
			object = eval("("+ text + ")") || {};
		}
	} else {
		object = text;
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
	    	   CNC.msg("操作失败!");
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
			cookieValue=arr[1];
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