package com.cncounter.manage.mvc.filter;

import com.cncounter.manage.config.WebSiteConfig;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Enumeration;

/**
 * Created by Administrator on 2016/3/27.
 */
public class PreProcessFilter implements Filter {
    //
    private static String KEY_ORIG_REQUEST_URI = WebSiteConfig.KEY_ORIG_REQUEST_URI ;
    private static String KEY_ORIG_REQUEST_URL = WebSiteConfig.KEY_ORIG_REQUEST_URL ;
    //
    private Log logger = LogFactory.getLog(this.getClass());
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            preProcess(request, response, chain);
        } catch (Throwable e){
            // throw new RuntimeException(e);
        }
        chain.doFilter(request,response);
    }

    private final void preProcess(ServletRequest request, ServletResponse response, FilterChain chain){

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
        //
        contextDestroyed();
    }

    public final void contextDestroyed() {

        // 其他操作
        // ... First close any background tasks which may be using the DB ...
        // ... Then close any DB connection pools ...

        // Now deregister JDBC drivers in this context's ClassLoader:
        // 获取 webapp's ClassLoader
        ClassLoader cl = Thread.currentThread().getContextClassLoader();
        // 迭代
        Enumeration<Driver> drivers = DriverManager.getDrivers();
        while (drivers.hasMoreElements()) {
            Driver driver = drivers.nextElement();
            if (driver.getClass().getClassLoader() == cl) {
                // 如果是此 webapp's ClassLoader 注册的,则 deregister it:
                try {
                    logger.info("Deregistering JDBC driver: " + driver.toString());
                    DriverManager.deregisterDriver(driver);
                } catch (SQLException ex) {
                    logger.error("Error deregistering JDBC driver: "+ driver.toString(), ex);
                }
            } else {
                // 如果不是此 webapp's ClassLoader 注册的,则 may be in use elsewhere
                logger.trace("Not deregistering JDBC driver "
                                + driver.toString()
                        + " as it does not belong to this webapp's ClassLoader");
            }
        }
    }
}
