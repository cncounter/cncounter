package com.cncounter.util.net;

import org.apache.commons.io.IOUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.charset.Charset;
import java.util.concurrent.locks.ReentrantLock;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * 17monipdb 工具;
 */
public class MonIPUtils {

    public static String ZIP_SOURCE_NAME = "assets/17monipdb.zip";
    public static String ZIP_ENTRY_NAME = "17monipdb.dat";

    private static int offset;
    private static int[] index = new int[256];
    private static ByteBuffer dataBuffer;
    private static ByteBuffer indexBuffer;
    //
    private static ReentrantLock lock = new ReentrantLock();

    public static String[] find(String ip) {
        checkInit();
        int ip_prefix_value = new Integer(ip.substring(0, ip.indexOf(".")));
        long ip2long_value  = ip2long(ip);
        int start = index[ip_prefix_value];
        int max_comp_len = offset - 1028;
        long index_offset = -1;
        int index_length = -1;
        byte b = 0;
        for (start = start * 8 + 1024; start < max_comp_len; start += 8) {
            if (int2long(indexBuffer.getInt(start)) >= ip2long_value) {
                index_offset = bytesToLong(b, indexBuffer.get(start + 6), indexBuffer.get(start + 5), indexBuffer.get(start + 4));
                index_length = 0xFF & indexBuffer.get(start + 7);
                break;
            }
        }

        byte[] areaBytes;

        lock.lock();
        try {
            dataBuffer.position(offset + (int) index_offset - 1024);
            areaBytes = new byte[index_length];
            dataBuffer.get(areaBytes, 0, index_length);
        } finally {
            lock.unlock();
        }

        return new String(areaBytes, Charset.forName("UTF-8")).split("\t", -1);
    }


    public static void main(String[] args){
        System.out.println(IPUtils.parseIp2Location(("118.28.8.8")));
        System.out.println(IPUtils.parseIp2Location(("124.200.52.19")));
    }

    private static void checkInit(){
        if(null != dataBuffer){return;}
        init();
    }
    public static void init(){
        if(null != dataBuffer){return;}
        init(ZIP_SOURCE_NAME, ZIP_ENTRY_NAME);
    }
    public static void init(String zipResourceName, String zipEntryName){
        loadZip(zipResourceName, zipEntryName);
    }

    private static void loadZip(String zipResourceName, String zipEntryName) {
        //
        InputStream inputStream = null;
        try {
            inputStream = MonIPUtils.class.getClassLoader().getResourceAsStream(zipResourceName);
            byte[] allBytes = readAllZipByte(inputStream, zipEntryName);
            loadByByteArray(allBytes);
        } catch (Exception e){
            e.printStackTrace();
        } finally {
            IOUtils.closeQuietly(inputStream);
        }
    }


    private static void loadByByteArray(byte[] allBytes) {
        lock.lock();
        try {
            if(null != dataBuffer){return;}
            dataBuffer = ByteBuffer.wrap(allBytes);
            // 解析二进制数据
            dataBuffer.position(0);
            int indexLength = dataBuffer.getInt();
            byte[] indexBytes = new byte[indexLength];
            dataBuffer.get(indexBytes, 0, indexLength - 4);
            indexBuffer = ByteBuffer.wrap(indexBytes);
            indexBuffer.order(ByteOrder.LITTLE_ENDIAN);
            offset = indexLength;

            int loop = 0;
            while (loop++ < 256) {
                index[loop - 1] = indexBuffer.getInt();
            }
            indexBuffer.order(ByteOrder.BIG_ENDIAN);
        } finally {
            lock.unlock();
        }
    }


    private static byte[] readAllZipByte(InputStream inputStream, String zipEntryName) {
        //
        byte[] byteArray = new byte[0];
        ZipInputStream zipInputStream = new ZipInputStream(inputStream);
        //
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(16 * 1024);
        ZipEntry entryIn;
        try {
            while ((entryIn = zipInputStream.getNextEntry()) != null) {
                String entryName = entryIn.getName();
                if (null == entryName || !entryName.equals(zipEntryName)) {
                    continue;
                }
                // 缓冲区
                byte[] buf = new byte[8 * 1024];
                int len;
                // 使用替换流
                while ((len = (zipInputStream.read(buf))) > 0) {
                    byteArrayOutputStream.write(buf, 0, len);
                }

            }
            byteArray = byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            IOUtils.closeQuietly(byteArrayOutputStream);
        }
        //
        return byteArray;
    }

    private static long bytesToLong(byte a, byte b, byte c, byte d) {
        return int2long((((a & 0xff) << 24) | ((b & 0xff) << 16) | ((c & 0xff) << 8) | (d & 0xff)));
    }

    private static long ip2long(String ip)  {
        return int2long(str2Ip(ip));
    }

    private static long int2long(int i) {
        long l = i & 0x7fffffffL;
        if (i < 0) {
            l |= 0x080000000L;
        }
        return l;
    }

    private static int str2Ip(String ip)  {
        String[] ss = ip.split("\\.");
        int a, b, c, d;
        a = Integer.parseInt(ss[0]);
        b = Integer.parseInt(ss[1]);
        c = Integer.parseInt(ss[2]);
        d = Integer.parseInt(ss[3]);
        return (a << 24) | (b << 16) | (c << 8) | d;
    }
}
