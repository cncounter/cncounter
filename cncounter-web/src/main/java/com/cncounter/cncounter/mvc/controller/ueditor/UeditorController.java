package com.cncounter.cncounter.mvc.controller.ueditor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.InternalResourceView;

import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;

@Controller
@RequestMapping({"/ueditor"})
public class UeditorController extends ControllerBase {

	@RequestMapping(value={"/save.php"})
	public ModelAndView indexPage(HttpServletRequest request, HttpServletResponse response) {
		// 
		View view = new InternalResourceView("/ueditor/jsp/saveresult.jsp");
		ModelAndView mav = new ModelAndView(view);
		//
		String title = getParameterString(request, "title", "");
		String content = getParameterString(request, "content", "");
		//
		request.setAttribute("title", title);
		request.setAttribute("content", content);
		//
		return mav;
	}

	@RequestMapping(value={"/save.json"})
	public Object signinAPI(HttpServletRequest request, HttpServletResponse response) {
		//
		JSONMessage message = JSONMessage.newMessage();
		//

		return message;
	}
}
