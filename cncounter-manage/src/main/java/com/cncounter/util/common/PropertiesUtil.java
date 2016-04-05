package com.cncounter.util.common;

import java.util.*;


/**
 * 本类只负责Properties文件, 如果需要获取数据库属性，请使用另外的类.
 * <br/>
 * 不涉及多语言
 */
public abstract class PropertiesUtil {
	
	
	/**
	 * 属性缓存
	 */
	public static final Map<String, Map<String, String>> propertiesCache = new HashMap<String, Map<String,String>>();
	
	
	/**
	 * 获取配置的属性值
	 * @param key
	 * @return
	 */
	public static final String get(String key){
		// 遍历 propertiesCache
		
		//
		return "";
	}
	
	/**
	 * 初始化加载属性文件
	 * @param baseName
	 * @return
	 */
	public static boolean initLoadProp(String baseName){
		// 调用另一个，默认不重新加载
		return initLoadProp(baseName, false);
	}
	/**
	 * 强制初始化
	 * @param baseName
	 * @param reload 是否强制重新加载
	 * @return
	 */
	public static boolean initLoadProp(String baseName, boolean reload){
		//
		boolean result = false;
		baseName = trimBaseName(baseName);
		//
		Map<String, String> map = propertiesCache.get(baseName);
		if(reload || null == map || map.isEmpty()){
			map = parseProp(baseName);
			if(null != map){
				result = true;
				// 设置到 propertiesCache 中
				propertiesCache.put(baseName, map);
			}
		} else {
			//不执行操作
		}
		return result;
	}
	
	
	
	/**
	 * 解析属性文件
	 * @param baseName
	 * @return
	 */
	public static Map<String, String> parseProp(String baseName){
		//
		Map<String, String> map = new HashMap<String, String>();
		if(null == baseName || baseName.trim().isEmpty()){
			return map;
		} else {
			baseName = trimBaseName(baseName);
		}
		//
		ResourceBundle bundle = ResourceBundle.getBundle(baseName);
		if(null == bundle){
			return map;
		}
		//
		Set<String> keySet = bundle.keySet();
		if(null == keySet || keySet.isEmpty()){
			return map;
		}
		//
		Iterator<String> iteratorK = keySet.iterator();
		while (iteratorK.hasNext()) {
			String key = (String) iteratorK.next();
			String value = bundle.getString(key);
			//
			if(null != key){
				key = key.trim();
			}
			if(null != value){
				value = value.trim();
			} else {
				value = "";
			}
			//
			map.put(key, value);
		}
		//
		return map;
	}
	
	// 处理 baseName 
	private static String trimBaseName(String baseName){
		if(null == baseName || baseName.trim().isEmpty()){
			return "";
		}
		//
		String suffix = ".properties";
		if(baseName.endsWith(suffix)){
			baseName = baseName.replace(suffix, ""); // 去掉后缀
		}
		return baseName;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	public static void main(String[] args) {
		//
	}

}
