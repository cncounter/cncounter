package com.cncounter.manage.dao.mysql;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface QueryLogMapper {
    List<Map<String,Object>> listPage(Map<String, Object> paramMap);

    int countBy(Map<String, Object> paramMap);

    int insert(Map<String, Object> paramMap);

    int update(Map<String, Object> paramMap);

    int delete(Map<String, Object> paramMap);
}
