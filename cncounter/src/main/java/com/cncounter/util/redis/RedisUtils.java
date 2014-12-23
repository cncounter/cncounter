package com.cncounter.util.redis;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.Protocol;
import redis.clients.jedis.exceptions.JedisConnectionException;
import redis.clients.jedis.exceptions.JedisException;
import redis.clients.util.Pool;

import java.io.IOException;
import java.util.Properties;

/**
 * RedisUtils 提供了一个template方法，负责对Jedis连接的获取与归还。
 * JedisAction<T> 和 JedisActionNoResult两种回调接口，适用于有无返回值两种情况。
 * 同时提供一些最常用函数的封装, 如get/set/zadd等。
 */
public class RedisUtils {
    private static Logger logger = LoggerFactory.getLogger(RedisUtils.class);

    private static Pool<Jedis> jedisPool;

    public static final int MAX_IDLE = 32;

    public static final int MAX_TOTAL = 32;

    static {
        try {
            final Properties properties = PropertiesLoaderUtils.loadAllProperties("redis.properties");
            String host = properties.getProperty("redis.host");
            Integer port = Integer.parseInt(properties.getProperty("redis.port")) ;
//            String password = configuration.getString("redis.master.password");
            JedisPoolConfig poolConfig = new JedisPoolConfig();
            poolConfig.setMaxIdle(MAX_IDLE);
            poolConfig.setMaxTotal(MAX_TOTAL);
            poolConfig.setTimeBetweenEvictionRunsMillis(-1);
            jedisPool = new JedisPool(poolConfig, host, port, Protocol.DEFAULT_TIMEOUT);

        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }

    }

    /**
     * 执行有返回结果的action。
     */
    public static <T> T execute(JedisAction<T> jedisAction) throws JedisException {
        Jedis jedis = null;
        boolean broken = false;
        try {
            jedis = jedisPool.getResource();
            return jedisAction.action(jedis);
        } catch (JedisConnectionException e) {
            logger.error("Redis connection lost.", e);
            broken = true;
            throw e;
        } finally {
            closeResource(jedis, broken);
        }
    }

    /**
     * 执行无返回结果的action。
     */
    public static void execute(JedisActionNoResult jedisAction) throws JedisException {
        Jedis jedis = null;
        boolean broken = false;
        try {
            jedis = jedisPool.getResource();
            jedisAction.action(jedis);
        } catch (JedisConnectionException e) {
            logger.error("Redis connection lost.", e);
            broken = true;
            throw e;
        } finally {
            closeResource(jedis, broken);
        }
    }

    /**
     * 根据连接是否已中断的标志，分别调用returnBrokenResource或returnResource。
     */
    protected static void closeResource(Jedis jedis, boolean connectionBroken) {
        if (jedis != null) {
            try {
                if (connectionBroken) {
                    jedisPool.returnBrokenResource(jedis);
                } else {
                    jedisPool.returnResource(jedis);
                }
            } catch (Exception e) {
                logger.error("Error happen when return jedis to pool, try to close it directly.", e);
                closeJedis(jedis);
            }
        }
    }


    /**
     * 有返回结果的回调接口定义。
     */
    public static interface JedisAction<T> {
        T action(Jedis jedis);
    }

    /**
     * 无返回结果的回调接口定义。
     */
    public static interface JedisActionNoResult {
        void action(Jedis jedis);
    }

    // ////////////// 常用方法的封装 ///////////////////////// //

    // ////////////// 公共 ///////////////////////////

    /**
     * 删除key, 如果key存在返回true, 否则返回false。
     */
    public static Boolean del(final String... keys) {
        return null;// execute((Jedis jedis) -> jedis.del(keys) == 1);
    }

    public static void flushDB() {
        //execute((Jedis jedis) -> jedis.flushDB());
    }

    // ////////////// 关于String ///////////////////////////

