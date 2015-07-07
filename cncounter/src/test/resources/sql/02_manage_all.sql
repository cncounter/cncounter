
-- 

CREATE TABLE `manage_user` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`username` VARCHAR(128) NOT NULL COMMENT '用户名,唯一键',
	`password` VARCHAR(128) NOT NULL COMMENT '密码,加密加盐',
	PRIMARY KEY (`id`),
	UNIQUE INDEX `username` (`username`)
)
COMMENT='后台管理用户表'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

-- 

CREATE TABLE `manage_role` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`role_code` VARCHAR(128) NOT NULL DEFAULT '0' COMMENT '角色编码',
	`role_title` VARCHAR(256) NOT NULL DEFAULT '0' COMMENT '角色名称',
	PRIMARY KEY (`id`),
	UNIQUE INDEX `role_code` (`role_code`)
)
COMMENT='管理员角色'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

-- 

CREATE TABLE `manage_resource` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`resource_title` VARCHAR(256) NOT NULL COMMENT '资源名称',
	`resource_type` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '资源类型ID',
	`parent_id` INT(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '父资源ID',
	`url` VARCHAR(1024) NULL DEFAULT NULL COMMENT '对应的URL,根据type决定',
	`action` VARCHAR(256) NULL DEFAULT NULL COMMENT '对应的action,由type决定',
	PRIMARY KEY (`id`)
)
COMMENT='后台资源，资源也就是权限'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

--

CREATE TABLE `manage_user_role` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`user_id` INT(10) UNSIGNED NOT NULL COMMENT '用户ID',
	`role_id` INT(10) UNSIGNED NOT NULL COMMENT '角色ID',
	PRIMARY KEY (`id`)
)
COMMENT='管理员用户_角色关系表'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;


--

CREATE TABLE `manage_role_res` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增ID',
	`role_id` INT(10) UNSIGNED NOT NULL COMMENT '角色ID',
	`resource_id` INT(10) UNSIGNED NOT NULL COMMENT '资源ID',
	PRIMARY KEY (`id`)
)
COMMENT='角色_资源关系表'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;


















