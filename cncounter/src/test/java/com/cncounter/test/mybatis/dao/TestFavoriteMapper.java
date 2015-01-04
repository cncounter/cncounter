package com.cncounter.test.mybatis.dao;

import java.util.Iterator;
import java.util.List;

import org.junit.Assert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.cncounter.cncounter.dao.api.other.FavoriteMapper;
import com.cncounter.cncounter.model.other.Favorite;

//@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:spring/applicationContext.xml"})
public class TestFavoriteMapper {

	@Autowired
	private FavoriteMapper dao;
	
	// 样板
	private Favorite sample;
	

    //@Before
    public void setUp(){
    	//
    	sample = generateSample();
    	//
    	Assert.assertNotNull("DAO 对象不能为空", dao);
    	Assert.assertNotNull("sample 对象不能为空", sample);
    }
	
	private Favorite generateSample() {
		Favorite f = new Favorite();
		//
		f.setTitle("测试Cncounter");
		f.setUrl("http://cncounter.duapp.com/");
		f.setCreateuserid(this.getClass().getName());
		f.setType(1024);
		//
		return f;
	}

	//@Test
	@Transactional
	public void testFavoriteMapperCRUD(){
		testAdd();
		testListByType();
		testGetById();
		testDelete();
		testAfterDelete();
	}

	private void testAdd() {
		int row = dao.insertSelective(sample);
		Assert.assertTrue("新增失败, row="+row, row > 0);
	}

	private void testListByType() {
		Integer sampleType = sample.getType();
		String sampleCreateuserid = sample.getCreateuserid();
		
		List<Favorite> list = dao.listByType(sampleType);
		//
    	Assert.assertNotNull("listByType执行失败,list="+list, list);
    	//
    	int len = list.size();
		Assert.assertTrue("查询失败, len="+len, len > 0);
		//
		for (Iterator<Favorite> iterator = list.iterator(); iterator.hasNext();) {
			Favorite favorite = (Favorite) iterator.next();
			if(null == favorite){
				continue;
			}
			//
			//
			String createuserid = favorite.getCreateuserid();
			if(null != sampleCreateuserid && sampleCreateuserid.equals(createuserid)){
				sample = favorite; // 取得这个对象
			}
		}
	}
	private void testGetById() {
		Integer sampleId = sample.getId();
		Favorite favorite = dao.getById(sampleId);
    	Assert.assertNotNull("getById 执行失败,favorite="+favorite, favorite);
	}

	private void testDelete() {
		Integer sampleId = sample.getId();
		int row = dao.deleteById(sampleId);
		Assert.assertTrue("删除失败, row="+row, row > 0);
	}

	private void testAfterDelete() {
		Integer sampleId = sample.getId();
		Favorite favorite = dao.getById(sampleId);
    	Assert.assertNull("删除失败,favorite应该为null: "+favorite, favorite);
	}
}
