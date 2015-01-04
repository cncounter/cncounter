package com.cncounter.test.redis;

import org.junit.Assert;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;

import com.cncounter.cncounter.dao.redis.api.RedisBaseDAO;
import com.cncounter.cncounter.model.user.User;

//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(locations={"classpath:spring/applicationContext.xml"})
public class UserCacheTest {

	@Autowired
	private RedisBaseDAO redisBaseDAO;

    @Before
    public void setUp(){
    	Assert.assertNotNull("redisBaseDAO 对象不能为空",redisBaseDAO);
    }
    
    //@Test
    public void testUser() throws Exception {
		//
    	User user = generateNewUser();
    	//
    	redisBaseDAO.saveObject(""+user.getId(), user);
    	//
    	User cacheUser = (User) redisBaseDAO.getObject(""+user.getId());
    	Assert.assertNotNull("获取对象出错,cacheUser 为空!", cacheUser);
    	//
    	Assert.assertEquals("获取的cacheUser与user不相等",user, cacheUser);
    	//
    	redisBaseDAO.deleteByKey(""+user.getId());
    	//
    	Object deletedUser = redisBaseDAO.getObject(""+user.getId());
    	//
    	Assert.assertNull("未成功删除对象!deletedUser="+deletedUser, deletedUser);
	}
    
    //
    public User generateNewUser(){
    	//
    	User user = new User();
    	//
    	user.setId(551996458);
    	user.setUsername("tiemaocsdn");
    	user.setRealname("任富飞");
    	user.setEmail("renfufei@qq.com");
    	//
    	return user;
    }
}
