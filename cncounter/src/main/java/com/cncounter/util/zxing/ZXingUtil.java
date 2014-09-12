package com.cncounter.util.zxing;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

/**
 * 二维码图片包装工具<br/>
 * ZXing 3.1.0.jar 默认编译级别为JDK7,所以,JDK6的就只有自己编译源码咯。
 */
public class ZXingUtil {
	
	/**
	 * 生成二维码, 默认width = 400;height = 400;
	 * @param content 需要生成的字符串内容
	 * @param ostream 输出流, 本方法不负责关闭输出流
	 */
	public static boolean generateQrCode(String content, OutputStream ostream){
		// 防御编程
		if(null == content || null == ostream){
			return false;
		}
		//
		int width = 400;
		int height = 400;
		// 调用另一个方法
	    BufferedImage image =  generateQrCode(content, width, height);
	    
	    try {
			ImageIO.write(image, "jpeg", ostream);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		//
		return true;
	}
	/**
	 * 
	 * 生成二维码
	 * @param content 需要生成的字符串内容
	 * @param ostream 输出流, 本方法不负责关闭输出流
	 * @param width 宽
	 * @param height 高
	 * @return
	 */
	public static boolean generateQrCode(String content, OutputStream ostream, int width, int height){
		// 防御编程
		if(null == content || null == ostream){
			return false;
		}
		if(width < 10){
			width = 400;
		}
		if(height < 10){
			height = 400;
		}
		// 调用另一个方法
	    BufferedImage image =  generateQrCode(content, width, height);
	    
	    try {
			ImageIO.write(image, "jpeg", ostream);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		//
		return true;
	}
	/**
	 * 生成二维码图片
	 * @param content 二维码内容,字符串
	 * @param width 宽
	 * @param height 高
	 * @return
	 */
	public static BufferedImage generateQrCode(String content, int width, int height){
		// 防御编程
		if(null == content){
			content = "";
		}
		BufferedImage image = null;
		//
		MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
		 
		Map<EncodeHintType, String> hints = new HashMap<EncodeHintType, String>();
		hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
		BitMatrix matrix = null;
		try {
			matrix = multiFormatWriter.encode(content, BarcodeFormat.QR_CODE, 400, 400,hints);
			image =  MatrixToImageWriter.toBufferedImage(matrix);
		} catch (WriterException e) {
			e.printStackTrace();
		}
		//
		return image;
	}

}
