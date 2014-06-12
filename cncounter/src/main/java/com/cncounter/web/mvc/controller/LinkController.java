package com.cncounter.web.mvc.controller;

import java.text.SimpleDateFormat;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value= "/mvc")
public class LinkController {

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy年MM月dd日");
    
	@RequestMapping(value= "/link", method = RequestMethod.GET)
	public String printLinkInfo(ModelMap model) {
		 
        model.addAttribute("message", "Spring3 MVC 例子");
        model.addAttribute("date", dateFormat.format(new java.util.Date()));
        return "link";
    }
	@RequestMapping(value = {"/welcome", "/hello"})
    public ModelAndView printMessage (){
        ModelAndView mv = new ModelAndView();
        mv.addObject("message", "返回类型ModelAndView ");
        mv.addObject("date", dateFormat.format(new java.util.Date()));
        mv.setViewName("link");
        return mv;
    }
}
