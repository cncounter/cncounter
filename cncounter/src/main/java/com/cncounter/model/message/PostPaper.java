package com.cncounter.model.message;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component("postPaperBean")
public class PostPaper {

	@Value("10086")
	private int id;
	@Value("#{'Caizhi1006'.toUpperCase()}")
	private String name;
	@Value("#{messageBean.getTo()}")
	private String to;
	@Value("#{messageBean}")
	private Message message;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public Message getMessage() {
		return message;
	}
	public void setMessage(Message message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "PostPaper [id=" + id + ", name=" + name + ", to=" + to
				+ ", message=" + message + "]";
	}
	
}
