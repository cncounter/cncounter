package com.cncounter.cncounter.mvc.controller.tools;

import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.util.string.StringNumberUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class CommonToolsController extends ControllerBase {

	@RequestMapping({"/tools/{jspname}.php"})
	public ModelAndView getPage(@PathVariable("jspname")String jspname, HttpServletRequest request, HttpServletResponse response) {
		String viewName = "";
		if(StringNumberUtil.notEmpty(jspname)){
			viewName = "tools/" + jspname;
		}
		// 输入页面
		ModelAndView mav = new ModelAndView(viewName);

		return mav;
	}
}
