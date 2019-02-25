package com.tensquare.gathering.pojo;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 用户关注活动
 * </p>
 *
 * @author Xxm
 * @since 2019-02-15
 */
@TableName("tb_usergath")
public class Usergath implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String userid;
    /**
     * 活动ID
     */
    private String gathid;
    /**
     * 点击时间
     */
    private Date exetime;


    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getGathid() {
        return gathid;
    }

    public void setGathid(String gathid) {
        this.gathid = gathid;
    }

    public Date getExetime() {
        return exetime;
    }

    public void setExetime(Date exetime) {
        this.exetime = exetime;
    }

    @Override
    public String toString() {
        return "Usergath{" +
        ", userid=" + userid +
        ", gathid=" + gathid +
        ", exetime=" + exetime +
        "}";
    }
}
