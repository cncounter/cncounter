package com.cncounter.util.sms;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * 阿里大鱼；短信发送
 */
public class AliDaYuSmsSender {
    //
    private static Logger logger = LoggerFactory.getLogger(AliDaYuSmsSender.class);
    private static AtomicBoolean inited = new AtomicBoolean(false);

    public static String CA_KEY_VALUE = null;
    public static String CA_SECRET_VALUE = null;
    public static String SMS_TEMPLATE_CODE = null;
    public static String SMS_FREE_SIGN_NAME = null;
    //
    public static String CONTENT_PRODUCT = "CNCounter";

    //
    public static String CA_URL_DAYU_SMS = "https://ca.aliyuncs.com/gw/alidayu/sendSms";
    // 配置参数
    public static String HEADER_NAME_CA_KEY = "X-Ca-Key";
    public static String HEADER_NAME_CA_SECRET = "X-Ca-Secret";
    public static String PARAM_SMS_TEMPLATE_CODE_KEY = "sms_template_code";
    public static String PARAM_SMS_FREE_SIGN_NAME_KEY = "sms_free_sign_name";
    // 模板中的参数; JSON_STR
    // 产品名称
    public static String PARAM_PRODUCT_KEY = "product";


    // 需要4个配置;2个参数
    // 配置 = key + secret + 签名 + 模板ID
    // 参数 = 手机号 + 验证码
    //
    public static boolean sendSmsCode(String mobile, String code) {
        //
        checkInit();
        //
        String caKey = CA_KEY_VALUE;
        String caSecret = CA_SECRET_VALUE;
        String templateCode = SMS_TEMPLATE_CODE;
        String signName = SMS_FREE_SIGN_NAME;
        //
        return sendSmsCode(caKey, caSecret, templateCode, signName, mobile, code);

    }
    private static void checkInit(){
        if(inited.get()){
            return;
        }
        // 获取参数
        Map<String, String> initParams = new HashMap<String, String>();
        retrive2Params(initParams);
        //
        init(initParams);
        //
        inited.set(true);
    }

    private static void retrive2Params(Map<String, String> initParams) {
        // 通过 Service 获取某个参数配置
    }


    public static void init(Map<String, String> initParams) {
        if (null == initParams) {
            return;
        }
        Set<String> keySet = initParams.keySet();
        for (String key : keySet) {
            String value = initParams.get(key);
            if (null == key || null == value) {
                continue;
            }
            key = key.trim();
            value = value.trim();
            //
            if (PARAM_PRODUCT_KEY.equalsIgnoreCase(key)) {
                CONTENT_PRODUCT = value;
            } else if (HEADER_NAME_CA_KEY.equalsIgnoreCase(key)) {
                CA_KEY_VALUE = value;
            } else if (HEADER_NAME_CA_SECRET.equalsIgnoreCase(key)) {
                CA_SECRET_VALUE = value;
            } else if (PARAM_SMS_TEMPLATE_CODE_KEY.equalsIgnoreCase(key)) {
                SMS_TEMPLATE_CODE = value;
            } else if (PARAM_SMS_FREE_SIGN_NAME_KEY.equalsIgnoreCase(key)) {
                SMS_FREE_SIGN_NAME = value;
            }
        }
    }

    private static boolean sendSmsCode(String caKey, String caSecret,
                                       String templateCode, String signName,
                                       String mobile, String code
    ) {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        try {
            //	请求地址
            HttpUriRequest httpGet = RequestBuilder
                    .get(CA_URL_DAYU_SMS)
                    .addHeader("X-Ca-Key", caKey)
                    .addHeader("X-Ca-Secret", caSecret)
                    .addParameter("rec_num", mobile)
                    .addParameter("sms_template_code", templateCode)
                    .addParameter("sms_free_sign_name", signName)
                    .addParameter("sms_type", "normal")
                    .addParameter("extend", "1234")
                    .addParameter("sms_param", "{'code':'" + code + "','product':'" + CONTENT_PRODUCT + "'}")
                    .build();
            //	TODO	设置请求超时时间
            //	处理请求结果
            ResponseHandler<String> responseHandler = new ResponseHandler<String>() {
                @Override
                public String handleResponse(final HttpResponse response) throws IOException {
                    int status = response.getStatusLine().getStatusCode();
                    System.out.println(status);
                    HttpEntity entity = response.getEntity();
                    return entity != null ? EntityUtils.toString(entity) : null;
                }
            };
            //	发起 API 调用
            String responseBody = httpClient.execute(httpGet, responseHandler);
            logger.info(responseBody);
            //
            JSONObject jsonResult = JSON.parseObject(responseBody);
            //
            return jsonResult.getBoolean("success");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        //
        return false;
    }

}
