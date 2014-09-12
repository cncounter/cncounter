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
import com.cncounter.util.string.StringNumberUtil;
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
	public Object listOrganizationByPage(HttpServletRequest request, HttpServletResponse response) {

		// 需要转换的内容
		String content = getParameterString(request, "content", "");
		//int width = getParameterInt(request, "width", 400);
		//int height = getParameterInt(request, "height", 400);
		
		//
		String uuid = StringNumberUtil.getUUID();
		//
		String src = basePath(request)+"rest/qrcode/"+uuid+".jpeg";
		//
		String uuidKey = getUUIDKey(uuid);
		setSessionAttribute(request, uuidKey, content);
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

	@RequestMapping(value = "/rest/qrcode/{uuid}.jpeg")
	@ResponseBody
	public void listOrgByLevel(@PathVariable("uuid")String uuid, 
			HttpServletRequest request, HttpServletResponse response) {
		String uuidKey = getUUIDKey(uuid);
		String content = (String)getSessionAttribute(request, uuidKey);
		//
		String type="image/jpeg;charset=UTF-8";
		response.setContentType(type);
		try {
			OutputStream output = response.getOutputStream();
			ZXingUtil.generateQrCode(content, output);
			output.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 未实现日志
	}
}
