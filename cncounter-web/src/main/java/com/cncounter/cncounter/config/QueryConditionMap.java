package com.cncounter.cncounter.config;

import java.util.concurrent.ConcurrentHashMap;

/**
 * 查询条件Map
 */
public class QueryConditionMap extends ConcurrentHashMap<String, Object>{
    public static final String CONDITION_KEY = "_bean";

    public static final QueryConditionMap newInstance(){
        return new QueryConditionMap();
    }

    public void setCondition(Object bean){
        this.putCondition(bean);
    }
    public void putCondition(Object bean){
        super.put(CONDITION_KEY, bean);
    }
}
