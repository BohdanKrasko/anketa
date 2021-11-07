-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: localhost    Database: anketa
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `anketa`
--

DROP TABLE IF EXISTS `anketa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anketa` (
  `anketa_id` int NOT NULL AUTO_INCREMENT,
  `name_of_anketa` longtext NOT NULL,
  `category` longtext NOT NULL,
  PRIMARY KEY (`anketa_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anketa`
--

-- LOCK TABLES `anketa` WRITE;
-- /*!40000 ALTER TABLE `anketa` DISABLE KEYS */;
-- INSERT INTO `anketa` VALUES (2,'doneV','done'),(8,'sc','sac');
-- /*!40000 ALTER TABLE `anketa` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `children`
--

DROP TABLE IF EXISTS `children`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `children` (
  `children_id` int NOT NULL AUTO_INCREMENT,
  `name` longtext NOT NULL,
  `surname` longtext NOT NULL,
  `birthday` date NOT NULL,
  `weight` int NOT NULL,
  `height` int NOT NULL,
  `parents_id` int NOT NULL,
  PRIMARY KEY (`children_id`),
  KEY `parents_idx` (`parents_id`),
  CONSTRAINT `parents` FOREIGN KEY (`parents_id`) REFERENCES `parents` (`parents_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `children`
--

-- LOCK TABLES `children` WRITE;
-- /*!40000 ALTER TABLE `children` DISABLE KEYS */;
-- INSERT INTO `children` VALUES (1,'ascdsf','sakjnk','2021-10-05',12,123,1),(3,'Dima','Havrulchyk','2021-10-07',123,123,2),(4,'Na','Yulia','2021-10-15',21,11,2),(6,'asd','sd','2021-10-19',21,123,2),(8,'user','user','2021-10-05',12,123,2),(9,'hjj','hjh','2021-11-02',21,213,7),(10,'xzc','sczx','2021-11-02',2,21,2),(11,'test','test','2021-10-06',12,123,2),(13,'szdc','xcvkjsdbjkcbsd','2021-11-01',2,12,2);
-- /*!40000 ALTER TABLE `children` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `children_answer`
--

DROP TABLE IF EXISTS `children_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `children_answer` (
  `children_answer_id` int NOT NULL AUTO_INCREMENT,
  `children_id` int NOT NULL,
  `list_of_answer_id` int NOT NULL,
  `question_id` int NOT NULL,
  PRIMARY KEY (`children_answer_id`),
  KEY `children_idx` (`children_id`),
  KEY `list_of_answer_idx` (`list_of_answer_id`),
  KEY `question_id_to_answer_idx` (`question_id`),
  CONSTRAINT `answer_id_list` FOREIGN KEY (`list_of_answer_id`) REFERENCES `list_of_answers` (`list_of_answers_id`) ON UPDATE CASCADE,
  CONSTRAINT `children_and_answer` FOREIGN KEY (`children_id`) REFERENCES `children` (`children_id`) ON UPDATE CASCADE,
  CONSTRAINT `to_question_from_answer` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `children_answer`
--

-- LOCK TABLES `children_answer` WRITE;
-- /*!40000 ALTER TABLE `children_answer` DISABLE KEYS */;
-- INSERT INTO `children_answer` VALUES (75,4,69,24),(81,6,68,23),(88,3,77,26),(98,3,59,21),(99,3,64,22),(100,3,73,25),(101,3,67,23),(102,9,60,21),(103,9,64,22),(104,9,73,25),(105,9,68,23),(106,6,60,21),(107,6,66,22),(108,6,72,25);
-- /*!40000 ALTER TABLE `children_answer` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `list_of_answers`
--

DROP TABLE IF EXISTS `list_of_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_of_answers` (
  `list_of_answers_id` int NOT NULL AUTO_INCREMENT,
  `name_of_answer` longtext NOT NULL,
  `question_id` int NOT NULL,
  PRIMARY KEY (`list_of_answers_id`),
  KEY `to_question_id_from_list_of_answer_idx` (`question_id`),
  CONSTRAINT `to_question_id_from_list_of_answer` FOREIGN KEY (`question_id`) REFERENCES `question` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_of_answers`
--

-- LOCK TABLES `list_of_answers` WRITE;
-- /*!40000 ALTER TABLE `list_of_answers` DISABLE KEYS */;
-- INSERT INTO `list_of_answers` VALUES (59,'Так',21),(60,'Ні',21),(64,'Так',22),(65,'Ні',22),(66,'інше',22),(67,'Так',23),(68,'Ні',23),(69,'Так',24),(70,'Ні',24),(71,'інше',21),(72,'Так',25),(73,'Ні',25),(74,'інше',25),(75,'інше',23),(76,'інше',24),(77,'answer 1',26),(78,'answer 2',26),(79,'так',27),(80,'Ні',27),(81,'Ваш варіан',27);
-- /*!40000 ALTER TABLE `list_of_answers` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `parents`
--

DROP TABLE IF EXISTS `parents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parents` (
  `parents_id` int NOT NULL AUTO_INCREMENT,
  `first_name` longtext NOT NULL,
  `last_name` longtext NOT NULL,
  `username` longtext NOT NULL,
  `password` longtext NOT NULL,
  `phone` longtext DEFAULT NULL,
  `role` longtext NOT NULL,
  `token` longtext,
  PRIMARY KEY (`parents_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parents`
--

LOCK TABLES `parents` WRITE;
/*!40000 ALTER TABLE `parents` DISABLE KEYS */;
INSERT INTO `parents` (first_name, last_name, username, password, role) VALUES ('Андрій','Красько','andriy','$2a$10$3H4amMBee4jkf9oKusaiJu83NV959GeI.tMtYoslcS/53Axmvg85G','admin');
/*!40000 ALTER TABLE `parents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `question` longtext NOT NULL,
  `section_id` int NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `to_section_id_idx` (`section_id`),
  CONSTRAINT `to_section_id_from_question` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

-- LOCK TABLES `question` WRITE;
-- /*!40000 ALTER TABLE `question` DISABLE KEYS */;
-- INSERT INTO `question` VALUES (21,'question 1',22),(22,'question 2',22),(23,'question 3',23),(24,'question 4',23),(25,'question 3',22),(26,'one q',24),(27,'two q',24);
-- /*!40000 ALTER TABLE `question` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `section_id` int NOT NULL AUTO_INCREMENT,
  `name_of_section` longtext NOT NULL,
  `anketa_id` int NOT NULL,
  PRIMARY KEY (`section_id`),
  KEY `to_section_idx` (`anketa_id`),
  CONSTRAINT `to_anketa_from_section` FOREIGN KEY (`anketa_id`) REFERENCES `anketa` (`anketa_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

-- LOCK TABLES `section` WRITE;
-- /*!40000 ALTER TABLE `section` DISABLE KEYS */;
-- INSERT INTO `section` VALUES (22,'section 1',2),(23,'section 2',2),(24,'one',8);
-- /*!40000 ALTER TABLE `section` ENABLE KEYS */;
-- UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-03 23:14:11
