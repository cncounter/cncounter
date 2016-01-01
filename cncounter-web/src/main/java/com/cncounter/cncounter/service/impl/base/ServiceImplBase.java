package com.cncounter.cncounter.service.impl.base;

import com.cncounter.util.log.LogUtil;

/**
 * 服务实现类基础抽象
 */
public abstract class ServiceImplBase {
	
	protected static boolean DEBUG_MODE = true;
	
	/**
	 * 常规日志
	 * @param msg
	 */
	protected void log(String msg) {
		LogUtil.log(msg);
	}

	protected void debug(String msg) {
		if(DEBUG_MODE){
			LogUtil.debug(msg);
		}
	}

	protected boolean isEmail(String str){
		if(null == str || str.trim().isEmpty()){
			return false;
		}
		//
		return str.matches("\\w+@\\w+\\.\\w+");
	}
	protected boolean isEmpty(String str){
		if(null == str || str.trim().isEmpty()){
			return true;
		}
		//
		return false;
	}
	protected boolean notEmpty(String str){
		if(null != str && !str.trim().isEmpty()){
			return true;
		} 
		//
		return false;
	}
}
