package com.cncounter.cncounter.mvc.controller.tools;

import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;
import com.cncounter.util.net.HttpClientUtils;
import com.cncounter.util.string.StringNumberUtil;
import com.cncounter.util.zxing.ZXingUtil;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Iterator;

@Controller
public class QRCodeController extends ControllerBase {

	@RequestMapping({"/qrcode/input.php"})
	public ModelAndView getPage(HttpServletRequest request, HttpServletResponse response) {
		// 输入页面
		ModelAndView mav = new ModelAndView("qrcode/input");

		return mav;
	}


    @RequestMapping({"/qrcode/upload.php"})
    public ModelAndView uploadPage(HttpServletRequest request, HttpServletResponse response) {
        // 输入页面
        ModelAndView mav = new ModelAndView("qrcode/upload");

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

	@RequestMapping(value = "/qrcode/ajax/parseimage.json")
	@ResponseBody
	public Object parseQRcodeByUpload(HttpServletRequest request, HttpServletResponse response) {
		// 需要转换的内容
		InputStream inputStream = _uploadFile(request);
		if (null == inputStream){
			return JSONMessage.failureMessage().setInfo("文件上传失败!");
		}
		//
		String qrcodeInfo = parseQrImage2String(inputStream);
		//
		JSONMessage message = JSONMessage.newMessage();
		//
		if(StringNumberUtil.notEmpty(qrcodeInfo)){
			message.setSuccess().setInfo("解析成功!");
			message.addMeta("qrcodeInfo", qrcodeInfo);
		} else {
			message.setFailure().setInfo("解析失败!");
		}
		return message;
	}


	@RequestMapping(value = "/qrcode/ajax/parseurl.json")
	@ResponseBody
	public Object parseQRcodeByUrl(HttpServletRequest request, HttpServletResponse response) {
		// 需要转换的内容
		String image_url = getParameterString(request, "image_url", "");
		//
		InputStream inputStream = HttpClientUtils.getUrlAsStream(image_url);
		if (null == inputStream){
			return JSONMessage.failureMessage().setInfo("文件URL错误!");
		}

		String qrcodeInfo = parseQrImage2String(inputStream);
		//
		JSONMessage message = JSONMessage.newMessage();
		//
		if(StringNumberUtil.notEmpty(qrcodeInfo)){
			message.setSuccess().setInfo("解析成功!");
			message.addMeta("qrcodeInfo", qrcodeInfo);
		} else {
			message.setFailure().setInfo("解析失败!");
		}
		//
		return message;
	}

	public static String parseQrImage2String(InputStream inputStream){
		if (null == inputStream){
			return null;
		}
		try {
			BufferedImage bufferedImage = ImageIO.read(inputStream);
			if(null == bufferedImage){
				return null;
			}
			String qrcodeInfo = ZXingUtil.parseQrCode(bufferedImage);
			return qrcodeInfo;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	// 内部实现
	private InputStream _uploadFile(HttpServletRequest request) {
		//解析器解析request的上下文
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
		//先判断request中是否包涵multipart类型的数据，
		if (!multipartResolver.isMultipart(request)) {
			return null;
		}
		if (!(request instanceof MultipartHttpServletRequest)) {
			return null;
		}
		//再将request中的数据转化成multipart类型的数据
		MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
		//
		boolean success = true;
		try {
			Iterator<String> iterator = multiRequest.getFileNames();
			while (iterator.hasNext()) {
				String mFileName = iterator.next();
				MultipartFile file = multiRequest.getFile(mFileName);
				if (file == null) {
					continue;
				}
				//String originalFilename = file.getOriginalFilename();
				//String fileExtension = FilenameUtils.getExtension(originalFilename).toLowerCase();
				//
				InputStream inputStream = file.getInputStream();
				return  inputStream;
				//byte[] fileBytes = file.getBytes();
				//
				//return fileBytes;
			}
		} catch (Exception e) {
			logger.error("upload error!", e);
		}
		return null;
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
