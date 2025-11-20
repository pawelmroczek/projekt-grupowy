-- MySQL dump 10.13  Distrib 9.5.0, for Linux (x86_64)
--
-- Host: localhost    Database: fashion
-- ------------------------------------------------------
-- Server version	9.5.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'ac4d5064-bee5-11f0-8f9a-0242ac130002:1-73,
b6a415d0-b58f-11f0-87f6-0242ac130002:1-64';

--
-- Table structure for table `clothes`
--

DROP TABLE IF EXISTS `clothes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clean` bit(1) DEFAULT NULL,
  `visible` int DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `category` int DEFAULT NULL,
  `color_hex` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9v7gut79d5gafwodlxbpv5y2x` (`user_id`),
  CONSTRAINT `FK9v7gut79d5gafwodlxbpv5y2x` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes`
--

LOCK TABLES `clothes` WRITE;
/*!40000 ALTER TABLE `clothes` DISABLE KEYS */;
INSERT INTO `clothes` VALUES (1,_binary '',1,'tan','2025-11-11','Inspiring Places','M','Top',4,3,0,'#d2beaa'),(2,_binary '',1,'purple','2025-11-11','ETI','L','Top',4,2,0,'#1e0082'),(3,_binary '',1,'teal','2025-11-11','NYR','L','Top',4,2,0,'#3c7882'),(4,_binary '',1,'light gray','2025-11-11','NYR','L','Top',4,3,0,'#bebebe'),(5,_binary '',1,'black','2025-11-11','Osiolek','XXL','Top',4,4,0,'#323232'),(6,_binary '',1,'navy','2025-11-11','Laur','M','Top',4,2,0,'#1e2846'),(7,_binary '',1,'navy','2025-11-11','Kotwica','S','Top',4,3,0,'#142850'),(8,_binary '',0,'olive','2025-11-11','BigStar','XXL','Top',4,1,0,'#466464'),(9,_binary '',1,'purple','2025-11-11','NYR','L','Top',4,3,0,'#463264'),(10,_binary '',0,'purple','2025-11-11','Bershka','M','Bluza/Sweter',4,1,0,'#463c82'),(11,_binary '',1,'teal','2025-11-11','Lacoste Polo','L','Top',4,3,0,'#325050'),(12,_binary '',1,'white','2025-11-11','Polo','L','Top',4,3,0,'#c8c8d2'),(13,_binary '',1,'olive','2025-11-11','Polo Lacoste','L','Top',4,3,0,'#3c5064'),(14,_binary '',1,'beige','2025-11-11','Polo jasne Lacoste','L','Top',4,3,0,'#bebec8'),(15,_binary '',1,'navy','2025-11-11','Lacoste','L','Top',4,4,0,'#143282'),(16,_binary '',1,'navy','2025-11-11','Ralph ciemny','L','Top',4,4,0,'#1e468c'),(17,_binary '',1,'beige','2025-11-11','Ralph jasny','M','Top',4,4,0,'#c8c8c8'),(18,_binary '',1,'gray','2025-11-11','Siwy sweter','L','Bluza/Sweter',4,4,0,'#96968c'),(19,_binary '',1,'light gray','2025-11-11','Gant Sport','XXL','Bluza/Sweter',4,3,0,'#aaaaaa'),(20,_binary '',1,'pink','2025-11-11','Rozowa bluza','M','Bluza/Sweter',4,3,0,'#be82c8'),(21,_binary '',0,'teal','2025-11-11','Fanelka','L','Koszula/Bluzka',4,2,0,'#141414'),(22,_binary '',1,'orange','2025-11-11','NYR','S','Top',4,3,0,'#d29664'),(23,_binary '',1,'navy','2025-11-11','Spodnie','M','Spodnie',4,4,0,'#143c6e'),(24,_binary '',1,'navy','2025-11-11','Giacomo conti','L','Spodnie',4,4,0,'#0a3278'),(25,_binary '',1,'maroon','2025-11-11','Czerwone strare','M','Spodnie',4,2,0,'#783c3c'),(26,_binary '',1,'burgundy','2025-11-11','Czerwone Hiltl','M','Spodnie',4,3,0,'#822850'),(27,_binary '',1,'brown','2025-11-11','H&M','M','Spodnie',4,4,0,'#140a0a'),(28,_binary '',1,'tan','2025-11-11','khaki Hiltl','M','Spodnie',4,4,0,'#a0968c'),(29,_binary '',1,'navy','2025-11-11','Wolczanka','M','Spodnie',4,3,0,'#0a1432'),(30,_binary '',1,'blue','2025-11-11','Jeansy','M','Spodnie',4,4,0,'#465a78'),(31,_binary '',1,'navy','2025-11-11','Eleganckie','M','Spodnie',4,2,0,'#1e2846'),(32,_binary '',1,'maroon','2025-11-11','Rekawnik','S','Koszula/Bluzka',4,2,0,'#503232'),(33,_binary '',1,'black','2025-11-11','Bezrekawnik','M','Bluza/Sweter',4,4,0,'#1e2846'),(34,_binary '',1,'gray','2025-11-11','Dziadkowy','L','Bluza/Sweter',4,3,0,'#a0a0a0'),(35,_binary '',1,'brown','2025-11-11','Bluzosweter','M','Bluza/Sweter',4,4,0,'#464664'),(36,_binary '',1,'brown','2025-11-11','Golf','M','Bluza/Sweter',4,3,0,'#464664'),(37,_binary '',1,'white','2025-11-11','Biala','M','Koszula/Bluzka',4,2,0,'#c8c8c8'),(38,_binary '',1,'navy','2025-11-11','FCB 23/24','L','Top',4,3,0,'#141e50'),(39,_binary '',1,'black','2025-11-11','FCB 24/25','L','Top',4,3,0,'#1e3246'),(40,_binary '',1,'blue','2025-11-11','Krata','XXL','Koszula/Bluzka',4,3,0,'#145ad2'),(41,_binary '',1,'black','2025-11-11','Czarna','M','Koszula/Bluzka',4,3,0,'#282832'),(42,_binary '',1,'cyan','2025-11-11','Niebieska krata','L','Koszula/Bluzka',4,3,0,'#8c8ca0'),(43,_binary '',1,'red','2025-11-11','Czerowna krata','L','Koszula/Bluzka',4,3,0,'#a096b4'),(44,_binary '',1,'blue','2025-11-11','Niebieska','XXL','Koszula/Bluzka',4,3,0,'#6e8cc8'),(45,_binary '',1,'lavender','2025-11-11','Fioletowa','L','Koszula/Bluzka',4,3,0,'#9696dc'),(46,_binary '',1,'light gray','2025-11-11','Lump','L','Koszula/Bluzka',4,3,0,'#8ca0be'),(47,_binary '',1,'maroon','2025-11-11','Siwateczny','S','Bluza/Sweter',4,4,0,'#96140a'),(48,_binary '',1,'black','2025-11-11','KicKers','L','Bluza/Sweter',4,3,0,'#0a0a14'),(49,_binary '',1,'gray','2025-11-11','Krata','XXL','Koszula/Bluzka',4,3,0,'#1e1e32'),(50,_binary '',1,'gray','2025-11-11','Lump2','M','Koszula/Bluzka',4,3,0,'#646464'),(51,_binary '',1,'black','2025-11-11','Oversize sweter','M','Bluza/Sweter',4,3,0,'#1e1e28'),(52,_binary '',1,'blue','2025-11-11','Lump3','XS','Koszula/Bluzka',4,3,0,'#141e28'),(53,_binary '',1,'gray','2025-11-11','Zara','L','Bluza/Sweter',4,3,0,'#281e1e'),(54,_binary '',1,'burgundy','2025-11-11','Bordo','M','Koszula/Bluzka',4,3,0,'#641e32'),(55,_binary '',1,'gray','2025-11-11','Sweterek','L','Bluza/Sweter',4,3,0,'#46463c'),(56,_binary '',1,'black','2025-11-11','Marynarka','L','Kurtka/Płaszcz',4,2,0,'#323246'),(57,_binary '',1,'brown','2025-11-11','Kurteczka','M','Kurtka/Płaszcz',4,4,0,'#46321e'),(58,_binary '',1,'black','2025-11-11','Plaszcz','M','Kurtka/Płaszcz',4,4,0,'#281e14'),(59,_binary '',1,'gray','2025-11-11','Kaszkiet','M','Nakrycie głowy',4,3,0,'#64645a'),(60,_binary '',1,'olive','2025-11-11','NY','M','Nakrycie głowy',4,4,0,'#505046'),(61,_binary '',1,'white','2025-11-11','Hackett','41','Buty',4,4,1,'#e6e6e6');
/*!40000 ALTER TABLE `clothes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes_pictograms`
--

DROP TABLE IF EXISTS `clothes_pictograms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_pictograms` (
  `clothes_id` int NOT NULL,
  `pictogram_id` int NOT NULL,
  PRIMARY KEY (`clothes_id`,`pictogram_id`),
  KEY `FK8pc5usygi34kbw3robs42hpa` (`pictogram_id`),
  CONSTRAINT `FK8ilh5t39qtk4wka6jmjldw0kx` FOREIGN KEY (`clothes_id`) REFERENCES `clothes` (`id`),
  CONSTRAINT `FK8pc5usygi34kbw3robs42hpa` FOREIGN KEY (`pictogram_id`) REFERENCES `pictograms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes_pictograms`
--

LOCK TABLES `clothes_pictograms` WRITE;
/*!40000 ALTER TABLE `clothes_pictograms` DISABLE KEYS */;
INSERT INTO `clothes_pictograms` VALUES (2,0),(3,0),(4,0),(6,0),(7,0),(9,0),(10,0),(18,0),(20,0),(22,0),(23,0),(24,0),(26,0),(28,0),(29,0),(32,0),(33,0),(38,0),(39,0),(41,0),(44,0),(47,0),(48,0),(49,0),(51,0),(53,0),(5,1),(13,1),(15,1),(19,1),(21,1),(25,1),(27,1),(30,1),(34,1),(37,1),(40,1),(43,1),(46,1),(52,1),(54,1),(2,6),(3,6),(4,6),(5,6),(6,6),(7,6),(9,6),(10,6),(13,6),(15,6),(18,6),(19,6),(20,6),(21,6),(22,6),(23,6),(24,6),(25,6),(26,6),(27,6),(28,6),(30,6),(31,6),(32,6),(33,6),(34,6),(35,6),(37,6),(38,6),(39,6),(40,6),(41,6),(43,6),(44,6),(46,6),(47,6),(48,6),(49,6),(51,6),(52,6),(53,6),(54,6),(57,6),(59,6),(3,8),(4,8),(6,8),(7,8),(9,8),(13,8),(15,8),(18,8),(19,8),(20,8),(21,8),(22,8),(23,8),(25,8),(30,8),(32,8),(33,8),(35,8),(37,8),(38,8),(39,8),(40,8),(41,8),(44,8),(46,8),(47,8),(49,8),(51,8),(52,8),(53,8),(59,8),(18,9),(33,9),(38,9),(39,9),(48,9),(49,9),(59,9),(3,11),(4,11),(5,11),(6,11),(7,11),(9,11),(13,11),(15,11),(18,11),(19,11),(20,11),(21,11),(22,11),(23,11),(24,11),(25,11),(27,11),(30,11),(32,11),(33,11),(35,11),(38,11),(40,11),(41,11),(43,11),(46,11),(47,11),(48,11),(49,11),(51,11),(52,11),(53,11),(54,11),(57,11),(59,11),(31,12),(57,12),(59,12),(2,19),(5,19),(10,19),(24,19),(26,19),(27,19),(28,19),(31,19),(34,19),(43,19),(54,19),(57,19),(29,22),(18,25),(19,25),(18,26),(35,26),(58,26),(2,29),(7,29),(10,29),(20,29),(25,29),(35,29),(37,29),(41,29),(44,29),(47,29),(51,29),(52,29),(53,29),(57,29),(3,30),(4,30),(5,30),(6,30),(9,30),(13,30),(15,30),(19,30),(21,30),(22,30),(23,30),(24,30),(26,30),(27,30),(28,30),(29,30),(30,30),(31,30),(32,30),(34,30),(40,30),(43,30),(46,30),(54,30),(29,38),(2,40),(10,40),(26,40),(28,40),(37,40),(44,40);
/*!40000 ALTER TABLE `clothes_pictograms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes_seasons`
--

DROP TABLE IF EXISTS `clothes_seasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_seasons` (
  `clothes_id` int NOT NULL,
  `season` enum('AUTUMN','SPRING','SUMMER','WINTER') DEFAULT NULL,
  KEY `FKtfkxe8q2ar40naiabsj70dck4` (`clothes_id`),
  CONSTRAINT `FKtfkxe8q2ar40naiabsj70dck4` FOREIGN KEY (`clothes_id`) REFERENCES `clothes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes_seasons`
--

LOCK TABLES `clothes_seasons` WRITE;
/*!40000 ALTER TABLE `clothes_seasons` DISABLE KEYS */;
INSERT INTO `clothes_seasons` VALUES (1,'SPRING'),(1,'SUMMER'),(2,'SUMMER'),(2,'SPRING'),(3,'SUMMER'),(3,'SPRING'),(4,'SUMMER'),(4,'SPRING'),(5,'SUMMER'),(5,'SPRING'),(6,'SPRING'),(6,'SUMMER'),(7,'SUMMER'),(7,'SPRING'),(8,'SUMMER'),(8,'SPRING'),(9,'SUMMER'),(9,'SPRING'),(10,'AUTUMN'),(10,'WINTER'),(11,'SUMMER'),(11,'SPRING'),(12,'SUMMER'),(12,'SPRING'),(13,'SUMMER'),(13,'SPRING'),(14,'SUMMER'),(14,'SPRING'),(15,'SPRING'),(15,'SUMMER'),(16,'SUMMER'),(16,'SPRING'),(17,'SUMMER'),(17,'SPRING'),(18,'AUTUMN'),(18,'WINTER'),(19,'AUTUMN'),(19,'WINTER'),(19,'SPRING'),(20,'AUTUMN'),(20,'WINTER'),(20,'SPRING'),(21,'AUTUMN'),(22,'SUMMER'),(22,'SPRING'),(23,'SPRING'),(23,'SUMMER'),(23,'AUTUMN'),(23,'WINTER'),(24,'AUTUMN'),(24,'SUMMER'),(24,'SPRING'),(24,'WINTER'),(25,'SPRING'),(25,'WINTER'),(25,'AUTUMN'),(26,'SPRING'),(26,'SUMMER'),(26,'AUTUMN'),(26,'WINTER'),(27,'WINTER'),(27,'AUTUMN'),(27,'SPRING'),(28,'AUTUMN'),(28,'SPRING'),(28,'SUMMER'),(29,'WINTER'),(29,'AUTUMN'),(29,'SPRING'),(30,'WINTER'),(30,'AUTUMN'),(30,'SUMMER'),(30,'SPRING'),(31,'WINTER'),(31,'SPRING'),(31,'AUTUMN'),(32,'SPRING'),(32,'AUTUMN'),(33,'WINTER'),(33,'AUTUMN'),(33,'SPRING'),(34,'WINTER'),(34,'AUTUMN'),(35,'WINTER'),(35,'AUTUMN'),(36,'WINTER'),(36,'AUTUMN'),(37,'SPRING'),(37,'AUTUMN'),(38,'SPRING'),(38,'SUMMER'),(39,'SPRING'),(39,'SUMMER'),(40,'SPRING'),(40,'WINTER'),(40,'AUTUMN'),(41,'WINTER'),(41,'SPRING'),(41,'AUTUMN'),(42,'SPRING'),(42,'WINTER'),(42,'AUTUMN'),(43,'WINTER'),(43,'SPRING'),(43,'AUTUMN'),(44,'SPRING'),(44,'WINTER'),(44,'AUTUMN'),(45,'SUMMER'),(45,'SPRING'),(45,'AUTUMN'),(46,'AUTUMN'),(46,'SPRING'),(47,'WINTER'),(48,'WINTER'),(49,'WINTER'),(49,'AUTUMN'),(49,'SPRING'),(50,'AUTUMN'),(50,'SPRING'),(51,'WINTER'),(52,'AUTUMN'),(52,'SPRING'),(53,'WINTER'),(54,'AUTUMN'),(54,'SPRING'),(55,'WINTER'),(55,'AUTUMN'),(56,'AUTUMN'),(56,'SPRING'),(56,'WINTER'),(57,'AUTUMN'),(57,'SPRING'),(58,'WINTER'),(58,'AUTUMN'),(59,'WINTER'),(59,'AUTUMN'),(59,'SPRING'),(60,'SPRING'),(60,'SUMMER'),(61,'AUTUMN'),(61,'SPRING'),(61,'WINTER'),(61,'SUMMER');
/*!40000 ALTER TABLE `clothes_seasons` ENABLE KEYS */;
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
  `visible` int DEFAULT NULL,
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
-- Table structure for table `pictograms`
--

