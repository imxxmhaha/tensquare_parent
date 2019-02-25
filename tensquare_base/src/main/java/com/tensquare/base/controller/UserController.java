package com.tensquare.base.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.tensquare.base.pojo.User;
import com.tensquare.base.service.UserService;
import com.tensquare.Dto.UserDto;
import com.tensquare.entity.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 * 用户 前端控制器
 * </p>
 *
 * @author Xxm123
 * @since 2019-01-18
 */
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;




    @GetMapping("/findOne/{id}")
    public Result findOne(@PathVariable("id")String id){
        User user = userService.selectById(id);
        return Result.ok(user);
    }


    @GetMapping("/getAll")
    public Result getAll(){
        List<User> userList = userService.selectList(null);
        return Result.ok(userList);
    }

    @GetMapping("/page")
    public Result getPage(){
        Page<UserDto> userPage = userService.selectUserByPage(new Page<UserDto>(2, 5));
        return Result.ok(userPage);
    }

}

