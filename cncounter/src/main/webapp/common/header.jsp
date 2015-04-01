<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%><%
	String h_path = request.getContextPath();
	String h_basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()	+ h_path + "/";
%>  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
        <%--
        
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        
         --%>
          <a class="navbar-brand" href="<%=h_path %>/">天朝计数器</a>
        </div>
        
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="<%=h_path %>/login.php">登录</a></li>
            <%--
            	如果是已登录用户,则应该切换为显示用户昵称,以及退出按钮
             --%>
             <%--
             
            <li><a href="<%=h_path %>/login.php">tiemaocsdn</a></li>
            <li><a href="<%=h_path %>/login.php">退出</a></li>
              --%>
          </ul>
        </div>
      </div>
  </nav>
  <%-- 这里垫一个DIV会不会比较好 --%>