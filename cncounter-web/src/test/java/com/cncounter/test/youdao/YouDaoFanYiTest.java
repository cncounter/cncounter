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
 *
 * 需求描述: <br/>
 * 一篇 .md 文档,以 \n\n 做分隔，拆分为多个段落。<br/>
 * 如果此段落超过200个字符, 则截取200个字符，然后往回找最后的段落分隔符，例如句号，问号，冒号等.<br/>
 * 如此每个段落拆分为1~N个元素，记住分隔符，然后翻译。
 * 翻译后要求原文和译文都存在，以 \n\n 分隔。
 * 不翻译部分: ![] 开头的
 * <br/>
 */
public class YouDaoFanYiTest {
    //
    public static String apiURLPrefix = "http://fanyi.youdao.com/openapi.do?keyfrom=CNCounter&key=282371857&type=data&only=translate&doctype=json&version=1.1&q=";

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
        logger.info("text1=" + text1 + "; value1:\n" + value1);
        //
        logger.info("text2=" + text2 + "; value2:\n" + value2);

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
                logger.info("翻译失败: translation0=" + translation0);
            }
        }

        //
        return value;
    }
}
