package com.tensquare.exceptions;

public enum ExceptionCodeEum {
	/**
	 * 枚举
	 */
	SYSTEM_EXCEPTION(00001,"系统繁忙，请稍后再试"),
	BUISNESS_EXCEPTION(00002,"业务异常"),
	;
	
	private Integer code;
	private String msg;
	
	public Integer getCode() {
		return code;
	}

	public String getMsg() {
		return msg;
	}

	private ExceptionCodeEum(Integer code, String msg) {
		this.code = code;
		this.msg = msg;
	}

}
