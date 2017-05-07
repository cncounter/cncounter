var CNC = CNC || function(){};
CNC.currentScript = document.currentScript;
(function(){

    if(window._noLoginTimeout){
        return;
    } else {
        window._noLoginTimeout = noLoginTimeout;
        noLoginTimeout();
    }
    // 不要登录超时. DEBUG时期使用.
    function noLoginTimeout(){
        var index = window.setInterval(task, 5 * 60 *  1000);
        function task(){
            var iframe_id = "iframe_no_timeout";
            var iframe_src = "iframe_no_timeout";
            var iframe  = document.getElementById(iframe_id);
            if(!iframe){
                iframe = createIframe(iframe_id);
            }
            iframe.src = nextSrc();
        };
        function createIframe(id, src){
            var iframe  = document.createElement("iframe");
            iframe.id = id;
            document.body.appendChild(iframe);
            //
            return iframe;
        };
        function nextSrc(){
            var src = CNC.currentScript.src || "favicon.png";
            if(src.indexOf("?") < 0){
                src = src + "?";
            } else {
                src = src + "&";
            }
            var d = new Date();
            src = src + "__t=" + d.getTime();
            return src;
        };
    };
})();