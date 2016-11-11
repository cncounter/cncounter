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


