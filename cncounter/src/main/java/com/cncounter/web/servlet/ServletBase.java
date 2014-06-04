package com.cncounter.web.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public abstract class ServletBase extends HttpServlet{
	//
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
	}
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		super.doPost(request, response);
	}
	
	//
	protected void toPage(HttpServletRequest request,
			HttpServletResponse response, String relativePage) throws ServletException, IOException{
		 request.getRequestDispatcher(relativePage).forward(request , response);
	}
}
