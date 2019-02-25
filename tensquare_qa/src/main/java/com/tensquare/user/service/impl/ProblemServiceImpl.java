package com.tensquare.user.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.tensquare.user.pojo.Problem;
import com.tensquare.user.dao.ProblemDao;
import com.tensquare.user.service.ProblemService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 问题 服务实现类
 * </p>
 *
 * @author Xxm
 * @since 2019-01-21
 */
@Service
public class ProblemServiceImpl extends ServiceImpl<ProblemDao, Problem> implements ProblemService {

    @Autowired
    private ProblemDao problemDao;

    @Override
    public Page selectNewPage(String labelId, Page<Problem> problemPage) {
        List<Problem> newList = problemDao.selectNewPage(problemPage,labelId);
        problemPage.setRecords(newList);
        return problemPage;
    }

    @Override
    public Page selectHotPage(String labelId, Page<Problem> problemPage) {
        List<Problem> newList = problemDao.selectHotPage(problemPage,labelId);
        problemPage.setRecords(newList);
        return problemPage;
    }

    @Override
    public Page selectWaitPage(String labelId, Page<Problem> problemPage) {
        List<Problem> newList = problemDao.selectWaitPage(problemPage,labelId);
        problemPage.setRecords(newList);
        return problemPage;
    }
}
