package com.tensquare.gathering.service;

import com.tensquare.gathering.pojo.Article;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 文章 服务类
 * </p>
 *
 * @author Xxm
 * @since 2019-02-14
 */
public interface ArticleService extends IService<Article> {

    void updateState(String articleId);

    void addThumbup(String articleId);
}
