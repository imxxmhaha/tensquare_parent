package com.tensquare.recruit.controller;


import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tensquare.entity.Result;
import com.tensquare.recruit.service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 * 职位 前端控制器
 * </p>
 *
 * @author Xxm
 * @since 2019-01-19
 */
@RestController
@RequestMapping("/recruit")
public class RecruitController {

    @Autowired
    private RecruitService recruitService;

    @GetMapping("/search/recommend")
    public Result recommend(){
        EntityWrapper ew = new EntityWrapper();
        ew.eq("state","2");
        List list = recruitService.selectList(ew);
        return Result.ok(list);
    }


    @GetMapping("/search/newlist")
    public Result newList(){
        EntityWrapper ew = new EntityWrapper();
        ew.ne("state","0");
        List list = recruitService.selectList(ew);
        return Result.ok(list);
    }
}

