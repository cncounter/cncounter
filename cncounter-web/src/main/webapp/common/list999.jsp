<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.cncounter.cncounter.model.other.Favorite"%>
<%@page import="java.util.*"%>
<%@ page import="com.cncounter.cncounter.service.api.other.FavoriteService" %>
<%@ page import="com.cncounter.util.spring.SpringContextHolder" %>
<%@ page import="org.springframework.context.ApplicationContext" %>
<%@include file="basePath.jsp"%>
<%!
    public List<Favorite> getFavrite999(){
        //
        List<Favorite> favorites = new ArrayList<Favorite>();
        //
        ApplicationContext applicationContext = SpringContextHolder.getApplicationContext();

        Map<String, FavoriteService> beanMap = applicationContext.getBeansOfType(FavoriteService.class);
        if(null == beanMap && beanMap.isEmpty() ){
            return favorites;
        }
        //
        Collection<FavoriteService> valueSet = beanMap.values();
        if(null == valueSet || valueSet.isEmpty()){
            return favorites;
        }
        List<FavoriteService> valueList = new ArrayList<FavoriteService>(valueSet);
        //
        FavoriteService favoriteService =  valueList.get(0) ;
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

    List<Favorite> favorites = new ArrayList<Favorite>();
	try{
        favorites = getFavrite999();
    } catch (Throwable ex){
        ex.printStackTrace();
    }
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
                            final  String SLASH = "/";
                            String resultUri = basePath;
                            if(resultUri.endsWith(SLASH) && url.startsWith(SLASH)){
                                resultUri = resultUri.substring(0, resultUri.length()-1);
                            }
							url = resultUri + url;
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