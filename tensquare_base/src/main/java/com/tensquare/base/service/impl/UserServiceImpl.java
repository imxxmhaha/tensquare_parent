package com.tensquare.base.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.tensquare.base.pojo.User;
import com.tensquare.base.dao.UserDao;
import com.tensquare.base.service.UserService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.tensquare.Dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 用户 服务实现类
 * </p>
 *
 * @author Xxm123
 * @since 2019-01-18
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserDao, User> implements UserService {

    @Autowired
    private UserDao userDao;



    @Override
    public Page<UserDto> selectUserByPage(Page<UserDto> userPage) {
        List<UserDto> userList =  userDao.selectUserByPage(userPage);
        userPage.setRecords(userList);
        return userPage;
    }
}
