# 安装git-Maven

1、yum 安装 GIT 客户端的命令

	sudo yum install git -y

1.1 查看帮助

	git --help


2、设置

	git config --global user.name "renfufei"
	git config --global user.email "renfufei@qq.com"

3、 查看GIT配置

	git config --list

4、克隆项目

	
	mkdir -p /usr/local/cncounter_webapp/git_source
	cd /usr/local/cncounter_webapp/git_source
	
	git clone -b v0.0.3 https://github.com/cncounter/cncounter.git

	cd /usr/local/cncounter_webapp/git_source/cncounter
	

5、下载、安装 MAVEN

	mkdir -p /usr/local/download
	cd /usr/local/download
	wget http://mirrors.cnnic.cn/apache/maven/maven-3/3.5.2/binaries/apache-maven-3.5.2-bin.tar.gz


	cd /usr/local/download
	tar xzvf apache-maven-3.5.2-bin.tar.gz
	mv apache-maven-3.5.2 /usr/local/apache-maven-3.5.2


6、查找并设置 JAVA_HOME

请参考 [http://blog.csdn.net/renfufei/article/details/52621034](http://blog.csdn.net/renfufei/article/details/52621034)



7、配置 MAVEN 到 PATH

	export PATH=/usr/local/apache-maven-3.5.2/bin:$PATH

7.1 加入启动目录

	mvnpathtip='# add MVN_PATH'
	mvnpathscript='export PATH=/usr/local/apache-maven-3.5.2/bin:$PATH'
	sudo echo $mvnpathtip >> /etc/profile
	sudo echo $mvnpathscript >> /etc/profile
	sudo source /etc/profile


8、查看 MAVEN 安装状态

	cd ~
	mvn -v

9、执行编译


	cd /usr/local/cncounter_webapp/git_source/cncounter
	git pull
	cd /usr/local/cncounter_webapp/git_source/cncounter/cncounter-web
	mvn clean package -P prod -U -DskipTests


10、重启

cd /usr/local/cncounter_webapp/
/usr/local/tomcat7/bin/shutdown.sh 

cd /usr/local/cncounter_webapp/
rm cncounter-web.war.BAK -f
mv cncounter-web.war cncounter-web.war.BAK

rm BAK_cncounter-web -rf 
mv cncounter-web BAK_cncounter-web 


cd /usr/local/cncounter_webapp/

cp ./git_source/cncounter/cncounter-web/target/cncounter-web.war  ./

unzip cncounter-web.war -d cncounter-web


/usr/local/tomcat7/bin/startup.sh 

ping localhost -c 2

netstat -ntl | grep 8080 

tail -n 500 -f /usr/local/tomcat7/logs/catalina.out 








