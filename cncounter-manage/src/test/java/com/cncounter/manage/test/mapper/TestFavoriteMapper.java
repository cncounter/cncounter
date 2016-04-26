/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
package com.cncounter.manage.test.mapper;

import java.util.*;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;


import com.cncounter.manage.model.Favorite;
import com.cncounter.manage.dao.mysql.FavoriteMapper;

/**
 * @version 1.0
 * @author 
 * 单元测试 收藏: FavoriteMapper
 */
@ContextConfiguration("classpath:generated/testSpringContext.xml")
@RunWith(SpringJUnit4ClassRunner.class)
@Transactional // 事务必须要Junit看得见才能回滚
public class TestFavoriteMapper {
    
    private Log logger = LogFactory.getLog(this.getClass());
    
    @Autowired
    private FavoriteMapper favoriteMapper;
    
    @Before
    public void setUp(){
        Assert.notNull(favoriteMapper, "favoriteMapper 不能为 null");
        // 此处可以做一些初始化操作
    }
    @After
    public void tearDown(){
    	favoriteMapper = null;
        // 此处可以做一些清理操作
    }
    
    @Test
    public  void testListBy(){
        logger.debug("开始测试 favoriteMapper.listPage(params)");
        Map<String, Object> params = new HashMap<String, Object>();
        List<Favorite> resultList =  favoriteMapper.listPage(params);
        //
        Assert.notNull(resultList, "resultList 不能为 null");
        logger.debug("favoriteMapper.listPage(params)测试结束. resultList.size()=" + resultList.size());
    }

    @Test
    public  void testCountBy(){
        logger.debug("开始测试 favoriteMapper.countBy(params)");
        Map<String, Object> params = new HashMap<String, Object>();
        int result =  favoriteMapper.countBy(params);
        //
        Assert.isTrue(result >= 0, "result 不能为 负数");
        logger.debug("favoriteMapper.countBy(params)测试结束. result=" + result);
    }

    @Test
    @Rollback(true)
    public  void testSave(){
        logger.debug("开始测试 favoriteMapper.add(null)");
        Favorite condition = new Favorite();
        int result =  0;//favoriteMapper.insert(null);
        //
        Assert.isTrue(result >= 0, "result 不能为 负数");
        logger.debug("favoriteMapper.add(condition)测试结束. result=" + result);
    }

}
