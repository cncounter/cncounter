package com.cncounter.manage.dao.redis.impl;

import com.cncounter.manage.dao.redis.RedisBaseDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.nio.charset.Charset;

@Repository
public class RedisBaseImpl implements RedisBaseDAO {
	/**
	 * 前缀字符串
	 */
	public static String PRE_FIX = "cncounter:RedisBaseImpl:";
	//
	public static String BYTE_CODE = "UTF-8";
	// 模板
	@Autowired
	protected RedisTemplate<String, Serializable> redisTemplate;
	// 序列号工具
	protected StringRedisSerializer serializer = new StringRedisSerializer(Charset.forName(BYTE_CODE));

	// 获取字节数组
	public byte[] getByteArray(String string){
		string = String.valueOf(string);
		byte[] byteArray = serializer.serialize(string);
		//
		return byteArray;
	}

	/**
	 * 给KEY加上前缀
	 * @param key
	 * @return
	 */
	protected String prefixKey(String key){
		return PRE_FIX + key;
	}
	@Override
	public boolean deleteByKey(String key) {
		//
		String _key = prefixKey(key);
		//
		redisTemplate.delete(_key);
		return true;
	}

	@Override
	public Long getLong(String key) {
		//
		String value = getString(key);
		return Long.valueOf(value);
	}

	@Override
	public String getString(String key) {
		//
		Object value = getObject(key);
		return String.valueOf(value);
	}
	
	@Override
	public Object getObject(String key) {
		//
		String _key = prefixKey(key);
		//
		Object value = redisTemplate.opsForValue().get(_key);
		return value;
	}

	@Override
	public Long incrLong(String key, Long value) {
		//
		String _key = prefixKey(key);
		//
		Long v = redisTemplate.opsForValue().increment(_key, value);
		return v;
	}

	@Override
	public Long incrLong(String key) {
		Long value = 1L;
		//
		return incrLong(key, value);
	}
	
	@Override
	public boolean saveObject(String key, Serializable value) {
		//
		String _key = prefixKey(key);
		//
		redisTemplate.opsForValue().set(_key, value);
		return true;
	}

	@Override
	public Long setLong(String key, Long value) {
		//
		String _key = prefixKey(key);
		//
		redisTemplate.opsForValue().set(_key, value);
		return value;
	}

	@Override
	public boolean setString(String key, String value) {
		//
		String _key = prefixKey(key);
		//
		redisTemplate.opsForValue().set(_key, value);
		return true;
	}

}
