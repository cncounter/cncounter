package com.cncounter.cncounter.mvc.controller.biz;

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
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * 系统登录
 */
@Controller
@RequestMapping(value = "/system")
public class SystemLoginController extends ControllerBase {


    @Autowired
    private UserService userService;

	@RequestMapping(value = "/login.json")
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
		//User user = new User();
		//
		String token = getUUID();
		//
		//saveToCache("user:token:"+token, user);

		//
		//message.setTotal(total);
		message.addMeta("loginemail",loginemail);
		message.addMeta("token",token);
		message.setInfo("登录成功");
		message.setSuccess();
		//
		return message;
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



}
