package com.cncounter.cncounter.mvc.controller.open;

import com.cncounter.cncounter.config.QueryConditionMap;
import com.cncounter.cncounter.model.other.User;
import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;
import com.cncounter.cncounter.service.api.other.UserService;
import com.cncounter.util.common.CNC;
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
        //
        QueryConditionMap<String, Object> params = new QueryConditionMap<String, Object>();
        User condition = new User();
        condition.setEmail(loginemail);
        params.setCondition(condition);
        //
        int existsCount = userService.countBy(params);
        if(existsCount > 0){
            message.setFailure();
            message.setInfo("用户已注册");
            return message;
        }


        // 业务逻辑。后期抽到Service
		// 注册服务
        String saltPassword = loginemail;
        String password = CNC.getSaltPassword(loginpassword, saltPassword);
        String uuid = getUUID();
        //
        User user = new User();
        user.setEmail(loginemail);
        user.setUsername(uuid);
        user.setPassword(password);
        user.setSaltPassword(saltPassword);
        //
        try{
            int rows = userService.add(user);
            //
            //message.setTotal(total);
            message.addMeta("loginemail", loginemail);
            if(rows > 0){
                message.setInfo("注册成功");
                message.setSuccess();
            }
        } catch (Exception e){
            message.setInfo("注册失败");
            message.setFailure();
        }
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
