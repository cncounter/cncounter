package com.cncounter.test.duapp;

import redis.clients.jedis.Jedis;

public class TestRedisConnection {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// 
		new TestRedisConnection().testRedisConn();
	}

	//@Test
	public void testRedisConn(){
		String name = testRedisConnStr();
        System.out.println("name | " + name);	
	}
	public String testRedisConnStr() {
		/*****1. 填写数据库相关信息(请查找数据库详情页)*****/
		// 6EhSiGpsmSMRyZieglUImkTr-eoNRNBgRk397mVyu66MHYuZDsepCeZ8A-MHdLBQwQQVQiHBufZbPa
    	String databaseName = "MHdLBQwQQVQiHBufZbPa"; 
    	String host = "redis.duapp.com";
    	String portStr = "80";
    	String username = "6EhSiGpsmSMRyZieglUImkTr";//用户名(api key);
    	String password = "eoNRNBgRk397mVyu66MHYuZDsepCeZ8A";//密码(secret key)
    	int port = Integer.parseInt(portStr);

		/******2. 接着连接并选择数据库名为databaseName的服务器******/
      	Jedis jedis = new Jedis(host,port);
		jedis.connect();
		jedis.auth(username + "-" + password + "-" + databaseName);
	      	/*至此连接已完全建立，就可对当前数据库进行相应的操作了*/
		/*3. 接下来就可以使用redis数据库语句进行数据库操作,详细操作方法请参考java-redis官方文档*/
      	//删除所有redis数据库中的key-value
      	jedis.flushDB();
        //简单的key-value设置
        jedis.set("name", "renfufei");
        String name = jedis.get("name");
        return name;
	}
	
}
