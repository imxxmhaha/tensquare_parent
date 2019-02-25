package com.tensquare.gathering.pojo;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 活动
 * </p>
 *
 * @author Xxm
 * @since 2019-02-15
 */
@TableName("tb_gathering")
public class Gathering implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 编号
     */
    private String id;
    /**
     * 活动名称
     */
    private String name;
    /**
     * 大会简介
     */
    private String summary;
    /**
     * 详细说明
     */
    private String detail;
    /**
     * 主办方
     */
    private String sponsor;
    /**
     * 活动图片
     */
    private String image;
    /**
     * 开始时间
     */
    private Date starttime;
    /**
     * 截止时间
     */
    private Date endtime;
    /**
     * 举办地点
     */
    private String address;
    /**
     * 报名截止
     */
    private Date enrolltime;
    /**
     * 是否可见
     */
    private String state;
    /**
     * 城市
     */
    private String city;


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

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getSponsor() {
        return sponsor;
    }

    public void setSponsor(String sponsor) {
        this.sponsor = sponsor;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Date getStarttime() {
        return starttime;
    }

    public void setStarttime(Date starttime) {
        this.starttime = starttime;
    }

    public Date getEndtime() {
        return endtime;
    }

    public void setEndtime(Date endtime) {
        this.endtime = endtime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getEnrolltime() {
        return enrolltime;
    }

    public void setEnrolltime(Date enrolltime) {
        this.enrolltime = enrolltime;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "Gathering{" +
        ", id=" + id +
        ", name=" + name +
        ", summary=" + summary +
        ", detail=" + detail +
        ", sponsor=" + sponsor +
        ", image=" + image +
        ", starttime=" + starttime +
        ", endtime=" + endtime +
        ", address=" + address +
        ", enrolltime=" + enrolltime +
        ", state=" + state +
        ", city=" + city +
        "}";
    }
}
