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

        PrintWriter out = response.getWriter();

        try {
            AccessToken accessTokenObj = (new Oauth()).getAccessTokenByRequest(request);

            String accessToken   = null,
                    openID        = null;
            long tokenExpireIn = 0L;

            if (accessTokenObj.getAccessToken().equals("")) {
//                我们的网站被CSRF攻击了或者用户取消了授权
//                做一些数据统计工作
                System.out.print("没有获取到响应参数");
            } else {
                accessToken = accessTokenObj.getAccessToken();
                tokenExpireIn = accessTokenObj.getExpireIn();

                request.getSession().setAttribute("demo_access_token", accessToken);
                request.getSession().setAttribute("demo_token_expirein", String.valueOf(tokenExpireIn));

                // 利用获取到的accessToken 去获取当前用的openid -------- start
                OpenID openIDObj =  new OpenID(accessToken);
                openID = openIDObj.getUserOpenID();

                out.println("欢迎你，代号为 " + openID + " 的用户!");
                request.getSession().setAttribute("demo_openid", openID);
                // 利用获取到的accessToken 去获取当前用户的openid --------- end

                out.println("<p> start -----------------------------------利用获取到的accessToken,openid 去获取用户在Qzone的昵称等信息 ---------------------------- start </p>");
                UserInfo qzoneUserInfo = new UserInfo(accessToken, openID);
                UserInfoBean userInfoBean = qzoneUserInfo.getUserInfo();
                out.println("<br/>");
                if (userInfoBean.getRet() == 0) {
                    out.println(userInfoBean.getNickname() + "<br/>");
                    out.println(userInfoBean.getGender() + "<br/>");
                    out.println("黄钻等级： " + userInfoBean.getLevel() + "<br/>");
                    out.println("会员 : " + userInfoBean.isVip() + "<br/>");
                    out.println("黄钻会员： " + userInfoBean.isYellowYearVip() + "<br/>");
                    out.println("<image src=" + userInfoBean.getAvatar().getAvatarURL30() + "/><br/>");
                    out.println("<image src=" + userInfoBean.getAvatar().getAvatarURL50() + "/><br/>");
                    out.println("<image src=" + userInfoBean.getAvatar().getAvatarURL100() + "/><br/>");
                } else {
                    out.println("很抱歉，我们没能正确获取到您的信息，原因是： " + userInfoBean.getMsg());
                }
                out.println("<p> end -----------------------------------利用获取到的accessToken,openid 去获取用户在Qzone的昵称等信息 ---------------------------- end </p>");


            }
        } catch (QQConnectException e) {
        }
    }
	@RequestMapping({"/logout.php","/signout.php"})
	public ModelAndView signoutPage(HttpServletRequest request, HttpServletResponse response) {
		// 输入页面
		ModelAndView mav = new ModelAndView("logout");

		return mav;
	}
	@RequestMapping({"/signup.php","/register.php"})
	public ModelAndView signupPage(HttpServletRequest request, HttpServletResponse response) {
		// 输入页面
		ModelAndView mav = new ModelAndView("signup");

		return mav;
	}

}
