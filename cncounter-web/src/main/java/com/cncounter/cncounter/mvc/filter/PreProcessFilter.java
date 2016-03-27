package com.cncounter.cncounter.mvc.filter;

import com.cncounter.cncounter.config.WebSiteConfig;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by Administrator on 2016/3/27.
 */
public class PreProcessFilter implements Filter {
    //
    private static String KEY_ORIG_REQUEST_URI = WebSiteConfig.KEY_ORIG_REQUEST_URI ;
    private static String KEY_ORIG_REQUEST_URL = WebSiteConfig.KEY_ORIG_REQUEST_URL ;
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            preProcess(request, response, chain);
        } catch (Throwable e){
            //
        }
        chain.doFilter(request,response);
    }

    private void preProcess(ServletRequest request, ServletResponse response, FilterChain chain){

        //
        if(request instanceof HttpServletRequest){
            HttpServletRequest req = (HttpServletRequest)request;
            //
            String origURI = req.getRequestURI();
            String origURL = req.getRequestURL().toString();
            //
            req.setAttribute(KEY_ORIG_REQUEST_URI, origURI);
            req.setAttribute(KEY_ORIG_REQUEST_URL, origURL);
        }
    }

    @Override
    public void destroy() {

    }
}
