package com.cncounter.cncounter.service.api.user;

import java.util.List;
import java.util.Map;

import com.cncounter.cncounter.model.user.User;

public interface UserService {

	/**
	 * 新增用户
	 * @param user
	 * @return
	 */
	public int add(User user);
	/**
	 * 删除用户
	 * @param user
	 * @return
	 */
	public int delete(User user);

	/**
	 * 更新用户
	 * @param user
	 * @return
	 */
	public int update(User user);

	/**
	 * 根据ID获取
	 * @param id
	 * @return
	 */
	public User getById(Integer id);
	
	/**
	 * 根据用户名,或者Email查找
	 * @param userNameOrEmail
	 * @return
	 */
	public User findByUserNameEmail(String userNameOrEmail);
	/**
	 * 根据页码和条件查询列表
	 * @param param
	 * @return
	 */
	public List<User> listByPageCondition(Map<String, Object> param);
}
