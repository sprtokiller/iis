-- MySQL dump 10.13  Distrib 5.7.40, for FreeBSD13.1 (amd64)
--
-- Host: localhost    Database: xkrizv03
-- ------------------------------------------------------
-- Server version	5.7.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `badges` (
  `badge_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `description` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `img_path` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `xp_value` int(10) unsigned NOT NULL,
  PRIMARY KEY (`badge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
INSERT INTO `badges` VALUES (1,'Get a life','Zúčastni se první akce','assets/badges/compliance-180x180.png',100),(2,'The more the merrier','Sdílej stránku na sociálních sítích','assets/badges/social-media-180x180.png',50),(3,'Humble comment giver','Humble comment giver','assets/badges/complaints-180x180.png',30),(4,'Our fate is in the stars','Ohodnoť první akci','assets/badges/feedback-180x180.png',50),(5,'Math wizard','Zúčastni se matematické akce','assets/badges/budgeting-180x180.png',100),(6,'Hackerman','Zúčastni se IT akce','assets/badges/it-security-180x180.png',100),(7,'Tree hugger','Zúčastni se biologické akce','assets/badges/environmental-sustainability-180x180.png',100),(8,'Andrenaline','Zúčastni se sportovní akce','assets/badges/coaching-180x180.png',100),(9,'People person','Zúčastni se humanitní akce','assets/badges/retaining-employees-180x180.png',100),(10,'Leonardo da Vinci','Zúčastni se umělecké akce','assets/badges/open-badges-180x180.png',100),(11,'Helpful person','Zúčastni se dobrovolnické akce','assets/badges/corporate-social-security-180x180.png',100),(12,'Napoleon','Zúčastni se historické akce','assets/badges/product-knowledge-180x180.png',100),(13,'Ferdinard Magellan','Zúčastni se zahraniční akce','assets/badges/decision-making-180x180.png',200),(14,'Points hoarder','Dosáhni levelu 10 a ukaž všem, že na to máš','assets/badges/developing-employees-180x180.png',10),(15,'To experience or not to experience?','Zúčastni se 5 akcí','assets/badges/bronze-cup-180x180.png',100),(16,'There is no place like away from home','Zúčastni se 10 akcí','assets/badges/silver-cup-180x180.png',150),(17,'Hey! Teacher! Leave us kids alone!','Zúčastni se 15 akcí','assets/badges/gold-cup-180x180.png',200),(18,'Easier said then done','Zorganizuj akci','assets/badges/inspections-180x180.png',500),(19,'I\'ll be back. -Terminator','Zúčastni podruhé stejné akce','assets/badges/team-work-180x180.png',150),(20,'Let mi IN!','Zaregistruj se do ROADMAP','assets/badges/change-management-180x180.png',10);
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_ratings`
--

DROP TABLE IF EXISTS `event_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_ratings` (
  `fk_event_id` int(10) unsigned NOT NULL,
  `u_id` int(10) unsigned NOT NULL,
  `rating_date` date NOT NULL,
  `rating_value` tinyint(4) NOT NULL,
  `review_text` text COLLATE utf8_czech_ci,
  `is_public` tinyint(1) DEFAULT NULL,
  KEY `fk_event_id` (`fk_event_id`),
  CONSTRAINT `event_ratings_ibfk_1` FOREIGN KEY (`fk_event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_ratings`
--

LOCK TABLES `event_ratings` WRITE;
/*!40000 ALTER TABLE `event_ratings` DISABLE KEYS */;
INSERT INTO `event_ratings` VALUES (4,1,'2022-01-20',5,'Byla to strašně super akce, příští rok se moc rád znova zúčastním!',1),(4,2,'2022-01-20',5,'Prostě wow. Nemám slov. Kdo nezažil, o hodně přišel.',1),(4,12,'2022-01-23',4,'Moc se mi líbila organizace, ale přednášky byly slabší.',0),(2,9,'2022-01-23',4,'Bylo to strašně na nic!!!!!!!!!!!!!!!!!',1),(4,9,'2022-01-23',2,'Moje recnze',1),(1,22,'2022-01-24',3,'Nice',0),(4,22,'2022-01-24',5,'Bylo to ok.',1);
/*!40000 ALTER TABLE `event_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_terms`
--

DROP TABLE IF EXISTS `event_terms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_terms` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fk_event_id` int(10) unsigned NOT NULL,
  `name` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_id` (`fk_event_id`),
  CONSTRAINT `event_terms_ibfk_1` FOREIGN KEY (`fk_event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_terms`
--

LOCK TABLES `event_terms` WRITE;
/*!40000 ALTER TABLE `event_terms` DISABLE KEYS */;
INSERT INTO `event_terms` VALUES (1,4,'PLNOC 2020','2020-09-06','2020-09-07'),(2,4,'PLNOC 2021','2021-10-01','2021-10-02'),(3,5,'Start Heckathonu','2021-12-12',NULL),(4,4,'PLNOC 2022','2022-10-01','2021-10-02'),(5,4,'Začátek přihlašování','2022-06-01',NULL),(6,4,'Konec přihlašování','2022-09-30',NULL),(7,5,'Galavečer pro vítěze','2022-12-29','2022-12-30');
/*!40000 ALTER TABLE `event_terms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_urls`
--

DROP TABLE IF EXISTS `event_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_urls` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fk_event_id` int(10) unsigned NOT NULL,
  `url` text COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_id` (`fk_event_id`),
  CONSTRAINT `event_urls_ibfk_1` FOREIGN KEY (`fk_event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_urls`
--

LOCK TABLES `event_urls` WRITE;
/*!40000 ALTER TABLE `event_urls` DISABLE KEYS */;
INSERT INTO `event_urls` VALUES (1,4,'https://www.plnoc.cz/'),(2,4,'https://www.facebook.com/PLNOC');
/*!40000 ALTER TABLE `event_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `event_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `duration_type` tinyint(4) NOT NULL,
  `name` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `description` text COLLATE utf8_czech_ci NOT NULL,
  `type_tag_ba` int(10) unsigned NOT NULL DEFAULT '0',
  `topic_tag_ba` int(10) unsigned NOT NULL DEFAULT '0',
  `org_name` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `owner_u_id` int(10) unsigned NOT NULL,
  `location` varchar(256) COLLATE utf8_czech_ci DEFAULT NULL,
  `img_path` varchar(256) COLLATE utf8_czech_ci DEFAULT NULL,
  `add_date` date NOT NULL,
  `price` int(10) unsigned NOT NULL DEFAULT '0',
  `targetg_tag_ba` int(10) unsigned NOT NULL DEFAULT '0',
  `counter` int(10) unsigned NOT NULL DEFAULT '0',
  `approved` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,4,'Matematický seminář','Vzdělávej se posíláním dopisů',9,1,'MFUK',1,NULL,'/assets/img/hellno.jpg','2021-11-26',0,3,143,1),(2,2,'Seminář pro nadané děti','Lorem',4,6349087,'Menza',2,NULL,'/assets/img/lmao.jpg','2021-11-30',4600,3,48,1),(3,4,'Víťův programovací kroužek','Holky mají přednost',8,12582913,'Vítězslav Kříž',2,NULL,'/assets/img/nice.png','2021-11-30',0,6,17,1),(4,1,'PLNOC','PLNOC je první přednášková noc v Plzni, kde studenti přednáší studentům. Můžeš se nechat inspirovat ostatními, nebo si sám vyzkoušet přednášení a předat své znalosti dál. Na PLNOC patří každé téma, které tě zajímá. Najdeš tu prezentace vědeckých prací, témata od soft skills po programování, ale i povídání o koníčcích nebo důležitých otázkách života, vesmíru a vůbec. Kromě přednášek se můžeš těšit i na workshopy, jídlo a doprovodný program. ',2,33554431,'PLNOC',1,'Plzeň','/assets/img/assets.jpg','2021-12-01',100,7,299,1),(5,1,'Heckathon','huh',1,14680064,'CSIRT',1,'Brno','/assets/img/lol.jpg','2021-12-01',150,6,13,1);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_badges`
--

DROP TABLE IF EXISTS `user_badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_badges` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fk_badge_id` int(10) unsigned NOT NULL,
  `fk_u_id` int(10) unsigned NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_badge_id` (`fk_badge_id`),
  KEY `fk_u_id` (`fk_u_id`),
  CONSTRAINT `user_badges_ibfk_1` FOREIGN KEY (`fk_badge_id`) REFERENCES `badges` (`badge_id`) ON DELETE CASCADE,
  CONSTRAINT `user_badges_ibfk_2` FOREIGN KEY (`fk_u_id`) REFERENCES `users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_badges`
--

LOCK TABLES `user_badges` WRITE;
/*!40000 ALTER TABLE `user_badges` DISABLE KEYS */;
INSERT INTO `user_badges` VALUES (1,1,1,'2021-12-01 16:15:37'),(2,5,1,'2021-12-01 17:15:37'),(3,1,2,'2021-12-01 18:15:37'),(4,1,3,'2021-12-01 18:15:37'),(5,1,9,'2022-01-10 13:00:52'),(6,2,9,'2022-01-10 13:00:57'),(7,1,11,'2022-01-10 13:09:58'),(8,20,11,'2022-01-10 13:11:31'),(9,2,11,'2022-01-10 13:13:20'),(10,20,18,'2022-01-22 23:00:00'),(11,20,27,'2022-01-22 23:00:00'),(14,20,30,'2022-01-23 23:00:00');
/*!40000 ALTER TABLE `user_badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_done_events`
--

DROP TABLE IF EXISTS `user_done_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_done_events` (
  `fk_event_id` int(10) unsigned NOT NULL,
  `fk_u_id` int(10) unsigned NOT NULL,
  KEY `fk_event_id` (`fk_event_id`),
  KEY `fk_u_id` (`fk_u_id`),
  CONSTRAINT `user_done_events_ibfk_1` FOREIGN KEY (`fk_event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE,
  CONSTRAINT `user_done_events_ibfk_2` FOREIGN KEY (`fk_u_id`) REFERENCES `users` (`u_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_done_events`
--

LOCK TABLES `user_done_events` WRITE;
/*!40000 ALTER TABLE `user_done_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_done_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_fav_events`
--

DROP TABLE IF EXISTS `user_fav_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
INSERT INTO `user_fav_events` VALUES (2,9),(1,6),(2,6),(5,6);
/*!40000 ALTER TABLE `user_fav_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `u_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `passhash` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `email` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `role_id` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '0=usr, 1=moderator, 2=admin',
  `firstname` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `lastname` varchar(256) COLLATE utf8_czech_ci NOT NULL,
  `img_path` varchar(256) COLLATE utf8_czech_ci DEFAULT NULL,
  `register_date` date NOT NULL,
  `xp` int(10) unsigned NOT NULL DEFAULT '0',
  `level` int(10) unsigned NOT NULL DEFAULT '1',
  `brief` text COLLATE utf8_czech_ci,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_id_UNIQUE` (`u_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sprtokiller','$2b$11$WeWp5yB1brPsq64MRIWupe7mkS1DQLngiRpkbwzEu0yXF4exPrTIa','sprtokiller.6c@gmail.com',2,'Vítězslav','Kříž',NULL,'2021-12-01',0,1,'Dělám eLearning'),(2,'naomh','$2b$08$H92nQ64APEl/m8Rlkqnn6OL5N6ra2L3N4KxDQ44PPVVRlanG7eykm','xsvond00@stud.fit.vutbr.cz',1,'Tomáš','Švondr',NULL,'2021-12-01',0,1,'Kup si moje naked NFTčka'),(3,'surikat','$2b$11$rroLnf43ww0LulmGQGc6TuGGRSUVvWWpx1sguOQDEL.dJPeYOR2Rq','xhencl02@stud.fit.vutbr.cz',0,'Kateřina','Henclová',NULL,'2021-12-01',0,1,NULL),(4,'user','$2b$11$rroLnf43ww0LulmGQGc6TuGGRSUVvWWpx1sguOQDEL.dJPeYOR2Rq','user@user.cz',0,'User','Novák',NULL,'2021-12-02',0,1,NULL),(5,'Nigga','$2b$11$gH7oFzHTP20p4bSYHqX88OnwMWCniwOes8nSw6tuprhlDbrGGn3O.','nigga@pejsek.com',0,'Nigga','Tigga',NULL,'2021-12-03',0,1,NULL),(6,'Arthur','$2b$11$WeWp5yB1brPsq64MRIWupe7mkS1DQLngiRpkbwzEu0yXF4exPrTIa','A@morgan.com',0,'Arthur','Morgan',NULL,'2021-12-03',0,1,NULL),(7,'blyat','$2b$11$dqXjKSEidMCX0X6K5j9GpOBMoCGHm64u83ZN6hqJ1bFDfpzwj/p56','xhencl02@stud.fit.vut.cz',0,'Kateřina','Henclová',NULL,'2021-12-03',0,1,NULL),(8,'venca','$2b$11$Tlg9lHOkrXs7BTnDFqQ.gup0vlDrwBcbC/W3XXPxIab36aTmH5aw6','katka@aartkom.com',0,'Nigga','Tigga',NULL,'2021-12-04',0,1,NULL),(9,'victor','$2b$11$f1jpMQOZ5f7KBuhx4KBZvuCSrUCIOESLQJ6hgqyPuGe.eFMolcxcm','victor@victor.cz',0,'','',NULL,'2022-01-09',0,1,NULL),(10,'Pepe','$2b$11$gwVeq0uZ3lv1amiXuwNMG.WcuZLHCsC8uPu3AEJGClmg9jC4Y3AJS','Pepe@ga.com',0,'','',NULL,'2022-01-09',0,1,NULL),(11,'Vitanek','$2b$11$GdLONMKl4B1Cx76EkuPWvelBdbYgILnLf9T1pJp5iE5qsXZSlPiAa','auticko.vita@seznam.cz',0,'','',NULL,'2022-01-10',0,1,NULL),(12,'SkákajícíPes','$2b$11$/oQfvRjigskwvDonRRqQ.OWTlxRC9ht09z1ezzb8RXL0DiNfyKM66','Pepanovak@seznam.cz',0,'','',NULL,'2022-01-10',0,1,NULL),(13,'Pejsák','$2b$11$um0c2XxFLsgcKYolu/zF7eTV5xXg23TfsDkJOX.9cN1ZzgtXT7n0e','pes@gmail.com',0,'','',NULL,'2022-01-22',0,1,NULL),(15,'123456','$2b$11$..US8I6uIGcjW1LiWLzbP.gTYOY/8Ld0kXIjpLfcO5xDKbAGtchRa','Pes@seznam.cz',0,'','',NULL,'2022-01-22',0,1,NULL),(16,'54321','$2b$11$EDCbN1vOlCFP61mBtIa0tOWe41uthQHgW7oCbOyNg/jw14Ux9Qab2','KK@K.com',0,'','',NULL,'2022-01-22',0,1,NULL),(17,'Štěně','$2b$11$eCBltIWLhPnEeLa/yBEfBOKHss6RPdThiGDxQARAhpiFTge/tbPdS','1@2.com',0,'','',NULL,'2022-01-22',0,1,NULL),(18,'kata33','$2b$11$N7uqA94HkHQAEo.I3bZfNOsf6UuGFewLBFALg9lHdBjYyZN9i8INK','kata33@kata33.cz',0,'','',NULL,'2022-01-22',0,1,NULL),(19,'kata44','$2b$11$Z7IO3b3MQQEWXWH2VqQ6W.Sc./dbKaYDdLkM2voDoKlpQtuusM9Sa','kata44@kata44.cz',0,'','',NULL,'2022-01-22',0,1,NULL),(20,'kata55','$2b$11$R7EZgKUWzTMUevNkxNMK2.iW0MwRCaH.pDg9omljAsglt/Hu.9dte','kata55@kata55.cz',0,'','',NULL,'2022-01-22',0,1,NULL),(22,'kata66','$2b$11$zu1SqOi2PYz3hbhrMkSPPueCBk7wDKF/mgTzxPy2l21R2/hV3DjZm','kata66@kata66.cz',0,'','',NULL,'2022-01-22',0,1,NULL),(24,'NiggaPigga','$2b$11$J/Mk34q2v3.0yExv3P6preBYpbPt.SU.N6JsfZ3.z/a9bde.udoTW','Nigga@pigga.com',0,'Skooby','Dooby','assets/AppImages/arthur_laugh.png','2022-01-23',0,1,NULL),(25,'palacinka','$2b$11$qI9o65mKiFs/83mf2N39J.340JP.XygSNha80bFvsAgvmtE1qYuXK','kata21@mail.com',0,'','',NULL,'2022-01-23',0,1,NULL),(26,'kata99','$2b$11$hJWew6BIrU8XYAt34RUsF.Waqg2NlxSF0c6xWoi9gO.oOviEY0.Ku','kata21@gmail.com',0,'','',NULL,'2022-01-23',0,1,NULL),(27,'kata77','$2b$11$m.RSQLHhRz/rQYWR/mC37OqiMLEQQ2Zo3h3o6wp5BegeNCDU..Bvq','kata77@seznam.cz',0,'','',NULL,'2022-01-23',0,1,NULL),(30,'User2','$2b$11$wO9L9y0DjKO0XajKQf4LXuzVMX16PbPk7i8c/prm3m2v.TNV8e1Ue','User@seznam.cz',0,'Hovňous','kocour','assets/AppImages/0dcfa262-39b8-4d96-b7cf-b1926ad8e9cc.gif','2022-01-24',0,1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-17 21:19:46
