package com.cncounter.util.net;

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

    /**
     * 组合两个URI；主要是处理2个斜线或者没有斜线 "/" 问题
     * @param basePath
     * @param subUri
     * @return
     */
    public static String concatUri(String basePath, String subUri){
        final  String SLASH = "/";
        //
        if(null == basePath){
            basePath = "";
        }
        if(null == subUri){
            subUri = "";
        }
        String resultUri = basePath;
        if(resultUri.endsWith(SLASH) && subUri.startsWith(SLASH)){
            resultUri = resultUri.substring(0, resultUri.length()-1);
        } else if(!resultUri.endsWith(SLASH) && !subUri.startsWith(SLASH)){
            resultUri += SLASH;
        }
        //
        resultUri += subUri;
        //
        return resultUri;
    }
}
