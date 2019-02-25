package com.tensquare.user.controller;


import com.tensquare.entity.Result;
import com.tensquare.user.pojo.User;
import com.tensquare.user.service.UserService;
import com.tensquare.utils.RedisKeyUtils;
import org.omg.CORBA.PRIVATE_MEMBER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import org.springframework.stereotype.Controller;

/**
 * <p>
 * 用户 前端控制器
 * </p>
 *
 * @author Xxm
 * @since 2019-02-24
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * 发送短信验证码
     */
    @PostMapping("/sendsms/{mobile}")
    public Result sendSms(@PathVariable String mobile) {
        userService.sendSms(mobile);
        return Result.ok("发送成功");
    }

    /**
     * 用户注册
     *
     * @param code
     * @return
     */
    @PostMapping("/register/{code}")
    public Result register(@PathVariable String code, @RequestBody User user) {
        //userService.register(code);
        String checkCode = (String) redisTemplate.opsForValue().get(RedisKeyUtils.getUserRegisterPhoneCheckCode(user.getMobile()));
        if(StringUtils.isEmpty(checkCode)){
            return Result.error("请先获取验证码");
        }

        if(!checkCode.equals(code)){
            return Result.error("请输入正确的验证码");
        }

        userService.add(user);
        return Result.ok("注册成功");
    }
}

