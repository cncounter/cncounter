<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%><%
	String h_path = request.getContextPath();
	String h_basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()	+ h_path + "/";
%>  <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="<%=h_path %>/">天朝计数器</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="<%=h_path %>/">首页</a></li>
            <li><a href="<%=h_path %>/login.php">登录</a></li>
            <li><a href="http://blog.cncounter.com/cncounter/">GitHub</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
  </nav>