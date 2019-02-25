package com.tensquare.user.pojo;

import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 管理员
 * </p>
 *
 * @author Xxm
 * @since 2019-02-24
 */
@TableName("tb_admin")
public class Admin implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * ID
     */
    private String id;
    /**
     * 登陆名称
     */
    private String loginname;
    /**
     * 密码
     */
    private String password;
    /**
     * 状态
     */
    private String state;
    private String userid;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLoginname() {
        return loginname;
    }

    public void setLoginname(String loginname) {
        this.loginname = loginname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    @Override
    public String toString() {
        return "Admin{" +
        ", id=" + id +
        ", loginname=" + loginname +
        ", password=" + password +
        ", state=" + state +
        ", userid=" + userid +
        "}";
    }
}
