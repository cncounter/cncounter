# 听云sys监控服务器配置

# 0. 创建目录

mkdir -p /usr/local/tools/tingyun

cd /usr/local/tools/tingyun

# 1. download
wget http://download.networkbench.com/agent/system/1.1.1/tingyun-agent-system-1.1.1.x86_64.rpm?a=1479089111314 -O tingyun-agent-system-1.1.1.x86_64.rpm

# 2. 执行rpm安装

sudo rpm -Uvh tingyun-agent-system-1.1.1.x86_64.rpm

# 3. 设置授权序号

sudo /usr/local/bin/nbsys-config nbs.license_key=f69dab90e1e75cf3ad1537d771a5ec86

# 4. 启动守护进程

sudo service nbsysd start

# 5. 卸载、重装

停止服务:

	sudo service nbsysd stop

卸载服务:

	chkconfig --del nbsysd

查看:

	rpm -qa | grep tingyun

卸载:

	rpm -e tingyun-agent-system-1.1.1-1.x86_64


查看是否有进程:

	ps -ef | grep nbsysd


重新安装: ...


# 参考地址:

# https://report.tingyun.com/sys/server/48108/overview
