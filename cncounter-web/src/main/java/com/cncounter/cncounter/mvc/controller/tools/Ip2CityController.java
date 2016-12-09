package com.cncounter.cncounter.mvc.controller.tools;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;
import com.cncounter.util.net.IPUtils;
import com.cncounter.util.string.StringNumberUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RestController
public class Ip2CityController extends ControllerBase {
    public static final String KEY_CALLBACK = "callback";


    @RequestMapping({"/tools/api/ip.json"})
	@ResponseBody
	public JSONMessage queryIP(HttpServletRequest request, HttpServletResponse response) {
		// 需要转换的内容
		String ip = request.getParameter("ip");
		if(StringNumberUtil.isEmpty(ip)){
			ip = IPUtils.getClientIp(request);
		}
		// 取得地址
		String address = IPUtils.parseIp2Location(ip);
		//
		JSONMessage message = JSONMessage.newMessage();
        //
		message.addMeta("ip", ip);
		message.addMeta("address", address);
        message.addMeta("tip", "本站支持 jsonp 调用;");
		message.setSuccess().setInfo("查询成功");
		//
		return message;
	}


    @RequestMapping({"/tools/api/jsonp/ip.json"})
    @ResponseBody
    public void queryIPJsonp(HttpServletRequest request, HttpServletResponse response)  throws IOException {
        //
        JSONMessage result = queryIP(request, response);

        String callback = request.getParameter(KEY_CALLBACK);
        if(StringNumberUtil.isEmpty(callback)){
            result.addMeta("error", "请传入 callback 参数");
        }
        // 此处。可以调用 fastJSON 的其他方法,比如 debug 时将值为null的key输出
        String jsonStr = JSON.toJSONString(result, SerializerFeature.PrettyFormat, SerializerFeature.DisableCircularReferenceDetect);
        //
        if(StringNumberUtil.isEmpty(callback)){
            response.setContentType("text/html;charset=UTF-8");
        } else {
            jsonStr =  callback + "(" + jsonStr + ")";
            response.setContentType("application/javascript;charset=UTF-8");
        }
        // 设置禁止缓存
        response.setHeader("Cache-Control","no-cache");
        response.setHeader("Pragma","no-cache");
        response.setDateHeader("expires", -1);
        //
        response.setCharacterEncoding(UTF_8);
        //
        PrintWriter writer = response.getWriter();
        writer.print(jsonStr);
        writer.flush();
    }

}
