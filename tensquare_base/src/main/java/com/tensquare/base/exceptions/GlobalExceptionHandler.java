package com.tensquare.base.exceptions;


import com.tensquare.entity.Result;
import com.tensquare.exceptions.BuisnessException;
import com.tensquare.exceptions.ExceptionCodeEum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;


@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {


    @ExceptionHandler
    @ResponseBody
    public Object handleException(Exception e, HttpServletRequest req) {
        Result returnMsg = new Result();
        // 业务异常
        if (e instanceof BuisnessException) {
            returnMsg.setCode(((BuisnessException) e).getCode());
            returnMsg.setMessage(((BuisnessException) e).getMsg());
        } else {// 系统异常
            returnMsg.setCode(ExceptionCodeEum.SYSTEM_EXCEPTION.getCode());
            returnMsg.setMessage(ExceptionCodeEum.SYSTEM_EXCEPTION.getMsg());
        }

        // 判断响应类型
        String contentTypeHeader = req.getHeader("Content-Type");
        String acceptHeader = req.getHeader("Accept");
        String xRequestedWith = req.getHeader("X-Requested-With");
        if ((contentTypeHeader != null && contentTypeHeader.contains("application/json"))
                || (acceptHeader != null && acceptHeader.contains("application/json"))
                || "XMLHttpRequest".equalsIgnoreCase(xRequestedWith)) {
            log.error("====GlobalExceptionHandler.handleException===ajax异常====msg:" + e.getMessage());
            log.error("====GlobalExceptionHandler.handleException===ajax异常====url:" + req.getRequestURL());
            return returnMsg;
        } else {
            log.error("====GlobalExceptionHandler.handleException=======msg:" + e.getMessage());
            log.error("====GlobalExceptionHandler.handleException=======url:" + req.getRequestURL());
            // 对于系统异常直接抛出404错误页面
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.addObject("msg", e.getMessage());
            modelAndView.addObject("url", req.getRequestURL());
            modelAndView.addObject("stackTrace", e.getStackTrace());
            String serverPath = req.getScheme()+"://"+req.getServerName()+":"+req.getServerPort();
            String view = "redirect:" + serverPath+"/common/businessError.html";
            modelAndView.setViewName(view);
            return modelAndView;
        }


    }
}