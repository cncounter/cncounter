<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isErrorPage="true"%>
<%@ page import="javax.servlet.http.HttpUtils,java.util.Enumeration" %>
<%@ page import="java.lang.management.*" %>
<HTML>
<HEAD>
	<TITLE>JMX Web服务器信息监测页面</TITLE>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <style>
	body {
		word-wrap: break-word;
		word-break: break-all;
	}
    </style>
</HEAD>
<BODY>

<H1>WebApp JSP 监测页面</H1>
<img src="images/jbosscorp_logo.png">

<h2>JVM 内存信息监控(Memory Monitor)</h2>
 
 
<table border="0" width="100%">
 
<tbody>
<tr>
<td colspan="2" align="center">
<h3>MXMemory MXBean</h3>
</td>
</tr>
 
<tr>
<td width="200">堆内存(Heap Memory Usage)</td>
<td>
<%=ManagementFactory.getMemoryMXBean().getHeapMemoryUsage()%>
</td>
</tr>
 
<tr>
<td>堆外内存(Non-Heap Memory Usage)</td>
<td>
<%=ManagementFactory.getMemoryMXBean().getNonHeapMemoryUsage()%>
</td>
</tr>
 
<tr>
<td colspan="2"> </td>
</tr>
 
<tr>
<td colspan="2" align="center">
<h3>Memory Pool MXBeans</h3>
</td>
</tr>
 
</tbody>
</table>
<%
Iterator iter = ManagementFactory.getMemoryPoolMXBeans().iterator();
while (iter.hasNext()) {
MemoryPoolMXBean item = (MemoryPoolMXBean) iter.next();
%>
 
<table style="border: 1px #98AAB1 solid;" border="0" width="100%">
 
<tbody>
<tr>
<td colspan="2" align="center"><strong><%= item.getName() %></strong></td>
</tr>
 
<tr>
<td width="200">内存池类型(Type)</td>
<td><%= item.getType() %></td>
</tr>
 
<tr>
<td>使用量(Usage)</td>
<td><%= item.getUsage() %></td>
</tr>
 
<tr>
<td>峰值(Peak Usage)</td>
<td><%= item.getPeakUsage() %></td>
</tr>
 
<tr>
<td>GC后(Collection Usage)</td>
<td><%= item.getCollectionUsage() %></td>
</tr>
 
</tbody>
</table>
 
 
<%
}
%>

<H2>HTTP请求信息(Request information)</H2>

<TABLE>
<TR>
	<TH align=right>请求路径(Requested URL):</TH>
	<TD><%= HttpUtils.getRequestURL(request) %></TD>
</TR>
<TR>
	<TH align=right>请求方式(Request method):</TH>
	<TD><%= request.getMethod() %></TD>
</TR>
<TR>
	<TH align=right>请求URI(Request URI):</TH>
	<TD><%= request.getRequestURI() %></TD>
</TR>
<TR>
	<TH align=right>Request protocol:</TH>
	<TD><%= request.getProtocol() %></TD>
</TR>
<TR>
	<TH align=right>Servlet path:</TH>
	<TD><%= request.getServletPath() %></TD>
</TR>
<TR>
	<TH align=right>Path info:</TH>
	<TD><%= request.getPathInfo() %></TD>
</TR>
<TR>
	<TH align=right>Path translated:</TH>
	<TD><%= request.getPathTranslated() %></TD>
</TR>
<TR>
	<TH align=right>Query string:</TH>
	<TD><% if(request.getQueryString()!=null) out.write(request.getQueryString().replaceAll("<", "&lt;").replaceAll(">","&gt;")); %></TD>
</TR>
<TR>
	<TH align=right>Content length:</TH>
	<TD><%= request.getContentLength() %></TD>
</TR>
<TR>
	<TH align=right>Content type:</TH>
	<TD><%= request.getContentType() %></TD>
