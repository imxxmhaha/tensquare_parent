package com.tensquare.user.pojo;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 回答
 * </p>
 *
 * @author Xxm
 * @since 2019-01-21
 */
@TableName("tb_reply")
public class Reply implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 编号
     */
    private String id;
    /**
     * 问题ID
     */
    private String problemid;
    /**
     * 回答内容
     */
    private String content;
    /**
     * 创建日期
     */
    private Date createtime;
    /**
     * 更新日期
     */
    private Date updatetime;
    /**
     * 回答人ID
     */
    private String userid;
    /**
     * 回答人昵称
     */
    private String nickname;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProblemid() {
        return problemid;
    }

    public void setProblemid(String problemid) {
        this.problemid = problemid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    @Override
    public String toString() {
        return "Reply{" +
        ", id=" + id +
        ", problemid=" + problemid +
        ", content=" + content +
        ", createtime=" + createtime +
        ", updatetime=" + updatetime +
        ", userid=" + userid +
        ", nickname=" + nickname +
        "}";
    }
}
