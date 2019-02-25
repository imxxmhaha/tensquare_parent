package com.tensquare.base.controller;


import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.toolkit.IdWorker;
import com.tensquare.base.pojo.Label;
import com.tensquare.base.service.LabelService;
import com.tensquare.entity.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 * 标签 前端控制器
 * </p>
 *
 * @author Xxm
 * @since 2019-01-19
 */
@RestController
@RequestMapping("/label")
public class LabelController {
    @Autowired
    private LabelService labelService;

    @Autowired
    private IdWorker idWorker;

    @GetMapping
    public Result findAll() {
        List<Label> labelList = labelService.selectList(null);
        return Result.ok(labelList);
    }

    @GetMapping("/{labelId}")
    public Result findById(@PathVariable("labelId") String labelId) {
        Label label = labelService.selectById(labelId);
        return Result.ok(label);
    }

    @PostMapping
    public Result save(@RequestBody Label label) {
        long id = idWorker.getId();
        label.setId(id);
        boolean insert = labelService.insert(label);
        return Result.ok("新增成功");
    }


    @PutMapping("/{labelId}")
    public Result update(@PathVariable("labelId") Long labelId, @RequestBody Label label) {
        boolean b = labelService.updateById(label);
        return Result.ok("修改成功");

    }


    @DeleteMapping("/{labelId}")
    public Result deleteById(@PathVariable("labelId") Long labelId) {
        boolean b = labelService.deleteById(labelId);
        return Result.ok("删除成功");
    }

    @PostMapping("/search")
    public Result findSearch(@RequestBody Label label){
        Wrapper ew = new EntityWrapper<Label>();
        ((EntityWrapper) ew).setEntity(label);
        List list = labelService.selectList(ew);
        return Result.ok(list);
    }


    @PostMapping("/search/{page}/{size}")
    public Result pageQuery(@PathVariable("page") Integer page,@PathVariable("size") Integer size, @RequestBody Label label){
        Page<Label> labelPage = labelService.selectByPage(new Page<Label>(page,size),label);
        return Result.ok(labelPage);
    }

}

