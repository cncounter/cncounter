<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%!
    private static final String[] HEADERS_TO_TRY = {
            "X-Forwarded-For",
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
            <h1>
                您的公网-IP地址为:
                <a target="_blank" href="http://stackoverflow.com/questions/16558869/getting-ip-address-of-client">
                    <span class="remoteip"><%=getClientIpAddress(request) %></span>
                </a>
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
		</div>
		<jsp:include page="/common/sidebar.jsp"></jsp:include>
	</div>
	<jsp:include page="/common/footer.jsp"></jsp:include>
</body>
</html>