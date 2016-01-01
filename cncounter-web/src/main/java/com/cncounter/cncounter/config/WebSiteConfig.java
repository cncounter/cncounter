package com.cncounter.cncounter.config;

import java.util.Map;

import com.cncounter.util.string.StringNumberUtil;

public class WebSiteConfig {

	public static boolean DEBUG_MODE = false;
	
	//
	public static void init(Map<String, String> initOptions){
		if(null == initOptions || initOptions.isEmpty()){
			return;
		}
		// 调试模式
		String debugmodeStr = initOptions.get("debugmode");
		if(StringNumberUtil.notEmpty(debugmodeStr)){
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
