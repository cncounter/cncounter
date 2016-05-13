/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
package com.cncounter.manage.service;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @author 
 */
public interface QueryLogService {

    List<Map<String,Object>> listPage(Map<String, Object> paramMap);

    int countBy(Map<String, Object> paramMap);

    List<Map<String,Object>> add(Map<String, Object> paramMap);

    List<Map<String,Object>> update(Map<String, Object> paramMap);

    List<Map<String,Object>> delete(Map<String, Object> paramMap);
}
