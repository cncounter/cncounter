package com.cncounter.cncounter.mvc.controller.qrcode;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;
import com.cncounter.util.zxing.ZXingUtil;

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

		// 需要转换的内容
		String content = getParameterString(request, "content", "");
		int width = getParameterInt(request, "width", 400);
		int height = getParameterInt(request, "height", 400);
		
		// 使用Length+Hash
		int len = content.length();
		int hash = content.hashCode();
		// 
		String key = Integer.toHexString(len) + Integer.toHexString(hash);
		//
		String uuid;// = StringNumberUtil.getUUID(); //
		//
		uuid = key;
		//
		String src = basePath(request)+"rest/qrcode/"+uuid+".jpeg" + "?w="+width + "&h="+height;
		// 缓存起来
		String uuidKey = getUUIDKey(uuid);
		saveToCache(request, uuidKey, content);
		//
		JSONMessage message = JSONMessage.newMessage();
		//
		//message.setTotal(total); 
		message.addMeta("uuid", uuid);
		message.addMeta("src", src);
		message.setSuccess();
		
		//
		return message;
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
		int w = getParameterInt(request, "w", 400);
		int h = getParameterInt(request, "h", 400);
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
}
