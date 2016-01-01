package com.cncounter.cncounter.mvc.controller.advise;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;

@Controller
public class AdviseController extends ControllerBase {

	@RequestMapping({"/advise/list.php"})
	public ModelAndView getPage(HttpServletRequest request, HttpServletResponse response) {
		// 输入页面
		ModelAndView mav = new ModelAndView("advise/list");
		return mav;
	}

	/**
	 * 获取内容
	 * @param uuid
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/rest/advise/{uuid}.php")
	public ModelAndView getAdvise(@PathVariable("uuid")String uuid, 
			HttpServletRequest request, HttpServletResponse response) {
		String uuidKey = getUUIDKey(uuid);
		String content = (String)getFromCache(request, uuidKey);
		String advisetitle = "意见与建议";
		//
		request.setAttribute("advisetitle", advisetitle);
		request.setAttribute("advisecontent", content);
		//
		// 未实现日志

		// 页面
		ModelAndView mav = new ModelAndView("advise/advisecontent");
		return mav;
	}
	
	@RequestMapping(value = "/advise/ajax/addadvise.json")
	@ResponseBody
	public Object addadvise(HttpServletRequest request, HttpServletResponse response) {

		// 需要转换的内容
		String content = getParameterString(request, "content", "");
		
		// 使用Length+Hash
		int len = content.length();
		int hash = content.hashCode();
		// 
		String key = Integer.toHexString(len) + Integer.toHexString(hash);
		//
		String uuid = key;
		//
		String url = basePath(request)+"rest/advise/"+uuid+".php";
		// 缓存起来
		String uuidKey = getUUIDKey(uuid);
		saveToCache(request, uuidKey, content);
		//
		JSONMessage message = JSONMessage.newMessage();
		//
		//message.setTotal(total); 
		message.addMeta("uuid", uuid);
		message.addMeta("url", url);
		message.setSuccess();
		//
		return message;
	}

}
