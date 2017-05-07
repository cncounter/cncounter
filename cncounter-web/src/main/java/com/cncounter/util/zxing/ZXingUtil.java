package com.cncounter.util.zxing;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Vector;

import javax.imageio.ImageIO;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.DecodeHintType;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.Result;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

/**
 * 二维码图片包装工具<br/>
 * ZXing 3.1.0.jar 默认编译级别为JDK7,所以,JDK6的就只有自己编译源码咯。
 */
public class ZXingUtil {

	/**
	 * 生成二维码, 默认width = 400;height = 400;
	 * 
	 * @param content
	 *            需要生成的字符串内容
	 * @param output
	 *            输出流, 本方法不负责关闭输出流
	 */
	public static boolean generateQrCode(String content, OutputStream output) {
		//
		int width = 400;
		int height = 400;
		//
		return generateQrCode(content, output, width, height);
	}

	/**
	 * 
	 * 生成二维码
	 * 
	 * @param content
	 *            需要生成的字符串内容
	 * @param output
	 *            输出流, 本方法不负责关闭输出流
	 * @param width
	 *            宽
	 * @param height
	 *            高
	 * @return
	 */
	public static boolean generateQrCode(String content, OutputStream output,
			int width, int height) {
		// 防御编程
		if (null == content || null == output) {
			return false;
		}
		if (width < 10) {
			width = 400;
		}
		if (height < 10) {
			height = 400;
		}
		// 调用另一个方法
		BufferedImage image = generateQrCode(content, width, height);

		try {
			ImageIO.write(image, "jpeg", output);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		//
		return true;
	}

	/**
	 * 生成二维码图片
	 * 
	 * @param content
	 *            二维码内容,字符串
	 * @param width
	 *            宽
	 * @param height
	 *            高
	 * @return
	 */
	public static BufferedImage generateQrCode(String content, int width,
			int height) {
		// 防御编程
		if (null == content) {
			content = "";
		}
		BufferedImage image = null;

		// 配置项...
		Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
		// 字符编码
		hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
		// 高容错率
		hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.H);
		// 白边大小
		Integer quietZoneInt = 0;
		hints.put(EncodeHintType.MARGIN, quietZoneInt);
		BitMatrix matrix = null;
		try {
			//
			MultiFormatWriter multiFormatWriter = new MultiFormatWriter();
			matrix = multiFormatWriter.encode(content, BarcodeFormat.QR_CODE,
					width, height, hints);
			image = MatrixToImageWriter.toBufferedImage(matrix);
		} catch (WriterException e) {
			e.printStackTrace();
		}
		//
		return image;
	}

	/**
	 * 解析二维码图片
	 * @param file 图片文件
	 * @return 二维码内容Text
	 */
	public static String parseQrCode(File file) {
		//
		String code = "";
		// 防御编程
		if (null == file || !file.exists() || !file.isFile()) {
			return code;
		}

		try {
			// 解析文件
			BufferedImage image = ImageIO.read(file);
			// 
			code = parseQrCode(image);
		} catch (Exception e) {
			e.printStackTrace();
		}
		//
		return code;
	}
	

	/**
	 * 解析二维码图片.
	 * @param image 缓冲图片
	 * @return 二维码内容Text
	 */
	public static String parseQrCode(BufferedImage image ) {
		//
		String code = "";
		// 防御编程
		if (null == image || image.getHeight() < 10 || image.getWidth() < 10) {
			return code;
		}
		//
		MultiFormatReader multiFormatReader = new MultiFormatReader();
		//
		// 解码的参数
		Hashtable<DecodeHintType, Object> hints = new Hashtable<DecodeHintType, Object>(
				2);
		// 可以解析的编码类型
		Vector<BarcodeFormat> decodeFormats = new Vector<BarcodeFormat>();
		if (decodeFormats == null || decodeFormats.isEmpty()) {
			decodeFormats = new Vector<BarcodeFormat>();

			// 这里设置可扫描的类型，我这里选择了都支持
			decodeFormats.add(BarcodeFormat.CODABAR);
			decodeFormats.add(BarcodeFormat.QR_CODE);
			decodeFormats.add(BarcodeFormat.DATA_MATRIX);
		}
		hints.put(DecodeHintType.POSSIBLE_FORMATS, decodeFormats);

		// 设置继续的字符编码格式为UTF8
		hints.put(DecodeHintType.CHARACTER_SET, "UTF8"); // 注意: 不是 UTF-8

		// 设置解析配置参数
		multiFormatReader.setHints(hints);

		// 解析部分：
		// 开始对图像资源解码
		Result rawResult = null;
		try {
			// 
			rawResult = multiFormatReader.decodeWithState(
							new BinaryBitmap(
									new HybridBinarizer(
											new BufferedImageLuminanceSource(image)
									)
							)
						);
			//
			code = rawResult.getText();
		} catch (Exception e) {
			e.printStackTrace();
		}
		//
		return code;
	}
	
	//
	public static void main(String[] args) {
		String filePath = "D:/2bdaad640e.jpeg";
		String code = parseQrCode(new File(filePath));
		//
		System.out.println(code);
	}
}
