package com.tensquare.user.controller;


import com.baomidou.mybatisplus.plugins.Page;
import com.tensquare.entity.Result;
import com.tensquare.user.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 问题 前端控制器
 * </p>
 *
 * @author Xxm
 * @since 2019-01-21
 */
@RestController
@RequestMapping("/problem")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @GetMapping("/newList/{labelId}/{pageNo}/{pageSize}")
    public Result newList(@PathVariable String labelId,@PathVariable int pageNo,@PathVariable int pageSize){
        Page page = problemService.selectNewPage(labelId, new Page<>(pageNo, pageSize));
        return Result.ok(page);
    }

    @GetMapping("/hotList/{labelId}/{pageNo}/{pageSize}")
    public Result hotList(@PathVariable String labelId,@PathVariable int pageNo,@PathVariable int pageSize){
        Page page = problemService.selectHotPage(labelId, new Page<>(pageNo, pageSize));
        return Result.ok(page);
    }

    @GetMapping("/waitList/{labelId}/{pageNo}/{pageSize}")
    public Result waitList(@PathVariable String labelId,@PathVariable int pageNo,@PathVariable int pageSize){
        Page page = problemService.selectWaitPage(labelId, new Page<>(pageNo, pageSize));
        return Result.ok(page);
    }
}

