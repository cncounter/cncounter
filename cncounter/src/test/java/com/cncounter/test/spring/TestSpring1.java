package com.cncounter.test.spring;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.cncounter.model.message.Message;
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
		Message message = (Message) context.getBean("messageBean");
		Assert.assertNotNull(paper);
		Assert.assertNotNull(message);
		Assert.assertEquals(message, paper.getMessage());
		System.out.println(paper);
	}
}
