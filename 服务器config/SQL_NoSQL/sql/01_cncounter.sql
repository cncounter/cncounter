-- 创建数据库 -- 授权
/*
CREATE DATABASE `cncounter` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cncounter`;
-- DROP USER 'cncounter';
CREATE USER 'cncounter'@'%' IDENTIFIED BY 'cncounter';
grant all privileges on cncounter.* to 'cncounter'@'%' identified by 'cncounter';
grant all privileges on cncounter.* to cncounter@localhost identified by 'cncounter';
grant all privileges on cncounter.* to 'cncounter@cnc-web1' identified by 'cncounter';
grant all privileges on cncounter.* to 'cncounter@cnc-web2' identified by 'cncounter';
flush privileges;

*/
