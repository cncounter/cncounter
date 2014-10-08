package com.cncounter.test.redis;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.Pipeline;

public class JedisTest {
// Maven 有点扯,和MyEclipse不太兼容,需要run之后才会执行编译,而不是MyEclipse的自动编译
	//
	public static JedisPool _pool = null;
	@Before
	public void setUp() {
		_pool = getNewPool();
		Assert.assertNotNull(_pool);
	}
	
	public JedisPool getNewPool() {
		//JedisPool pool = new JedisPool("localhost", 80);
		JedisPool pool = new JedisPool("redis.duapp.com", 80);
		return pool;
	}
	
	public JedisPool getPool() {
		// 不处理同步
		if(null == _pool){
			_pool = getNewPool();
		}
		return _pool;
	}
	

	public Jedis getResource() {
		JedisPool pool = getPool();
		Jedis jedis = pool.getResource();
		return jedis;
	}
	
	public void returnResource(Jedis jedis) {
		JedisPool pool = getPool();
		if(null != pool && null != jedis){
			pool.returnResource(jedis);
		}
		return ;
	}

	@Test
	public void testIncr() {
		//
		final String key = "testClient:count";
		//
		Jedis jedis = getResource();
		try{
			// 
			jedis.set(key, "0");
			//
			int w = 5;
			int len = w*10000;
			for (int i = 0; i < len; i++) {
				jedis.incr(key);
			}
			//
			String actual = jedis.get(key);
			jedis.del(key);
			String expected = ""+len;
			Assert.assertEquals(expected, actual);
			System.out.println("testIncr;expected="+expected+";actual="+actual);
			
		} catch (Exception e) {
			// 归还出错的资源...
		} finally{
			returnResource(jedis);
		}
	}
	

	@Test
	public void testPipeLine() {
		//
		final String key = "testPipeLine:count";
		//
		Jedis jedis = getResource();
		try{
			// 
			jedis.set(key, "0");
			Pipeline pipe = jedis.pipelined();
			//
			int w = 5;
			int len = w*10000;
			for (int i = 0; i < len; i++) {
				pipe.incr(key);
				//
				if(i % 10000 == 0){
					pipe.sync();
				}
			}
			//
			String actual = jedis.get(key);
			jedis.del(key);
			String expected = ""+len;
			Assert.assertEquals(expected, actual);
			System.out.println("testPipeLine;expected="+expected+";actual="+actual);
			
		} catch (Exception e) {
			// 归还出错的资源...
		} finally{
			returnResource(jedis);
		}
	}
	

	// 多线程,增加
	// 按道理,每个线程都需要有自己的连接
	@Test
	public void testMultiIncr() {
		//
		final String key = "testMultiIncr:count";
		//
		Jedis jedis = getResource();
		try{
			// 
			jedis.set(key, "0");
			//
			int w = 5;
			int len = w*10000;
			for (int i = 0; i < len; i++) {
				jedis.incr(key);
			}
			//
			String actual = jedis.get(key);
			jedis.del(key);
			String expected = ""+len;
			Assert.assertEquals(expected, actual);
			System.out.println("testMultiIncr;expected="+expected+";actual="+actual);
			
		} catch (Exception e) {
			// 归还出错的资源...
		} finally{
			returnResource(jedis);
		}
	}

	public void multiIncrUtil(int num) {
		
	}
	
	//  多线程。pipeline ...
}
