/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
package com.cncounter.cncounter.service.api.other;

import com.cncounter.cncounter.model.other.User;

import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @author 
 */
public interface UserService {
	
	public int add(User user);

	public int update(User user);
    
	public int delete(Integer id);

	public User getById(Integer id);

	public Integer countBy(Map<String, Object> params);

	public List<User> listPage(Map<String, Object> params);

}
