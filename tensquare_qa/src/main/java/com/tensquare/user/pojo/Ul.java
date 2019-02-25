package com.tensquare.user.pojo;

import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author Xxm
 * @since 2019-01-21
 */
@TableName("tb_ul")
public class Ul implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String uid;
    /**
     * 标签ID
     */
    private String lid;


    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getLid() {
        return lid;
    }

    public void setLid(String lid) {
        this.lid = lid;
    }

    @Override
    public String toString() {
        return "Ul{" +
        ", uid=" + uid +
        ", lid=" + lid +
        "}";
    }
}
