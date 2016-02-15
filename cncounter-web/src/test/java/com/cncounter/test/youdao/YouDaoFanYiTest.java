package com.cncounter.test.youdao;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cncounter.util.net.URLUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * 有道翻译API 测试
 */
public class YouDaoFanYiTest {
    //
    public static String apiURLPrefix = "http://fanyi.youdao.com/openapi.do?keyfrom=CNCounter&key=282371857&type=data&doctype=json&version=1.1&q=";

    private static Log logger = LogFactory.getLog(YouDaoFanYiTest.class);
    //
    public static void main(String[] args){
        //
        String text1 = "需要测试的内容1";
        String text2 = "my name is xiaoming.";

        //
        String value1 = queryAPI(text1);
        String value2 = queryAPI(text2);
        //
        info("text1=" + text1 + "; value1:\n" + value1);
        //
        info("text2=" + text2 + "; value2:\n" + value2);

    }

    private static void info(Object o){
        System.out.println(o);
    }


    public static String queryAPI(String text){
        //
        String value = "";
        //
        String textStr = "";
        //
        try {
            textStr = URLEncoder.encode(text, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return value;
        }
        //
        String url = apiURLPrefix + textStr;
        String reply = URLUtils.get(url);
        // 解析 reply 为 JSON
        String temp = ""
                +"{"
                +"	\"translation\": [\"临时测试的固定结果\"]"
                +"}";
        // reply = temp;
        //
        Object replyObject = JSON.parse(reply);
        //
        if(replyObject instanceof JSONObject){
            JSONObject jsonObject = (JSONObject)replyObject;
            //

            JSONArray translation = jsonObject.getJSONArray("translation");
            //
            if(null == translation || translation.isEmpty()){
                return value;
            }
            //
            Object translation0 = translation.get(0);
            //
            if (translation0 instanceof String){
                value = String.valueOf(translation0);
            } else {
                info("翻译失败: translation0=" + translation0);
            }
        }

        //
        return value;
    }
}
