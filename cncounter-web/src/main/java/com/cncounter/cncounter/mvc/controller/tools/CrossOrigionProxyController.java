package com.cncounter.cncounter.mvc.controller.tools;

import com.cncounter.cncounter.mvc.controller.base.ControllerBase;
import com.cncounter.cncounter.mvc.msg.JSONMessage;
import com.cncounter.util.net.HttpClientUtils;
import com.cncounter.util.string.StringNumberUtil;
import org.apache.commons.io.IOUtils;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.*;

/**
 * 跨域AJAX代理.
 */
@RequestMapping({"/crossorigion"})
@Controller
public class CrossOrigionProxyController extends ControllerBase {

    //
    final String downloadPrefix = "http://download.cncounter.com/temp/";
    final String targetDirectoryStr = "/usr/local/download/temp/";
    //
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
        // 2. 接着将响应头信息，除却部分，发送给客户端
        //
        Object o = processRequest(request, response);
        //
        return o;
    }


    @RequestMapping({"/download/genfileurl.json"})
    @ResponseBody
    public Object genfileurl(HttpServletRequest request, HttpServletResponse response) throws MalformedURLException {
        try{
            return _genFileUrl(request, response);
        } catch (Throwable t){
            return JSONMessage.failureMessage().setInfo("处理失败");
        }
    }



    @RequestMapping({"/download/existsfile.json"})
    @ResponseBody
    public Object existsfile(HttpServletRequest request, HttpServletResponse response) throws MalformedURLException {
        // 1.1. 暂时不处理 cookies, 以及headers。
        Map<String, String> paramMap =parseParamMap(request);
        //
        String origfileurl = paramMap.get("origfileurl");
        String targetfilename = paramMap.get("targetfilename");
        //
        //
        if(StringNumberUtil.isEmpty(targetfilename)){
            if(StringNumberUtil.notEmpty(origfileurl)){
                URL url = new URL(origfileurl);
                String path = url.getPath();
                if(null == path || path.trim().isEmpty()){
                    return JSONMessage.failureMessage().setInfo("只支持 http 协议");
                }
                targetfilename = path.substring(path.lastIndexOf("/"));
            }
        }
        while(null != targetfilename && targetfilename.startsWith("/")){
            targetfilename = targetfilename.substring(1);
        }
        //
        if(targetfilename.endsWith(".jsp")){
            // 暂时不管
            return JSONMessage.failureMessage().setInfo("不支持 jsp 文件下载");
        }
        File targetDirectory = new File(targetDirectoryStr);
        if(!targetDirectory.exists()){
            return JSONMessage.failureMessage().setInfo("不存在");
        }
        //
        final File targetFile = new File(targetDirectory, targetfilename);
        //
        if(targetFile.exists()){
            // 返回
            return JSONMessage.successMessage().setInfo("文件已存在")
                    .addMeta("targetfilename", targetfilename)
                    .addMeta("downloadurl",downloadPrefix + targetfilename)
                    ;
        }
        //
        return JSONMessage.failureMessage().setInfo("文件不存在");
    }

    public Object _genFileUrl(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 1.1. 暂时不处理 cookies, 以及headers。
        Map<String, String> paramMap =parseParamMap(request);
        //
        String origfileurl = paramMap.get("origfileurl");
        logger.debug("origfileurl:\n"+origfileurl);
        if(StringNumberUtil.isEmpty(origfileurl)){
            return JSONMessage.failureMessage().setInfo("origfileurl为空");
        } else if(false == origfileurl.startsWith("http")){
            return JSONMessage.failureMessage().setInfo("只支持 http 协议");
        }
        //
        URL url = new URL(origfileurl);
        //
        String targetfilename = paramMap.get("targetfilename");
        if(StringNumberUtil.isEmpty(targetfilename)){
            String path = url.getPath();
            if(null == path){
                return JSONMessage.failureMessage().setInfo("只支持 http 协议");
            }
            targetfilename = path.substring(path.lastIndexOf("/"));
        }
        while(null != targetfilename && targetfilename.startsWith("/")){
            targetfilename = targetfilename.substring(1);
        }
        //
        if(targetfilename.endsWith(".jsp")){
            // 暂时不管
            //return JSONMessage.failureMessage().setInfo("不支持 jsp 文件下载");
        }
        if(targetfilename.trim().isEmpty()){
            // 暂时不管
            return JSONMessage.failureMessage().setInfo("不支持目录下载");
        }
        File targetDirectory = new File(targetDirectoryStr);
        if(!targetDirectory.exists()){
            targetDirectory.mkdirs();
        }
        //
        final File targetFile = new File(targetDirectory, targetfilename);
        //
        if(targetFile.exists()){
            // 直接返回
            return JSONMessage.successMessage().setInfo("文件已存在")
                    .addMeta("targetfilename", targetfilename)
                    .addMeta("downloadurl",downloadPrefix + targetfilename)
                    ;
        }
        //
        final InputStream inputStream = HttpClientUtils.getUrlAsStream(url);
        if(null == inputStream){
            return JSONMessage.failureMessage().setInfo("操作失败");
        }

        // 下载文件操作。 应该丢给线程池
        HttpClientUtils.downloadThreadPool.submit(new Runnable() {
            @Override
            public void run() {
                //
                FileOutputStream outputStream = null;
                try{
                    // 需要下载到temp,再 rename
                    //
                    String targetFullPath = targetFile.getAbsolutePath();
                    //
                    String TMP = ".tmp";
                    String tempFullPath = targetFullPath + TMP;
                    //
                    outputStream = new FileOutputStream(tempFullPath);
                    IOUtils.copy(inputStream, outputStream);
                    //
                    File tempFile = new File(tempFullPath);
                    if(tempFile.exists()){
                        tempFile.renameTo(targetFile);
                    }
                    //
                } catch (Throwable e){
                    logger.error("下载文件失败.", e);
                }finally {
                    IOUtils.closeQuietly(inputStream);
                    IOUtils.closeQuietly(outputStream);
                }
            }
        });
        //
        return JSONMessage.successMessage().setInfo("文件正在下载")
                .addMeta("downloadurl",downloadPrefix + targetfilename);
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

