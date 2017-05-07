package com.cncounter.util.storage.qiniu;

import com.cncounter.util.string.StringNumberUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.UploadManager;
import com.qiniu.storage.model.FileInfo;
import com.qiniu.storage.model.FileListing;
import com.qiniu.util.Auth;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * 七牛客户端; 因为存放在公网。所以相关配置，需要有初始化类,从数据库或者其他地方设置。
 */
@Component
public class QiNiuClient {

    private static final Logger logger = LoggerFactory.getLogger(QiNiuClient.class);

    private static volatile String accessKey = null;
    private static volatile String secretKey = null;
    private static volatile String qiniuDomain = null;
    private static volatile String bucketName = null;

    private static volatile Auth auth = null;
    private static AtomicBoolean hasInited = new AtomicBoolean(false);

    private static ThreadLocal<UploadManager> uploadManagerThreadLocal = new ThreadLocal<UploadManager>() {
        @Override
        protected UploadManager initialValue() {
            return new UploadManager();
        }
    };
    private static ThreadLocal<BucketManager> bucketManagerThreadLocal = new ThreadLocal<BucketManager>() {
        @Override
        public BucketManager get() {
            BucketManager bucketManager = super.get();
            if(null == bucketManager && null != getAuth()){
                bucketManager = new BucketManager(auth);
            }
            return bucketManager;
        }
    };

    public QiNiuClient() {
    }

    public void setInitParam(String qiniuDomain, String bucketName,String accessKey, String secretKey){
        setQiniuDomain(qiniuDomain);
        setBucketName(bucketName);
        setAccessKey(accessKey);
        setSecretKey(secretKey);
    }

    public static void checkInit(){
        if(!hasInited.get()){
            init();
        }
    }

    private static synchronized void init() {
        if(hasInited.get()){
            return;
        }
        if(null == accessKey || null == secretKey){
            return;
        }
        // 执行 init 操作
        try {
            auth = Auth.create(accessKey, secretKey);
            hasInited.set(true);
        } catch (Exception e){
            logger.error("QiNiuClient.Auth启动失败: accessKey=" + accessKey+";secretKey="+secretKey, e);
        }
    }

    public boolean deleteFile(String bucket, String key) {
        try {
            getBucketManager().delete(bucket, key);
            return true;
        } catch (QiniuException e) {
            Response r = e.response;
            logger.error("getFileInfo error: {}", r, e);
            return false;
        }
    }

    public BucketFile getFileInfo(String bucket, String key) {
        try {
            //调用stat()方法获取文件的信息
            FileInfo info = getBucketManager().stat(bucket, key);
            return new BucketFile(info);

        } catch (QiniuException e) {
            Response r = e.response;
            logger.error("getFileInfo error: {}", r, e);
        }
        return null;
    }


    public List<BucketFile> listBucketFiles(String bucket) {
        return listBucketFiles(bucket, null, null, 100, null);
    }

    /**
     * 列举指定空间的文件列表
     *
     * @param bucket    空间名
     * @param prefix    文件名前缀
     * @param marker    上一次获取文件列表时返回的 marker
     * @param limit     每次迭代的长度限制，最大1000，推荐值 100
     * @param delimiter 指定目录分隔符，列出所有公共前缀（模拟列出目录效果）。缺省值为空字符串
     * @return
     */
    public List<BucketFile> listBucketFiles(String bucket, String prefix, String marker, Integer limit, String delimiter) {
        List<BucketFile> list = new ArrayList<BucketFile>();
        try {
            FileListing fileListing = getBucketManager().listFiles(bucket, StringNumberUtil.toString(prefix), StringNumberUtil.toString(marker), limit == null ? 1000 : limit, StringNumberUtil.toString(delimiter));
            FileInfo[] items = fileListing.items;
            for (FileInfo file : items) {
                list.add(new BucketFile(file, fileListing.marker));
            }
        } catch (QiniuException e) {
            Response r = e.response;
            logger.error("getFileInfo error: {}", r, e);
        }

        return list;
    }

    public UploadResult upload(String bucketName, String filePath, byte[] byteData) throws IOException {
        try {
            String token = getUploadToken(bucketName);
            Response response = getUploadManager().put(byteData, filePath, token);
            return parseResponse(response);
        } catch (QiniuException e) {
            Response r = e.response;
            logger.error("upload file to qiniu error: {}", r, e);
            return parseResponse(r);
        }
    }

