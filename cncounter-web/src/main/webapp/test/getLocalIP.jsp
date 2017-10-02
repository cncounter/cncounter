<%@ page import="com.cncounter.util.net.IPUtils" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%!
    private static final String[] HEADERS_TO_TRY = {
            "X-Forwarded-For",
            "X-REAL-IP",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR" };

    public static String getClientIpAddress(HttpServletRequest request) {
        for (String header : HEADERS_TO_TRY) {
            String ip = request.getHeader(header);
            if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
                return ip;
            }
        }
        return request.getRemoteAddr();
    }
%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>获取局域网IP-LAN- cncounter</title>
	<jsp:include page="/common/cssjs.jsp"></jsp:include>
</head>
<body>
	<jsp:include page="/common/header.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="content_left">
			<p class="h1">获取局域网IP-LAN  - CN计数</p>
            <%
                String clientIp = IPUtils.getClientIp(request);
            %>
            <h1>
                您的公网-IP地址为:
                <a target="_blank" href="http://stackoverflow.com/questions/16558869/getting-ip-address-of-client">
                    <span class="remoteip"><%=clientIp %></span>
                </a>
                (
                <%=IPUtils.parseIp2Location(clientIp) %>
                )
            </h1>
		   	<h1>
                您的LAN-IP地址为:
                <a target="_blank" href="https://ifcfg.me/">
		   		    <span class="localip">127.0.0.1</span>
		   		</a>
                <script type="text/javascript">
                    (function(){
                        function showIp(localIpArray){
                            if(!localIpArray){return;}
                            var ips = localIpArray.join(";");
                            var $localip = $(".localip");
                            $localip.text(ips);
                        };
                        //
                        CNC && CNC.getLanIp && CNC.getLanIp(showIp);
                    })();
                </script>
		   	</h1>
            <h1>
                查询IP地址: <a target="_blank" href="http://www.ip138.com/">http://www.ip138.com/</a><br/>
                <br/>
                本站查询接口: <a target="_blank" href="../tools/api/jsonp/ip.json?callback=getip&ip=<%=clientIp%>">Jsonp-查询IP</a><br/>
                <br/>
                感谢: <a target="_blank" href="https://www.ipip.net/">https://www.ipip.net/</a><br/>
                <br/>

            </h1>
            <h1>
                新浪查询接口: <a target="_blank" href="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js">http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js</a><br/>
                <br/>
                新浪返回结果: <span class="sina-ip-result"></span>
                <script src="http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js"></script>
                <script>
                    $(function(){
                        var sinaIpResult = $(".sina-ip-result");
                        if(window.remote_ip_info){
                            //
                            // var remote_ip_info = {"ret":1,"start":-1,"end":-1,"country":"\u4e2d\u56fd","province":"\u5317\u4eac","city":"\u5317\u4eac","district":"","isp":"","type":"","desc":""};
                            //
                            var result = window.remote_ip_info;
                            var country = result.country || "-";
                            var province = result.province || "-";
                            var city = result.city || "-";
                            var district = result.district || "-";
                            //
                            var text = "国家="+ country + ";" + "省="+ province + ";" + "市="+ city + ";" + "省="+ district + ";" ;
                            //
                            sinaIpResult.text(text);
                        }
                    });
                </script>
                <br/>

            </h1>
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
</body>
</html>
