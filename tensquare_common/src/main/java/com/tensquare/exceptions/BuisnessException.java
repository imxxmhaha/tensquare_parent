package com.tensquare.exceptions;


import org.springframework.util.StringUtils;

public class BuisnessException extends RuntimeException {
    private static final long serialVersionUID = 4061732202885069884L;
    /**
     * 异常码
     */
    private Integer code;
    /**
     * 异常描述
     */
    private String msg;


	public Integer getCode() {
		return code;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public BuisnessException(Integer code, String msg) {
        super(msg);
        this.code = code;
        this.msg = msg;
    }
	
	public BuisnessException(ExceptionCodeEum aaa) {
		super(aaa.getMsg());
		this.code=aaa.getCode();
		this.msg=aaa.getMsg();
	}
	
	
	public BuisnessException(ExceptionCodeEum aaa, Throwable e) {
		super(aaa.getMsg(),e);
		this.code=aaa.getCode();
		this.msg=aaa.getMsg();
	}
	
	
    
    public BuisnessException(String msg) {
        super(msg);
        if(!StringUtils.isEmpty(msg) && msg.contains("_")) {
        	this.code =Integer.parseInt(msg.split("_")[0]);
        	this.msg = msg.split("_")[1];
        }else {
        	// 业务异常
            this.code = ExceptionCodeEum.BUISNESS_EXCEPTION.getCode();
            this.msg = msg;
        }
    }
 
    @Override
    public Throwable fillInStackTrace() {
        return this;
    }
}
