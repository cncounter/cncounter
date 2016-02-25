<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.cncounter.cncounter.model.other.Favorite"%>
<%@page import="java.util.*"%>
<%@ page import="com.cncounter.cncounter.service.api.other.FavoriteService" %>
<%@ page import="com.cncounter.util.spring.SpringContextHolder" %>
<%@include file="../basePath.jsp"%>
<%!
    public List<Favorite> getFavrite999(){
        List<Favorite> favorites = new ArrayList<Favorite>();
        FavoriteService favoriteService = SpringContextHolder.getBean(FavoriteService.class);
        if(null == favoriteService){
            return favorites;
        }
        //
        Integer type = 999;
        favorites = favoriteService.listByType(type);
        //
        return favorites;
    }
%>

<%
	List<Favorite> favorites = getFavrite999();
					for(Favorite favorite : favorites){
						//
						String url = favorite.getUrl();
						String title = favorite.getTitle();
                        String target = "_blank";
						//
						if(null == url){
							url = "";
						}
						if(url.startsWith("http:") || url.startsWith("https:")){
							//
						} else {
							url = basePath + url;
                            target = "_self";
						}
						url = url.trim();
						//
						if(null == title || title.trim().isEmpty()){
							title = url;
						}
					%>
						<h2>
							<a target="<%=target%>"  href="<%=url %>"><%=title %></a>
						</h2>
					<%
					}
					%>
<%
%>