package com.tensquare.utils;

/**
 * @author xxm
 * @create 2019-02-24 16:09
 */
public class RedisKeyUtils {
    /**
     * user注册短信验证码
     */
    public static String getUserRegisterPhoneCheckCode(String phone) {
        return "checkCode:register:phone" + phone ;
    }
}
