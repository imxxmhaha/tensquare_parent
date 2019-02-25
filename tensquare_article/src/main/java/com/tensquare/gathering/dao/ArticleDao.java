package com.tensquare.gathering.dao;

import com.tensquare.gathering.pojo.Article;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Update;

/**
 * <p>
 * 文章 Mapper 接口
 * </p>
 *
 * @author Xxm
 * @since 2019-02-14
 */
public interface ArticleDao extends BaseMapper<Article> {


    @Update("update tb_article set state = 1 where id = #{0}")
    void updateState(String articleId);

    @Update("update tb_article set thumbup = ifnull(thumbup,0) + 1 where id = #{0} and state = 1")
    void addThumbup(String articleId);
}
