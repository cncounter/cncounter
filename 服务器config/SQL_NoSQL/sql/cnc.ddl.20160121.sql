
-- 导出  表 cncounter.favorite 结构
CREATE TABLE IF NOT EXISTS `favorite` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_id` varchar(256) DEFAULT NULL COMMENT '用户ID',
  `type` int(8) unsigned NOT NULL DEFAULT '0' COMMENT '类别,0为首页通用',
  `title` varchar(512) DEFAULT NULL COMMENT '标题',
  `content` varchar(2048) DEFAULT NULL COMMENT '内容',
  `url` varchar(1024) DEFAULT NULL COMMENT '链接',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新数据',
  `version` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收藏';




-- 导出  表 cncounter.hotword 结构
CREATE TABLE IF NOT EXISTS `hotword` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `word` varchar(64) NOT NULL COMMENT '词条',
  `key_word` varchar(256) DEFAULT NULL COMMENT '关键字,以逗号分隔,要抽出来成为tag',
  `category` varchar(256) DEFAULT NULL COMMENT '分类',
  `title` varchar(512) DEFAULT NULL COMMENT '标题,如果有',
  `content` longtext COMMENT '内容及说明',
  `start_time` datetime DEFAULT NULL COMMENT '开始流行的时间',
  `end_time` datetime DEFAULT NULL COMMENT '流行的时间段',
  `hot_time_desc` varchar(256) DEFAULT NULL COMMENT '流行的时间段说明',
  `create_user_id` varchar(256) DEFAULT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新数据',
  `version` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='网络热词';




-- 导出  表 cncounter.manage_user 结构
CREATE TABLE IF NOT EXISTS `manage_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `password` varchar(256) NOT NULL COMMENT '密码,加密后的',
  `salt_password` varchar(16) NOT NULL COMMENT '密码盐,随机数',
  `user_type` int(8) unsigned DEFAULT '0' COMMENT '用户类别,0为普通用户,100为管理员',
  `email` varchar(64) NOT NULL COMMENT '邮箱',
  `mobile` varchar(64) DEFAULT NULL COMMENT '手机号',
  `real_name` varchar(64) DEFAULT NULL COMMENT '真实姓名',
  `title` varchar(64) DEFAULT NULL COMMENT '职称，称呼',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `version` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员用户';




-- 导出  表 cncounter.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `password` varchar(256) NOT NULL COMMENT '密码,加密后的',
  `salt_password` varchar(16) NOT NULL COMMENT '密码盐,随机数',
  `user_type` int(8) unsigned DEFAULT '0' COMMENT '用户类别,0为普通用户,100为管理员',
  `email` varchar(64) NOT NULL COMMENT '邮箱',
  `mobile` varchar(64) DEFAULT NULL COMMENT '手机号',
  `real_name` varchar(64) DEFAULT NULL COMMENT '真实姓名',
  `title` varchar(64) DEFAULT NULL COMMENT '职称，称呼',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `version` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户';




-- 导出  表 cncounter.vote_item 结构
CREATE TABLE IF NOT EXISTS `vote_item` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `vote_topic_id` bigint(20) unsigned NOT NULL COMMENT '投票主题ID',
  `title` varchar(512) DEFAULT NULL COMMENT '标题,如果有',
  `content` longtext COMMENT '内容及说明',
  `create_user_id` varchar(256) DEFAULT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新数据',
  `version` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投票题目';




-- 导出  表 cncounter.vote_option 结构
CREATE TABLE IF NOT EXISTS `vote_option` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `vote_topic_id` bigint(20) unsigned NOT NULL COMMENT '投票主表ID',
  `vote_item_id` bigint(20) unsigned NOT NULL COMMENT '投票题目ID',
  `title` varchar(512) DEFAULT NULL COMMENT '标题,如果有',
  `content` longtext COMMENT '内容及说明',
  `create_user_id` varchar(256) DEFAULT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新数据',
  `version` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投票细节选项表';




-- 导出  表 cncounter.vote_record 结构
CREATE TABLE IF NOT EXISTS `vote_record` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `vote_topic_id` bigint(20) unsigned NOT NULL COMMENT '投票主题ID',
  `vote_item_id` bigint(20) unsigned NOT NULL COMMENT '投票题目ID',
  `vote_option_id` bigint(20) unsigned NOT NULL COMMENT '投票选项ID',
  `user_id` bigint(20) DEFAULT NULL COMMENT '投票者ID',
  `user_ip` varchar(256) DEFAULT NULL COMMENT '投票者IP地址',
  `anonymous` int(10) DEFAULT '0' COMMENT '是否匿名投票,0为否,1为是',
  `remark` varchar(512) DEFAULT NULL COMMENT '说明信息,如果有',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `version` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投票记录';




-- 导出  表 cncounter.vote_topic 结构
CREATE TABLE IF NOT EXISTS `vote_topic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `title` varchar(512) NOT NULL DEFAULT '' COMMENT '标题',
  `keyword` varchar(256) DEFAULT NULL COMMENT '关键字,以逗号分隔',
  `category` varchar(256) DEFAULT NULL COMMENT '分类',
  `features` varchar(256) DEFAULT NULL COMMENT '特性,留待后期使用',
  `multiselect` int(8) DEFAULT '0' COMMENT '是否多选,0为否,1为是',
  `reselectable` int(8) DEFAULT '0' COMMENT '是否允许改选,0为否,1为是',
  `onceperuser` int(8) DEFAULT '0' COMMENT '是否每个用户/IP只能投票一次,0为否,1为是',
  `votetimeout` int(8) DEFAULT '0' COMMENT '多次投票间隔期限',
  `anonymous` int(8) DEFAULT '0' COMMENT '是否允许匿名,0为否,1为是',
  `content` longtext COMMENT '内容及说明',
  `starttime` datetime DEFAULT NULL COMMENT '开始时间',
  `endtime` datetime DEFAULT NULL COMMENT '结束时间,没有则留空',
  `votetimedesc` varchar(256) DEFAULT NULL COMMENT '投票时间段说明',
  `create_user_id` varchar(256) DEFAULT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `version` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投票主题';


