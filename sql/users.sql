-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: eu-cdbr-west-03.cleardb.net    Database: heroku_39f9d0002948c11
-- ------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` text,
  `last_name` text,
  `email` text,
  `number` varchar(255) DEFAULT NULL,
  `address` text,
  `coordinates` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4;



INSERT INTO `users` VALUES (8,'Jeremaia','Lochnes','hayton@emvil.com','2147483647','281 Emily Renzelli Boulevard','36.610756, -121.659889'),(9,'Jordan','Bedford','jordani@gmail.com','1234567890','420 Tanglewood Road','32.445026, -90.326736'),(14,'Walter','White','WalterWhite@gmail.com','2147483647','308 Negra Arroyo Lane','35.12612,-106.53610'),(15,'Halima','Mcgee','halima27@yo.co','1122334455','2590 Hornor Avenue','36.99563, -4.93902'),(16,'Neil','Mendoza','veternord@gasss.us','2147483647','4906 Joseph Street','43.072327, -88.039955'),(17,'Brett','Browning','kayvoss@mailsaviors.com','2147483647','944 Briercliff Road','40.726341, -73.890358'),(22,'Thomas','Oglesby','alexane1978@yahoo.com','2709521710','1654 North Bend River Road','38.019577, -84.550056'),(62,'555','^&**&*','halima37@yahoo.com','0880000001','горна banq 13 ','43.20934,27.92364'),(82,'test123','tee223','test@example.com','0880000000','123','43.20934,27.92365'),(132,'efertw','werwr','erw@fs.fsd','3242323342','dffs fsd fs','36.99563, -4.93902');



-- Dump completed on 2023-02-08 17:22:38
