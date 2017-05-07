/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
package com.cncounter.manage.dao.mysql;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.cncounter.manage.model.Favorite;

@Repository
public interface FavoriteMapper {
    
    Favorite getById(Integer id);
    
    int countBy(Map<String, Object> params);

    List<Favorite> listPage(Map<String, Object> params);
    
    int insert(Favorite favorite);
    
    int update(Favorite favorite);
    
    int deleteById(Integer id);
}