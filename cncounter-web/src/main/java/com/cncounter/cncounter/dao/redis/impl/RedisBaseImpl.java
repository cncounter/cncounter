package com.cncounter.cncounter.dao.redis.impl;

import com.cncounter.cncounter.dao.redis.api.RedisBaseDAO;
import com.cncounter.util.string.StringNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Repository
public class RedisBaseImpl implements RedisBaseDAO {
	/**
	 * 前缀字符串
	 */
	public static String PRE_FIX = "";
	/**
	 * 默认cache过期时间,秒 =
	 */
	public static Long DEFAULT_EXPIRED_SECONDS = TimeUnit.DAYS.toSeconds(10) ;
	//
	public static String BYTE_CODE = "UTF-8";
	// 模板
	@Autowired
	protected RedisTemplate<String, Serializable> redisTemplate;

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
		try{
			redisTemplate.delete(_key);
		} catch (Exception e){
			redisTemplate.delete(_key);
		}
		return true;
	}

	@Override
	public boolean expire(String key, int seconds) {
		//
		String _key = prefixKey(key);
		//
		try{
			redisTemplate.expire(_key, seconds, TimeUnit.SECONDS);
		} catch (Exception e){
			redisTemplate.expire(_key, seconds, TimeUnit.SECONDS);
		}
		return true;
	}

	@Override
	public Long getLong(String key) {
		//
		String value = getString(key);
		if(!StringNumberUtil.isLong(value)){
			return null;
		}
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
		Object value = null;
		try{
			value = redisTemplate.opsForValue().get(_key);
		} catch (Exception e){
			value = redisTemplate.opsForValue().get(_key);
		}
		return value;
	}

	@Override
	public <T> T getObject(String key, Class<T> clazz) {
		Object cacheVO = null;
		try {
			cacheVO = getObject(key);
		} catch (Throwable ex){
			ex.printStackTrace();
		}
		if(clazz.isInstance(cacheVO)){
			try {
				return (T) cacheVO;
			} catch (Throwable e){
				e.printStackTrace();
			}
		}
		return null;
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
		int seconds = DEFAULT_EXPIRED_SECONDS.intValue();
		boolean result = saveObject(key, value, seconds);
		return result;
	}
	@Override
	public boolean saveObject(String key, Serializable value, int seconds) {
		boolean result = pureSaveObject(key, value);
		expire(key, seconds);
		return result;
	}

	public boolean pureSaveObject(String key, Serializable value) {
		//
		String _key = prefixKey(key);
		//
		try{
			redisTemplate.opsForValue().set(_key, value);
		} catch (Exception e){
			redisTemplate.opsForValue().set(_key, value);
		}
		return true;
	}


	@Override
	public boolean setNX(String key, Serializable value, int seconds) {

		RedisSerializer keySerializer = redisTemplate.getKeySerializer();
		RedisSerializer valueSerializer = redisTemplate.getValueSerializer();

		byte[] keyBytes = keySerializer.serialize(key);
		byte[] valueBytes = valueSerializer.serialize(value);
		Boolean result = false;
		// 设置
		// setNX
		// 获取连接。 归还
		RedisConnection redisConnection = null;
		try {
			redisConnection = redisTemplate.getConnectionFactory().getConnection();
		} catch (Throwable ex){
			redisConnection = redisTemplate.getConnectionFactory().getConnection();
		}
		try{
			result = redisConnection.setNX(keyBytes, valueBytes);
		} catch (Throwable ex){
			result = redisConnection.setNX(keyBytes, valueBytes);
		} finally {
			if(null != redisConnection){
				redisConnection.close();
			}
		}
		if(result){
			expire(key, seconds);
		}
		return result;
	}

	@Override
	public Long setLong(String key, Long value) {
		//
		String _key = prefixKey(key);
		//
		try{
			redisTemplate.opsForValue().set(_key, value);
		} catch (Throwable ex){
			redisTemplate.opsForValue().set(_key, value);
		}
		return value;
	}

	@Override
	public boolean setString(String key, String value) {
		//
		String _key = prefixKey(key);
		//
		try{
			redisTemplate.opsForValue().set(_key, value);
		} catch (Throwable ex){
			redisTemplate.opsForValue().set(_key, value);
		}
		return true;
	}

	/**
	 * 获取cache的key
	 *
	 * @param pattern 模式 xxx*
	 * @return
	 */
	@Override
	public Set<String> keys(String pattern) {
		Set<String> keys = null;
		try{
			keys = redisTemplate.keys(pattern);
		} catch (Throwable ex){
			keys = redisTemplate.keys(pattern);
		}
		return keys;
	}

	public int ttl(String key){
		return getExpireSeconds(key);
	}
	public int getExpireSeconds(String key){
		Long result = -1L;
		try{
			result = redisTemplate.getExpire(key, TimeUnit.SECONDS);
		} catch (Throwable ex){
			result = redisTemplate.getExpire(key, TimeUnit.SECONDS);
		}
		//
		if(null == result){
			result = -1L;
		}
		//
		return result.intValue();
	}
}

