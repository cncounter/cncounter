/*
 * 文 件 名:  UserMapper.java
 * 创 建 人:  tangqian
 * 创建时间:  2016-04-29
 */
package com.cncounter.cncounter.dao.api.other;

import com.cncounter.cncounter.model.other.User;

import java.util.List;
import java.util.Map;

//@Repository
public interface UserMapper {
    
    User getById(Integer id);
    
    int countBy(Map<String, Object> params);

    List<User> listPage(Map<String, Object> params);
    
    int insert(User user);
    
    int update(User user);
    
    int deleteById(Integer id);
}