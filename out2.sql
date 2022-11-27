-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: xkrizv03
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event_photos`
--

DROP TABLE IF EXISTS `event_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_photos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fk_event_id` int(10) unsigned NOT NULL,
  `img_path` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_id_photos` (`fk_event_id`),
  CONSTRAINT `fk_event_id_photos` FOREIGN KEY (`fk_event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_photos`
--

LOCK TABLES `event_photos` WRITE;
/*!40000 ALTER TABLE `event_photos` DISABLE KEYS */;
INSERT INTO `event_photos` VALUES (4,8,'07cfa607125ac8175933b4b04.jpg'),(5,8,'07cfa607125ac8175933b4b05.png'),(6,8,'07cfa607125ac8175933b4b06.jpg'),(7,8,'07cfa607125ac8175933b4b07.png');
/*!40000 ALTER TABLE `event_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_reviews`
--

DROP TABLE IF EXISTS `event_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_reviews` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fk_event_id` int(10) unsigned NOT NULL,
  `u_id` int(10) unsigned NOT NULL,
  `review_date` datetime NOT NULL,
  `review_text` text COLLATE utf8_czech_ci DEFAULT NULL,
  `review_karma` int(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_event_id` (`fk_event_id`),
  CONSTRAINT `event_reviews_ibfk_1` FOREIGN KEY (`fk_event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_reviews`
--

LOCK TABLES `event_reviews` WRITE;
/*!40000 ALTER TABLE `event_reviews` DISABLE KEYS */;
INSERT INTO `event_reviews` VALUES (1,4,1,'2022-01-20 00:00:00','Byla to strašně super akce, příští rok se moc rád znova zúčastním!',0),(2,4,2,'2022-01-20 00:00:00','Prostě wow. Nemám slov. Kdo nezažil, o hodně přišel.',0),(3,4,12,'2022-01-23 00:00:00','Moc se mi líbila organizace, ale přednášky byly slabší.',0),(4,2,9,'2022-01-23 00:00:00','Bylo to strašně na nic!!!!!!!!!!!!!!!!!',0),(5,4,9,'2022-01-23 00:00:00','Moje recnze',0),(6,1,22,'2022-01-24 00:00:00','Nice',0),(7,4,22,'2022-01-24 00:00:00','Bylo to ok.',0);
/*!40000 ALTER TABLE `event_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_terms`
--

DROP TABLE IF EXISTS `event_terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_terms` (
  `term_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fk_event_id` int(10) unsigned NOT NULL,
  `name` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`term_id`),
  KEY `fk_event_id` (`fk_event_id`),
  CONSTRAINT `event_terms_ibfk_1` FOREIGN KEY (`fk_event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_terms`
--

LOCK TABLES `event_terms` WRITE;
/*!40000 ALTER TABLE `event_terms` DISABLE KEYS */;
INSERT INTO `event_terms` VALUES (1,4,'PLNOC 2020','2020-09-06','2020-09-07'),(2,4,'PLNOC 2021','2021-10-01','2021-10-02'),(3,5,'Start Heckathonu','2021-12-12',NULL),(4,4,'PLNOC 2022','2022-10-01','2021-10-02'),(5,4,'Začátek přihlašování','2022-06-01',NULL),(6,4,'Konec přihlašování','2022-09-30',NULL),(7,5,'Galavečer pro vítěze','2022-12-29','2022-12-30'),(9,8,'nadchazejici termin','2022-12-29',NULL),(10,8,'nadchazejici termin 2','2022-12-30','2022-12-31');
/*!40000 ALTER TABLE `event_terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_urls`
--

DROP TABLE IF EXISTS `event_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_urls` (
  `url_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fk_event_id` int(10) unsigned NOT NULL,
  `url` text COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`url_id`),
  KEY `fk_event_id` (`fk_event_id`),
  CONSTRAINT `event_urls_ibfk_1` FOREIGN KEY (`fk_event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_urls`
--

LOCK TABLES `event_urls` WRITE;
/*!40000 ALTER TABLE `event_urls` DISABLE KEYS */;
INSERT INTO `event_urls` VALUES (1,4,'https://www.plnoc.cz/'),(2,4,'https://www.facebook.com/PLNOC'),(4,8,'www.seznam.cz');
/*!40000 ALTER TABLE `event_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `duration_type` bit(3) NOT NULL,
  `name` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `description` text COLLATE utf8_czech_ci NOT NULL,
  `type_tag_ba` bit(8) NOT NULL DEFAULT b'0',
  `topic_tag_ba` bit(32) NOT NULL DEFAULT b'0',
  `org_name` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `owner_u_id` int(10) unsigned NOT NULL,
  `location` varchar(256) COLLATE utf8_czech_ci DEFAULT NULL,
  `img_path` varchar(256) COLLATE utf8_czech_ci DEFAULT NULL,
  `add_date` datetime NOT NULL,
  `edit_date` datetime NOT NULL,
  `price` int(10) unsigned NOT NULL DEFAULT 0,
  `targetg_tag_ba` bit(3) NOT NULL DEFAULT b'0',
  `views` int(10) unsigned NOT NULL DEFAULT 0,
  `state` enum('draft','review','published') COLLATE utf8_czech_ci NOT NULL DEFAULT 'draft',
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,_binary '','Matematický seminář','Vzdělávej se posíláním dopisů',_binary '	',_binary '\0\0\0','MFUK',1,NULL,'/assets/img/hellno.jpg','2021-11-26 12:20:57','2022-11-25 12:21:54',0,_binary '',143,'published'),(2,_binary '','Seminář pro nadané děti','Lorem',_binary '',_binary '\0`\�','Menza',2,NULL,'/assets/img/lmao.jpg','2021-11-30 12:20:57','2022-11-25 12:21:54',4600,_binary '',48,'published'),(3,_binary '','Víťův programovací kroužek','Holky mají přednost',_binary '',_binary '\0�\0','Vítězslav Kříž',2,NULL,'/assets/img/nice.png','2021-11-30 12:20:57','2022-11-25 12:21:54',0,_binary '',17,'published'),(4,_binary '','PLNOC','PLNOC je první přednášková noc v Plzni, kde studenti přednáší studentům. Můžeš se nechat inspirovat ostatními, nebo si sám vyzkoušet přednášení a předat své znalosti dál. Na PLNOC patří každé téma, které tě zajímá. Najdeš tu prezentace vědeckých prací, témata od soft skills po programování, ale i povídání o koníčcích nebo důležitých otázkách života, vesmíru a vůbec. Kromě přednášek se můžeš těšit i na workshopy, jídlo a doprovodný program. ',_binary '',_binary '���','PLNOC',1,'Plzeň','/assets/img/assets.jpg','2021-12-01 12:20:57','2022-11-25 12:21:54',100,_binary '',303,'published'),(5,_binary '','Heckathon','huh',_binary '',_binary '\0\�\0\0','CSIRT',1,'Brno','/assets/img/lol.jpg','2021-12-01 12:20:57','2022-11-25 12:21:54',150,_binary '',0,'review'),(8,_binary '','Testovací event','Tohle je popis s <b>povolenými</b> ',_binary '`',_binary '\0(\0','Moje organizace',39,'online','07cfa607125ac8175933b4b04.jpg','2022-11-25 12:23:29','2022-11-25 12:23:29',405,_binary '',0,'draft');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_fav_events`
--

DROP TABLE IF EXISTS `user_fav_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_fav_events` (
  `fk_event_id` int(10) unsigned NOT NULL,
  `fk_u_id` int(10) unsigned NOT NULL,
  KEY `fk_event_id` (`fk_event_id`),
  KEY `fk_u_id` (`fk_u_id`),
  CONSTRAINT `user_fav_events_ibfk_1` FOREIGN KEY (`fk_event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE,
  CONSTRAINT `user_fav_events_ibfk_2` FOREIGN KEY (`fk_u_id`) REFERENCES `users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_fav_events`
--

LOCK TABLES `user_fav_events` WRITE;
/*!40000 ALTER TABLE `user_fav_events` DISABLE KEYS */;
INSERT INTO `user_fav_events` VALUES (1,6),(2,6),(5,6);
/*!40000 ALTER TABLE `user_fav_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `u_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `passhash` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `email` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `role_id` tinyint(3) unsigned NOT NULL DEFAULT 1 COMMENT '0=guest, 1=user, 2=moderator, 3=admin',
  `firstname` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `lastname` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `img_path` varchar(256) COLLATE utf8_czech_ci DEFAULT NULL,
  `register_date` date NOT NULL,
  `karma` int(10) unsigned NOT NULL DEFAULT 0,
  `brief` text COLLATE utf8_czech_ci DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_id_UNIQUE` (`u_id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sprtokiller','$2b$11$WeWp5yB1brPsq64MRIWupe7mkS1DQLngiRpkbwzEu0yXF4exPrTIa','sprtokiller.6c@gmail.com',3,'Vítězslav','Kříž',NULL,'2021-12-01',0,'Dělám eLearning'),(2,'naomh','$2b$08$H92nQ64APEl/m8Rlkqnn6OL5N6ra2L3N4KxDQ44PPVVRlanG7eykm','xsvond00@stud.fit.vutbr.cz',3,'Tomáš','Švondr',NULL,'2021-12-01',0,'Kup si moje naked NFTčka'),(3,'surikat','$2b$11$rroLnf43ww0LulmGQGc6TuGGRSUVvWWpx1sguOQDEL.dJPeYOR2Rq','xhencl02@stud.fit.vutbr.cz',1,'Kateřina','Henclová',NULL,'2021-12-01',0,NULL),(4,'user','$2b$11$rroLnf43ww0LulmGQGc6TuGGRSUVvWWpx1sguOQDEL.dJPeYOR2Rq','user@user.cz',1,'User','Novák',NULL,'2021-12-02',0,NULL),(5,'Nigga','$2b$11$gH7oFzHTP20p4bSYHqX88OnwMWCniwOes8nSw6tuprhlDbrGGn3O.','nigga@pejsek.com',1,'Nigga','Tigga',NULL,'2021-12-03',0,NULL),(6,'Arthur','$2b$11$WeWp5yB1brPsq64MRIWupe7mkS1DQLngiRpkbwzEu0yXF4exPrTIa','A@morgan.com',1,'Arthur','Morgan',NULL,'2021-12-03',0,NULL),(7,'blyat','$2b$11$dqXjKSEidMCX0X6K5j9GpOBMoCGHm64u83ZN6hqJ1bFDfpzwj/p56','xhencl02@stud.fit.vut.cz',1,'Kateřina','Henclová',NULL,'2021-12-03',0,NULL),(8,'venca','$2b$11$Tlg9lHOkrXs7BTnDFqQ.gup0vlDrwBcbC/W3XXPxIab36aTmH5aw6','katka@aartkom.com',1,'Nigga','Tigga',NULL,'2021-12-04',0,NULL),(34,'my_test_user','$2b$11$kXoNe3SdmKKyh6wnVgSaLunX2n7gmK3TLUBNLGZE/ZV.o6FLnvF.2','my_test_user@gmail.com',1,'Test','User',NULL,'2022-11-18',0,NULL),(38,'my_test_user2','$2b$11$EeOvlqfGOq6djRrHbPgmzekzZLfUKG4EqlKD4tdmkicQvAig1P.9S','my_test_user2@gmail.com',2,'Test','User','56bb03b929521fb0edf658803.jpg','2022-11-18',0,'Toto je moje <b>personal</b> info'),(39,'my_test_admin','$2b$11$jSr08TKF8nr4mac36QFwsOcFx6iaCbxq4Y7ME3LMPssEejR6H98ii','my_test_admin@gmail.com',3,'Test','Admin',NULL,'2022-11-19',0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_event_comments`
--

DROP TABLE IF EXISTS `view_event_comments`;
/*!50001 DROP VIEW IF EXISTS `view_event_comments`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_event_comments` AS SELECT 
 1 AS `id`,
 1 AS `fk_event_id`,
 1 AS `u_id`,
 1 AS `review_date`,
 1 AS `username`,
 1 AS `firstname`,
 1 AS `lastname`,
 1 AS `review_text`,
 1 AS `review_karma`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_event_list`
--

DROP TABLE IF EXISTS `view_event_list`;
/*!50001 DROP VIEW IF EXISTS `view_event_list`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_event_list` AS SELECT 
 1 AS `event_id`,
 1 AS `duration_type`,
 1 AS `name`,
 1 AS `description`,
 1 AS `type_tag_ba`,
 1 AS `topic_tag_ba`,
 1 AS `org_name`,
 1 AS `location`,
 1 AS `img_path`,
 1 AS `price`,
 1 AS `targetg_tag_ba`,
 1 AS `views`,
 1 AS `state`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_user`
--

DROP TABLE IF EXISTS `view_user`;
/*!50001 DROP VIEW IF EXISTS `view_user`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_user` AS SELECT 
 1 AS `u_id`,
 1 AS `username`,
 1 AS `role_id`,
 1 AS `firstname`,
 1 AS `lastname`,
 1 AS `img_path`,
 1 AS `register_date`,
 1 AS `karma`,
 1 AS `brief`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_user_details`
--

DROP TABLE IF EXISTS `view_user_details`;
/*!50001 DROP VIEW IF EXISTS `view_user_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_user_details` AS SELECT 
 1 AS `u_id`,
 1 AS `username`,
 1 AS `email`,
 1 AS `role_id`,
 1 AS `firstname`,
 1 AS `lastname`,
 1 AS `img_path`,
 1 AS `register_date`,
 1 AS `karma`,
 1 AS `brief`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_user_list`
--

DROP TABLE IF EXISTS `view_user_list`;
/*!50001 DROP VIEW IF EXISTS `view_user_list`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_user_list` AS SELECT 
 1 AS `u_id`,
 1 AS `username`,
 1 AS `role_id`,
 1 AS `karma`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_event_comments`
--

/*!50001 DROP VIEW IF EXISTS `view_event_comments`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_event_comments` AS select `r`.`id` AS `id`,`r`.`fk_event_id` AS `fk_event_id`,`u`.`u_id` AS `u_id`,`r`.`review_date` AS `review_date`,`u`.`username` AS `username`,`u`.`firstname` AS `firstname`,`u`.`lastname` AS `lastname`,`r`.`review_text` AS `review_text`,`r`.`review_karma` AS `review_karma` from (`event_reviews` `r` join `users` `u` on(`r`.`u_id` = `u`.`u_id`)) order by `r`.`review_karma` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_event_list`
--

/*!50001 DROP VIEW IF EXISTS `view_event_list`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_event_list` AS select `events`.`event_id` AS `event_id`,`events`.`duration_type` AS `duration_type`,`events`.`name` AS `name`,`events`.`description` AS `description`,`events`.`type_tag_ba` AS `type_tag_ba`,`events`.`topic_tag_ba` AS `topic_tag_ba`,`events`.`org_name` AS `org_name`,`events`.`location` AS `location`,`events`.`img_path` AS `img_path`,`events`.`price` AS `price`,`events`.`targetg_tag_ba` AS `targetg_tag_ba`,`events`.`views` AS `views`,`events`.`state` AS `state` from `events` order by `events`.`views` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_user`
--

/*!50001 DROP VIEW IF EXISTS `view_user`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_user` AS select `users`.`u_id` AS `u_id`,`users`.`username` AS `username`,`users`.`role_id` AS `role_id`,`users`.`firstname` AS `firstname`,`users`.`lastname` AS `lastname`,`users`.`img_path` AS `img_path`,`users`.`register_date` AS `register_date`,`users`.`karma` AS `karma`,`users`.`brief` AS `brief` from `users` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_user_details`
--

/*!50001 DROP VIEW IF EXISTS `view_user_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_user_details` AS select `users`.`u_id` AS `u_id`,`users`.`username` AS `username`,`users`.`email` AS `email`,`users`.`role_id` AS `role_id`,`users`.`firstname` AS `firstname`,`users`.`lastname` AS `lastname`,`users`.`img_path` AS `img_path`,`users`.`register_date` AS `register_date`,`users`.`karma` AS `karma`,`users`.`brief` AS `brief` from `users` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_user_list`
--

/*!50001 DROP VIEW IF EXISTS `view_user_list`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_user_list` AS select `users`.`u_id` AS `u_id`,`users`.`username` AS `username`,`users`.`role_id` AS `role_id`,`users`.`karma` AS `karma` from `users` order by `users`.`u_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-25 19:08:38
