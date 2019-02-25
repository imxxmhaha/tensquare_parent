package com.tensquare.user.service.impl;

import com.tensquare.user.pojo.Admin;
import com.tensquare.user.dao.AdminDao;
import com.tensquare.user.service.AdminService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 管理员 服务实现类
 * </p>
 *
 * @author Xxm
 * @since 2019-02-24
 */
@Service
public class AdminServiceImpl extends ServiceImpl<AdminDao, Admin> implements AdminService {

}
