package com.cncounter.manage.dao.redis.api;

import com.cncounter.common.model.RedisKey;

import java.util.ArrayList;

/**
 * 参考: http://blog.csdn.net/yfkiss/article/details/38944179#
 */
public interface RedisUseInterface{
    /**
     * 通过RedisKey获取value
     *
     * @param redisKey
     *           redis中的key
     * @return
     *           成功返回value,查询不到返回NULL
     */
    public String get(final RedisKey redisKey) throws Exception;

    /**
     * 插入<k,v>数据到Redis
     *
     * @param redisKey
     *           the redis key
     * @param value
     *           the redis value
     * @return
     *           成功返回"OK",插入失败返回NULL
     */
    public String set(final RedisKey redisKey, final String value) throws Exception;

    /**
     * 批量写入数据到Redis
     *
     * @param redisKeys
     *           the redis key list
     * @param values
     *           the redis value list
     * @return
     *           成功返回"OK",插入失败返回NULL
     */
    public String mset(final ArrayList<RedisKey> redisKeys, final ArrayList<String> values) throws Exception;


    /**
     * 从Redis中删除一条数据
     *
     * @param redisKey
     *           the redis key
     * @return
     *           an integer greater than 0 if one or more keys were removed 0 if none of the specified key existed
     */
    public Long del(RedisKey redisKey) throws Exception;

    /**
     * 从Redis中批量删除数据
     *
     * @param redisKeys
     *           the redis key
     * @return
     *           返回成功删除的数据条数
     */
    public Long del(ArrayList<RedisKey> redisKeys) throws Exception;

    /**
     * 插入<k,v>数据到Redis
     *
     * @param redisKey
     *           the redis key
     * @param value
     *           the redis value
     * @return
     *           成功返回"OK",插入失败返回NULL
     */
    public String setByte(final RedisKey redisKey, final byte[] value) throws Exception;

    /**
     * 插入<k,v>数据到Redis
     *
     * @param redisKey
     *           the redis key
     * @param value
     *           the redis value
     * @return
     *           成功返回"OK",插入失败返回NULL
     */
    public String setByte(final String redisKey, final byte[] value) throws Exception;

    /**
     * 通过RedisKey获取value
     *
     * @param redisKey
     *           redis中的key
     * @return
     *           成功返回value,查询不到返回NULL
     */
    public byte[] getByte(final RedisKey redisKey) throws Exception;

    /**
     * 在指定key上设置超时时间
     *
     * @param redisKey
     *           the redis key
     * @param seconds
     *           the expire seconds
     * @return
     *           1:success, 0:failed
     */
    public Long expire(RedisKey redisKey, int seconds) throws Exception;
}
