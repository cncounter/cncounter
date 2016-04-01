package com.cncounter.cncounter.model.vote;

import java.io.Serializable;
import java.util.Date;

public class Vote  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
    private Integer id;

    private String title;

    private String keyword;

    private String category;

    private String features;

    private Integer multiselect;

    private Integer reelect;

    private Integer onceperuser;

    private Integer votetimeout;

    private Integer anonymous;

    private Date starttime;

    private Date endtime;

    private String votetimedesc;

    private String createuserid;

    private Date createtime;

    private Integer gen;

    private String content;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword == null ? null : keyword.trim();
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category == null ? null : category.trim();
    }

    public String getFeatures() {
        return features;
    }

    public void setFeatures(String features) {
        this.features = features == null ? null : features.trim();
    }

    public Integer getMultiselect() {
        return multiselect;
    }

    public void setMultiselect(Integer multiselect) {
        this.multiselect = multiselect;
    }

    public Integer getReelect() {
        return reelect;
    }

    public void setReelect(Integer reelect) {
        this.reelect = reelect;
    }

    public Integer getOnceperuser() {
        return onceperuser;
    }

    public void setOnceperuser(Integer onceperuser) {
        this.onceperuser = onceperuser;
    }

    public Integer getVotetimeout() {
        return votetimeout;
    }

    public void setVotetimeout(Integer votetimeout) {
        this.votetimeout = votetimeout;
    }

    public Integer getAnonymous() {
        return anonymous;
    }

    public void setAnonymous(Integer anonymous) {
        this.anonymous = anonymous;
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

    public String getVotetimedesc() {
        return votetimedesc;
    }

    public void setVotetimedesc(String votetimedesc) {
        this.votetimedesc = votetimedesc == null ? null : votetimedesc.trim();
    }

    public String getCreateuserid() {
        return createuserid;
    }

    public void setCreateuserid(String createuserid) {
        this.createuserid = createuserid == null ? null : createuserid.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Integer getGen() {
        return gen;
    }

    public void setGen(Integer gen) {
        this.gen = gen;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}