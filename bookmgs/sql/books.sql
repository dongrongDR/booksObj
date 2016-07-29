
-- 表的结构 `books`
--
-- 图书表
CREATE TABLE IF NOT EXISTS `books` (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `bookName` varchar(50) NOT NULL COMMENT '书名',
  `author` varchar(30) NOT NULL COMMENT '作者',
  `rublication` date NOT NULL COMMENT '出版日期',
  `money` float NOT NULL COMMENT '价格',
  `cid` int(11) NOT NULL COMMENT '类别',
  `shelves` int(11) NOT NULL COMMENT '是否上架',
  `borrow` int(11) NOT NULL COMMENT '是否借出',
  `remarks` int(11) NOT NULL COMMENT '备注',
  PRIMARY KEY (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;



-- 表的结构 `category`
--
-- 类别表
CREATE TABLE IF NOT EXISTS `category` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(30) NOT NULL COMMENT '类别名',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;


--创建外键
ALTER TABLE books ADD CONSTRAINT FK_books_wai FOREIGN KEY ( cid ) REFERENCES category( cid );
--删除外键
-- ALTER TABLE books DROP FOREIGN KEY FK_books_wai;

--category 插入语句
insert into category (categoryname) values("国外");
insert into category (categoryname) values("现代");
insert into category (categoryname) values("文学");
insert into category (categoryname) values("古代");
insert into category (categoryname) values("爱情");




-- books 插入语句
insert into `books` ( bookName, author, rublication, money, cid, shelves,borrow,remarks)
values("鲁滨孙漂流记","丹尼尔·笛福", "1719-04-25 00:00:00" ,"10.5",1,0,0,"无");
insert into `books` ( bookName, author, rublication, money, cid, shelves,borrow,remarks)
values("傲慢与偏见","简·奥斯汀", "1796-00-00 00:00:00" ,"15.6",1,0,0,"无");
insert into `books` ( bookName, author, rublication, money, cid, shelves,borrow,remarks)
values("简·爱","夏洛蒂·勃朗特", "1847-00-00 00:00:00" ,"23.7",5,0,0,"无");
insert into `books` ( bookName, author, rublication, money, cid, shelves,borrow,remarks)
values("红楼梦","丹尼尔·笛福", "1736-00-00 00:00:00" ,"88.9",4,0,0,"无");
insert into `books` ( bookName, author, rublication, money, cid, shelves,borrow,remarks)
values("盗墓笔记","南派三叔", "2011-12-19 00:00:00" ,"10.5",2,0,0,"无");



 -- alter table `books` drop constraint FK_TABLE_NAME;

-- alter table `books` drop FOREIGN KEY (`cid`) REFERENCES  `category` (`cid`);

--删除表
-- DROP TABLE `books`
-- DROP TABLE `category`


-- sp_help  表名 可以看到外键名
-- alter table xxx drop constraint fk_xxx