package com.cncounter.model.message;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component("messageBean")
public class Message {

	@Value("1")
	private int id;
	@Value("renfufei@qq.com")
	private String from;
	@Value("551996458@qq.com")
	private String to;
	@Value("测试消息")
	private String title;
	@Value("你好,很高兴认识你!")
	private String message;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "Message [id=" + id + ", from=" + from + ", to=" + to
				+ ", title=" + title + ", message=" + message + "]";
	}
	
}
