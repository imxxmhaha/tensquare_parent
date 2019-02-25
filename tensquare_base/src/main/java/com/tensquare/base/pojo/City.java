package com.tensquare.base.pojo;

import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 城市
 * </p>
 *
 * @author Xxm
 * @since 2019-01-19
 */
@TableName("tb_city")
public class City implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * ID
     */
    private String id;
    /**
     * 城市名称
     */
    private String name;
    /**
     * 是否热门
     */
    private String ishot;


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

    public String getIshot() {
        return ishot;
    }

    public void setIshot(String ishot) {
        this.ishot = ishot;
    }

    @Override
    public String toString() {
        return "City{" +
        ", id=" + id +
        ", name=" + name +
        ", ishot=" + ishot +
        "}";
    }
}
