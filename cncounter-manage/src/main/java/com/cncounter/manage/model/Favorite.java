/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
package com.cncounter.manage.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 收藏
 * @version 1.0
 * @author
 */
public class Favorite implements Serializable {

	// 自增ID
	private Long id;
	// 用户ID
	private String userId;
	// 类别,0为首页通用
	private Integer type;
	// 标题
	private String title;
	// 内容
	private String content;
	// 链接
	private String url;
	// 创建者ID
	private Long createId;
	// 更新者ID
	private Long updateId;
	// 创建时间
	private Date createTime;
	// 更新时间
	private Date updateTime;
	// 乐观锁版本号
	private Integer version;
		
	public void setId(Long value) {
		this.id = value;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public void setUserId(String value) {
		this.userId = value;
	}
	
	public String getUserId() {
		return this.userId;
	}
	
	public void setType(Integer value) {
		this.type = value;
	}
	
	public Integer getType() {
		return this.type;
	}
	
	public void setTitle(String value) {
		this.title = value;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public void setContent(String value) {
		this.content = value;
	}
	
	public String getContent() {
		return this.content;
	}
	
	public void setUrl(String value) {
		this.url = value;
	}
	
	public String getUrl() {
		return this.url;
	}
	
	public void setCreateId(Long value) {
		this.createId = value;
	}
	
	public Long getCreateId() {
		return this.createId;
	}
	
	public void setUpdateId(Long value) {
		this.updateId = value;
	}
	
	public Long getUpdateId() {
		return this.updateId;
	}
	
	public void setCreateTime(Date value) {
		this.createTime = value;
	}
	
	public Date getCreateTime() {
		return this.createTime;
	}
	
	public void setUpdateTime(Date value) {
		this.updateTime = value;
	}
	
	public Date getUpdateTime() {
		return this.updateTime;
	}
	
	public void setVersion(Integer value) {
		this.version = value;
	}
	
	public Integer getVersion() {
		return this.version;
	}
	
}
