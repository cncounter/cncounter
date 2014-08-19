package com.cncounter.test.duapp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Test;

public class TestMySQLConnection {

	public static void main(String[] args) {
		// 
		new TestMySQLConnection().testMySQLConn();
	}

	@Test
	public void testMySQLConn() {
		String realname = testMySQLConnStr();
		System.out.println("realname=" + realname);
	}

	public String testMySQLConnStr() {
		Connection connection = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		String sql = null;
		//
		String realname = null;
		try {
			/***** 1. 填写数据库相关信息(请查找数据库详情页) *****/
			String databaseName = "eReqDlGXyFUaXwyfjjVg";
			String host = "sqld.duapp.com";
			String port = "4050";
			String username = "6EhSiGpsmSMRyZieglUImkTr";// 用户名(api key);
			String password = "eoNRNBgRk397mVyu66MHYuZDsepCeZ8A";// 密码(secret
																	// key)
			String driverName = "com.mysql.jdbc.Driver";
			String dbUrl = "jdbc:mysql://";
			String serverName = host + ":" + port + "/";
			String connName = dbUrl + serverName + databaseName;

			/****** 2. 接着连接并选择数据库名为databaseName的服务器 ******/
			Class.forName(driverName);
			connection = DriverManager.getConnection(connName, username, password);

			/* 至此连接已完全建立，就可对当前数据库进行相应的操作了 */
			/* 3. 接下来就可以使用其它标准mysql函数操作进行数据库操作 */
			// 创建一个数据库表
			sql = "select * from user u where u.username='cncounter'";
			stmt = connection.prepareStatement(sql);
			rs = stmt.executeQuery();
			//
			if(null != rs){
				if (rs.next()) {
					//
					realname = rs.getString("realname");
				}
			}
		} catch (Exception e) {
		} finally{
			try {
				if(null != rs){
					rs.close();
				}
				if(null != stmt){
					stmt.close();
				}
				if(null != connection){
					connection.close();
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return realname;
	}

}
