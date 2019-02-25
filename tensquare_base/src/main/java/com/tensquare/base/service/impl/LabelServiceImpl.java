package com.tensquare.base.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.tensquare.base.pojo.Label;
import com.tensquare.base.dao.LabelDao;
import com.tensquare.base.service.LabelService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 标签 服务实现类
 * </p>
 *
 * @author Xxm
 * @since 2019-01-19
 */
@Service
public class LabelServiceImpl extends ServiceImpl<LabelDao, Label> implements LabelService {

    @Autowired
    private LabelDao labelDao;

    @Override
    public Page<Label> selectByPage(Page<Label> labelPage, Label label) {
        List<Label> labellist =  labelDao.selectByPage(labelPage,label);
        labelPage.setRecords(labellist);
        return labelPage;
    }
}
