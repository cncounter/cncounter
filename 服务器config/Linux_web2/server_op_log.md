# WEB2服务器操作记录


## 安装 vim

	yum install -y vim


## CentOS 安装 ss

	yum install -y python-setuptools && easy_install pip
	pip install shadowsocks


## 配置 ss


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


## 增加自动启动脚本

编辑 /etc/rc.local

	vim /etc/rc.local

在末尾增加内容:

	# start shadowsocks
	/usr/bin/ssserver -c /etc/shadowsocks/config.json -d start


## 手动启动:

	/usr/bin/ssserver -c /etc/shadowsocks/config.json -d start

## 查看端口监听

	netstat -ntlp

其中, `n` 是用数字显示(number), `t` 是 TCP, `l`是监听(listening), `p`是显示进程(process)的意思.

查看有哪个IP在连接10086端口:

	netstat -nat|grep -i "10086"|grep ESTABLISHED|awk '{print $5}'|awk -F: '{print $1}'|awk '!a[$0]++'


