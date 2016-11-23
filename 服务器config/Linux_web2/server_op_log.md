# WEB2服务器操作记录


## 安装 vim

	yum install -y vim



## CentOS 安装与配置 ss

安装

	yum install -y python-setuptools && easy_install pip
	pip install shadowsocks


### 配置 ss


参考: (https://github.com/renfufei/shadowsocks](https://github.com/renfufei/shadowsocks)


	mkdir -p /etc/shadowsocks
	touch /etc/shadowsocks/config.json
	vim /etc/shadowsocks/config.json

> 内容为:

	{
	    "server_port":10086,
	    "local_port":1080,
	    "password":"******",
	    "timeout":600,
	    "method":"aes-256-cfb"
	}


### 增加自动启动脚本

编辑 /etc/rc.local

	vim /etc/rc.local

在末尾增加内容:

	# start shadowsocks
	/usr/bin/ssserver -c /etc/shadowsocks/config.json -d start


### 手动启动:

	/usr/bin/ssserver -c /etc/shadowsocks/config.json -d start

查看端口监听

	netstat -ntlp

其中, `n` 是用数字显示(number), `t` 是 TCP, `l`是监听(listening), `p`是显示进程(process)的意思.

查看有哪个IP在连接10086端口:

	netstat -nat|grep -i "10086"|grep ESTABLISHED|awk '{print $5}'|awk -F: '{print $1}'|awk '!a[$0]++'


## 修改sshd端口号

首先备份:

	sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

然后编辑配置文件:

	vim /etc/ssh/sshd_config

去掉其中下面折行的注释(`#`),修改为想要的端口号:

	#Port 22
	Port 10022

然后保存.

接着重启服务:

	service sshd restart

>(已连接的ssh客户端不会断开^_^).

然后客户端需要修改端口号;重新连接


查看端口监听情况:

	netstat -ntlp



## 安装Docker

参考官方文档: [https://docs.docker.com/engine/installation/linux/centos/](https://docs.docker.com/engine/installation/linux/centos/)

查看系统版本号,要求3.10+:

	uname -r

更新 yum 库：

	sudo yum update -y

下载脚本并执行 docker 安装:

	curl -fsSL https://get.docker.com/ | sh

安装完成后允许 docker 服务启动:

	sudo systemctl enable docker.service

启动 Docker daemon; 守护进程:

	sudo systemctl start docker

简单测试:

	sudo docker run --rm hello-world

设置Docker守护进程自动启动:

	sudo systemctl enable docker

### 卸载:

查看安装的docker

	yum list installed | grep docker

卸载docker安装包

	sudo yum -y remove docker-engine.x86_64
	sudo yum -y remove docker-engine-selinux.noarch

删除 docker 的所有文件:

	rm -rf /var/lib/docker


## 修改主机名

查看IP映射:

	hostname -i

内容为: 

> 10.172.104.25

查看hosts映射:

cat /etc/hosts

内容为:

	127.0.0.1 localhost
	::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
	10.172.104.25 iZrj91tefvghtch6ehzx7qZXXX

修改对应ip地址的名称:


	vim /etc/hosts

内容为:

	10.172.104.25 cnc-web2

然后保存: 按`Esc`键 然后 `:wq`



接着查看 hostname:

	hostname

内容例如:

> iZrj91tefvghtch6ehzx7qZXXX

sudo hostname

临时修改主机名:

sudo hostname cnc-web2

再次查看IP映射:

	hostname -i

永久修改hostname:

	vim /etc/sysconfig/network

修改以下内容(如果没有,则不管):

	#HOSTNAME=iZu1t995fl8ZXXX
	HOSTNAME=cnc-web2



## 听云sys监控服务器配置

参见: [tingyun-sys_config.md](tingyun-sys_config.md)

## 配置Linux-SSH 互信

首先, 配置主机名称:

	vim /etc/hosts

加入以下内容:

	10.172.115.120 cnc-web1
	10.172.104.25 cnc-web2




1、 生成rsa公钥与私钥;

输入以下命令:

	cd ~
	ssh-keygen -t rsa

然后一路输入回车,不需要修改保存路径,也不设置密码。

2、 在目标服务器上创建 `~/.ssh/` 目录:

	ssh root@cnc-web1 mkdir -p .ssh

3、 将自身的公钥添加到目标服务器的授信KEY中:

执行此命令,或者手动在目标服务器添加均可。

	cat .ssh/id_rsa.pub | ssh root@cnc-web1 'cat >> .ssh/authorized_keys'

4、 修改目标机器上相关目录和文件的权限

	ssh root@cnc-web1 "chmod 700 .ssh; chmod 640 .ssh/authorized_keys"

5、 直接登录



因为端口号修改为 10022,所以需要修改 ssh 客户端的默认配置:

	vim /etc/ssh/ssh_config


在 `#Port 22` 下面增加 `Port 10022`, 

然后再执行命令:

	ssh cnc-web1

如果提示：

> Are you sure you want to continue connecting (yes/no)? <u>yes</u>

则输入 yes , 变成  known_hosts 即可。

OK。

参考: [5步配置Linux免登陆](http://www.tecmint.com/ssh-passwordless-login-using-ssh-keygen-in-5-easy-steps/)



## 安装 lrzsz

	yum install -y lrzsz


##  添加swap分区


1.查看系统是否已经启用swap分区


	cat /proc/swaps

或者使用:

	top

2. 创建一个专门的文件用于swap分区

	mkdir -p /data

	dd if=/dev/zero of=/data/swap bs=512 count=4194304

	chmod 600 /data/swap


稍等一会儿(size = bs * count),阿里云的IO现在大约是45MB/s;

(初始化;写N个`0x00`到文件`/data/swap`)

其中, `/dev/zero` 是一个特殊的文件,通过文件系统可以无限读取...NULL 

当然,对应的 `/dev/null` 则是一个写入黑洞, 可以无限写。

3. 将文件格式化为swap分区:

	mkswap /data/swap

4. 查看内核参数vm.swappiness

	cat /proc/sys/vm/swappiness

或者使用:
	
	sysctl -a | grep swappiness  

如果为0则根据实际情况调整成10或者5; 内存1G设置为10,2G设置为5...

	sysctl -w vm.swappiness=10

若想永久修改，则编辑/etc/sysctl.conf文件

	vim /etc/sysctl.conf

修改其中: 

	vm.swappiness=10

5. 启用交换分区的交换功能

	swapon /data/swap

写入fstab

	echo "/data/swap swap swap defaults    0  0" >> /etc/fstab



6. 如何关闭swap分区？

	swapoff /data/swap

	swapoff -a >/dev/null


参考: [阿里云云主机添加swap分区与swap性能优化](http://dgd2010.blog.51cto.com/1539422/1762907)


##  安装 JDK,设置 JAVA_HOME

安装:
	sudo yum list -y java*
	sudo yum install -y java-1.8.0-openjdk*

设置 JAVA_HOME:

	export JAVA_HOME=/etc/alternatives/java_sdk_1.8.0

设置自动配置环境变量:

	jhometip='# add JAVA_HOME'
	jhomescript='export JAVA_HOME=/etc/alternatives/java_sdk_1.8.0'
	sudo echo $jhometip >> /etc/rc.d/rc.local
	sudo echo $jhomescript >> /etc/rc.d/rc.local

查看:

	cat /etc/rc.d/rc.local 
	echo $JAVA_HOME

查看 javac 的版本号:

	$JAVA_HOME/bin/javac -version

OK,设置完成.

如果没有重启,则如果使用其他用户登录 Linux, 可能也需要 export 一下。

##  







参考: [http://blog.csdn.net/renfufei/article/details/52621034](http://blog.csdn.net/renfufei/article/details/52621034)