    /**
     * 如果key不存在, 返回null.
     */
    public static String get(final String key) {
        Jedis jedis = null;
        boolean broken = false;
        try {
            jedis = jedisPool.getResource();
            return null;//((JedisAction<String>) j -> j.get(key)).action(jedis);
        } catch (JedisConnectionException e) {
            logger.error("Redis connection lost.", e);
            broken = true;
            throw e;
        } finally {
            if (jedis != null) {
                try {
                    if (broken) {
                        jedisPool.returnBrokenResource(jedis);
                    } else {
                        jedisPool.returnResource(jedis);
                    }
                } catch (Exception e) {
                    logger.error("Error happen when return jedis to pool, try to close it directly.", e);
                    closeJedis(jedis);
                }
            }
        }


    }

    /**
     * 如果key不存在, 返回null.
     */
    public static Long getAsLong(final String key) {
        String result = get(key);
        return result != null ? Long.valueOf(result) : null;
    }

    /**
     * 如果key不存在, 返回null.
     */
    public static Integer getAsInt(final String key) {
        String result = get(key);
        return result != null ? Integer.valueOf(result) : null;
    }

    public static void set(final String key, final String value) {
        //execute((Jedis jedis) -> jedis.set(key, value));
    }

    public static void setex(final String key, final String value, final int seconds) {
        //execute((Jedis jedis) -> jedis.setex(key, seconds, value));
    }

    /**
     * 如果key还不存在则进行设置，返回true，否则返回false.
     */
    public static Boolean setnx(final String key, final String value) {
        return null;//execute((Jedis jedis) -> jedis.setnx(key, value) == 1);
    }

    public static Long incr(final String key) {
        return null;//execute((Jedis jedis) -> jedis.incr(key));
    }

    public static Long decr(final String key) {
        return null;//execute((Jedis jedis) -> jedis.decr(key));
    }

    // ////////////// 关于List ///////////////////////////
    public static void lpush(final String key, final String... values) {
        //execute((Jedis jedis) -> jedis.lpush(key, values));
    }

    public static String rpop(final String key) {
        return null;//execute((Jedis jedis) -> jedis.rpop(key));
    }

    /**
     * 返回List长度, key不存在时返回0，key类型不是list时抛出异常.
     */
    public static Long llen(final String key) {
        return null;//execute((Jedis jedis) -> jedis.llen(key));
    }

    /**
     * 删除List中的第一个等于value的元素，value不存在或key不存在时返回false.
     */
    public static Boolean lremOne(final String key, final String value) {
        return null;
        /*execute((Jedis jedis) -> {
            Long count = jedis.lrem(key, 1, value);
            return (count == 1);
        });*/
    }

    /**
     * 删除List中的所有等于value的元素，value不存在或key不存在时返回false.
     */
    public static Boolean lremAll(final String key, final String value) {
        return null;/*execute((Jedis jedis) -> {
            Long count = jedis.lrem(key, 0, value);
            return (count > 0);
        });*/
    }

    // ////////////// 关于Sorted Set ///////////////////////////

    /**
     * 加入Sorted set, 如果member在Set里已存在, 只更新score并返回false, 否则返回true.
     */
    public static Boolean zadd(final String key, final String member, final double score) {
        return null;//execute((Jedis jedis) -> jedis.zadd(key, score, member) == 1);
    }

    /**
     * 删除sorted set中的元素，成功删除返回true，key或member不存在返回false。
     */
    public static Boolean zrem(final String key, final String member) {
        return null;//execute((Jedis jedis) -> jedis.zrem(key, member) == 1);
    }

    /**
     * 当key不存在时返回null.
     */
    public static Double zscore(final String key, final String member) {
        return null;//execute((Jedis jedis) -> jedis.zscore(key, member));
    }

    /**
     * 返回sorted set长度, key不存在时返回0.
     */
    public static Long zcard(final String key) {
        return null;//execute((Jedis jedis) -> jedis.zcard(key));
    }

    private static void closeJedis(Jedis jedis) {
        if ((jedis != null) && jedis.isConnected()) {
            try {
                try {
                    jedis.quit();
                } catch (Exception e) {
                    logger.error(e.getMessage(), e);
                }
                jedis.disconnect();
            } catch (Exception e) {
                logger.error(e.getMessage(), e);
            }
        }
    }

}
