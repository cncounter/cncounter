package com.cncounter.cncounter.mvc.controller.open;

import com.cncounter.cncounter.model.user.User;
import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;
import com.cncounter.util.string.StringNumberUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class UserController extends ControllerBase {

	@RequestMapping(value = "/openapi/signup.json")
	@ResponseBody
	public Object signup(HttpServletRequest request, HttpServletResponse response) {
		//
		JSONMessage message = JSONMessage.newMessage();
		// 需要转换的内容
		String loginemail = getParameterString(request, "loginemail", "");
		String loginpassword = getParameterString(request, "loginpassword", "");

		if(StringNumberUtil.isEmpty(loginemail) || StringNumberUtil.isEmpty(loginpassword)){
			// 出错
			message.setStatus(JSONMessage.STATUS_FAILURE);
			message.setInfo("参数错误");
			return message;
		}
		// 注册服务

		//
		//message.setTotal(total);
		message.addMeta("loginemail",loginemail);
		message.setInfo("注册成功");
		message.setSuccess();
		//
		return message;
	}

	@RequestMapping(value = "/openapi/login.json")
	@ResponseBody
	public Object login(HttpServletRequest request, HttpServletResponse response) {
		//
		JSONMessage message = JSONMessage.newMessage();
		// 需要转换的内容
		String loginemail = getParameterString(request, "loginemail", "");
		String loginpassword = getParameterString(request, "loginpassword", "");

		if(StringNumberUtil.isEmpty(loginemail) || StringNumberUtil.isEmpty(loginpassword)){
			// 出错
			message.setStatus(JSONMessage.STATUS_FAILURE);
			message.setInfo("参数错误");
			return message;
		}
		// 登录服务
		// 获取用户
		User user = new User();
		//
		String token = getUUID();
		//
		saveToCache("user:token:"+token, user);

		//
		//message.setTotal(total);
		message.addMeta("loginemail",loginemail);
		message.addMeta("token",token);
		message.setInfo("登录成功");
		message.setSuccess();
		//
		return message;
	}
}
