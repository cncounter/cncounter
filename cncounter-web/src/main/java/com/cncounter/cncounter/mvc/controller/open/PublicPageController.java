package com.cncounter.cncounter.mvc.controller.open;

import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.qq.connect.QQConnectException;
import com.qq.connect.api.OpenID;
import com.qq.connect.api.qzone.UserInfo;
import com.qq.connect.javabeans.AccessToken;
import com.qq.connect.javabeans.qzone.UserInfoBean;
import com.qq.connect.oauth.Oauth;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.InternalResourceView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Controller
public class PublicPageController extends ControllerBase {

	@RequestMapping({"/index.php","/welcome.php"})
	public ModelAndView indexPage(HttpServletRequest request, HttpServletResponse response) {
		// 输入页面
		ModelAndView mav = new ModelAndView();
		// 
		View view = new InternalResourceView("/index.jsp");
		mav.setView(view);
		//
		return mav;
	}
	@RequestMapping({"/login.php","/signin.php"})
	public ModelAndView signinPage(HttpServletRequest request, HttpServletResponse response) {
		// 判断是否登录

		
		// 输入页面
		ModelAndView mav = new ModelAndView("login");

		return mav;
	}

    @RequestMapping({"/qqlogin.php","/qqsignin.php"})
    @ResponseBody
    public void qqSigninPage(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("text/html;charset=utf-8");
        try {
            response.sendRedirect(new Oauth().getAuthorizeURL(request));
            return;
        } catch (Exception e) {
            logger.error(e);// 这都出错吗?
        }
    }

    @RequestMapping({"/qqlogin.action","/qqsignin.action"})
    @ResponseBody
    public void qqLoginAction(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html; charset=utf-8");

        try {
            AccessToken accessTokenObj = (new Oauth()).getAccessTokenByRequest(request);


            if (accessTokenObj.getAccessToken().equals("")) {
//                我们的网站被CSRF攻击了或者用户取消了授权
//                做一些数据统计工作
                System.out.print("没有获取到响应参数");
            } else {
                String accessToken = accessTokenObj.getAccessToken();
                //long tokenExpireIn = accessTokenObj.getExpireIn();
                // 利用获取到的accessToken 去获取当前用户的openid -------- start
                OpenID openIDObj =  new OpenID(accessToken);
                String openID = openIDObj.getUserOpenID();

                request.getSession().setAttribute("demo_openid", openID);
                // 利用获取到的accessToken 去获取当前用户的openid --------- end

                UserInfo qzoneUserInfo = new UserInfo(accessToken, openID);
                UserInfoBean userInfoBean = qzoneUserInfo.getUserInfo();
                if (userInfoBean.getRet() == 0) {
                    setCookie(response, "CNC_qq_openID", openID);
                    saveToCache("qq:openID:" + openID, userInfoBean);
                    String redirectUrl = "http://www.cncounter.com";
                    response.sendRedirect(redirectUrl);
                } else {
                    PrintWriter out = response.getWriter();
                    out.println("很抱歉，我们没能正确获取到您的信息，原因是： " + userInfoBean.getMsg());
                    out.flush();
                }


            }
        } catch (QQConnectException e) {
        }
    }
	@RequestMapping({"/logout.php","/signout.php"})
	public ModelAndView signoutPage(HttpServletRequest request, HttpServletResponse response) {
        // 退出登录
        // 删除 token?
        super.expireUserTokenCookie(request, response);
        // 删除用户登录信息
        // 跳转到登录页面
		ModelAndView mav = new ModelAndView("login");

		return mav;
	}
	@RequestMapping({"/signup.php","/register.php"})
	public ModelAndView signupPage(HttpServletRequest request, HttpServletResponse response) {
		// 输入页面
		ModelAndView mav = new ModelAndView("signup");

		return mav;
	}

}
