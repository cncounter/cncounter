package com.cncounter.test.spring;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.cncounter.model.message.PostPaper;

public class TestSpring1 {
	
	ApplicationContext context = null;

	@Before
	public void init() {
		//
		context = new ClassPathXmlApplicationContext("Spring-EL.xml");
	}
	@Test
	public void testSpringEL() throws Exception {
		Assert.assertNotNull(context);
		//
		PostPaper paper = (PostPaper) context.getBean("postPaperBean");
		Assert.assertNotNull(paper);
		System.out.println(paper);
	}
}
