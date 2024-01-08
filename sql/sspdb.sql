CREATE TABLE `user` (
  `Uid` int NOT NULL AUTO_INCREMENT,
  `Uname` varchar(20) DEFAULT NULL,
  `Psw` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Uid`)
);
CREATE TABLE `school` (
  `Sid` int NOT NULL,
  `Xxmc` text,
  `Xxbsm` bigint DEFAULT NULL,
  `Zgbm` text,
  `Szd` text,
  `Bxcc` text,
  `Bz` text,
  `Zcm` varchar(10) DEFAULT 'zhucema123',
  PRIMARY KEY (`Sid`)
);

CREATE TABLE `noti` (
  `Nid` int NOT NULL AUTO_INCREMENT,
  `Nheader` varchar(50) DEFAULT NULL,
  `Ncontent` text,
  `Ntime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Sid` int NOT NULL,
  PRIMARY KEY (`Nid`),
  KEY `Sid` (`Sid`),
  CONSTRAINT `noti_ibfk_1` FOREIGN KEY (`Sid`) REFERENCES `school` (`Sid`)
);
CREATE TABLE `comment` (
  `Cid` int NOT NULL AUTO_INCREMENT,
  `Ccontent` varchar(1000) DEFAULT NULL,
  `Ctime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Uid` int NOT NULL,
  `Uname` varchar(20) DEFAULT NULL,
  `Sid` int DEFAULT NULL,
  `LikeCount` int DEFAULT NULL,
  PRIMARY KEY (`Cid`),
  KEY `Sid` (`Sid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`Sid`) REFERENCES `school` (`Sid`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`Uid`) REFERENCES `user` (`Uid`)
);

CREATE TABLE `schoolmanager` (
  `Mid` int NOT NULL AUTO_INCREMENT,
  `Sid` int NOT NULL,
  `Mname` varchar(30) DEFAULT NULL,
  `Mpassword` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Mid`),
  KEY `Sid` (`Sid`),
  CONSTRAINT `schoolmanager_ibfk_1` FOREIGN KEY (`Sid`) REFERENCES `school` (`Sid`)
);
