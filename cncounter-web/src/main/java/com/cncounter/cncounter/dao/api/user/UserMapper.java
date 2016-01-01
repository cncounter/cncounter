package com.cncounter.cncounter.dao.api.user;

import com.cncounter.cncounter.model.user.User;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User user);

    int insertSelective(User user);

    User selectByPrimaryKey(Integer id);
    
    User findByUserName(String username);
    
    User findByEmail(String email);

    int updateByPrimaryKeySelective(User user);

    int updateByPrimaryKey(User user);
}