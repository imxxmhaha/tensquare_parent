package com.tensquare.spring.aop;

import java.lang.annotation.*;

/**
 * @author xxm
 * @version 1.0
 * @Description: 字段注解
 * @date 2019年1月16日  上午11:34:57
 */
@Target({ElementType.FIELD,ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface FieldErrorMsg {

    public String msg() default "参数不能为空";
}
