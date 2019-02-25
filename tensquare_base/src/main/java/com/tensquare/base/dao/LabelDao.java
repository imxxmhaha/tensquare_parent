package com.tensquare.base.dao;

import com.baomidou.mybatisplus.plugins.Page;
import com.tensquare.base.pojo.Label;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 标签 Mapper 接口
 * </p>
 *
 * @author Xxm
 * @since 2019-01-19
 */
public interface LabelDao extends BaseMapper<Label> {

    /**
     * 注意:这里page  与label  都需要带上注解@Param
     * @param page
     * @param label
     * @return
     */
    List<Label> selectByPage(@Param("page") Page<Label> page,@Param("label") Label label);
}
