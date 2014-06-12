package com.cncounter.dao.mapper;

import com.cncounter.model.user.User;

 public interface UserMapper {
     public User findByName(String name);
     public void insertUser(User user);
 }