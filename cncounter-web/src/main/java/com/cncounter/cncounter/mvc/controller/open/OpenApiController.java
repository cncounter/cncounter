package com.cncounter.cncounter.mvc.controller.open;

import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;
import com.cncounter.cncounter.service.api.other.UserService;
import com.cncounter.util.string.StringNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(value = "/openapi")
public class OpenApiController extends ControllerBase {

    @Autowired
    private UserService userService;

    // 注册
	@RequestMapping(value = {"/signup.json", "/register.json"})
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

    // 重置密码
    @RequestMapping(value = "/resetpassword.json")
    @ResponseBody
    public Object resetPassword(HttpServletRequest request, HttpServletResponse response) {
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

}
