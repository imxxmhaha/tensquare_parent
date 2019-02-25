package com.tensquare.base.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.tensquare.base.pojo.Label;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 标签 服务类
 * </p>
 *
 * @author Xxm
 * @since 2019-01-19
 */
public interface LabelService extends IService<Label> {

    Page<Label> selectByPage(Page<Label> labelPage, Label label);
}
