package com.tensquare.base.pojo;

import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author Xxm
 * @since 2019-01-19
 */
@TableName("tb_ul")
public class Ul implements Serializable {

    private static final long serialVersionUID = 1L;

    private String userid;
    private String labelid;


    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getLabelid() {
        return labelid;
    }

    public void setLabelid(String labelid) {
        this.labelid = labelid;
    }

    @Override
    public String toString() {
        return "Ul{" +
        ", userid=" + userid +
        ", labelid=" + labelid +
        "}";
    }
}
