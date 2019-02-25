package com.tensquare.user.controller;


import com.tensquare.entity.Result;
import com.tensquare.user.pojo.Admin;
import com.tensquare.user.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 * 管理员 前端控制器
 * </p>
 *
 * @author Xxm
 * @since 2019-02-24
 */
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/findAll")
    public Result findAll() {
        List<Admin> adminList = adminService.selectList(null);
        return Result.ok(adminList,"查询成功");
    }
}

