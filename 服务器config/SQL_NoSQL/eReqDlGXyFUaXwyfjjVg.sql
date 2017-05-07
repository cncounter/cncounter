-- phpMyAdmin SQL Dump
-- http://www.phpmyadmin.net
--
-- 生成日期: 2015 年 05 月 14 日 14:39

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `eReqDlGXyFUaXwyfjjVg`
--

-- --------------------------------------------------------

--
-- 表的结构 `favorite`
--

CREATE TABLE IF NOT EXISTS `favorite` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `userid` varchar(256) DEFAULT NULL COMMENT '用户ID',
  `type` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '类别,0为首页通用',
  `title` varchar(512) DEFAULT NULL COMMENT '标题',
  `content` varchar(2048) DEFAULT NULL COMMENT '内容',
  `url` varchar(1024) DEFAULT NULL COMMENT '链接',
  `createuserid` varchar(256) DEFAULT NULL COMMENT '创建者ID',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gen` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='收藏' AUTO_INCREMENT=66 ;

--
-- 转存表中的数据 `favorite`
--

INSERT INTO `favorite` (`id`, `userid`, `type`, `title`, `content`, `url`, `createuserid`, `createtime`, `gen`) VALUES
(1, NULL, 0, '向上交流群', NULL, 'http://eeqee.com/jforum/forums/list.page', NULL, '2015-01-04 10:25:03', 1),
(8, NULL, 0, '娇娇吃素', NULL, 'http://www.jiaojiaochisu.com', NULL, '2015-01-05 08:49:52', 1),
(9, NULL, 10, '寒冰美景', NULL, 'http://m.baidu.com/news?fr=mohome#page/2/http%3A%2F%2Fslide.sports.sina.com.cn%2Fslide_2_55536_76179.html%23p%3D1/%E4%BF%9D%E5%8A%A0%E5%88%A9%E4%BA%9A%E7%93%A6%E5%B0%94%E7%BA%B3%EF%BC%9A%E5%86%B0%E5%AF%92%E4%B8%8B%E7%9A%84%E7%BE%8E%E6%99%AF/%E6%96%B0%E6%B5%AA%E5%9B%BE%E7%89%87/1420441833000/11944087298685336065', NULL, '2015-01-05 16:19:06', 1),
(12, NULL, 0, 'CNZZ信息监控', NULL, 'http://www.cnzz.com/stat/website.php?web_id=1000461034', NULL, '2015-01-06 02:09:36', 1),
(13, NULL, 10, '各种植物', NULL, 'http://mp.weixin.qq.com/s?__biz=MzAwMTE3MDM4Ng==&mid=202177568&idx=4&sn=8ac6ac41c1e2f59e6d224fafc00c5801&scene=2&from=timeline&isappinstalled=0#rd', NULL, '2015-01-07 01:05:11', 1),
(14, NULL, 0, 'React中文文档', NULL, 'http://blog.cncounter.com/react/', NULL, '2015-01-07 02:09:13', 1),
(15, NULL, 17, 'jqGrid Home', NULL, 'http://www.jqgrid.com/', NULL, '2015-01-07 03:33:27', 1),
(16, NULL, 17, 'BackupRun', NULL, 'https://www.backuprun.com/en', NULL, '2015-01-07 07:50:11', 1),
(17, NULL, 0, '学习者Learnist', NULL, 'http://learni.st/', NULL, '2015-01-07 07:53:20', 1),
(18, NULL, 0, '神器-OSC在线工具集', NULL, 'http://tool.oschina.net/', NULL, '2015-01-07 08:12:42', 1),
(20, NULL, 17, 'KK的多线程OSC', NULL, 'http://git.oschina.net/kimmking/multithreads', NULL, '2015-01-07 09:25:40', 1),
(21, NULL, 17, '从零开始学编程系列汇总(从α到Ω)', NULL, 'https://github.com/justjavac/Programming-Alpha-To-Omega', NULL, '2015-01-08 06:02:53', 1),
(22, NULL, 100, '每个月赚3W以上很轻松', NULL, 'http://www.oschina.net/question/2299062_220548', NULL, '2015-01-08 12:05:40', 1),
(23, NULL, 0, '360翻译的Chrome文档', NULL, 'http://open.chrome.360.cn/extension_dev/tut_debugging.html', NULL, '2015-01-09 01:43:33', 1),
(24, NULL, 100, '一个SVN0', NULL, 'https://1120.1240.540.2340/svn/MyRepository/pmsys', NULL, '2015-01-12 09:11:09', 1),
(25, NULL, 0, '类别10', NULL, 'http://cncounter.duapp.com/favorite/list/10.php', NULL, '2015-01-15 00:16:29', 1),
(26, NULL, 10, '测试可爱的分类', NULL, 'http://cncounter.duapp.com/favorite/list/100.php', NULL, '2015-01-18 10:06:03', 1),
(27, NULL, 10, 'O2OMobile - 原生开源免费O2O系统', NULL, 'http://o2omobile.net/index.html', NULL, '2015-01-18 11:25:51', 1),
(28, NULL, 10, 'MyBatis中文文档', NULL, 'http://mybatis.github.io/mybatis-3/zh/index.html', NULL, '2015-01-19 06:57:43', 1),
(29, NULL, 10, 'SWF粘贴示例', NULL, 'http://davidwalsh.name/demo/zero-clipboard.php', NULL, '2015-01-19 07:00:53', 1),
(30, NULL, 17, '深入理解Java内存模型（一）——基础', NULL, 'http://www.infoq.com/cn/articles/java-memory-model-1', NULL, '2015-01-19 12:09:46', 1),
(31, NULL, 17, '金丝燕网 - 分享java资料，研究java知识。', NULL, 'http://swiftlet.net/', NULL, '2015-01-21 13:07:55', 1),
(32, NULL, 17, '2014年最热门的国人开发开源软件 TOP 100', NULL, 'http://www.oschina.net/news/58899/2014-cn-top-100-software', NULL, '2015-01-22 01:53:09', 1),
(33, NULL, 0, 'Git_XuFei的前端翻译文章', NULL, 'https://github.com/xufei/blog/tree/master/posts', NULL, '2015-01-24 10:31:34', 1),
(34, NULL, 10, 'Angular对后端开发人员友好', NULL, 'http://www.zhihu.com/question/27601964', NULL, '2015-01-24 12:15:27', 1),
(35, NULL, 17, '百度FEX前端开源', NULL, 'http://fex.baidu.com/', NULL, '2015-02-08 06:41:47', 1),
(36, NULL, 8, '易学与婚姻_清云居', NULL, 'http://blog.sina.cn/dpool/blog/s/blog_488264520100evmv.html?vt=4', NULL, '2015-02-21 14:53:17', 1),
(37, NULL, 17, 'make命令教程_阮一峰', NULL, 'http://www.ruanyifeng.com/blog/2015/02/make.html', NULL, '2015-03-05 02:47:34', 1),
(38, NULL, 8, '天风姤', NULL, 'http://www.360doc.cn/article/3819394_307667298.html', NULL, '2015-03-06 16:38:01', 1),
(39, NULL, 8, '天风姤，国易', NULL, 'http://www.guoyi360.com/64gua44/ys/5220.html', NULL, '2015-03-06 23:26:43', 1),
(40, NULL, 17, 'Enonic CMS', NULL, 'https://enonic.com/', NULL, '2015-03-09 08:58:41', 1),
(41, NULL, 17, 'Apache Lenya', NULL, 'http://lenya.apache.org/', NULL, '2015-03-09 09:04:33', 1),
(42, NULL, 17, 'OpenCms', NULL, 'http://www.opencms.org/en/', NULL, '2015-03-09 09:08:26', 1),
(43, NULL, 17, 'Magnolia CMS', NULL, 'http://sourceforge.net/projects/magnolia/', NULL, '2015-03-09 09:15:47', 1),
(44, NULL, 8, '泽天夬卦', NULL, 'http://www.guoyi360.com/64gua43/ys/5219.html', NULL, '2015-03-10 14:22:16', 1),
(45, NULL, 17, 'AxureRP中文社区', NULL, 'http://www.axure.org/axure/', NULL, '2015-03-11 07:22:41', 1),
(46, NULL, 0, '著名的打堵网站', NULL, 'http://longbets.org/', NULL, '2015-03-12 23:00:13', 1),
(47, NULL, 17, 'RedHat的免费云App平台_Openshift', NULL, 'https://www.openshift.com/', NULL, '2015-03-17 08:06:13', 1),
(49, NULL, 17, '开源语法分析器--ANTLR', NULL, 'http://www.antlr.org/', NULL, '2015-03-19 03:44:50', 1),
(50, NULL, 0, '易经国学类别收藏夹', NULL, 'favorite/list/8.php', NULL, '2015-03-19 03:49:09', 1),
(51, NULL, 0, 'IT类别的地址收藏夹', NULL, 'favorite/list/17.php', NULL, '2015-03-19 03:49:43', 1),
(52, NULL, 0, 'Hacker News', NULL, 'https://news.ycombinator.com/', NULL, '2015-03-20 01:19:29', 1),
(53, NULL, 17, 'Apache Camel: Index', NULL, 'http://camel.apache.org/', NULL, '2015-03-23 06:24:09', 1),
(54, NULL, 17, 'Leaders in Tech, Gaming & Men''s Lifestyle', NULL, 'http://www.ziffdavis.com/', NULL, '2015-03-24 07:48:07', 1),
(55, NULL, 0, '云适配', NULL, 'http://www.yunshipei.com/', NULL, '2015-03-25 16:53:00', 1),
(56, NULL, 17, '沈询的新浪博客', NULL, 'http://blog.sina.cn/dpool/blog/u/1765738567#type=-1', NULL, '2015-03-27 01:59:35', 1),
(57, NULL, 8, '坎卦婚姻', NULL, 'http://www.guoyi360.com/64gua29/ys/5137.html', NULL, '2015-03-28 05:07:57', 1),
(58, NULL, 0, '雷军：天道不一定酬勤，深度思考比勤奋工作更重要', NULL, 'http://m.sohu.com/n/409150949/?_trans_=000115_3w&qq-pf-to=pcqq.group', NULL, '2015-04-01 07:06:00', 1),
(59, NULL, 17, 'IBM Security AppScan Standard', NULL, 'http://www-03.ibm.com/software/products/zh/appscan-standard/', NULL, '2015-04-07 01:14:41', 1),
(60, NULL, 17, 'htmlunit官网简易教程（翻译）', NULL, 'http://www.cnblogs.com/cation/p/3933408.html', NULL, '2015-04-07 03:47:54', 1),
(61, NULL, 17, 'Rapha?l—JavaScript Library', NULL, 'http://raphaeljs.com/', NULL, '2015-04-09 01:28:31', 1),
(62, NULL, 0, 'JSON跨域代理_示例', NULL, 'tools/bitcoinvalue.php', NULL, '2015-04-14 07:46:28', 1),
(63, NULL, 17, 'Dribbble 设计师', NULL, 'https://dribbble.com/', NULL, '2015-04-18 13:26:54', 1),
(64, NULL, 17, 'Office神器API-aspose', NULL, 'http://www.aspose.com/', NULL, '2015-05-05 06:08:11', 1),
(65, NULL, 17, '海客信使', NULL, 'http://www.heysky.cn/front/free', NULL, '2015-05-06 02:08:31', 1);

-- --------------------------------------------------------

--
-- 表的结构 `hotword`
--

CREATE TABLE IF NOT EXISTS `hotword` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `word` varchar(256) NOT NULL COMMENT '词条',
  `keyword` varchar(256) DEFAULT NULL COMMENT '关键字,以逗号分隔',
  `category` varchar(256) DEFAULT NULL COMMENT '分类',
  `title` varchar(512) DEFAULT NULL COMMENT '标题,如果有',
  `content` longtext COMMENT '内容及说明',
  `starttime` datetime DEFAULT NULL COMMENT '开始流行的时间',
  `endtime` datetime DEFAULT NULL COMMENT '流行的时间段',
  `hottimedesc` varchar(256) DEFAULT NULL COMMENT '流行的时间段说明',
  `createuserid` varchar(256) DEFAULT NULL COMMENT '创建者ID',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gen` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='网络热词' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `username` varchar(256) NOT NULL COMMENT '用户名',
  `password` varchar(256) NOT NULL COMMENT '密码,加密后的',
  `usertype` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '用户类别,1为普通用户,100为管理员',
  `email` varchar(256) NOT NULL COMMENT '邮箱',
  `mobile` varchar(256) DEFAULT NULL COMMENT '手机号',
  `realname` varchar(256) DEFAULT NULL COMMENT '真实姓名',
  `title` varchar(512) DEFAULT NULL COMMENT '职称，称呼',
  `createuserid` varchar(256) DEFAULT NULL COMMENT '创建者ID',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gen` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='用户' AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `usertype`, `email`, `mobile`, `realname`, `title`, `createuserid`, `createtime`, `gen`) VALUES
(1, 'cncounter', 'f7486ad08e66443f9123dd9257166a16', 100, 'renfufei@qq.com', NULL, '天朝计数器', NULL, NULL, '2014-08-15 06:31:02', 1);

-- --------------------------------------------------------

--
-- 表的结构 `vote`
--

CREATE TABLE IF NOT EXISTS `vote` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `title` varchar(512) NOT NULL DEFAULT '' COMMENT '标题',
  `keyword` varchar(256) DEFAULT NULL COMMENT '关键字,以逗号分隔',
  `category` varchar(256) DEFAULT NULL COMMENT '分类',
  `features` varchar(256) DEFAULT NULL COMMENT '特性,留待后期使用',
  `multiselect` int(10) DEFAULT '0' COMMENT '是否多选,0为否,1为是',
  `reelect` int(10) DEFAULT '0' COMMENT '是否允许改选,0为否,1为是',
  `onceperuser` int(10) DEFAULT '0' COMMENT '是否每个用户/IP只能投票一次,0为否,1为是',
  `votetimeout` int(10) DEFAULT '0' COMMENT '多次投票间隔期限',
  `anonymous` int(10) DEFAULT '0' COMMENT '是否允许匿名,0为否,1为是',
  `content` longtext COMMENT '内容及说明',
  `starttime` datetime DEFAULT NULL COMMENT '开始时间',
  `endtime` datetime DEFAULT NULL COMMENT '结束时间,没有则留空',
  `votetimedesc` varchar(256) DEFAULT NULL COMMENT '投票时间段说明',
  `createuserid` varchar(256) DEFAULT NULL COMMENT '创建者ID',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gen` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投票主表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `voteoption`
--

CREATE TABLE IF NOT EXISTS `voteoption` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `voteid` int(10) unsigned NOT NULL COMMENT '投票主表ID',
  `title` varchar(512) DEFAULT NULL COMMENT '标题,如果有',
  `content` longtext COMMENT '内容及说明',
  `createuserid` varchar(256) DEFAULT NULL COMMENT '创建者ID',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gen` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投票细节选项表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `voterecord`
--

CREATE TABLE IF NOT EXISTS `voterecord` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `voteid` int(10) unsigned NOT NULL COMMENT '投票主表ID',
  `voteoptionid` int(10) unsigned NOT NULL COMMENT '投票选项ID',
  `userid` varchar(256) DEFAULT NULL COMMENT '投票者ID',
  `userip` varchar(256) DEFAULT NULL COMMENT '投票者IP地址',
  `anonymous` int(10) DEFAULT '0' COMMENT '是否匿名投票,0为否,1为是',
  `remark` varchar(512) DEFAULT NULL COMMENT '说明信息,如果有',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `gen` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '分代,后期使用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投票记录表' AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
