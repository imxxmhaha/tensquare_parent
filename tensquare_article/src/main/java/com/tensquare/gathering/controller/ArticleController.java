package com.tensquare.gathering.controller;


import com.tensquare.gathering.service.ArticleService;
import com.tensquare.entity.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * 文章 前端控制器
 * </p>
 *
 * @author Xxm
 * @since 2019-02-14
 */
@RestController
@RequestMapping("/article")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    /**
     * 审核文章
     * @param articleId
     * @return
     */
    @PutMapping("/examine/{articleId}")
    public Result examine(@PathVariable String articleId){
        articleService.updateState(articleId);
        return Result.ok("审核成功");
    }

    @PutMapping("/thumbup/{articleId}")
    public Result addThumbup(@PathVariable String articleId){
        articleService.addThumbup(articleId);
        return Result.ok("点赞成功");
    }

}

