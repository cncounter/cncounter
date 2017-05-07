<%@include file="basePath.jsp"%>
<%@page import="java.util.*"%>
<%@ page import="com.cncounter.cncounter.config.WebSiteConfig" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%
	String f_year = "" + Calendar.getInstance().get(Calendar.YEAR);
%>
    <footer class="footer">
        <hr/>
        <div class="container col-center-block" id="info">
            CN计数 | cncounter |
            <a target="_blank" href="<%=path %>/test/index.jsp">&copy;</a>
            2014 - <%=f_year %>
            |
            <span id='cnzz_stat_icon_1000461034'>
            <%
                // 根据参数设置,决定是从本机还是从CDN获取CSS,JS资源
                boolean debugmode = WebSiteConfig.isDEBUG_MODE();
                if(debugmode){
                    // 调试模式,则不加载统计信息
            %>
            <a href="<%=basePath %>test/apitest/config/websiteconfig.jsp" target="_blank" title="调试模式">调试模式</a>
            <%
                }
            %>
            </span>
        </div>

        <div class="cnzz">
            <script src='//s19.cnzz.com/z_stat.php?id=1000461034&web_id=1000461034' type='text/javascript'></script>
        </div>
    </footer>