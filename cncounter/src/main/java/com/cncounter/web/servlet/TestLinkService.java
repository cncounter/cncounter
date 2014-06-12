package com.cncounter.web.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TestLinkService extends ServletBase{

	private static final long serialVersionUID = 2236160652299498966L;

	//
	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");  
        response.setContentType("text/html;charset=utf-8");
        //
        String respage = "login.jsp";
        
        String action = request.getParameter("action");  
        if("login".equals(action)) {  
            String name = request.getParameter("name");  
            String password = request.getParameter("password");  
            //
            respage =  "loginresult.jsp";
            System.out.println(this.getClass().getName()+":name->" + name + ",password->" + password);
        }
        //
        System.out.println(this.getClass().getName()+":respage="+respage);
    	toPage(request, response, respage);
	}
}
