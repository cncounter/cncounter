/*
 * 文 件 名:  FavoriteServiceImpl.java
 * 创 建 人:  
 * 创建时间:  
 */
package com.cncounter.manage.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.cncounter.util.common.StringNumberUtil;
import com.cncounter.manage.service.FavoriteService;
import com.cncounter.manage.model.Favorite;
import com.cncounter.manage.dao.mysql.FavoriteMapper;

/**
 * <一句话功能简述>
 */
@Service
public class FavoriteServiceImpl implements FavoriteService {
	
    @Autowired
    private FavoriteMapper favoriteMapper;
    
    @Transactional
	public int add(Favorite favorite) {
		if(null == favorite){
			return 0;
		}
        int rows = favoriteMapper.insert(favorite);
        return rows;
	}

    
    @Transactional
    public int update(Favorite favorite) {
		if(null == favorite){
			return 0;
		}
        int rows = favoriteMapper.update(favorite);
        return rows;
    }
    
    
    @Transactional
    public int delete(Integer id) {
		if(null == id){
			return 0;
		}
        int rows = favoriteMapper.deleteById(id);
        return rows;
    }
    
    
    public Favorite getById(Integer id) {
		if(null == id){
			return null;
		}
		Favorite favorite = favoriteMapper.getById(id);
		//
        return favorite;
    }
	
	public Integer countBy(Map<String, Object> params){
		Integer rows = favoriteMapper.countBy(params);
		return rows;
	}
	
	public List<Favorite> listPage(Map<String, Object> params){
		List<Favorite> lists = favoriteMapper.listPage(params);
		
		return lists;
	}
}