DROP TABLE IF EXISTS `pictograms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pictograms` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pictograms`
--

LOCK TABLES `pictograms` WRITE;
/*!40000 ALTER TABLE `pictograms` DISABLE KEYS */;
INSERT INTO `pictograms` VALUES (0,'30C'),(1,'40C'),(2,'50C'),(3,'60C'),(4,'70C'),(5,'95C'),(6,'DN_bleach'),(7,'DN_dry'),(8,'DN_dry_clean'),(9,'DN_iron'),(10,'DN_steam'),(11,'DN_tumble_dry'),(12,'DN_wash'),(13,'DN_wring'),(14,'bleach'),(15,'chlorine_bleach'),(16,'drip_dry'),(17,'dry_clean'),(18,'dry_clean_any_solvent'),(19,'dry_clean_any_solvent_except_trichloroethylene'),(20,'dry_clean_low_heat'),(21,'dry_clean_no_steam'),(22,'dry_clean_petrol_only'),(23,'dry_clean_reduced_moisture'),(24,'dry_clean_short_cycle'),(25,'dry_flat'),(26,'hand_wash'),(27,'iron'),(28,'iron_high'),(29,'iron_low'),(30,'iron_medium'),(31,'line_dry'),(32,'line_dry_in_shade'),(33,'machine_wash_delicate'),(34,'machine_wash_normal'),(35,'machine_wash_permanent_press'),(36,'natural_dry'),(37,'non_chlorine_bleach'),(38,'shade_dry'),(39,'steam'),(40,'tumble_dry_low'),(41,'tumble_dry_medium'),(42,'tumble_dry_no_heat'),(43,'tumble_dry_normal'),(44,'wet_clean'),(45,'wring');
/*!40000 ALTER TABLE `pictograms` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pictures`
--

