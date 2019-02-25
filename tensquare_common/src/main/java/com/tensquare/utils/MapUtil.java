package com.tensquare.utils;

import java.util.Map;


/**
 * 
 * @Description: 操作Map的Util类
 * @author zhao.jingang  
 * @date 2016-5-9 上午10:24:29 
 * @version V1.0
 */
public class MapUtil {

	/**
	 *  获取map里字符串值
	 * @param m
	 * @param name
	 * @return
	 */
	public static String getStrValue(Map m, String name) {
		if (m == null) {
			return "";
		}
		Object t = m.get(name);
		if (t == null){
			return "";
		}
		return ((String) m.get(name).toString()).trim();
	}
}
