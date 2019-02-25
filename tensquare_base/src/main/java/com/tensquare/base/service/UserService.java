package com.tensquare.base.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.tensquare.base.pojo.User;
import com.baomidou.mybatisplus.service.IService;
import com.tensquare.Dto.UserDto;

/**
 * <p>
 * 用户 服务类
 * </p>
 *
 * @author Xxm123
 * @since 2019-01-18
 */
public interface UserService extends IService<User> {


    Page<UserDto> selectUserByPage(Page<UserDto> userPage);
}
