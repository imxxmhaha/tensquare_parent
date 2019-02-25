package com.tensquare.search.service;

import com.tensquare.search.dao.ArticleDao;
import com.tensquare.search.pojo.Article;
import com.tensquare.utils.IdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * @author xxm
 * @create 2019-02-23 10:18
 */
@Service
public class ArticleService {
    @Autowired
    private ArticleDao articleDao;
    @Autowired
    private IdWorker idWorker;

    public void save(Article article){
        article.setId(idWorker.nextId()+"");
        articleDao.save(article);
    }

    public Page<Article> findByKey(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page-1,size);
        Page<Article> pageData = articleDao.findByTitleOrContentLike(keyword, keyword, pageable);
        return pageData;
    }
}
