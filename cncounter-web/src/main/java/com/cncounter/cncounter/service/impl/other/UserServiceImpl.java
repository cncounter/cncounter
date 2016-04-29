/*
 * 文 件 名:  UserServiceImpl.java
 * 创 建 人:  
 * 创建时间:  2016-04-29
 */
package com.cncounter.cncounter.service.impl.other;

import com.cncounter.cncounter.dao.api.other.UserMapper;
import com.cncounter.cncounter.model.other.User;
import com.cncounter.cncounter.service.api.other.UserService;
import com.cncounter.util.string.StringNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * <一句话功能简述>
 */
@Service
public class UserServiceImpl implements UserService {
	
    @Autowired
    private UserMapper userMapper;
    
    @Transactional
	public int add(User user) {
		if(null == user){
			return 0;
		}
        int rows = userMapper.insert(user);
        return rows;
	}

    @Transactional
    public int update(User user) {
		if(null == user){
			return 0;
		}
        int rows = userMapper.update(user);
        return rows;
    }
    
    @Transactional
    public int delete(Integer id) {
		if(null == id){
			return 0;
		}
        int rows = userMapper.deleteById(id);
        return rows;
    }
    
    
    public User getById(Integer id) {
		if(null == id){
			return null;
		}
		User user = userMapper.getById(id);
		//
        return user;
    }
	
	public Integer countBy(Map<String, Object> params){
		processPageParams(params);
		Integer rows = userMapper.countBy(params);
		return rows;
	}
	
	public List<User> listPage(Map<String, Object> params){
		processPageParams(params);
		List<User> lists = userMapper.listPage(params);
		
		return lists;
	}

	private static void processPageParams(Map<String, Object> params){
		// 此段代码可以迁移到工具类之中
		if(null == params){
			return;
		}
		Integer pageSize = 20;
		Integer page = 0;
		Object _pageSize = params.get("pageSize");
		Object _page = params.get("page");
        if(_pageSize instanceof Integer){
            pageSize = (Integer)_pageSize;
        } else if(_pageSize instanceof String){
            pageSize = StringNumberUtil.parseInt(_pageSize.toString(), pageSize);
        }
        if(_page instanceof Integer){
            page = (Integer)_page;
        } else if(_page instanceof String){
            page = StringNumberUtil.parseInt(_page.toString(), page);
		}
		//
		Integer start = page * pageSize;
		//
		params.put("_start", start);
		params.put("_pageSize", pageSize);
	}
}
