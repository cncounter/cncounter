package com.cncounter.util.string;

import java.util.UUID;

/**
 * 字符串与数字工具类
 */
public class StringNumberUtil {

	/**
	 * 解析long, 不报错
	 * @param str
	 * @param defValue
	 * @return
	 */
	public static long parseLong(String str, long defValue){
		long result = defValue;
		try{
			if(isLong(str)){
				str = str.replaceAll("^\\+", "");
				result = Long.parseLong(str);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 解析 int,
	 * @param str
	 * @param defValue
	 * @return
	 */
	public static int parseInt(String str, int defValue){
		int result = defValue;

		try{
			if(isLong(str)){
				str = str.replaceAll("^\\+", "");
				result = Integer.parseInt(str);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	public static short parseShort(String str, int defValue){
		int result_int = parseInt(str, defValue);
		short result = 0;
		if(result_int < 9999 && result_int >= -9999){
			result = (short)result_int;
		} else {
			result = (short)defValue;
		}

		return result;
	}
	/**
	 * 是正负整数
	 * @param str
	 * @return
	 */
	public static boolean isLong(String str){
		boolean result = false;
		try{
			if(null != str && str.matches("^[\\+\\-]?\\d+$")){
				result = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 不为empty(空)
	 * @param str
	 * @return
	 */
	public static boolean notEmpty(Object str){
		boolean result = false;
		try{
			if(null != str && str.toString().trim().length() > 0){
				result = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	 * 为empty(空)
	 * @param str
	 * @return
	 */
	public static boolean isEmpty(Object str){
		boolean result = false;
		try{
			if(null == str || str.toString().trim().length() <= 0){
				result = true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	
	
	public static String num2CNnum(Integer num){
		String chaNum = "";
		switch(num){
			case 0: chaNum = "〇";break;
			case 1: chaNum = "一";break;
			case 2: chaNum = "二";break;
			case 3: chaNum = "三";break;
			case 4: chaNum = "四";break;
			case 5: chaNum = "五";break;
			case 6: chaNum = "六";break;
			case 7: chaNum = "七";break;
			case 8: chaNum = "八";break;
			case 9: chaNum = "九";break;
		}
		return chaNum;
	}
	
	public static String numStr2CNnum(String  numStr){
		
		String result = "";
		if(StringNumberUtil.notEmpty(numStr)){
			for(int i=0;i<numStr.length();i++){
				char ch = numStr.charAt(i); 
				result += num2CNnum(Integer.parseInt(String.valueOf(ch)));
			}
		}
		return result;
	}
	
	public static String getUUID(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
}
