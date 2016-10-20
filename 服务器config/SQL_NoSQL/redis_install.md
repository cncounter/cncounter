# Redis单机版简单安装脚本

>  下载地址:   [http://redis.io/download](http://redis.io/download)

Redis版本列表: [http://download.redis.io/releases/](http://download.redis.io/releases/)



当前3.2安装有些问题,使用 2.8版本(2016年10月20日):

## 1. 下载:

	cd /home/data

	wget http://download.redis.io/releases/redis-2.8.24.tar.gz

## 2. 编译:

	tar xzf redis-2.8.24.tar.gz
	cd redis-2.8.24
	make

> 如果没有gcc, make 报错,可以使用:
>
> `make MALLOC=libc`

## 3. 启动:

	src/redis-server &


## 4. 客户端操作

打开客户端:

	src/redis-cli

查看信息:

	127.0.0.1:6379> 

	info

简单测试:

	set name ybs

	get name


## 5. 关闭服务器:

参考:  [http://redisdoc.com/server/shutdown.html](http://redisdoc.com/server/shutdown.html)

SHUTDOWN [SAVE|NOSAVE]

打开客户端,连上Redis服务器,执行关闭服务器命令:

	SHUTDOWN


退出客户端:

	exit

或者 `CTRL + C`


## 6. 加入自动启动脚本:

	redistip='# start redis'
	redisscript='/home/data/redis-2.8.24/src/redis-server &'
	sudo echo $redispathtip >> /etc/rc.d/rc.local
	sudo echo $redisscript  >> /etc/rc.d/rc.local
	sudo source /etc/rc.d/rc.local

## 7. 帮助信息

版本 2.8 的帮助信息如下:

	src/redis-server --help

	Usage: ./redis-server [/path/to/redis.conf] [options]
	       ./redis-server - (read config from stdin)
	       ./redis-server -v or --version
	       ./redis-server -h or --help
	       ./redis-server --test-memory <megabytes>
	
	Examples:
	       ./redis-server (run the server with default conf)
	       ./redis-server /etc/redis/6379.conf
	       ./redis-server --port 7777
	       ./redis-server --port 7777 --slaveof 127.0.0.1 8888
	       ./redis-server /etc/myredis.conf --loglevel verbose
	
	Sentinel mode:
	       ./redis-server /etc/sentinel.conf --sentinel

## 其他信息

参考地址:  [http://redis.io/download](http://redis.io/download)



Windows安装请参考:  [http://blog.csdn.net/renfufei/article/details/38474435](http://blog.csdn.net/renfufei/article/details/38474435)



