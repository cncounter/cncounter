package com.cncounter.cncounter.mvc.controller.biz;

import com.cncounter.cncounter.config.QueryConditionMap;
import com.cncounter.cncounter.model.other.User;
import com.cncounter.cncounter.model.view.UserVO;
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
import java.util.List;

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
        List<User> existsCount = userService.listPage(params);
        if(null == existsCount || existsCount.isEmpty()){
            message.setFailure();
            message.setInfo("用户不存在");
            return message;
        }
        //
		// 登录服务

        // 比对
		// 获取用户
		User user = existsCount.get(0);
        // 比对密码
        String password = user.getPassword();
        String salt = user.getSaltPassword();
        //
        String saltedpass = CNC.getSaltPassword(loginpassword, salt);
        if(null == password){

        } else if(password.equalsIgnoreCase(saltedpass)){
            //
        } else {
            // 认为登录失败
            return message.setFailure().setInfo("用户密码错误");
        }

        //
        UserVO userVO = UserVO.from(user);
		//
		String token = getUUID();
        userVO.setToken(token);
		// 用 hash?
        //
        super.saveSessionUser(userVO);
        super.setUserTokenCookie(response, token);
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
