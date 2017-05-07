package com.cncounter.manage.service.impl;

import com.cncounter.manage.dao.mysql.QueryLogMapper;
import com.cncounter.manage.service.QueryLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QueryLogServiceImpl implements QueryLogService {

    private final static String key_text = "text";
    private final static String key_result = "result";

    @Autowired
    private QueryLogMapper queryLogMapper;

    @Override
    public List<Map<String, Object>> listPage(Map<String, Object> paramMap) {
        //
        final String text_start = "select";
        String textStr = getText(paramMap);
        if(null == textStr){
            return null;
        }
        if (false == textStr.toLowerCase().startsWith(text_start)){
            return null;
        }
        //
        paramMap.put(key_text, textStr);
        //
        List<Map<String, Object>> resultList = queryLogMapper.listPage(paramMap);
        return  resultList;
    }

    @Override
    public int countBy(Map<String, Object> paramMap) {

        final String text_start = "select";
        String textStr = getText(paramMap);
        if(null == textStr){
            return 0;
        }
        if (false == textStr.toLowerCase().startsWith(text_start)){
            return 0;
        }
        //
        paramMap.put(key_text, textStr);
        //
        int rows = queryLogMapper.countBy(paramMap);
        return  rows;
    }

    @Override
    public List<Map<String, Object>> add(Map<String, Object> paramMap) {
        //
        final String text_start = "insert";
        String textStr = getText(paramMap);
        if(null == textStr){
            return null;
        }
        if (false == textStr.toLowerCase().startsWith(text_start)){
            return null;
        }
        //
        paramMap.put(key_text, textStr);
        //
        int rows = queryLogMapper.insert(paramMap);
        List<Map<String, Object>> resultList = rows2ResultList(rows);
        return  resultList;
    }

    @Override
    public List<Map<String, Object>> update(Map<String, Object> paramMap) {
        //
        final String text_start = "update";
        String textStr = getText(paramMap);
        if(null == textStr){
            return null;
        }
        if (false == textStr.toLowerCase().startsWith(text_start)){
            return null;
        }
        //
        paramMap.put(key_text, textStr);
        //
        int rows = queryLogMapper.update(paramMap);
        List<Map<String, Object>> resultList = rows2ResultList(rows);
        return  resultList;
    }

    @Override
    public List<Map<String, Object>> delete(Map<String, Object> paramMap) {
        //
        final String text_start = "delete";
        String textStr = getText(paramMap);
        if(null == textStr){
            return null;
        }
        if (false == textStr.toLowerCase().startsWith(text_start)){
            return null;
        }
        //
        paramMap.put(key_text, textStr);
        //
        int rows = queryLogMapper.delete(paramMap);
        List<Map<String, Object>> resultList = rows2ResultList(rows);
        return  resultList;
    }

    private static List<Map<String, Object>> rows2ResultList(int rows){

        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put(key_result, rows);
        //
        List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
        resultList.add(resultMap);
        return  resultList;
    }

    private static String getText(Map<String, Object> paramMap){
        if(null == paramMap || paramMap.isEmpty()){
            return null;
        }
        //
        final String symbol_semicolon = ";";
        if(false == paramMap.containsKey(key_text)){
            return null;
        }
        Object text = paramMap.get(key_text);
        if(null == text){
            return null;
        }
        if(false == text instanceof String){
            return null;
        }
        //
        String textStr = text.toString().trim();
        if(textStr.isEmpty()){
            return null;
        }
        if (textStr.endsWith(symbol_semicolon)){
            textStr = textStr.substring(0, textStr.length()-1);
            textStr = textStr.trim();
        }
        //
        return textStr;
    }
}
