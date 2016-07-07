# 云服务器快速部署文档(CentOS-7.2x64)

# 1. 安装JDK

yum install -y java-1.8.0-openjdk*


# 2. 安装Tomcat


mkdir -p  /usr/local/download
cd /usr/local/download
wget -O apache-tomcat-8.0.36.tar.gz  http://mirrors.cnnic.cn/apache/tomcat/tomcat-8/v8.0.36/bin/apache-tomcat-8.0.36.tar.gz

## 2.1 解压

tar zxf apache-tomcat-8.0.36.tar.gz

mv /usr/local/download/apache-tomcat-8.0.36 /usr/local/tomcat8



# 3. 安装 Nginx



# 4. 安装MariaDB



# 5. 配置


# 等待完善

