package com.cncounter.cncounter.mvc.controller.tools;

import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;
import com.cncounter.util.zxing.ZXingUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Controller
public class QRCodeController extends ControllerBase {

	@RequestMapping({"/qrcode/input.php"})
	public ModelAndView getPage(HttpServletRequest request, HttpServletResponse response) {
		// 输入页面
		ModelAndView mav = new ModelAndView("qrcode/input");

		return mav;
	}
	
	@RequestMapping(value = "/qrcode/ajax/genqrcode.json")
	@ResponseBody
	public Object generateQRcode(HttpServletRequest request, HttpServletResponse response) {

		int width = getParameterInt(request, "width", 300);
		int height = getParameterInt(request, "height", 300);
		// 需要转换的内容
		String content = getParameterString(request, "content", "");
		
		// 使用Length+Hash
		String uuid = parseContentKey(content);
		//
		String src = basePath(request)+"rest/qrcode/"+uuid+".jpeg" + "?w="+width + "&h="+height;
		String href = basePath(request)+"rest/qrcode/"+uuid+".php" + "?w="+width + "&h="+height;
		// 缓存起来
		String uuidKey = getUUIDKey(uuid);
		saveToCache(request, uuidKey, content);
		//
		JSONMessage message = JSONMessage.newMessage();
		//
		//message.setTotal(total); 
		message.addMeta("uuid", uuid);
		message.addMeta("src", src);
		message.addMeta("href", href);
		message.setSuccess();
		
		//
		return message;
	}
	

	/**
	 * 根据内容获取二维码, 动态生成图像
	 * 获取 content 参数，需要使用 UTF-8 进行URL编码
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/qrcode/generatebycontent.jpeg")
	@ResponseBody
	public void getQrCodeByContent(HttpServletRequest request, HttpServletResponse response) {
		// 需要转换的内容
		String content = getParameterString(request, "content", "");
		try {
			content = URLDecoder.decode(content, UTF_8); // 解码
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		String uuid = parseContentKey(content);
		// 调用另一个方法实现
		getQrCode(uuid, request, response);
	}

	/**
	 * 获取二维码, 动态生成
	 * @param uuid
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/rest/qrcode/{uuid}.jpeg")
	@ResponseBody
	public void getQrCode(@PathVariable("uuid")String uuid, 
			HttpServletRequest request, HttpServletResponse response) {
		String uuidKey = getUUIDKey(uuid);
		String content = (String)getFromCache(request, uuidKey);
		//
		int w = getParameterInt(request, "w", 300);
		int h = getParameterInt(request, "h", 300);
		//
		String type="image/jpeg;charset=UTF-8";
		response.setContentType(type);
		try {
			OutputStream output = response.getOutputStream();
			ZXingUtil.generateQrCode(content, output, w, h);
			output.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 未实现日志
	}

	/**
	 * 获取二维码, 动态生成
	 * @param uuid
	 * @param request
	 * @param response
	 */
	@RequestMapping(value = "/rest/qrcode/{uuid}.php")
	public ModelAndView getQrCodePage(@PathVariable("uuid")String uuid, 
			HttpServletRequest request, HttpServletResponse response) {
		String uuidKey = getUUIDKey(uuid);
		String content = (String)getFromCache(request, uuidKey);
		//
		int w = getParameterInt(request, "w", 300);
		int h = getParameterInt(request, "h", 300);
		// 未实现日志
		

		// 输入页面
		ModelAndView mav = new ModelAndView("qrcode/show");
		//
		mav.addObject("uuid", uuid);
		mav.addObject("content", content);
		mav.addObject("w", w);
		mav.addObject("h", h);

		return mav;
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
