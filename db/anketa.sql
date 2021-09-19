CREATE DATABASE  IF NOT EXISTS `anketa` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `anketa`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: anketa
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anketa`
--

DROP TABLE IF EXISTS `anketa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `anketa` (
  `anketa_id` int(11) NOT NULL AUTO_INCREMENT,
  `name_of_anketa` varchar(45) NOT NULL,
  PRIMARY KEY (`anketa_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anketa`
--

LOCK TABLES `anketa` WRITE;
/*!40000 ALTER TABLE `anketa` DISABLE KEYS */;
INSERT INTO `anketa` VALUES (1,'ask_anketa'),(2,'anketa_1'),(3,'{\r\n    \"name_of_anketa\":\"anketa_2\"\r\n}'),(4,'anketa_2'),(5,'anketa_3'),(6,'anketa_4'),(7,'anketa_4');
/*!40000 ALTER TABLE `anketa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_of_answers`
--

DROP TABLE IF EXISTS `list_of_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `list_of_answers` (
  `list_of_answers_id` int(11) NOT NULL AUTO_INCREMENT,
  `name_of_answer` varchar(45) NOT NULL,
  `question_id` int(11) NOT NULL,
  PRIMARY KEY (`list_of_answers_id`),
  KEY `to_question_id_from_list_of_answer_idx` (`question_id`),
  CONSTRAINT `to_question_id_from_list_of_answer` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_of_answers`
--

LOCK TABLES `list_of_answers` WRITE;
/*!40000 ALTER TABLE `list_of_answers` DISABLE KEYS */;
INSERT INTO `list_of_answers` VALUES (1,'yes',1),(2,'no',1),(3,'mayby',2),(4,'choice 1',51),(5,'choice 2',51),(6,'choice 1',52),(7,'choice 2',52);
/*!40000 ALTER TABLE `list_of_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `question` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(200) NOT NULL,
  `section_id` int(11) NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `to_section_id_idx` (`section_id`),
  CONSTRAINT `to_section_id_from_question` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'question_1',1),(2,'question_2',1),(3,'question_3',2),(4,'question 1',1),(5,'question 1',1),(6,'question 1',1),(7,'question 1',1),(8,'question 21',1),(9,'question 21',1),(10,'question 21',1),(11,'question 21',1),(12,'question 21',1),(13,'question 33',1),(14,'question 33',1),(15,'question 33',1),(16,'question 33',1),(17,'question 33',1),(18,'question 33',1),(19,'question 33',1),(20,'question 33',1),(21,'question 33',1),(22,'question 33',1),(23,'question 33',1),(24,'question 33',1),(25,'question 33',1),(26,'question 33',1),(27,'question 33',1),(28,'question 33',1),(29,'question 33',1),(30,'question 33',1),(31,'question 33',1),(32,'question 33',1),(33,'question 33',1),(34,'question 33',1),(35,'question 33',1),(36,'question 33',1),(37,'question 33',1),(38,'question 33',1),(39,'question 33',1),(40,'question 33',1),(41,'question 33',1),(42,'question 33',1),(43,'question 33',1),(44,'question 33',1),(45,'question 33',1),(46,'question 33',1),(47,'question 33',1),(48,'question 33',1),(49,'question 33',1),(50,'question 33',1),(51,'question 44',1),(52,'question 44',1);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `section` (
  `section_id` int(11) NOT NULL AUTO_INCREMENT,
  `name_of_section` varchar(45) NOT NULL,
  `anketa_id` int(11) NOT NULL,
  PRIMARY KEY (`section_id`),
  KEY `to_section_idx` (`anketa_id`),
  CONSTRAINT `to_anketa_from_section` FOREIGN KEY (`anketa_id`) REFERENCES `anketa` (`anketa_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,'section_1',1),(2,'section_2',1),(3,'name1',1),(4,'name2',1),(5,'',1),(6,'',1),(7,'name3',1),(8,'name4',1),(9,'name3',1),(10,'name4',1);
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `po_batkovi` varchar(45) NOT NULL,
  `age` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'','','bob','snoy','startk',18,79,'34567890','test@gmail.com'),(2,'','','name','surname','po_batkove',18,70,'342324324','user@gmail.com'),(3,'','','name','surname','po_batkove',18,70,'342324324','user@gmail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_and_anketa`
--

DROP TABLE IF EXISTS `user_and_anketa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_and_anketa` (
  `user_and_anketa_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `anketa_id` int(11) NOT NULL,
  PRIMARY KEY (`user_and_anketa_id`),
  KEY `to_user_id_from_user_anketa_idx` (`user_id`),
  KEY `to_anketa_id_from_user_and_anketa_idx` (`anketa_id`),
  CONSTRAINT `to_anketa_id_from_user_and_anketa` FOREIGN KEY (`anketa_id`) REFERENCES `anketa` (`anketa_id`),
  CONSTRAINT `to_user_id_from_user_anketa` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_and_anketa`
--

LOCK TABLES `user_and_anketa` WRITE;
/*!40000 ALTER TABLE `user_and_anketa` DISABLE KEYS */;
INSERT INTO `user_and_anketa` VALUES (1,1,1);
/*!40000 ALTER TABLE `user_and_anketa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_answer`
--

DROP TABLE IF EXISTS `user_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_answer` (
  `user_answer_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `list_of_answer_id` int(11) NOT NULL,
  PRIMARY KEY (`user_answer_id`),
  KEY `to_user_from_user_amswer_idx` (`user_id`),
  KEY `to_list_of_answer_from_user_answer_idx` (`list_of_answer_id`),
  CONSTRAINT `to_list_of_answer_from_user_answer` FOREIGN KEY (`list_of_answer_id`) REFERENCES `list_of_answers` (`list_of_answers_id`),
  CONSTRAINT `to_user_from_user_amswer` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_answer`
--

LOCK TABLES `user_answer` WRITE;
/*!40000 ALTER TABLE `user_answer` DISABLE KEYS */;
INSERT INTO `user_answer` VALUES (1,1,1);
/*!40000 ALTER TABLE `user_answer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-19 17:40:09
