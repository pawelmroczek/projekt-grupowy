-- MySQL dump 10.13  Distrib 9.0.1, for Linux (x86_64)
--
-- Host: localhost    Database: fashion
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clothes`
--

DROP TABLE IF EXISTS `clothes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clean` bit(1) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `priority` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9v7gut79d5gafwodlxbpv5y2x` (`user_id`),
  CONSTRAINT `FK9v7gut79d5gafwodlxbpv5y2x` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes`
--

LOCK TABLES `clothes` WRITE;
/*!40000 ALTER TABLE `clothes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clothes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `households`
--

DROP TABLE IF EXISTS `households`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `households` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `households`
--

LOCK TABLES `households` WRITE;
/*!40000 ALTER TABLE `households` DISABLE KEYS */;
/*!40000 ALTER TABLE `households` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invitations`
--

DROP TABLE IF EXISTS `invitations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_user_id` int DEFAULT NULL,
  `to_user_id` int DEFAULT NULL,
  `household_id` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKei6yegf55segqpc9ck17syqdb` (`from_user_id`),
  KEY `FKar0cuiw8cplih984qvia3sw7y` (`to_user_id`),
  CONSTRAINT `FKar0cuiw8cplih984qvia3sw7y` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKei6yegf55segqpc9ck17syqdb` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitations`
--

LOCK TABLES `invitations` WRITE;
/*!40000 ALTER TABLE `invitations` DISABLE KEYS */;
/*!40000 ALTER TABLE `invitations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laundries`
--

DROP TABLE IF EXISTS `laundries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laundries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `household_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKaj9ccko52okmke58eh25apl3n` (`household_id`),
  KEY `FK9b718ot84yn5re1d6rd8ik49c` (`user_id`),
  CONSTRAINT `FK9b718ot84yn5re1d6rd8ik49c` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKaj9ccko52okmke58eh25apl3n` FOREIGN KEY (`household_id`) REFERENCES `households` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laundries`
--

LOCK TABLES `laundries` WRITE;
/*!40000 ALTER TABLE `laundries` DISABLE KEYS */;
/*!40000 ALTER TABLE `laundries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laundry_clothes`
--

DROP TABLE IF EXISTS `laundry_clothes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laundry_clothes` (
  `laundry_id` int NOT NULL,
  `clothes_id` int NOT NULL,
  PRIMARY KEY (`laundry_id`,`clothes_id`),
  KEY `FKh5f6utlv3k3l8w4napy4cdbqf` (`clothes_id`),
  CONSTRAINT `FKh5f6utlv3k3l8w4napy4cdbqf` FOREIGN KEY (`clothes_id`) REFERENCES `clothes` (`id`),
  CONSTRAINT `FKko6m9t1pvbodnlkycut6l7t33` FOREIGN KEY (`laundry_id`) REFERENCES `laundries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laundry_clothes`
--

LOCK TABLES `laundry_clothes` WRITE;
/*!40000 ALTER TABLE `laundry_clothes` DISABLE KEYS */;
/*!40000 ALTER TABLE `laundry_clothes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outfit_clothes`
--

DROP TABLE IF EXISTS `outfit_clothes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outfit_clothes` (
  `outfit_id` int NOT NULL,
  `clothes_id` int NOT NULL,
  KEY `FKihltvqxbo6sdqutcljountdsj` (`clothes_id`),
  KEY `FK2qu385b4o0yanhdc6gdtbmar` (`outfit_id`),
  CONSTRAINT `FK2qu385b4o0yanhdc6gdtbmar` FOREIGN KEY (`outfit_id`) REFERENCES `outfits` (`id`),
  CONSTRAINT `FKihltvqxbo6sdqutcljountdsj` FOREIGN KEY (`clothes_id`) REFERENCES `clothes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outfit_clothes`
--

LOCK TABLES `outfit_clothes` WRITE;
/*!40000 ALTER TABLE `outfit_clothes` DISABLE KEYS */;
/*!40000 ALTER TABLE `outfit_clothes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outfits`
--

DROP TABLE IF EXISTS `outfits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outfits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf249bhuwj850p7mbg5el7a5f9` (`user_id`),
  CONSTRAINT `FKf249bhuwj850p7mbg5el7a5f9` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outfits`
--

LOCK TABLES `outfits` WRITE;
/*!40000 ALTER TABLE `outfits` DISABLE KEYS */;
/*!40000 ALTER TABLE `outfits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pictures`
--

DROP TABLE IF EXISTS `pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pictures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `clothes_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKbs1weyvfnmqvnpmdlskcoj08v` (`clothes_id`),
  CONSTRAINT `FKlor564p6d2qk1i5apoyduswbl` FOREIGN KEY (`clothes_id`) REFERENCES `clothes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pictures`
--

LOCK TABLES `pictures` WRITE;
/*!40000 ALTER TABLE `pictures` DISABLE KEYS */;
/*!40000 ALTER TABLE `pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_friends`
--

DROP TABLE IF EXISTS `user_friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_friends` (
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`friend_id`),
  KEY `FK11y5boh1e7gh60rdqixyetv3x` (`friend_id`),
  CONSTRAINT `FK11y5boh1e7gh60rdqixyetv3x` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKk08ugelrh9cea1oew3hgxryw2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_friends`
--

LOCK TABLES `user_friends` WRITE;
/*!40000 ALTER TABLE `user_friends` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences`
--

DROP TABLE IF EXISTS `user_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_preferences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `allow_delicate_with_normal` bit(1) DEFAULT NULL,
  `allow_hand_wash_with_machine` bit(1) DEFAULT NULL,
  `min_items_per_load` int DEFAULT NULL,
  `temeprature_tolerance` int DEFAULT NULL,
  `treat_empty_as_compatible` bit(1) DEFAULT NULL,
  `use_restriction_matching` bit(1) DEFAULT NULL,
  `use_temperature_matching` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences`
--

LOCK TABLES `user_preferences` WRITE;
/*!40000 ALTER TABLE `user_preferences` DISABLE KEYS */;
INSERT INTO `user_preferences` VALUES (1,_binary '',_binary '\0',2,30,_binary '',_binary '',_binary '\0');
/*!40000 ALTER TABLE `user_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `household_id` int DEFAULT NULL,
  `is_enabled` bit(1) DEFAULT NULL,
  `preferences_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKp500u51iqqij1u0b4eqv13lwx` (`preferences_id`),
  KEY `FKlacr3nkhlm93hgc5d32ukqim9` (`household_id`),
  CONSTRAINT `FKlacr3nkhlm93hgc5d32ukqim9` FOREIGN KEY (`household_id`) REFERENCES `households` (`id`),
  CONSTRAINT `FKoh9mlbfg6d4e2k8p2qhcxm1kh` FOREIGN KEY (`preferences_id`) REFERENCES `user_preferences` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'wiktor5@gmail.com','$2a$10$26gTeDT8kaoNkgmRfwbN5.siOO/OuSSkvwZuD4xaWZoDYHD2AIbSm','wiktor',NULL,NULL,NULL),(2,'maciek@gmail.com','$2a$10$5PvNytX7q3ojymnUuI35E.daP/qc0nnWetQOGoWKolVxgkvXF.CyG','maciek',NULL,NULL,NULL),(3,'admin@gmail.com','$2a$10$buhLnWjuTl5AUH6B42IJmecsQpDj8n9UdLBqjicvi2PmsYQ/AoG56','admin',NULL,_binary '',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_tokens`
--

DROP TABLE IF EXISTS `verification_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expiry_date` datetime(6) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6q9nsb665s9f8qajm3j07kd1e` (`token`),
  UNIQUE KEY `UKdqp95ggn6gvm865km5muba2o5` (`user_id`),
  CONSTRAINT `FK54y8mqsnq1rtyf581sfmrbp4f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_tokens`
--

LOCK TABLES `verification_tokens` WRITE;
/*!40000 ALTER TABLE `verification_tokens` DISABLE KEYS */;
INSERT INTO `verification_tokens` VALUES (1,'2025-10-12 14:04:19.809151','65193100-14ff-4552-8d4f-56ec0a6a178e',3);
/*!40000 ALTER TABLE `verification_tokens` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-12  8:48:54
