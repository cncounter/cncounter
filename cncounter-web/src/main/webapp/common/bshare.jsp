<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String scheme = request.getScheme();
    if("https".equalsIgnoreCase(scheme)){
        // https 不能引用 http 的资源?
    } else {
%>
<li>
    <div class="bshare-custom icon-medium right" style="line-height: 56px !important;">
        <a title="二维码分享" class="bshare-weixin"></a>
        <a title="分享到QQ空间" class="bshare-qzone"></a>
        <a title="复制网址" class="bshare-clipboard"></a>
    </div>

    <script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=4b7c4ba5-41a9-4cf1-aa7f-5acb53a13dca&amp;pophcol=1&amp;lang=zh"></script>
    <script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/bshareC0.js"></script>
</li>
<%
    }
%>