package com.tensquare.gathering.service.impl;

import com.tensquare.gathering.pojo.Article;
import com.tensquare.gathering.dao.ArticleDao;
import com.tensquare.gathering.service.ArticleService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 文章 服务实现类
 * </p>
 *
 * @author Xxm
 * @since 2019-02-14
 */
@Service
@Transactional
public class ArticleServiceImpl extends ServiceImpl<ArticleDao, Article> implements ArticleService {
    @Autowired
    private ArticleDao articleDao;

    @Override
    public void updateState(String articleId) {
        articleDao.updateState(articleId);
    }

    @Override
    public void addThumbup(String articleId) {
        articleDao.addThumbup(articleId);
    }
}
