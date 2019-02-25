package com.tensquare.base.service.impl;

import com.tensquare.base.pojo.Admin;
import com.tensquare.base.dao.AdminDao;
import com.tensquare.base.service.AdminService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 管理员 服务实现类
 * </p>
 *
 * @author Xxm123
 * @since 2019-01-18
 */
@Service
public class AdminServiceImpl extends ServiceImpl<AdminDao, Admin> implements AdminService {

}
