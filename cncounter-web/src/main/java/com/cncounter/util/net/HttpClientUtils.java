package com.cncounter.util.net;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;

/**
 * HTTP工具
 * Created by rff on 2016/4/9.
 */
public class HttpClientUtils {
    //
    private static final Log logger = LogFactory.getLog(HttpClientUtils.class);
    //
    public static final ExecutorService downloadThreadPool = Executors.newFixedThreadPool(2, new ThreadFactory() {
        @Override
        public Thread newThread(Runnable r) {
            Thread thread = new Thread(r);
            thread.setName("downloadThreadPool-" + thread.getId());
            thread.setDaemon(true);
            return thread;
        }
    });

    /**
     * 将URL连接为 InputStream, 主要用于下载文件
     * @param str
     * @return
     */
    public static InputStream getUrlAsStream(String str){
        InputStream inputStream = null;
        try {
            URL url = new URL(str);
            inputStream = _getUrlAsStream(url);
        } catch (IOException e) {
            logger.error(e);
        }
        //
        return inputStream;
    }

    public static InputStream getUrlAsStream(URL url){
        InputStream inputStream = null;
        try {
            inputStream = _getUrlAsStream(url);
        } catch (IOException e) {
            logger.error(e);
        }
        //
        return inputStream;
    }


    /**
     * 内部实现
     * @param url
     * @return
     * @throws IOException
     */

    private static InputStream _getUrlAsStream(URL url) throws IOException {
        InputStream inputStream = null;
        // 打开和URL之间的连接
        URLConnection connection = url.openConnection();
        // 设置超时时间,10秒。宁可连接失败，也不能太慢
        connection.setConnectTimeout((int)TimeUnit.SECONDS.toMillis(10));
        // 建立实际的连接
        connection.connect();
        //
        inputStream = connection.getInputStream();
        //
        return inputStream;
    }
}
