# inetd-端口转发

## 基本上有2种方式: 

1；防火墙做Level3路由,实现端口转发。
2；使用 inetd 工具转发，配置规则即可。





# 跳板ECS地址: xxx.xxx.xxx.xxx
# 

	cd tools

# 下载/115KB


	wget https://boutell.com/rinetd/http/rinetd.tar.gz


# 解压

	tar zxf rinetd.tar.gz


# 安装

	cd rinetd/

	sudo mkdir -p /usr/man/man8

	sudo make && sudo make install


# 配置

	sudo vim /etc/rinetd.conf


> 输入以下内容
> 格式:
> 源地址 源端口 目标地址 目标端口


	0.0.0.0 3717 dds-bp126f0e236c4b941.mongodb.rds.aliyuncs.com 3717
	0.0.0.0 3718 dds-bp126f0e236c4b942.mongodb.rds.aliyuncs.com 3717
	logfile /var/log/rinetd.log


# 启动程序


	sudo /usr/sbin/rinetd -c /etc/rinetd.conf





# 查看运行状态

	sudo netstat -tanulp|grep rinetd



# 加入开机启动

	# sudo vim /etc/rc.d/rc.local


	#增加 /usr/sbin/rinetd -c /etc/rinetd.conf


# 注意事项

1. rinetd.conf中绑定的本机端口必须没有被其它程序占用
2. 运行rinetd的系统防火墙应该打开绑定的本机端口


参考:

http://blog.csdn.net/codemanship/article/details/43152909




另外 : firewall-cmd --state

https://havee.me/linux/2015-01/using-firewalls-on-centos-7.html



# 端口转发

在内网机器上执行:

ssh -fCNR 13306:localhost:3307 root@123.57.29.1 -p 10021


在公网机器上执行:

ssh -fCNL "*:3306:localhost:13306" localhost -p 10021






======================

ssh -fCNL "*:3306:localhost:3307" localhost -p 22


sudo vim /etc/sysctl.conf 

net.ipv4.ip_forward = 1  

sudo sysctl -p 


也可以使用 NAT 内网转发


sudo iptables -t nat -A PREROUTING -m tcp -p tcp --dport 3306 -j DNAT --to-destination 192.168.0.70:3307  
sudo iptables -t nat -A POSTROUTING -j MASQUERADE  

