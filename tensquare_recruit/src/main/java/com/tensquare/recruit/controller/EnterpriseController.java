package com.tensquare.recruit.controller;


import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.tensquare.entity.Result;
import com.tensquare.recruit.service.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 * 企业 前端控制器
 * </p>
 *
 * @author Xxm
 * @since 2019-01-19
 */
@RestController
@RequestMapping("/enterprise")
public class EnterpriseController {

    @Autowired
    private EnterpriseService enterpriseService;
    @GetMapping("/search/hotlist")
    public Result hotList(){
        EntityWrapper ew = new EntityWrapper();
        ew.eq("ishot","1");
        List list = enterpriseService.selectList(ew);
        return Result.ok(list);
    }


}

