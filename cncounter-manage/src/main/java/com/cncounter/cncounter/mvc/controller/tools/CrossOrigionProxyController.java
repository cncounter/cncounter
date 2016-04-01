package com.cncounter.cncounter.mvc.controller.tools;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.util.string.StringNumberUtil;

/**
 * 跨域AJAX代理.
 */
@RequestMapping({"/crossorigion"})
@Controller
public class CrossOrigionProxyController extends ControllerBase {

	/**
	 * JSON跨域代理. 要求信息是 _tourl
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping({"/jsonproxy.json"})
	@ResponseBody
	public Object jsonproxy(HttpServletRequest request, HttpServletResponse response) {
		//
		// 1.1. 暂时不处理 cookies, 以及headers。
		// 
		//
		// 2. 接着将响应头信息，除却部分，发送给客户端
		//
		
		//
		Object o = processRequest(request, response);
		//
		return o;
	}
	
	//
	public static Object processRequest(HttpServletRequest request, HttpServletResponse response){
		
		//
		String _tourl = request.getParameter("_tourl");// 转码过
		_tourl = StringNumberUtil.trim(_tourl);
		//  GET, POST
		String _method = request.getMethod();
		//
		if("GET".equalsIgnoreCase(_method)){
			try {
				return get(request, response, _tourl);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if("POST".equalsIgnoreCase(_method)){
			try {
				return post(request, response, _tourl);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		//
		Object o = null;
		//
		return o;
	}
	
	public static String get(HttpServletRequest request, HttpServletResponse response, String tourl) throws Exception {
		String respText = "";
		//
        CloseableHttpClient httpclient = HttpClients.createDefault();
        try {
        	
        	// 封装所有其他参数
        	// get 请求,那就是URL指定好了,不需要再处理参数
        	// ... 
            //HttpGet httpget = new HttpGet(tourl);
            //
            URI uri = new URI(tourl);
            HttpGet httpget = new HttpGet(uri);

            // 响应处理器
            ResponseHandler<String> responseHandler = new StringResponseHandler(response);
            //
            String responseBody = httpclient.execute(httpget, responseHandler);
            //
            respText = responseBody;
        } finally {
            httpclient.close();
        }
        //
        return respText;
    }
	
	public static String post(HttpServletRequest request, HttpServletResponse response, String tourl) throws Exception {
		String respText = "";
		//
        CloseableHttpClient httpclient = HttpClients.createDefault();
        try {

    		// 1. 接收所有参数，除却 _tourl; 然后发送 http 请求
    		//
    		Map<String, String> paramMap = parseParamMap(request);
    		// 移除此地址
    		paramMap.remove("_tourl");
    		//
    		Set<String> keySet = paramMap.keySet();
    		Iterator<String> keyIterator = keySet.iterator();

        	// 封装所有其他参数
            List<NameValuePair> formparams = new ArrayList<NameValuePair>();
            //
    		while (keyIterator.hasNext()) {
				String paramName = (String) keyIterator.next();
				String paramValue = paramMap.get(paramName);
	            formparams.add(new BasicNameValuePair(paramName, paramValue));
			}
            UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
            //
        	//
            HttpPost httpPost = new HttpPost(tourl);
            httpPost.setEntity(entity);

            // 响应处理器
            ResponseHandler<String> responseHandler = new StringResponseHandler(response);
            //
            String responseBody = httpclient.execute(httpPost, responseHandler);
            //
            respText = responseBody;
        } finally {
            httpclient.close();
        }
        //
        return respText;
    }
	
	//
	public static class StringResponseHandler implements ResponseHandler<String>{
		
		private HttpServletResponse toresponse = null;
		
		public StringResponseHandler(HttpServletResponse toresponse){
			this.toresponse = toresponse;
		}
		
		@Override
		public String handleResponse(final HttpResponse response)
				throws ClientProtocolException, IOException {
			if(null != toresponse){
				
			}
            int status = response.getStatusLine().getStatusCode();
            if (status >= 200 && status < 300) {
                HttpEntity entity = response.getEntity();
                return entity != null ? EntityUtils.toString(entity) : null;
            } else {
                throw new ClientProtocolException("请求失败: " + status);
            }
        }
		
	}
	
} 