<TR>
<TR>
	<TH align=right>服务器域名(Server name):</TH>
	<TD><%= request.getServerName() %></TD>
<TR>
<TR>
	<TH align=right>服务器端口(Server port):</TH>
	<TD><%= request.getServerPort() %></TD>
<TR>
<TR>
	<TH align=right>Remote user:</TH>
	<TD><%= request.getRemoteUser() %></TD>
<TR>
<TR>
	<TH align=right>客户端IP(Remote address):</TH>
	<TD><%= request.getRemoteAddr() %></TD>
<TR>
<TR>
	<TH align=right>客户端域名(Remote host):</TH>
	<TD><%= request.getRemoteHost() %></TD>
<TR>
<TR>
	<TH align=right>Authorization scheme:</TH>
	<TD><%= request.getAuthType() %></TD>
<TR>
</TABLE>

<%
	Enumeration e = request.getHeaderNames();
	if(e != null && e.hasMoreElements()) {
%>
<H2>HTTP请求头信息(Request headers)</H2>

<TABLE>
<TR>
	<TH align=left>请求头(Header):</TH>
	<TH align=left>头信息(Value):</TH>
</TR>
<%
		while(e.hasMoreElements()) {
			String k = (String) e.nextElement();
%>
<TR>
	<TD><%= k %></TD>
	<TD><%= request.getHeader(k) %></TD>
</TR>
<%
		}
%>
</TABLE>
<%
	}
%>


<%
	e = request.getParameterNames();
	if(e != null && e.hasMoreElements()) {
%>
<H2>Request parameters</H2>
<TABLE>
<TR valign=top>
	<TH align=left>Parameter:</TH>
	<TH align=left>Value:</TH>
	<TH align=left>Multiple values:</TH>
</TR>
<%
		while(e.hasMoreElements()) {
			String k = (String) e.nextElement();
			String val = request.getParameter(k);
			String vals[] = request.getParameterValues(k);
%>
<TR valign=top>
	<TD><%= k.replaceAll("<", "&lt;").replaceAll(">","&gt;") %></TD>
	<TD><%= val.replaceAll("<", "&lt;").replaceAll(">","&gt;") %></TD>
	<TD><%
			for(int i = 0; i < vals.length; i++) {
				if(i > 0)
					out.print("<BR>");
				out.print(vals[i].replaceAll("<", "&lt;").replaceAll(">","&gt;"));
			}
		%></TD>
</TR>
<%
		}
%>
</TABLE>
<%
	}
%>


<%
	e = request.getAttributeNames();
	if(e != null && e.hasMoreElements()) {
%>
<H2>Request 中的属性(Attributes)</H2>
<TABLE>
<TR valign=top>
	<TH align=left>属性名(Attribute):</TH>
	<TH align=left>属性值(Value):</TH>
</TR>
<%
		while(e.hasMoreElements()) {
			String k = (String) e.nextElement();
			Object val = request.getAttribute(k);
%>
<TR valign=top>
	<TD><%= k.replaceAll("<", "&lt;").replaceAll(">","&gt;") %></TD>
	<TD><%= val.toString().replaceAll("<", "&lt;").replaceAll(">","&gt;") %></TD>
</TR>
<%
		}
%>
</TABLE>
<%
	}
%>


<%
	e = getServletConfig().getInitParameterNames();
	if(e != null && e.hasMoreElements()) {
%>
<H2>初始化参数(Init parameters)</H2>
<TABLE>
<TR valign=top>
	<TH align=left>参数名(Parameter):</TH>
	<TH align=left>参数值(Value):</TH>
</TR>
<%
		while(e.hasMoreElements()) {
			String k = (String) e.nextElement();
			String val = getServletConfig().getInitParameter(k);
%>
<TR valign=top>
	<TD><%= k %></TD>
	<TD><%= val %></TD>
</TR>
<%
		}
%>
</TABLE>
<%
	}
%>

</BODY>
</HTML>

