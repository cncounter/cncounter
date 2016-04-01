package com.cncounter.cncounter.mvc.controller.favorite;

import com.cncounter.cncounter.model.other.Favorite;
import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;
import com.cncounter.cncounter.service.api.other.FavoriteService;
import com.cncounter.util.string.StringNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RequestMapping({"/favorite"})
@Controller("oldFavoriteController")
public class FavoriteController extends ControllerBase{
	
	@Autowired
	private FavoriteService favoriteService;

	@RequestMapping(value = "/list/{type}.php")
	public ModelAndView listByTypePage(@PathVariable("type")Integer type,
			HttpServletRequest request, HttpServletResponse response) {
		//
		//Integer
		//type = getParameterInt(request, "", 0);
		// 获取数据
		List<Favorite> favorites = favoriteService.listByType(type);
		//
		String requestURL = request.getRequestURL().toString();
		String queryString = request.getQueryString();
		//
		if(StringNumberUtil.notEmpty(queryString)){
			requestURL = requestURL + "?" + queryString;
		}
		//
		// 输入页面
		ModelAndView mav = new ModelAndView("favorite/listbytype");

		mav.addObject("requestURL", requestURL);
		mav.addObject("favorites", favorites);
		mav.addObject("type", type);
		return mav;
	}
	

	@RequestMapping(value = "/{type}/add.json")
	@ResponseBody
	public Object addFavoriteJSON(@PathVariable("type")Integer type,
			HttpServletRequest request, HttpServletResponse response) {
		//
		String url = getParameterString(request, "url", "");
		String title = getParameterString(request, "title", "");
		//
		Favorite favorite = new Favorite();
		//
		favorite.setUrl(url);
		favorite.setTitle(title);
		favorite.setType(type);
		
		//
		int rows = favoriteService.add(favorite);
		
		//
		JSONMessage jsonMessage = JSONMessage.newMessage();
		String info = "";
		//
		if(1 == rows){
			jsonMessage.setSuccess();
			info = "添加成功";
		}
		jsonMessage.setInfo(info);
		// 未实现日志
		return jsonMessage;
	}
}
