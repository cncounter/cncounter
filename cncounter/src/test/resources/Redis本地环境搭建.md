Redis本地环境搭建
==


## Windows 下环境搭建

### 1. 设置hosts

	set duapphosts=127.0.0.1        sqld.duapp.com
	set redisduapphosts=127.0.0.1        redis.duapp.com
	echo %duapphosts% >> C:\Windows\System32\drivers\etc\hosts
	echo %redisduapphosts% >> C:\Windows\System32\drivers\etc\hosts

### 2. 下载Redis-Windows版本

Redis官网下载页面: [http://redis.io/download](http://redis.io/download)

Windows下Redis项目: [https://github.com/MSOpenTech/redis](https://github.com/MSOpenTech/redis)

在releases页面找到并下载最新的ZIP包: [https://github.com/MSOpenTech/redis/releases](https://github.com/MSOpenTech/redis/releases)

### 3. 解压安装

加压下载后的文件 `redis-2.8.17.zip` 到 redis-2.8.17 目录. 例如: `D:\DevlopPrograms\redis-2.8.17`.

如果需要简单测试一下, 鼠标双击 `redis-server.exe`即可,如果没错, 稍后会弹出命令行窗口显示执行状态. 

如果不是 Administrator用户,则可能需要以管理员身份运行. 或者参考 [Windows 7 启用超级管理员administrator账户的N种方法](http://tieba.baidu.com/p/1262871133)

简单测试,则使用 `redis-cli.exe` 即可, 打开后会自动连接上本机服务器. 可以输入 `info` 查看服务器信息.

如果要进行基准测试,可以启动服务器后,在cmd中运行 `redis-benchmark.exe` 程序.

### 4. 启动与注册服务

如果准备长期使用,则需要注册为系统服务.

进入CMD,切换目录:

	D:
	cd D:\DevlopPrograms\redis-2.8.17

注册服务,可以保存为 service-install.bat 文件:

	redis-server.exe --service-install redis.windows.conf --loglevel verbose
	redis-server --service-start

卸载服务, 可以保存为 uninstall-service 文件.: 

	redis-server --service-stop
	redis-server --service-uninstall

可以在注册服务时,通过 `–service-name redisService1 ` 参数直接指定服务名,适合安装多个实例的情况,卸载也是同样的道理.

启动redis服务器时也可以直接指定配置文件,可以保存为 startup.bat 文件:

	redis-server.exe redis.windows.conf


当然,指定了配置文件以后,可能会碰到启动失败的问题.此时,请修改配置文件,指定 maxheap 参数.

### 5. 修改配置文件

修改配置文件`redis.windows.conf`,如果有中文,请另存为UTF-8编码.

	# 修改端口号
	# port 6379
	port 80

	# 指定访问密码
	# requirepass foobared
	requirepass 6EhSiGpsmSMRyZieglUImkTr-eoNRNBgRk397mVyu66MHYuZDsepCeZ8A-MHdLBQwQQVQiHBufZbPa

	# 设置最大堆内存限制
	# maxheap <bytes>
	maxheap 512000000

此时,如果用客户端来访问,可以使用如下cmd命令:

可以保存为 client.bat 文件.

	redis-cli.exe -h redis.duapp.com -p 80 -a 6EhSiGpsmSMRyZieglUImkTr-eoNRNBgRk397mVyu66MHYuZDsepCeZ8A-MHdLBQwQQVQiHBufZbPa


### 6. 其他附加

管理工具: RedisStudio: [https://github.com/cinience/RedisStudio](https://github.com/cinience/RedisStudio)

当然,目录里面也有一些word文档, 有兴趣可以读一读.

更多信息,请参考: [renfufei的专栏-Redis: http://blog.csdn.net/renfufei/article/category/2470713](http://blog.csdn.net/renfufei/article/category/2470713)