LOCK TABLES `pictures` WRITE;
/*!40000 ALTER TABLE `pictures` DISABLE KEYS */;
INSERT INTO `pictures` VALUES (1,'663f04c0-7d2d-488a-939e-82fb7de1c516_image.png','http://images-server:80/uploads/663f04c0-7d2d-488a-939e-82fb7de1c516_image.png',1),(2,'9ee62e04-7c39-494a-b426-791a2cea3304_image.png','http://images-server:80/uploads/9ee62e04-7c39-494a-b426-791a2cea3304_image.png',2),(3,'95ab9ad7-bd03-4770-9036-10227656f2c1_image.png','http://images-server:80/uploads/95ab9ad7-bd03-4770-9036-10227656f2c1_image.png',3),(4,'18aab8ef-1ebe-4104-9f32-970311929b65_image.png','http://images-server:80/uploads/18aab8ef-1ebe-4104-9f32-970311929b65_image.png',4),(5,'afd867c1-99f4-41ce-a4ce-e5d2a16c6252_image.png','http://images-server:80/uploads/afd867c1-99f4-41ce-a4ce-e5d2a16c6252_image.png',5),(6,'d487234b-24c1-4910-936c-10aab8f30265_image.png','http://images-server:80/uploads/d487234b-24c1-4910-936c-10aab8f30265_image.png',6),(7,'72ca9eba-8510-4893-94b8-6c4e9b78e22c_image.png','http://images-server:80/uploads/72ca9eba-8510-4893-94b8-6c4e9b78e22c_image.png',7),(8,'91f1aa04-54f7-42c8-9bea-7c6f1489f3eb_image.png','http://images-server:80/uploads/91f1aa04-54f7-42c8-9bea-7c6f1489f3eb_image.png',8),(9,'525926b4-eadf-449c-9014-5c959c2b5438_image.png','http://images-server:80/uploads/525926b4-eadf-449c-9014-5c959c2b5438_image.png',9),(10,'e5360998-f073-4426-8b5a-9c54cadf180f_image.png','http://images-server:80/uploads/e5360998-f073-4426-8b5a-9c54cadf180f_image.png',10),(11,'ee88fa94-3fdf-4ade-8f96-a6bacc586644_image.png','http://images-server:80/uploads/ee88fa94-3fdf-4ade-8f96-a6bacc586644_image.png',11),(12,'a92874e0-0900-4b2e-bf55-5d744eeb7ed6_image.png','http://images-server:80/uploads/a92874e0-0900-4b2e-bf55-5d744eeb7ed6_image.png',12),(13,'41316a26-9a2f-40fe-ad86-5c37a42a398b_image.png','http://images-server:80/uploads/41316a26-9a2f-40fe-ad86-5c37a42a398b_image.png',13),(14,'21d8e41f-989e-4cbb-93e6-9c2ee342c70d_image.png','http://images-server:80/uploads/21d8e41f-989e-4cbb-93e6-9c2ee342c70d_image.png',14),(15,'9bad309c-5f9c-4103-8b5f-ee45ee8be49d_image.png','http://images-server:80/uploads/9bad309c-5f9c-4103-8b5f-ee45ee8be49d_image.png',15),(16,'6bc046c8-1cd0-4d2b-899d-c1f86d197ebc_image.png','http://images-server:80/uploads/6bc046c8-1cd0-4d2b-899d-c1f86d197ebc_image.png',16),(17,'4c04e879-2bba-4a9b-9e63-209194fb1c24_image.png','http://images-server:80/uploads/4c04e879-2bba-4a9b-9e63-209194fb1c24_image.png',17),(18,'e0403614-1e70-4c54-b162-022360b75b2f_image.png','http://images-server:80/uploads/e0403614-1e70-4c54-b162-022360b75b2f_image.png',18),(19,'15da2363-7cfa-40c9-aa40-45902f111151_image.png','http://images-server:80/uploads/15da2363-7cfa-40c9-aa40-45902f111151_image.png',19),(20,'2dfae6d9-3498-4b14-8e79-1e425353c1a7_image.png','http://images-server:80/uploads/2dfae6d9-3498-4b14-8e79-1e425353c1a7_image.png',20),(21,'b5249597-df5b-4387-971d-a00346c63f4f_image.png','http://images-server:80/uploads/b5249597-df5b-4387-971d-a00346c63f4f_image.png',21),(22,'0d47cb64-9d19-4218-b809-6a780c9c2ca1_image.png','http://images-server:80/uploads/0d47cb64-9d19-4218-b809-6a780c9c2ca1_image.png',22),(23,'c8889ad3-db2f-487c-87c5-ee16cff99552_image.png','http://images-server:80/uploads/c8889ad3-db2f-487c-87c5-ee16cff99552_image.png',23),(24,'e5f8dd8b-5725-4443-b369-d81c789d79d3_image.png','http://images-server:80/uploads/e5f8dd8b-5725-4443-b369-d81c789d79d3_image.png',24),(25,'df139379-8d2d-4d9f-ba73-b8d2cafc8eb9_image.png','http://images-server:80/uploads/df139379-8d2d-4d9f-ba73-b8d2cafc8eb9_image.png',25),(26,'ba01a712-9b2d-46c8-8752-b0ab96cc8e89_image.png','http://images-server:80/uploads/ba01a712-9b2d-46c8-8752-b0ab96cc8e89_image.png',26),(27,'5c614af6-2716-4003-a66b-687521269b04_image.png','http://images-server:80/uploads/5c614af6-2716-4003-a66b-687521269b04_image.png',27),(28,'93003b4c-63be-47cb-a0c9-a72ad662414c_image.png','http://images-server:80/uploads/93003b4c-63be-47cb-a0c9-a72ad662414c_image.png',28),(29,'39e0ee10-0523-4eb5-9751-b5192a9ffa37_image.png','http://images-server:80/uploads/39e0ee10-0523-4eb5-9751-b5192a9ffa37_image.png',29),(30,'6d8c692b-c6f5-4d7e-816f-e3a67b67e358_image.png','http://images-server:80/uploads/6d8c692b-c6f5-4d7e-816f-e3a67b67e358_image.png',30),(31,'178a903b-fd86-4ea6-9217-de38f1df4da8_image.png','http://images-server:80/uploads/178a903b-fd86-4ea6-9217-de38f1df4da8_image.png',31),(32,'c34b29bc-5e2f-4641-865a-4fd00c58d7f5_image.png','http://images-server:80/uploads/c34b29bc-5e2f-4641-865a-4fd00c58d7f5_image.png',32),(33,'5a8378cd-e3eb-4323-a387-a2ca46ecc1ff_image.png','http://images-server:80/uploads/5a8378cd-e3eb-4323-a387-a2ca46ecc1ff_image.png',33),(34,'7659c820-e003-4d1f-a753-d7778beffc5c_image.png','http://images-server:80/uploads/7659c820-e003-4d1f-a753-d7778beffc5c_image.png',34),(35,'5840a176-98d1-4fc8-ab87-2da9ba6c26b4_image.png','http://images-server:80/uploads/5840a176-98d1-4fc8-ab87-2da9ba6c26b4_image.png',35),(36,'330d40a9-11a1-4e71-8ee2-b5f9179cdef9_image.png','http://images-server:80/uploads/330d40a9-11a1-4e71-8ee2-b5f9179cdef9_image.png',36),(37,'66e04718-1581-417f-a407-f6b1d7286bb7_image.png','http://images-server:80/uploads/66e04718-1581-417f-a407-f6b1d7286bb7_image.png',37),(38,'2a3a8338-4304-4589-a017-69072092cd09_image.png','http://images-server:80/uploads/2a3a8338-4304-4589-a017-69072092cd09_image.png',38),(39,'a3e67e24-167d-4fba-888b-65dbe31bf48b_image.png','http://images-server:80/uploads/a3e67e24-167d-4fba-888b-65dbe31bf48b_image.png',39),(40,'c737bffc-b011-4975-bbf9-e8c1aa76cabb_image.png','http://images-server:80/uploads/c737bffc-b011-4975-bbf9-e8c1aa76cabb_image.png',40),(41,'75f3b5a3-89c6-454c-a043-a9e5bba9d6ca_image.png','http://images-server:80/uploads/75f3b5a3-89c6-454c-a043-a9e5bba9d6ca_image.png',41),(42,'6370e140-c09e-4221-ae08-210d300f93fd_image.png','http://images-server:80/uploads/6370e140-c09e-4221-ae08-210d300f93fd_image.png',42),(43,'469de857-0a58-4451-8039-525c872617e5_image.png','http://images-server:80/uploads/469de857-0a58-4451-8039-525c872617e5_image.png',43),(44,'ff04164b-0295-45d0-b7d7-77d900288965_image.png','http://images-server:80/uploads/ff04164b-0295-45d0-b7d7-77d900288965_image.png',44),(45,'5c68bfe0-ef20-4beb-85ea-d9ce4b3c9404_image.png','http://images-server:80/uploads/5c68bfe0-ef20-4beb-85ea-d9ce4b3c9404_image.png',45),(46,'d5b2dfba-6f39-42d4-a9d8-e822faeec75b_image.png','http://images-server:80/uploads/d5b2dfba-6f39-42d4-a9d8-e822faeec75b_image.png',46),(47,'cada1798-f5bd-43db-a3fb-e783a01a3dc9_image.png','http://images-server:80/uploads/cada1798-f5bd-43db-a3fb-e783a01a3dc9_image.png',47),(48,'4e56ddef-32bb-4c30-901d-39aadf158f3f_image.png','http://images-server:80/uploads/4e56ddef-32bb-4c30-901d-39aadf158f3f_image.png',48),(49,'de0feacd-56f7-4d6b-bc2a-b4d440d63c30_image.png','http://images-server:80/uploads/de0feacd-56f7-4d6b-bc2a-b4d440d63c30_image.png',49),(50,'27dd4884-b2e5-4c82-9941-d3cd99a0bc57_image.png','http://images-server:80/uploads/27dd4884-b2e5-4c82-9941-d3cd99a0bc57_image.png',50),(51,'205c3cec-7fa8-40a6-9aeb-77538a78ff63_image.png','http://images-server:80/uploads/205c3cec-7fa8-40a6-9aeb-77538a78ff63_image.png',51),(52,'e4f896b6-69c9-4442-938c-b7ddd1392c15_image.png','http://images-server:80/uploads/e4f896b6-69c9-4442-938c-b7ddd1392c15_image.png',52),(53,'7d462bf8-2d32-436c-809b-3aa7ae0df94c_image.png','http://images-server:80/uploads/7d462bf8-2d32-436c-809b-3aa7ae0df94c_image.png',53),(54,'e7673b7d-ad1b-4caf-bbb0-469edee11013_image.png','http://images-server:80/uploads/e7673b7d-ad1b-4caf-bbb0-469edee11013_image.png',54),(55,'7bf378a0-9a80-4d78-87d7-e514bead185b_image.png','http://images-server:80/uploads/7bf378a0-9a80-4d78-87d7-e514bead185b_image.png',55),(56,'8bc72dd7-0d2a-4741-be9d-e9b62d5cc291_image.png','http://images-server:80/uploads/8bc72dd7-0d2a-4741-be9d-e9b62d5cc291_image.png',56),(57,'ff54ab39-80ad-4f02-8e0d-ee3b0f40992d_image.png','http://images-server:80/uploads/ff54ab39-80ad-4f02-8e0d-ee3b0f40992d_image.png',57),(58,'a35ebd78-5ee1-44a3-b44b-0c486bcf2a15_image.png','http://images-server:80/uploads/a35ebd78-5ee1-44a3-b44b-0c486bcf2a15_image.png',58),(59,'3e5b2239-285a-4cb5-b9e7-463173d3701b_image.png','http://images-server:80/uploads/3e5b2239-285a-4cb5-b9e7-463173d3701b_image.png',59),(60,'96eaa033-b9d4-4072-b7df-8d885fa05b60_image.png','http://images-server:80/uploads/96eaa033-b9d4-4072-b7df-8d885fa05b60_image.png',60),(61,'3cc23ae1-0ce6-4305-89de-bb191e8d0eb7_ml_output.png','http://images-server:80/uploads/3cc23ae1-0ce6-4305-89de-bb191e8d0eb7_ml_output.png',61);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences`
--

LOCK TABLES `user_preferences` WRITE;
/*!40000 ALTER TABLE `user_preferences` DISABLE KEYS */;
INSERT INTO `user_preferences` VALUES (1,_binary '',_binary '\0',2,30,_binary '',_binary '',_binary '\0'),(2,_binary '',_binary '\0',1,20,_binary '',_binary '',_binary '');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'wiktor5@gmail.com','$2a$10$26gTeDT8kaoNkgmRfwbN5.siOO/OuSSkvwZuD4xaWZoDYHD2AIbSm','wiktor',NULL,NULL,NULL),(2,'maciek@gmail.com','$2a$10$5PvNytX7q3ojymnUuI35E.daP/qc0nnWetQOGoWKolVxgkvXF.CyG','maciek',NULL,NULL,NULL),(3,'admin@gmail.com','$2a$10$buhLnWjuTl5AUH6B42IJmecsQpDj8n9UdLBqjicvi2PmsYQ/AoG56','admin',NULL,_binary '',1),(4,'vincenzo.piras@o2.pl','$2a$10$q62XiCVVNqS7muiTJWAv.esHmBRP83iEkeOai3pq7St86UIQXmpf2','Vincenzo',NULL,_binary '',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_tokens`
--

LOCK TABLES `verification_tokens` WRITE;
/*!40000 ALTER TABLE `verification_tokens` DISABLE KEYS */;
INSERT INTO `verification_tokens` VALUES (1,'2025-10-12 14:04:19.809151','65193100-14ff-4552-8d4f-56ec0a6a178e',3),(2,'2025-11-12 10:05:55.804619','16b49dbc-dace-470e-997a-1f2a597ad6a1',4);
/*!40000 ALTER TABLE `verification_tokens` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-11 15:31:06
