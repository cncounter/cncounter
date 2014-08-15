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
