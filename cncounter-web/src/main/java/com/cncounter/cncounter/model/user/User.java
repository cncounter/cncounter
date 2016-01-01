package com.cncounter.cncounter.model.user;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
    private Integer id;

    private String username;

    private String password;

    private Integer usertype;

    private String email;

    private String mobile;

    private String realname;

    private String title;

    private String createuserid;

    private Date createtime;

    private Integer gen;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public Integer getUsertype() {
        return usertype;
    }

    public void setUsertype(Integer usertype) {
        this.usertype = usertype;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
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
    
    //
    @Override
    public int hashCode() {
    	return null!=this.id? this.id : 0;
    }
    //
    @Override
    public boolean equals(Object obj) {
    	if(this ==  obj){
    		return true;
    	}
    	//
    	if(obj instanceof User){
    		//
    		User other = (User)obj;
    		Integer id2 = other.id;
    		String username2 = other.username;
    		// 承认ID
    		if(this.id !=null && this.id.equals(id2)){
    			return true;
    		} else {
    			// 承认USERNAME
    			if(null != this.username && this.username.equals(username2)){
        			return true;
    			}
    		}
    	}
    	// 其他情况,返回false
    	return false;
    }
}