package com.tensquare.Dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @author xxm
 * @create 2019-01-19 0:52
 */
@Data
public class UserDto implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * ID
     */
    private String id;
    /**
     * 登录名
     */
    private String loginname;
    /**
     * 手机号码
     */
    private String mobile;
    /**
     * 密码
     */
    private String password;
    /**
     * 昵称
     */
    private String nickname;
    /**
     * 性别
     */
    private String sex;
    /**
     * 出生年月日
     */
    private Date birthday;
    /**
     * 头像
     */
    private String avatar;
    /**
     * E-Mail
     */
    private String email;
    /**
     * 注册日期
     */
    private Date regdate;
    /**
     * 修改日期
     */
    private Date updatedate;
    /**
     * 最后登陆日期
     */
    private Date lastdate;
    /**
     * 在线时长（分钟）
     */
    private Long online;
    /**
     * 兴趣
     */
    private String interest;
    /**
     * 个性
     */
    private String personality;
    /**
     * 粉丝数
     */
    private Integer fanscount;
    /**
     * 关注数
     */
    private Integer followcount;



    /**
     * 状态
     */
    private String state;
}
