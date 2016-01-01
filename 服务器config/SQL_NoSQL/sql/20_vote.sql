
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