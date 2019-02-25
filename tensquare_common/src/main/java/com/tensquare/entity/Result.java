package com.tensquare.entity;

import com.tensquare.utils.StateCode;
import lombok.Data;

import java.io.Serializable;

/**
 * @author xxm
 * @create 2019-01-18 22:09
 */
@Data
public class Result<T> implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer code = StateCode.OK;
    private Boolean flag;
    private String message;
    private T data;




    public static <T> Result ok(T data,String message) {
        Result<T> returnMessage = new Result<>();
        returnMessage.setMessage(message);
        returnMessage.setData(data);
        returnMessage.setFlag(true);
        return returnMessage;
    }

    public static <T> Result ok(T data) {
        Result<T> returnMessage = new Result<>();
        returnMessage.setMessage("success");
        returnMessage.setData(data);
        returnMessage.setFlag(true);
        return returnMessage;
    }

    public static <T> Result ok() {
        Result<T> returnMessage = new Result<>();
        returnMessage.setMessage("success");
        returnMessage.setFlag(true);
        return returnMessage;
    }

    public static <T> Result error(T data,String message) {
        Result<T> returnMessage = new Result<>();
        returnMessage.setMessage(message);
        returnMessage.setData(data);
        returnMessage.setFlag(false);
        return returnMessage;
    }

    public static <T> Result error(T data) {
        Result<T> returnMessage = new Result<>();
        returnMessage.setData(data);
        returnMessage.setMessage("error");
        returnMessage.setFlag(false);
        return returnMessage;
    }

    public static <T> Result error(String msg) {
        Result<T> returnMessage = new Result<>();
        returnMessage.setMessage(msg);
        returnMessage.setFlag(false);
        return returnMessage;
    }

    public static <T> Result error() {
        Result<T> returnMessage = new Result<>();
        returnMessage.setMessage("error");
        returnMessage.setFlag(false);
        return returnMessage;
    }


}
