package com.cncounter.cncounter.dao.redis.api;

import java.io.Serializable;
import java.util.Set;

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
	 * 保存自动过期对象
	 * @param key 键
	 * @param value 值
	 * @param seconds 过期时间
	 * @return
	 */
	public boolean saveObject(String key, Serializable value, int seconds);

	/**
	 * 如果不存在则设置
	 * @param key 键
	 * @param value 值
	 * @param seconds 超时时间
	 * @return
	 */
	public boolean setNX(String key, Serializable value, int seconds);
	/**
	 * 获取对象
	 * @param key 键
	 * @return
	 */
	public Object getObject(String key);

	// 获取对应类型的 Cache
	public <T> T getObject(String key, Class<T> clazz);

	/**
	 * 删除
	 * @param key 键
	 * @return
	 */
	public boolean deleteByKey(String key);

	/**
	 * 设置过期时间
	 * @param key
	 * @param seconds
	 * @return
	 */
	public boolean expire(String key, int seconds);

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

	/**
	 * 获取cache的key
	 * @param pattern 模式 xxx*
	 * @return
	 */
	public Set<String> keys(String pattern);

	/**
	 * 查询过期时间
	 * @param key
	 * @return
	 */
	public int ttl(String key);
	/**
	 * 查询过期时间
	 * @param key
	 * @return
	 */
	public int getExpireSeconds(String key);
}
