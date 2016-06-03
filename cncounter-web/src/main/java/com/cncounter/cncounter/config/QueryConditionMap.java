package com.cncounter.cncounter.config;

import java.util.concurrent.ConcurrentHashMap;

/**
 * 查询条件Map
 */
public class QueryConditionMap<K, V> extends ConcurrentHashMap{
    public static String CONDITION_KEY = "_bean";

    public void setCondition(Object bean){
        super.put(CONDITION_KEY, bean);
    }
    public void putCondition(Object bean){
        this.setCondition(bean);
    }
}
