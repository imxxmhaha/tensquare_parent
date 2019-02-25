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
@TableName("tb_pl")
public class Pl implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 问题ID
     */
    private String problemid;
    /**
     * 标签ID
     */
    private String labelid;


    public String getProblemid() {
        return problemid;
    }

    public void setProblemid(String problemid) {
        this.problemid = problemid;
    }

    public String getLabelid() {
        return labelid;
    }

    public void setLabelid(String labelid) {
        this.labelid = labelid;
    }

    @Override
    public String toString() {
        return "Pl{" +
        ", problemid=" + problemid +
        ", labelid=" + labelid +
        "}";
    }
}
