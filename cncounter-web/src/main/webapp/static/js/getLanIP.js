!function () {
    // 获取本地IP信息-LAN.
    // 如果需要封装则应该使用 deffer 或者回调
    // webkit 或者 mozila 才支持
    var localIpArray = [];
    // 需要采用异步逻辑?
    getLocalLanIP();
    return;

    function getLocalLanIP(){
        //
        var connObj = getAndInitConnObj();
        // 延迟执行
        setTimeout(function () {
            var sdpArray = connObj.localDescription.sdp.split("\n");
            for (var i in sdpArray){
                testAndPrint(sdpArray[i]);
            }
        }, 1e3);
    };

    function getAndInitConnObj(){
        var RTCPeerConnection = getRTCPeerConnection();
        if (!RTCPeerConnection) {return;}
        var connObj = new RTCPeerConnection({iceServers: []}, {mandatory: {googIPv6: !0}});
        //
        connObj.createDataChannel("", {reliable: !1});
        connObj.onicecandidate = function (arg) {
            arg.candidate && testAndPrint(arg.candidate.candidate);
        };
        connObj.createOffer(function (param) {
                connObj.setLocalDescription(param, function () {}, function () {});
            }, function () {}
        );
        return connObj;
    };

    // 获取 RTCPeerConnection 函数
    function getRTCPeerConnection(){
        var RTCPeerConnection = window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        if (!RTCPeerConnection) {
            var iframe = document.createElement("iframe");
            document.body.appendChild(iframe);
            iframe.style.display = "none";
            RTCPeerConnection = iframe.contentWindow.webkitRTCPeerConnection || iframe.contentWindow.mozRTCPeerConnection;
            if (!RTCPeerConnection) {
                document.body.removeChild(iframe);
            }
        }
        return RTCPeerConnection;
    };


    function testAndPrint(msg) {
        if (null !== msg.match(/^(a=)?candidate:/)) {
            var matches = msg.match(/((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))/);
            null != matches && matches.length >= 1 && print(matches[0])
        }
    };
    //
    function print(elem) {
        if (localIpArray.indexOf(elem) > -1) {
            // 避免多次输出相同的值
            return;
        }
        var $dataIp = document.body.attributes["data-ip"] || {};
        var dataIp = $dataIp.value || "0";
        var hasSimi = elem.indexOf(":") > -1;
        if ("0" === dataIp || "4" === dataIp && !hasSimi || "6" === dataIp && hasSimi) {
        } else {return;}
        //
        //lan.style.display = "";
        localIpArray.push(elem);
        // 排序
        localIpArray.sort(function (prevE, nextE) {
            if (prevE.length < nextE.length)return -1;
            if (prevE.length > nextE.length)return 1;
            for (var i = 0; i < prevE.length; i++) {
                if (prevE[i] < nextE[i])return -1;
                if (prevE[i] > nextE[i])return 1;
            }
            return 0;
        });
        //
        debug(localIpArray.join(";"));
    };
    function debug(msg){
        window.console && console.dir(msg);
    };

}();