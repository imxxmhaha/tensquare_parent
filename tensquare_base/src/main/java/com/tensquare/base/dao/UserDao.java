package com.tensquare.base.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.tensquare.base.pojo.User;
import com.tensquare.Dto.UserDto;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * 用户 Mapper 接口
 * </p>
 *
 * @author Xxm123
 * @since 2019-01-18
 */
public interface UserDao extends BaseMapper<User> {

    @Select("select * from tb_user u ,tb_admin a where u.id = a.userid  order by a.id asc")
    List<UserDto> selectUserByPage(@Param("page") Page<UserDto> userPage);
}
