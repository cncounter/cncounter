package com.cncounter.cncounter.mvc.controller.tools;

import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;
import com.cncounter.util.string.StringNumberUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class ShortUrlController extends ControllerBase {

	public static String URI_PREFIX = "/url/";
	public static String URI_VIEW_PREFIX = "/tools/shorturl.php";


	@RequestMapping({"/url/{uuid}.action"})
	public Object redirect(@PathVariable("uuid")String uuid, HttpServletRequest request, HttpServletResponse response) {
		String uri = request.getRequestURI();
		int startIndex = uri.indexOf(URI_PREFIX) + URI_PREFIX.length();
		//String uuid = uri.substring(startIndex);
		if(null == uuid){
			return JSONMessage.failureMessage().setInfo("参数错误");
		}
		//
		String uuidKey = getUUIDKey(uuid);
		Object cachedContent = getFromCache(uuidKey);
		if(null == cachedContent){
			// 出错处理
			return JSONMessage.failureMessage().setInfo("参数错误");
		}
		String origurl = cachedContent.toString();
		if(StringNumberUtil.isEmpty(origurl) || !origurl.startsWith("http")){
			return JSONMessage.failureMessage().setInfo("参数错误");
		}
		try {
			response.sendRedirect(origurl);
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return JSONMessage.failureMessage().setInfo("参数错误");
		}

	}

	@RequestMapping({"/tools/shorturl/generate.json"})
	@ResponseBody
	public Object generateShortUrl(HttpServletRequest request, HttpServletResponse response) {
		// 需要转换的内容
		String origurl = getParameterString(request, "origurl", "");
		if(StringNumberUtil.isEmpty(origurl) || !origurl.startsWith("http")){
			return JSONMessage.failureMessage().setInfo("参数错误");
		}
		// 使用Length+Hash
		String uuid = parseContentKey(origurl);
		//
		String shorturl = basePathLessSlash(request)+ URI_PREFIX+uuid + ".action";
		String href = basePathLessSlash(request)+ URI_VIEW_PREFIX+uuid;
		// 缓存起来
		String uuidKey = getUUIDKey(uuid);
		saveToCache(request, uuidKey, origurl);
		//
		JSONMessage message = JSONMessage.newMessage();
		//
		//message.setTotal(total); 
		message.addMeta("uuid", uuid);
		message.addMeta("shorturl", shorturl);
		message.addMeta("href", href);
		message.setSuccess().setInfo("生成成功");
		
		//
		return message;
	}

	
	private static String parseContentKey(String content){
		if(null == content){
			content = "";
		}
		// 使用Length+Hash
		int len = content.length();
		int hash = content.hashCode();
		// 
		String key = Integer.toHexString(len) + Integer.toHexString(hash);
		//
		return key;
	}
}
