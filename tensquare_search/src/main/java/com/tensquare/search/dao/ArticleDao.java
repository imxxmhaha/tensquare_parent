package com.tensquare.search.dao;

import com.tensquare.search.pojo.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * @author xxm
 * @create 2019-02-23 10:15
 */

/**
 * 文章数据访问层接口
 */
public interface ArticleDao extends ElasticsearchRepository<Article,String> {

    public Page<Article> findByTitleOrContentLike(String title, String content, Pageable pageable);
}
