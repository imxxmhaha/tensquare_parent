package com.tensquare.user.dao;

import com.baomidou.mybatisplus.plugins.Page;
import com.tensquare.user.pojo.Problem;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * 问题 Mapper 接口
 * </p>
 *
 * @author Xxm
 * @since 2019-01-21
 */
public interface ProblemDao extends BaseMapper<Problem> {

    @Select("SELECT * FROM tb_pl pl,tb_problem pm where pl.problemid = pm.id and pl.labelid = #{labelId} ORDER BY pm.createtime desc")
    List<Problem> selectNewPage(@Param("page") Page<Problem> page,@Param("labelId") String labelId);

    @Select("SELECT * FROM tb_pl pl,tb_problem pm where pl.problemid = pm.id and pl.labelid = #{labelId} ORDER BY pm.replytime desc")
    List<Problem> selectHotPage(@Param("page") Page<Problem> problemPage, String labelId);

    @Select("SELECT * FROM tb_pl pl,tb_problem pm where pl.problemid = pm.id and pm.reply=0 and  pl.labelid = #{labelId} ORDER BY pm.createtime desc")
    List<Problem> selectWaitPage(@Param("page") Page<Problem> problemPage, String labelId);
}
