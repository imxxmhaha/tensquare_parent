package com.tensquare.user.pojo;

import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author Xxm
 * @since 2019-02-24
 */
@TableName("tb_follow")
public class Follow implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String userid;
    /**
     * 被关注用户ID
     */
    private String targetuser;


    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getTargetuser() {
        return targetuser;
    }

    public void setTargetuser(String targetuser) {
        this.targetuser = targetuser;
    }

    @Override
    public String toString() {
        return "Follow{" +
        ", userid=" + userid +
        ", targetuser=" + targetuser +
        "}";
    }
}
