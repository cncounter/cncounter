/*
 * Copyright(c) 2016 cncounter.com All rights reserved.
 * distributed with this file and available online at
 * http://www.cncounter.com/
 */
package com.cncounter.manage.controller;

import com.cncounter.manage.mvc.controller.base.ControllerBase;
import com.cncounter.manage.mvc.msg.JSONMessage;
import com.cncounter.manage.service.QueryLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * @version 1.0
 * @author 
 */
@Controller
@RequestMapping("/manage/queryLog")
public class QueryLogController extends ControllerBase {
    
    @Autowired
    private QueryLogService queryLogService;
    
	@RequestMapping(value = "/list.json")
	@ResponseBody
	public JSONMessage list(HttpServletRequest request) {
        Map<String, Object> paramMap = parseParamMapObject(request);
        processPageParams(paramMap);
        List<Map<String, Object>> list = queryLogService.listPage(paramMap);
        JSONMessage jsonMessage = list2JSONMessage(list);
        int totalCount = 0;
        totalCount = queryLogService.countBy(paramMap);
        jsonMessage.setTotal(totalCount);
        return jsonMessage;
	}

	@RequestMapping(value = "/add.json", method = RequestMethod.POST)
	@ResponseBody
	public JSONMessage doAdd(HttpServletRequest request) {
        Map<String, Object> paramMap = parseParamMapObject(request);
        List<Map<String, Object>> list = queryLogService.add(paramMap);
        JSONMessage jsonMessage = list2JSONMessage(list);
        return jsonMessage;
	}
	

	@RequestMapping(value = "/edit.json", method = RequestMethod.POST)
	@ResponseBody
	public JSONMessage doEdit(HttpServletRequest request) {
        Map<String, Object> paramMap = parseParamMapObject(request);
        List<Map<String, Object>> list = queryLogService.update(paramMap);
        JSONMessage jsonMessage = list2JSONMessage(list);
        return jsonMessage;
	}
	

	@RequestMapping(value = "/delete.json", method = RequestMethod.POST)
	@ResponseBody
	public JSONMessage delete(HttpServletRequest request) {
        Map<String, Object> paramMap = parseParamMapObject(request);
        List<Map<String, Object>> list = queryLogService.delete(paramMap);
        JSONMessage jsonMessage = list2JSONMessage(list);
        return jsonMessage;
	}


    private static JSONMessage list2JSONMessage(List<Map<String, Object>> list){
        JSONMessage jsonMessage = JSONMessage.successMessage();
        String message = "";
        if(null != list){
            //
            jsonMessage.setSuccess();
            message = "执行成功";
        } else {
            jsonMessage.setFailure();
            message = "执行失败";
        }
        jsonMessage.setData(list);
        jsonMessage.setMessage(message);
        return jsonMessage;
    }

}
