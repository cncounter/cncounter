package com.cncounter.cncounter.mvc.controller.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.InternalResourceView;

import com.cncounter.cncounter.mvc.msg.JSONMessage;

@Controller
public class PublicController extends ControllerBase {

	@RequestMapping({"/index.php","/welcome.php"})
	public ModelAndView indexPage(HttpServletRequest request, HttpServletResponse response) {
		// 输入页面
		ModelAndView mav = new ModelAndView();
		// 
		View view = new InternalResourceView("/index.jsp");
		mav.setView(view);
		//
		return mav;
	}
	@RequestMapping({"/login.php","/signin.php"})
	public ModelAndView signinPage(HttpServletRequest request, HttpServletResponse response) {
		// 判断是否登录
		getLoginUser(request);
		
		
		// 输入页面
		ModelAndView mav = new ModelAndView("login");

		return mav;
	}
	@RequestMapping({"/logout.php","/signout.php"})
	public ModelAndView signoutPage(HttpServletRequest request, HttpServletResponse response) {
		// 输入页面
		ModelAndView mav = new ModelAndView("logout");

		return mav;
	}
	@RequestMapping({"/signup.php","/register.php"})
	public ModelAndView signupPage(HttpServletRequest request, HttpServletResponse response) {
		// 输入页面
		ModelAndView mav = new ModelAndView("signup");

		return mav;
	}

	@RequestMapping({"/login.json","/signin.json"})
	@ResponseBody
	public Object signinAPI(HttpServletRequest request, HttpServletResponse response) {
		//
		JSONMessage message = JSONMessage.newMessage();
		//
		

		return message;
	}
}
