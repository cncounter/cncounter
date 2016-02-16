package com.cncounter.cncounter.service.impl.other;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.cncounter.cncounter.model.translation.Article;
import com.cncounter.cncounter.service.api.other.YoudaoFanyiService;
import com.cncounter.util.net.URLUtils;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * 需求描述: <br/>
 * 一篇 .md 文档,以 \n\n 做分隔，拆分为多个段落。<br/>
 * 如果此段落超过200个字符, 则截取200个字符，然后往回找最后的段落分隔符，例如句号，问号，冒号等.<br/>
 * 如此每个段落拆分为1~N个元素，记住分隔符，然后翻译。
 * 翻译后要求原文和译文都存在，以 \n\n 分隔。
 * 不翻译部分: ![] 开头的
 */
@Service
public class YoudaoFanyiServiceImpl implements YoudaoFanyiService {

    //
    public static String apiURLPrefix = "http://fanyi.youdao.com/openapi.do?keyfrom=CNCounter&key=282371857&type=data&doctype=json&version=1.1&q=";

    @Override
    public String translation(String originalText) {
        //
        String dest = queryAPI(originalText);
        return dest;
    }

    @Override
    public String translationToCN(String textEnglish) {
        // 此处 包装
        //
        Article article = new Article();
        article.setOriginalContent(textEnglish);
        // 翻译
        article.translation(this);
        //
        String dest = article.getTranslationContent();
        //
        return dest;
    }

    private static String queryAPI(String text){
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
            }
        }

        //
        return value;
    }
}
