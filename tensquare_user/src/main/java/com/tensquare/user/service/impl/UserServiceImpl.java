package com.tensquare.user.service.impl;

import com.tensquare.user.pojo.User;
import com.tensquare.user.dao.UserDao;
import com.tensquare.user.service.UserService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.tensquare.utils.IdWorker;
import com.tensquare.utils.RedisKeyUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * <p>
 * 用户 服务实现类
 * </p>
 *
 * @author Xxm
 * @since 2019-02-24
 */
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserDao, User> implements UserService {
    @Autowired
    private RedisTemplate redisTemplate;

    @Autowired
    private RabbitTemplate rabbitTemplate;


    @Autowired
    private UserDao userDao;

    @Autowired
    private IdWorker idWorker;
    @Override
    public void sendSms(String mobile) {
        //生成6位数字随机数 apache-lang3 工具类生成随机6位数字
        String checkCode = RandomStringUtils.randomNumeric(6);

        //缓存中存一份
        String redisKey = RedisKeyUtils.getUserRegisterPhoneCheckCode(mobile);
        redisTemplate.opsForValue().set(redisKey,checkCode,6,TimeUnit.HOURS);
        log.info("给用户手机:【{}】发送的验证码是【{}】",mobile,checkCode);
        //给用户发一份   发送到消息队列RabbitMQ
        Map map = new HashMap<>();
        map.put("mobile",mobile);
        map.put("checkCode",checkCode);
        rabbitTemplate.convertAndSend("sms",map);
    }


    @Override
    public void add(User user) {
        user.setId(idWorker.nextId()+"");
        user.setFollowcount(0);//关注数
        user.setFanscount(0);//粉丝数
        user.setRegdate(new Date());//注册日期
        user.setUpdatedate(new Date());//更新日期
        user.setLastdate(new Date());//最后登录日期
        userDao.insert(user);
        // 删除redis中的key
        redisTemplate.delete(RedisKeyUtils.getUserRegisterPhoneCheckCode(user.getMobile()));
        // 向RabbitMQ 中发送提醒用户注册成功的消息
        Map map = new HashMap<>();
        map.put("mobile",user.getMobile());
        map.put("nickname",user.getNickname());
        rabbitTemplate.convertAndSend("xxm",map);
    }
}
