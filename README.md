CREATE DATABASE `board`

USE `board`;

DROP  TABLE IF exists `CUSTOMER`
CREATE TABLE CUSTOMER(
	id int PRIMARY KEY AUTO_INCREMENT ,
	image varchar(1024),
	name varchar(64),
	birthday varchar(64),
	gender varchar(64),
	job varchar(64),
	isdeleted int DEFAULT 0,
	joinDate datetime DEFAULT now()
)DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

INSERT INTO CUSTOMER (image,name,birthday,gender,job) VALUES ('http://placeimg.com/50/50/ANY','YoonJaeJin','19910812','male','developer');
INSERT INTO CUSTOMER (image,name,birthday,gender,job) VALUES ('http://placeimg.com/50/50/ANY','YoonjaeMin','19910112','male','developer');
INSERT INTO CUSTOMER (image,name,birthday,gender,job) VALUES ('http://placeimg.com/50/50/ANY','Yoonjaekin','19910116','male','developer');



SELECT * FROM customer;
