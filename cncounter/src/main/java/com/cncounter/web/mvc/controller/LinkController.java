package com.cncounter.web.mvc.controller;

import java.text.SimpleDateFormat;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/mvc/link")
public class LinkController {
	@RequestMapping(method = RequestMethod.GET)
	public String printLinkInfo(ModelMap model) {
		 
        model.addAttribute("message", "Spring3 MVC 例子");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy年MM月dd日");
        model.addAttribute("date", dateFormat.format(new java.util.Date()));
        return "link";
    }
}
