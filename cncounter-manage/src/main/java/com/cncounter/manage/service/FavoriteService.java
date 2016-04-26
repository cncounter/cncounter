/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
package com.cncounter.manage.service;

import java.util.List;
import java.util.Map;


import com.cncounter.manage.model.Favorite;

/**
 * @version 1.0
 * @author 
 */
public interface FavoriteService {
	
	public int add(Favorite favorite);

	public int update(Favorite favorite);
    
	public int delete(Integer id);

	public Favorite getById(Integer id);

	public Integer countBy(Map<String, Object> params);

	public List<Favorite> listPage(Map<String, Object> params);

}
