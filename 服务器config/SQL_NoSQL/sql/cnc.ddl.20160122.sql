
-- 导出  表 cncounter.dict_common 结构
CREATE TABLE IF NOT EXISTS `dict_common` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `dict_code` varchar(64) NOT NULL COMMENT '编码',
  `dict_desc` varchar(64) NOT NULL COMMENT '名称',
  `category_code` varchar(64) NOT NULL COMMENT '分类编码',
  `category_desc` varchar(64) DEFAULT NULL COMMENT '分类说明',
  `sort_no` int(8) unsigned NOT NULL DEFAULT '999' COMMENT '排序编号',
  `data_type` varchar(64) NOT NULL DEFAULT 'STRING' COMMENT '数据类型',
  `remark` varchar(128) DEFAULT NULL COMMENT '附加说明',
  `locate_code` varchar(64) DEFAULT NULL COMMENT '检索标识',
  `create_id` bigint(20) unsigned DEFAULT '0' COMMENT '创建人ID',
  `update_id` bigint(20) unsigned DEFAULT '0' COMMENT '修改人ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `version` int(8) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
  PRIMARY KEY (`id`),
  UNIQUE KEY `dict_code_category_code` (`dict_code`,`category_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='通用数据字典';




-- 导出  表 cncounter.favorite 结构
CREATE TABLE IF NOT EXISTS `favorite` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_id` varchar(256) DEFAULT NULL COMMENT '用户ID',
  `type` int(8) unsigned NOT NULL DEFAULT '0' COMMENT '类别,0为首页通用',
  `title` varchar(512) DEFAULT NULL COMMENT '标题',
  `content` varchar(2048) DEFAULT NULL COMMENT '内容',
  `url` varchar(1024) DEFAULT NULL COMMENT '链接',
  `sort_number` INT(8) NOT NULL DEFAULT '0' COMMENT '排序号',
  `create_id` bigint(20) unsigned DEFAULT NULL COMMENT '创建者ID',
  `update_id` bigint(20) unsigned DEFAULT NULL COMMENT '更新者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `version` int(8) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
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
  `create_id` bigint(20) unsigned DEFAULT NULL COMMENT '创建者ID',
  `upfate_id` bigint(20) unsigned DEFAULT NULL COMMENT '更新者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新数据',
  `version` int(8) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='网络热词';




-- 导出  表 cncounter.manage_resource 结构
CREATE TABLE IF NOT EXISTS `manage_resource` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `resource_title` varchar(256) NOT NULL COMMENT '资源名称',
  `resource_type` int(8) unsigned NOT NULL DEFAULT '0' COMMENT '资源类型ID',
  `parent_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '父资源ID',
  `url` varchar(1024) DEFAULT NULL COMMENT '对应的URL,根据type决定',
  `action` varchar(256) DEFAULT NULL COMMENT '对应的action,由type决定',
  `view_flag` varchar(256) DEFAULT NULL COMMENT '视图层权限标识符',
  `remark` varchar(256) DEFAULT NULL COMMENT '备注',
  `sort_no` int(8) unsigned NOT NULL DEFAULT '999' COMMENT '排序编号',
  `create_id` bigint(20) unsigned DEFAULT NULL COMMENT '创建者ID',
  `update_id` bigint(20) unsigned DEFAULT NULL COMMENT '最后更新者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  `version` int(8) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='后台资源，资源也就是权限';




-- 导出  表 cncounter.manage_role 结构
CREATE TABLE IF NOT EXISTS `manage_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `role_code` varchar(128) NOT NULL DEFAULT '0' COMMENT '角色编码',
  `role_title` varchar(256) NOT NULL DEFAULT '0' COMMENT '角色名称',
  `sort_no` int(8) unsigned DEFAULT '9999' COMMENT '排序编号',
  `create_id` bigint(20) unsigned DEFAULT NULL COMMENT '创建者ID',
  `update_id` bigint(20) unsigned DEFAULT NULL COMMENT '最后更新者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  `version` int(8) DEFAULT '0' COMMENT '乐观锁版本号',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_code` (`role_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员角色';




-- 导出  表 cncounter.manage_role_res 结构
CREATE TABLE IF NOT EXISTS `manage_role_res` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `role_id` bigint(20) unsigned NOT NULL COMMENT '角色ID',
  `resource_id` bigint(20) unsigned NOT NULL COMMENT '资源ID',
  `create_id` bigint(20) unsigned DEFAULT NULL COMMENT '创建者ID',
  `update_id` bigint(20) unsigned DEFAULT NULL COMMENT '最后更新者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  `version` int(8) DEFAULT '0' COMMENT '乐观锁版本号',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_id_resource_id` (`role_id`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色_资源关系表';




-- 导出  表 cncounter.manage_user 结构
CREATE TABLE IF NOT EXISTS `manage_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `password` varchar(256) NOT NULL COMMENT '密码,加密后的',
  `salt` varchar(16) NOT NULL COMMENT '密码盐,随机数',
  `user_type` int(8) unsigned DEFAULT '0' COMMENT '用户类别,0为普通用户,100为管理员',
  `email` varchar(64) NOT NULL COMMENT '邮箱',
  `mobile` varchar(64) DEFAULT NULL COMMENT '手机号',
  `real_name` varchar(64) DEFAULT NULL COMMENT '真实姓名',
  `title` varchar(64) DEFAULT NULL COMMENT '职称，称呼',
  `create_id` bigint(20) unsigned DEFAULT NULL COMMENT '创建者ID',
  `update_id` bigint(20) unsigned DEFAULT NULL COMMENT '更新者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `version` int(8) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员用户';




-- 导出  表 cncounter.manage_user_role 结构
CREATE TABLE IF NOT EXISTS `manage_user_role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_id` bigint(20) unsigned NOT NULL COMMENT '用户ID',
  `role_id` bigint(20) unsigned NOT NULL COMMENT '角色ID',
  `create_id` bigint(20) unsigned DEFAULT NULL COMMENT '创建者ID',
  `update_id` bigint(20) unsigned DEFAULT NULL COMMENT '最后更新者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  `version` int(8) DEFAULT '0' COMMENT '乐观锁版本号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员用户_角色关系表';




-- 导出  表 cncounter.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `password` varchar(256) NOT NULL COMMENT '密码,加密后的',
  `salt_password` varchar(64) NOT NULL COMMENT '密码盐,随机数',
  `user_type` int(8) unsigned DEFAULT '0' COMMENT '用户类别,0为普通用户,100为管理员',
  `email` varchar(64) NOT NULL COMMENT '邮箱',
  `mobile` varchar(64) DEFAULT NULL COMMENT '手机号',
  `real_name` varchar(64) DEFAULT NULL COMMENT '真实姓名',
  `title` varchar(64) DEFAULT NULL COMMENT '职称，称呼',
  `create_id` bigint(20) unsigned DEFAULT NULL COMMENT '创建者ID',
  `update_id` bigint(20) unsigned DEFAULT NULL COMMENT '更新者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `version` int(8) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户';




-- 导出  表 cncounter.vote_item 结构
CREATE TABLE IF NOT EXISTS `vote_item` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `vote_topic_id` bigint(20) unsigned NOT NULL COMMENT '投票主题ID',
  `title` varchar(512) DEFAULT NULL COMMENT '标题,如果有',
  `content` longtext COMMENT '内容及说明',
  `create_id` bigint(20) unsigned DEFAULT NULL COMMENT '创建者ID',
  `update_id` bigint(20) unsigned DEFAULT NULL COMMENT '更新者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新数据',
  `version` int(8) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投票题目';




-- 导出  表 cncounter.vote_option 结构
CREATE TABLE IF NOT EXISTS `vote_option` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `vote_topic_id` bigint(20) unsigned NOT NULL COMMENT '投票主表ID',
  `vote_item_id` bigint(20) unsigned NOT NULL COMMENT '投票题目ID',
  `title` varchar(512) DEFAULT NULL COMMENT '标题,如果有',
  `content` longtext COMMENT '内容及说明',
  `create_id` bigint(20) unsigned DEFAULT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新数据',
  `version` int(8) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
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
  `version` int(8) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投票记录';




-- 导出  表 cncounter.vote_topic 结构
CREATE TABLE IF NOT EXISTS `vote_topic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `title` varchar(512) NOT NULL DEFAULT '' COMMENT '标题',
  `keyword` varchar(256) DEFAULT NULL COMMENT '关键字,以逗号分隔',
  `category` varchar(256) DEFAULT NULL COMMENT '分类',
  `features` varchar(256) DEFAULT NULL COMMENT '特性,留待后期使用',
  `multi_select` int(8) DEFAULT '0' COMMENT '是否多选,0为否,1为是',
  `reselectable` int(8) DEFAULT '0' COMMENT '是否允许改选,0为否,1为是',
  `once_per_user` int(8) DEFAULT '0' COMMENT '是否每个用户/IP只能投票一次,0为否,1为是',
  `vote_timeout` int(8) DEFAULT '0' COMMENT '多次投票间隔期限',
  `anonymous` int(8) DEFAULT '0' COMMENT '是否允许匿名,0为否,1为是',
  `content` longtext COMMENT '内容及说明',
  `start_time` datetime DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间,没有则留空',
  `vote_time_desc` varchar(256) DEFAULT NULL COMMENT '投票时间段说明',
  `create_id` bigint(20) DEFAULT NULL COMMENT '创建者ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `version` int(8) NOT NULL DEFAULT '0' COMMENT '乐观锁版本号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投票主题';


