
// 刷新本页面
function refreshPage(){
	location.reload();
};
		
// 请求AJAX,工具方法
function requestAjax(url, data, successCallback, errotCallback, context){
	//
	context = context || window;
	// 执行AJAX请求
	$.ajax({
	    url: url,
	    data: data,
        type: "post",
	    success: function (message) {
	    	if(window["JSON"]){
	    		message = JSON.parse(message) || {};
	    	} else { // IE6, IE7
    	   		message = eval("("+ message + ")") || {};
	    	}
	   		if(successCallback){
	    	   successCallback.call(context, message);
	   		}
        	return false;
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	    	// 把错误吃了
	       if(errotCallback){
	    	   errotCallback.apply(context, arguments);
	       } else {
	    	   alert("操作失败!");
	       };
	    }
	});
};