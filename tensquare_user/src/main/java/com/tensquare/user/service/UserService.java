package com.tensquare.user.service;

import com.tensquare.user.pojo.User;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 用户 服务类
 * </p>
 *
 * @author Xxm
 * @since 2019-02-24
 */
public interface UserService extends IService<User> {

    void sendSms(String mobile);

    void add(User user);
}
