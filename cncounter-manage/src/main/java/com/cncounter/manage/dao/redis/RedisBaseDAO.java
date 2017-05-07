package com.cncounter.manage.dao.redis;

import java.io.Serializable;

/**
 * Redis 基础数据DAO
 */
public interface RedisBaseDAO {
	/**
	 * 保存对象
	 * @param key 键
	 * @param value 值
	 * @return
	 */
	public boolean saveObject(String key, Serializable value);
	/**
	 * 获取对象
	 * @param key 键
	 * @return
	 */
	public Object getObject(String key);
	
	/**
	 * 删除
	 * @param key 键
	 * @return
	 */
	public boolean deleteByKey(String key);
	
	/**
	 * 设置值
	 * @param key 键
	 * @param value 值
	 * @return 设置后的值
	 */
	public Long setLong(String key, Long value);
	/**
	 * 增加数字
	 * @param key 键
	 * @param value 增加的值
	 * @return 增加后的值
	 */
	public Long incrLong(String key, Long value);
	/**
	 * 加1
	 * @param key
	 * @return
	 */
	public Long incrLong(String key);
	/**
	 * 获取数字
	 * @param key
	 * @return
	 */
	public Long getLong(String key);

	/**
	 * 保存String
	 * @param key 键
	 * @param value 值
	 * @return
	 */
	public boolean setString(String key, String value);
	/**
	 * 获取String
	 * @param key 键
	 * @return
	 */
	public String getString(String key);
}
