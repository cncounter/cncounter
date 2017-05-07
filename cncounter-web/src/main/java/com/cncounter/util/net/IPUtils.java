package com.cncounter.util.net;

import javax.servlet.http.HttpServletRequest;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
import java.nio.ByteBuffer;
import java.util.Enumeration;
import java.util.Properties;

/**
 * IP工具
 */
public class IPUtils {

    public static final String SEMICOLON = ";";

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
                        ip += SEMICOLON;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        //
        if(ip.indexOf(SEMICOLON) < ip.lastIndexOf(SEMICOLON)){
            ip = ip.replace("127.0.0.1","");
            ip = ip.replace(SEMICOLON+SEMICOLON,"");
        }
        if(ip.startsWith(SEMICOLON)){
            ip = ip.substring(1);
        }
        if(ip.endsWith(SEMICOLON)){
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
        final String semicoma = SEMICOLON;
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


    public static long ip2Long(String localIp){
        String strIp = firstIp(localIp);
        if(null == strIp){return 0;}
        strIp = strIp.trim();
        if(!isIpv4(strIp)){return 0;}
        try {
            InetAddress inet = InetAddress.getByName(strIp);
            long value = ByteBuffer.wrap(inet.getAddress()).getLong();
            return value;
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return 0;
        //
//        long[] ip = new long[4];
//        //先找到IP地址字符串中.的位置
//        int position1 = strIp.indexOf(".");
//        int position2 = strIp.indexOf(".", position1 + 1);
//        int position3 = strIp.indexOf(".", position2 + 1);
//        //将每个.之间的字符串转换成整型
//        ip[0] = Long.parseLong(strIp.substring(0, position1));
//        ip[1] = Long.parseLong(strIp.substring(position1+1, position2));
//        ip[2] = Long.parseLong(strIp.substring(position2+1, position3));
//        ip[3] = Long.parseLong(strIp.substring(position3+1));
//        return (ip[0] << 24) + (ip[1] << 16) + (ip[2] << 8) + ip[3];
    }

    public static String long2Ip(Long ipValue){
        try {
            InetAddress inet = InetAddress.getByName(""+ ipValue);
            String address = inet.getHostAddress();
            return address;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    public static boolean isIpv4(String ipStr){
        if(null == ipStr){
            return false;
        } else if(ipStr.matches("^\\d+\\.\\d+\\.\\d+\\.\\d+$")){
            return true;
        }
        return false;
    }

    private static String firstIp(String ip){
        if(null == ip){return ip;}
        if(!ip.contains(SEMICOLON)){
            return ip;
        } else {
            return ip.substring(0, ip.indexOf(SEMICOLON));
        }

    }
}
