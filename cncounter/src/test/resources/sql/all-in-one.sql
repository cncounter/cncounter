-- 创建数据库 -- 授权
/*
CREATE DATABASE `cncounter` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cncounter`;
-- DROP USER 'cncounter';
CREATE USER 'cncounter'@'%' IDENTIFIED BY 'cncounter';
grant all privileges on cncounter.* to 'cncounter'@'%' identified by 'cncounter';
flush privileges;

*/



-- 10_hotword.sql
CREATE TABLE `hotword` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`word` VARCHAR(256) NOT NULL COMMENT '词条',
	`keyword` VARCHAR(256) NULL DEFAULT NULL COMMENT '关键字,以逗号分隔',
	`category` VARCHAR(256) NULL DEFAULT NULL COMMENT '分类',
	`title` VARCHAR(512) NULL DEFAULT NULL COMMENT '标题,如果有',
	`content` LONGTEXT NULL COMMENT '内容及说明',
	`starttime` DATETIME NULL DEFAULT NULL COMMENT '开始流行的时间',
	`endtime` DATETIME NULL DEFAULT NULL COMMENT '流行的时间段',
	`hottimedesc` VARCHAR(256) NULL DEFAULT NULL COMMENT '流行的时间段说明',
	`createuserid` VARCHAR(256) NULL DEFAULT NULL COMMENT '创建者ID',
	`createtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`gen` INT(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '分代,后期使用',
	PRIMARY KEY (`id`)
)
COMMENT='网络热词'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;


-- 20_vote.sql

CREATE TABLE `vote` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`title` VARCHAR(512) NOT NULL DEFAULT '' COMMENT '标题',
	`keyword` VARCHAR(256) NULL DEFAULT NULL COMMENT '关键字,以逗号分隔',
	`category` VARCHAR(256) NULL DEFAULT NULL COMMENT '分类',
	`features` VARCHAR(256) NULL DEFAULT NULL COMMENT '特性,留待后期使用',
	`multiselect` int(10) NULL DEFAULT 0 COMMENT '是否多选,0为否,1为是',
	`reelect` int(10) NULL DEFAULT 0 COMMENT '是否允许改选,0为否,1为是',
	`onceperuser` int(10) NULL DEFAULT 0 COMMENT '是否每个用户/IP只能投票一次,0为否,1为是',
	`votetimeout` int(10) NULL DEFAULT 0 COMMENT '多次投票间隔期限',
	`anonymous` int(10) NULL DEFAULT 0 COMMENT '是否允许匿名,0为否,1为是',
	`content` LONGTEXT NULL COMMENT '内容及说明',
	`starttime` DATETIME NULL DEFAULT NULL COMMENT '开始时间',
	`endtime` DATETIME NULL DEFAULT NULL COMMENT '结束时间,没有则留空',
	`votetimedesc` VARCHAR(256) NULL DEFAULT NULL COMMENT '投票时间段说明',
	`createuserid` VARCHAR(256) NULL DEFAULT NULL COMMENT '创建者ID',
	`createtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`gen` INT(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '分代,后期使用',
	PRIMARY KEY (`id`)
)
COMMENT='投票主表'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;


CREATE TABLE `voteoption` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`voteid` INT(10) UNSIGNED NOT NULL COMMENT '投票主表ID',
	`title` VARCHAR(512) NULL DEFAULT NULL COMMENT '标题,如果有',
	`content` LONGTEXT NULL COMMENT '内容及说明',
	`createuserid` VARCHAR(256) NULL DEFAULT NULL COMMENT '创建者ID',
	`createtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`gen` INT(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '分代,后期使用',
	PRIMARY KEY (`id`)
)
COMMENT='投票细节选项表'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;


CREATE TABLE `voterecord` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`voteid` INT(10) UNSIGNED NOT NULL COMMENT '投票主表ID',
	`voteoptionid` INT(10) UNSIGNED NOT NULL COMMENT '投票选项ID',
	`userid` VARCHAR(256) NULL DEFAULT NULL COMMENT '投票者ID',
	`userip` VARCHAR(256) NULL DEFAULT NULL COMMENT '投票者IP地址',
	`anonymous` int(10) NULL DEFAULT 0 COMMENT '是否匿名投票,0为否,1为是',
	`remark` VARCHAR(512) NULL DEFAULT NULL COMMENT '说明信息,如果有',
	`createtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`gen` INT(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '分代,后期使用',
	PRIMARY KEY (`id`)
)
COMMENT='投票记录表'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

-- 30_user.sql
-- 用户表
CREATE TABLE `user` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`username` VARCHAR(256) NOT NULL COMMENT '用户名',
	`password` VARCHAR(256) NOT NULL COMMENT '密码,加密后的',
	`usertype` INT(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '用户类别,1为普通用户,100为管理员',
	`email` VARCHAR(256) NOT NULL COMMENT '邮箱',
	`mobile` VARCHAR(256) NULL COMMENT '手机号',
	`realname` VARCHAR(256) NULL DEFAULT NULL COMMENT '真实姓名',
	`title` VARCHAR(512) NULL DEFAULT NULL COMMENT '职称，称呼',
	`createuserid` VARCHAR(256) NULL DEFAULT NULL COMMENT '创建者ID',
	`createtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`gen` INT(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '分代,后期使用',
	PRIMARY KEY (`id`)
)
COMMENT='用户'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;


insert into user(username, password, usertype, email, realname)
 values ('cncounter', md5(md5('cncounter')), 100, 'renfufei@qq.com', '天朝计数器' );



-- 40_favorite.sql
-- 收藏表
CREATE TABLE `favorite` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`userid` VARCHAR(256) NULL COMMENT '用户ID',
	`type` INT(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '类别,0为首页通用',
	`title` VARCHAR(512) NULL DEFAULT NULL COMMENT '标题',
	`content` VARCHAR(2048) NULL DEFAULT NULL COMMENT '内容',
	`url` VARCHAR(1024) NULL DEFAULT NULL COMMENT '链接',
	`createuserid` VARCHAR(256) NULL DEFAULT NULL COMMENT '创建者ID',
	`createtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	`gen` INT(10) UNSIGNED NOT NULL DEFAULT 1 COMMENT '分代,后期使用',
	PRIMARY KEY (`id`)
)
COMMENT='收藏'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

