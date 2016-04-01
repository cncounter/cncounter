package com.cncounter.cncounter.service.impl.user;

import com.cncounter.cncounter.dao.api.user.UserMapper;
import com.cncounter.cncounter.model.user.User;
import com.cncounter.cncounter.service.api.user.UserService;
import com.cncounter.cncounter.service.impl.base.ServiceImplBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service("oldUserServiceImpl")
public class UserServiceImpl extends ServiceImplBase implements UserService {

	@Autowired
	private UserMapper userMapper;
	//

	@Override
	public int add(User user) {
		//
		if (null == user) {
			return -1;
		}
		//
		int rows = userMapper.insertSelective(user);
		//
		return rows;
	}

	@Override
	public int delete(User user) {
		//
		if (null == user) {
			return -1;
		}
		//
		Integer id = user.getId();
		//
		if(null == id || id.intValue() < 1){
			return -1;
		}
		//
		int rows = userMapper.deleteByPrimaryKey(id);
		//
		return rows;
	}

	@Override
	public User findByUserNameEmail(String userNameOrEmail) {
		//
		User result = null;
		//
		if(isEmpty(userNameOrEmail)){
			return result;
		}
		// 1. 查找redis?
		// 2. 查找数据库
		// 判断
		if(isEmail(userNameOrEmail)){
			// 是Email
			result = userMapper.findByEmail(userNameOrEmail);
		} else {
			// 当初普通用户名
			result = userMapper.findByUserName(userNameOrEmail);
		}
		
		return result;
	}

	@Override
	public User getById(Integer id) {
		//
		User result = null;
		//
		if(null == id || id.intValue()< 1){
			return result;
		}
		// 1. 查找redis?
		// 2. 查找数据库
		result = userMapper.selectByPrimaryKey(id);
		
		return result;
	}

	@Override
	public List<User> listByPageCondition(Map<String, Object> param) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int update(User user) {
		// TODO Auto-generated method stub
		return 0;
	}
}
