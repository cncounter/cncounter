(function(){
	//
	window.CNC = window.CNC || {};
	CNC.getIpPostion = getIpPostion;
	CNC.showIpInfo = showIpInfo;

	function getIpPostion(callbackFn, callbackContext) {
		// 获取公网IP和地理信息
		// 参考: http://www.ip138.com/api/
        getIp();
		return;

        function getIp(){
            var callbackName = callbackWrapper.name;
            window[callbackName] = callbackWrapper;
            var protocol = location.protocol;
            var http = "http";
            var https = "https";
            if(!protocol || !protocol.startsWith(http)){
                protocol = http + ":"; // http,https
            }
            var api = protocol + "//test.ip138.com/query/?callback="+ callbackName;
            //
            if(protocol.startsWith(https)){
                return callbackWrapper(null, "--保密--");
            }
            if(window.$){
                $.getScript(api);
            }
        };

        function callbackWrapper(data, err){
            if(callbackFn && callbackFn.call){
                callbackFn.call(callbackContext || window, data, err);
            }
        };

	};

    //
    function showIpInfo(ip, err){
        if(!ip || !ip.data || !ip.data.length){ return showIPMessage("未知"); }
        var title = ip.data.join("-");
        if(ip.ip){
            title = ip.ip + ";" + title;
        }
        var addr = ip.data[2] + "-" + ip.data[3];
        showIPMessage(addr, title);
    };
    function showIPMessage(msg, title){
        if(msg){  $(".clientip").html(msg || "-"); }
        if(title){  $(".ip138area").attr("title" ,title); }
    };
})();
