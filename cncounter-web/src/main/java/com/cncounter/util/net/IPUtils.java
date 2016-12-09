package com.cncounter.util.net;

import javax.servlet.http.HttpServletRequest;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
import java.util.Enumeration;
import java.util.Properties;

/**
 * Created by Administrator on 2016/12/9.
 */
public class IPUtils {

    // 代理的客户IP-header
    public static final String[] HEADERS_TO_TRY = {
            "X-Forwarded-For",
            "X-REAL-IP",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR",
            "REMOTE-HOST"
    };


    /**
     * 获取客户端的IP地址
     * @param request
     * @return
     */
    public static String getClientIp(HttpServletRequest request) {
        String clientIp = _getClientIp(request);
        if(null != clientIp && !clientIp.trim().isEmpty()){
            return clientIp;
        }
        return request.getRemoteAddr();
    }

    private static String _getClientIp(HttpServletRequest request) {
        for (String header : HEADERS_TO_TRY) {
            String ip = request.getHeader(header);
            if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
                return ip;
            }
        }
        return request.getRemoteAddr();
    }

    /**
     * 获取服务器自身的IP;
     * @return
     */
    public static String getServerLocalIP() {
        if (isWin()) {
            return getWinIP();
        } else {
            return getLinuxIP();
        }
    }

    /**
     * 获取 Linux 的IP
     */
    private static String getLinuxIP() {
        String ip = "";
        try {
            InetAddress addr = InetAddress.getLocalHost();
            Enumeration<NetworkInterface> allNetInterfaces = NetworkInterface.getNetworkInterfaces();
            //
            while (allNetInterfaces.hasMoreElements()) {
                NetworkInterface netInterface = (NetworkInterface) allNetInterfaces.nextElement();
                System.out.println(netInterface.getName());
                Enumeration<InetAddress> addresses = netInterface.getInetAddresses();
                while (addresses.hasMoreElements()) {
                    addr = (InetAddress) addresses.nextElement();
                    //  是IPV4地址
                    if (addr != null && addr instanceof Inet4Address) {
                        ip += addr.getHostAddress();
                        ip += ";";
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        //
        if(ip.indexOf(";") < ip.lastIndexOf(";")){
            ip = ip.replace("127.0.0.1","");
            ip = ip.replace(";;","");
        }
        if(ip.startsWith(";")){
            ip = ip.substring(1);
        }
        if(ip.endsWith(";")){
            ip = ip.substring(0, ip.length() - 1);
        }
        //
        return ip;
    }

    /**
     * 获取 windows 的IP
     *
     * @return
     */
    private static String getWinIP() {
        String ip = "";
        try {
            InetAddress addr = InetAddress.getLocalHost();
            ip = addr.getHostAddress();
        } catch (UnknownHostException e) {
            ip = "127.0.0.1";
        }
        return ip;
    }

    /**
     * 判断是否是windows系统
     */
    private static boolean isWin() {
        String osName = getOSName();
        if (null == osName || osName.isEmpty()) {
            return false;
        }
        if (osName.contains("win") || osName.contains("Win")) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取操作系统名
     */
    private static String getOSName() {
        Properties properties = System.getProperties();
        return properties.getProperty("os.name");
    }

    public static String parseIp2Location(String ip){
        //
        String areaAddress = "";
        // 判断IP;
        final String semicoma = ";";
        final String linkSymbol = "-";
        //
        if(null == ip || ip.trim().isEmpty()){ return areaAddress;}
        if(ip.contains(semicoma)){
            ip = ip.substring(0, ip.indexOf(semicoma));
        }
        //
        String[] locationArray = MonIPUtils.find(ip);
        if(null == locationArray){ return  areaAddress;}
        int len = locationArray.length;
        if(len > 0){
            String country = locationArray[0];
            if(null != country && !country.trim().isEmpty()){
                areaAddress += country;
            }
        }
        if(len > 1){
            String province = locationArray[1];
            if(null != province && !province.trim().isEmpty()){
                areaAddress += linkSymbol + province;
            }
        }
        if(len > 2){
            String city = locationArray[2];
            if(null != city && !city.trim().isEmpty()){
                areaAddress += linkSymbol + city;
            }
        }
        if(len > 3){
            String area = locationArray[3];
            if(null != area && !area.trim().isEmpty()){
                areaAddress += linkSymbol + area;
            }
        }
        return areaAddress;
    }
}