    public UploadResult upload(String bucketName, String filePath, InputStream is) throws IOException {
        try {
            byte[] byteData = IOUtils.toByteArray(is);
            return upload(bucketName, filePath, byteData);
        } finally {
            IOUtils.closeQuietly(is);
        }
    }


    private BucketManager getBucketManager() {
        return bucketManagerThreadLocal.get();
    }

    private UploadManager getUploadManager() {
        return uploadManagerThreadLocal.get();
    }

    private static Auth getAuth() {
        checkInit();
        return auth;
    }

    private String getUploadToken(String bucketName) {
        return getAuth().uploadToken(bucketName);
    }

    private String getUploadToken(String bucketName, String key) {
        //<bucket>:<key>，表示只允许用户上传指定key的文件。在这种格式下文件默认允许“修改”，已存在同名资源则会被本次覆盖。
        return getAuth().uploadToken(bucketName, key);
    }

    private UploadResult parseResponse(Response response) throws IOException {
        UploadResult result = new UploadResult();
        if (response.isOK()) {
            JsonNode jsonNode = new ObjectMapper().readTree(response.body());
            String hash = jsonNode.get("hash").textValue();
            String key = jsonNode.get("key").textValue();
            result.setSuccess(true);
            result.setHash(hash);
            result.setKey(key);
        } else {
            result.setSuccess(false);
            result.setException(new QiNiuResultException(response.error));
        }
        return result;
    }


    public static void setSecretKey(String secretKey) {
        QiNiuClient.secretKey = secretKey;
    }

    public static void setAccessKey(String accessKey) {
        QiNiuClient.accessKey = accessKey;
    }

    public static String getQiniuDomain() {
        return qiniuDomain;
    }

    public static void setQiniuDomain(String qiniuDomain) {
        QiNiuClient.qiniuDomain = qiniuDomain;
    }

    public static String getBucketName() {
        return bucketName;
    }

    public static void setBucketName(String bucketName) {
        QiNiuClient.bucketName = bucketName;
    }



    public static class BucketFile {
        FileInfo fileInfo;

        String marker;

        BucketFile(FileInfo fileInfo) {
            this.fileInfo = fileInfo;
        }

        BucketFile(FileInfo fileInfo, String marker) {
            this.fileInfo = fileInfo;
            this.marker = marker;
        }


        public long getFsize() {
            return fileInfo.fsize;
        }


        public long getPutTime() {
            return fileInfo.putTime;
        }


        public String getMimeType() {
            return fileInfo.mimeType;
        }


        public String getEndUser() {
            return fileInfo.endUser;
        }


        public String getHash() {
            return fileInfo.hash;
        }


        public String getKey() {
            return fileInfo.key;
        }


        public String getMarker() {
            return marker;
        }

        public void setMarker(String marker) {
            this.marker = marker;
        }

        @Override
        public String toString() {
            return "BucketFile{" +
                    "key=" + fileInfo +
                    ", hash='" + getHash() + '\'' +
                    ", fsize='" + getFsize() + '\'' +
                    ", fsize='" + getFsize() + '\'' +
                    ", mimeType='" + getMimeType() + '\'' +
                    ", putTime='" + getPutTime() + '\'' +
                    ", marker='" + getMarker() + '\'' +
                    '}';
        }
    }


    public static class UploadResult {
        String hash;
        String key;

        boolean success;

        QiNiuResultException exception;

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getHash() {
            return hash;
        }

        public void setHash(String hash) {
            this.hash = hash;
        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public QiNiuResultException getException() {
            return exception;
        }

        public void setException(QiNiuResultException exception) {
            this.exception = exception;
        }

        @Override
        public String toString() {
            return "UploadResult{" +
                    "success=" + success +
                    ", key='" + key + '\'' +
                    ", hash='" + hash + '\'' +
                    '}';
        }
    }

    public static class QiNiuResultException extends RuntimeException {
        String errorMessage;

        public QiNiuResultException(String errorMessage) {
            this.errorMessage = errorMessage;
        }

        public QiNiuResultException(Throwable cause, String errorMessage) {
            super(cause);
            this.errorMessage = errorMessage;
        }
    }
}
