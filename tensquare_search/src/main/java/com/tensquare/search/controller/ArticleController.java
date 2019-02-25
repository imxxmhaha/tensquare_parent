package com.tensquare.search.controller;

import com.tensquare.entity.PageResult;
import com.tensquare.entity.Result;
import com.tensquare.search.pojo.Article;
import com.tensquare.search.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

/**
 * @author xxm
 * @create 2019-02-23 10:21
 */
@RestController
@RequestMapping("/article")
@CrossOrigin
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @PostMapping
    public Result save(@RequestBody Article article){
        articleService.save(article);
        return  Result.ok("添加成功");
    }

    @GetMapping("/{keyword}/{page}/{size}")
    public Result findByKey(@PathVariable String keyword,@PathVariable int page,@PathVariable int size){
        Page<Article> pageData = articleService.findByKey(keyword,page,size);
        return Result.ok(new PageResult<Article>(pageData.getTotalElements(),pageData.getContent()),"查询成功");
    }

}
