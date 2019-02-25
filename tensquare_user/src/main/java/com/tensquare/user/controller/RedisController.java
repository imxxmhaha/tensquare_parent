package com.tensquare.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xxm
 * @create 2019-02-24 15:49
 */
@RestController
public class RedisController {

    @Autowired
    private RedisTemplate redisTemplate;

    @GetMapping("/set")
    public String set(){
        redisTemplate.opsForValue().set("姚明","2米26");
        return "设置成功";
    }
}
