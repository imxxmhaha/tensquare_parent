package com.tensquare.user.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.tensquare.user.pojo.Problem;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 问题 服务类
 * </p>
 *
 * @author Xxm
 * @since 2019-01-21
 */
public interface ProblemService extends IService<Problem> {

    Page selectNewPage(String labelId, Page<Problem> objectPage);

    Page selectHotPage(String labelId, Page<Problem> objectPage);

    public Page selectWaitPage(String labelId, Page<Problem> problemPage);
}
