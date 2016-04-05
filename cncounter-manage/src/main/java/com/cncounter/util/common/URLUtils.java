package com.cncounter.util.common;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

/**
 * 网络工具
 */
public class URLUtils {

    public static String get(String url){
        String reply = null;
        //
        try {
            reply = executeGet(url);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //
        return reply;
    }

    public static String executeGet(String url) throws Exception {

        String content = null;
        CloseableHttpResponse response = null;
        try {
            // 定义HttpClient
            CloseableHttpClient client = HttpClients.createDefault();
            // 实例化HTTP方法
            HttpGet request = new HttpGet(url);
            response = client.execute(request);
            //
            HttpEntity entity = response.getEntity();
            content = EntityUtils.toString(entity, "UTF-8");
        } finally {
            if (response != null) {
                try {
                    response.close();// 最后要关闭
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            return content;
        }
    }
}
