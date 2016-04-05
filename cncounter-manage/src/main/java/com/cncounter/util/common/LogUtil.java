package com.cncounter.util.common;

import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * 日志工具类
 */
public class LogUtil{
	
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    

	public static boolean DEBUG_MODE = true;

	public static int LOG_LEVEL_VERBOSE = 7;
	public static int LOG_LEVEL_DEBUG = 6;
	public static int LOG_LEVEL_INFO = 5;
	public static int LOG_LEVEL_WARN = 4;
	public static int LOG_LEVEL_ERROR = 3;
	public static int LOG_LEVEL_FATAL = 2;
	
	// 
	public static int LOG_LEVEL = LOG_LEVEL_DEBUG;
	
	/**
	 * 常规日志
	 * @param msg
	 */
	public static void log(String msg) {
		log(msg, LOG_LEVEL_INFO);
	}

	public static void debug(String msg) {
		if (DEBUG_MODE) {
			log(msg, LOG_LEVEL_DEBUG);
		}
	}

	private static void log(String msg, int loglevel) {
		//
		if(loglevel < LOG_LEVEL){
			//
			String methodName = prevPrevMethodName();
			//
			String prefix = currentTime() + ":\t";
			if (loglevel <= LOG_LEVEL_ERROR) {
				prefix = prefix + methodName + ":\n";
			}
			msg = prefix + msg;
			//
			println(msg);
		}
	}
    /**
     * 打印行
     * @param info
     */
    public static final void println(Object info){
    	System.out.println(info);
    }
    /**
     * 返回当前时间
     * @return 格式: "yyyy-MM-dd HH:mm:ss"
     */
    public static final String currentTime(){
    	//
    	return DATE_FORMAT.format(new Date());
    }
	/**
	 * 打印调用此方法的方法的名称
	 * @return className.methodName
	 */
    public static final String currentMethodName(){
    	//
    	Thread thread = Thread.currentThread();

    	StackTraceElement[] stackTrace = thread.getStackTrace();
    	String className = parseClassName(stackTrace, false);
    	String methodName = parseMethodName(stackTrace, false);
    	//
    	String info = className + "." +methodName;
    	//
    	return info;
    }
    public static final String currentClassName(){
    	//
    	Thread thread = Thread.currentThread();
    	StackTraceElement[] stackTrace = thread.getStackTrace();
    	String className = parseClassName(stackTrace, false);
    	//
    	return className;
    }
    private static final String prevPrevMethodName(){
    	//
    	Thread thread = Thread.currentThread();

    	StackTraceElement[] stackTrace = thread.getStackTrace();
    	String className = parseClassName(stackTrace, true);
    	String methodName = parseMethodName(stackTrace, true);
    	//
    	String info = className + "." +methodName;
    	//
    	return info;
    }
    //
    private static final String parseClassName(StackTraceElement[] stackTrace, boolean isPrevPrev){
    	return parseStackTraceElement(stackTrace, isPrevPrev? 4 : 2, 0);
    }
    //
    private static final String parseMethodName(StackTraceElement[] stackTrace, boolean isPrevPrev){
    	return parseStackTraceElement(stackTrace, isPrevPrev? 4 : 2, 1);
    }
    //
    private static final String parseStackTraceElement(StackTraceElement[] stackTrace, int deep, int type){
    	//
    	if(null == stackTrace || stackTrace.length < deep+1){
    		return "";
    	}
    	//
    	StackTraceElement element = stackTrace[deep];
    	if(null == element){
    		return "";
    	}
    	//
    	if(0 == type){
    		return element.getClassName();
    	} else if(1 == type){
    		return element.getMethodName();
    	} else{
        	//
    		return "";
    	}
    }
}
