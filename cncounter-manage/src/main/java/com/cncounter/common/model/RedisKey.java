package com.cncounter.common.model;

import redis.clients.util.MurmurHash;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;

public class RedisKey implements Serializable {
    private static final long serialVersionUID = 1L;

    //每个业务不同的family
    private String family;

    private String key;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family;
    }

    //物理保存在Redis上的key为经过MurmurHash之后的值
    private String makeRedisHashKey(){
        return String.valueOf(MurmurHash.hash64A(makeRedisKeyStringByte(), 305441741));
    }

    //ReidsKey由family.key组成
    private String makeRedisKeyString(){
        return family +":"+ key;
    }

    private byte[] makeRedisKeyStringByte(){
        String keyStr = makeRedisKeyString();
        byte[] data = new byte[0];
        try {
            data = keyStr.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return data;
    }

    //返回用户的经过Hash之后RedisKey
    public String getRedisKey(){
        return makeRedisHashKey();
    }
}