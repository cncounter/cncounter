/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
package com.cncounter.cncounter.model.other;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户
 * @version 1.0
 * @author
 */
public class User implements Serializable {

	// 自增ID
	private Long id;
	// 用户名
	private String username;
	// 密码,加密后的
	private String password;
	// 密码盐,随机数
	private String saltPassword;
	// 用户类别,0为普通用户,100为管理员
	private Integer userType;
	// 邮箱
	private String email;
	// 手机号
	private String mobile;
	// 真实姓名
	private String realName;
	// 职称，称呼
	private String title;
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
	
	public void setUsername(String value) {
		this.username = value;
	}
	
	public String getUsername() {
		return this.username;
	}
	
	public void setPassword(String value) {
		this.password = value;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setSaltPassword(String value) {
		this.saltPassword = value;
	}
	
	public String getSaltPassword() {
		return this.saltPassword;
	}
	
	public void setUserType(Integer value) {
		this.userType = value;
	}
	
	public Integer getUserType() {
		return this.userType;
	}
	
	public void setEmail(String value) {
		this.email = value;
	}
	
	public String getEmail() {
		return this.email;
	}
	
	public void setMobile(String value) {
		this.mobile = value;
	}
	
	public String getMobile() {
		return this.mobile;
	}
	
	public void setRealName(String value) {
		this.realName = value;
	}
	
	public String getRealName() {
		return this.realName;
	}
	
	public void setTitle(String value) {
		this.title = value;
	}
	
	public String getTitle() {
		return this.title;
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
