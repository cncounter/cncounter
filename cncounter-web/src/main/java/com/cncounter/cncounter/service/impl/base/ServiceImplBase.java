package com.cncounter.cncounter.service.impl.base;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 服务实现类基础抽象
 */
public abstract class ServiceImplBase {

    protected Log logger = LogFactory.getLog(this.getClass());
	
	/**
	 * 常规日志
	 * @param msg
	 */
	protected void log(String msg) {
        logger.info(msg);
	}
	protected boolean isEmpty(String str){
		if(null == str || str.trim().isEmpty()){
			return true;
		}
		//
		return false;
	}
}
