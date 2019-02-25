package com.tensquare.gathering.pojo;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 专栏
 * </p>
 *
 * @author Xxm
 * @since 2019-02-14
 */
@TableName("tb_column")
public class Column implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * ID
     */
    private String id;
    /**
     * 专栏名称
     */
    private String name;
    /**
     * 专栏简介
     */
    private String summary;
    /**
     * 用户ID
     */
    private String userid;
    /**
     * 申请日期
     */
    private Date createtime;
    /**
     * 审核日期
     */
    private Date checktime;
    /**
     * 状态
     */
    private String state;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getChecktime() {
        return checktime;
    }

    public void setChecktime(Date checktime) {
        this.checktime = checktime;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Column{" +
        ", id=" + id +
        ", name=" + name +
        ", summary=" + summary +
        ", userid=" + userid +
        ", createtime=" + createtime +
        ", checktime=" + checktime +
        ", state=" + state +
        "}";
    }
}
