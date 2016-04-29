/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
package com.cncounter.cncounter.mvc.controller.user;

import com.cncounter.cncounter.model.other.User;
import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;
import com.cncounter.cncounter.service.api.other.UserService;
import com.cncounter.util.string.StringNumberUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @author 
 */
@Controller
@RequestMapping("/user")
public class UserController extends ControllerBase {
    
    @Autowired
    private UserService userService;
    
	@RequestMapping(value = "/list.json")
	@ResponseBody
	public JSONMessage list(HttpServletRequest request) {
		// get params
		Map<String, Object> params = parseParamMapObject(request);
		//
		Integer count = userService.countBy(params);
		List<User> userList = userService.listPage(params);
		//
		JSONMessage jsonMessage = JSONMessage.successMessage();
		jsonMessage.setTotal(count);
		jsonMessage.setData(userList);

		return jsonMessage;
	}

	@RequestMapping(value = "/add.json", method = RequestMethod.POST)
	@ResponseBody
	public JSONMessage doAdd(HttpServletRequest request) {
		// get params
		Map<String, Object> params = parseParamMapObject(request);
		//
		User user = new User();
		//
		BeanUtils.copyProperties(params, user);
		//
		Integer rows = userService.add(user);

		//
		JSONMessage jsonMessage = JSONMessage.successMessage();
		if(rows < 1){
			jsonMessage = JSONMessage.failureMessage();
		}
		return jsonMessage;
	}
	

	@RequestMapping(value = "/edit.json", method = RequestMethod.POST)
	@ResponseBody
	public JSONMessage doEdit(HttpServletRequest request) {
		// get params
		Map<String, Object> params = parseParamMapObject(request);
		//
		User user = new User();
		//
		BeanUtils.copyProperties(params, user);
		//
		Integer rows = userService.update(user);

		//
		JSONMessage jsonMessage = JSONMessage.successMessage();
		if(rows < 1){
			jsonMessage = JSONMessage.failureMessage();
		}
		return jsonMessage;
	}
	

	@RequestMapping(value = "/delete.json", method = RequestMethod.POST)
	@ResponseBody
	public JSONMessage delete(HttpServletRequest request) {
		// get params
		Map<String, Object> params = parseParamMapObject(request);
		//
		Integer id = 0;
		Object _id = params.get("id");
		if(null != _id && StringNumberUtil.isLong(_id.toString())){
			id = StringNumberUtil.parseInt(_id.toString(), 0);
		}
		//
		Integer rows = userService.delete(id);

		//
		JSONMessage jsonMessage = JSONMessage.successMessage();
		if(rows < 1){
			jsonMessage = JSONMessage.failureMessage();
		}
		return jsonMessage;
	}

}
