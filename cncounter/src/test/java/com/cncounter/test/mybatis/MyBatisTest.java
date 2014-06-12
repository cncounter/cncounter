package com.cncounter.test.mybatis;

import java.io.IOException;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Assert;
import org.junit.Test;

import com.cncounter.dao.mapper.UserMapper;
import com.cncounter.model.user.User;

/**
 * myBatis数据库测试
 * 
 */
public class MyBatisTest {
	
	private static SqlSessionFactory sessionFactory = null;
	private static String resource = "mappers/configuration.xml";
	/**
	 * 获得MyBatis SqlSessionFactory
	 * SqlSessionFactory负责创建SqlSession，一旦创建成功，就可以用SqlSession实例来执行映射语句
	 * ，commit，rollback，close等方法。
	 * 
	 * @return
	 */
	private static SqlSessionFactory getSessionFactory() {
		if(null == sessionFactory){
			synchronized (resource) {
				try {
					sessionFactory = new SqlSessionFactoryBuilder().build(Resources
							.getResourceAsReader(resource));
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return sessionFactory;
	}

	@Test
	public void testGet() {
		SqlSessionFactory factory = getSessionFactory();
		Assert.assertNotNull(factory);
		SqlSession sqlSession = factory.openSession();
		Assert.assertNotNull(sqlSession);
		UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
		Assert.assertNotNull(userMapper);

		// test select
		User user = userMapper.findByName("andy");
		Assert.assertNotNull(user);
		System.out.println(user.getName()+":"+user.getAge());

		// test insert
		String name1 = "" + System.nanoTime() + "_" + Thread.currentThread().getId();
		User user1 = new User();
		user1.setName(name1);
		user1.setAge(22);
		userMapper.insertUser(user1);
		// it is a must or no data will be insert into server.
		sqlSession.commit();
		//
		User user2 = userMapper.findByName(name1);
		Assert.assertEquals(user2.getAge(), user1.getAge());
	}
	public static void main(String[] args) {
		new MyBatisTest().testGet();
	}
}
