package com.cncounter.cncounter.config;

import java.util.Map;

public class WebSiteConfig {

	public static boolean DEBUG_MODE = false;

	/**
	 * 原始请求URI
	 */
	public static String KEY_ORIG_REQUEST_URI = "_ORIG_REQUEST_URI";
	public static String KEY_ORIG_REQUEST_URL = "_ORIG_REQUEST_URL";
	//
	public static void init(Map<String, String> initOptions){
		if(null == initOptions || initOptions.isEmpty()){
			return;
		}
		// 调试模式
		String debugmodeStr = initOptions.get("debugmode");
		if(null != (debugmodeStr) ){
			boolean debugmode =  Boolean.parseBoolean(debugmodeStr);
			DEBUG_MODE = debugmode;
		}
	}
	/**
	 * 启用DEBUG_MODE
	 */
	public static void ennableDebugMode(){
		DEBUG_MODE = true;
	}
	public static void disableDebugMode(){
		DEBUG_MODE = false;
	}
	public static boolean isDEBUG_MODE() {
		return DEBUG_MODE;
	}
}
