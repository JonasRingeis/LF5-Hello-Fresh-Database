-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: krautundrueben
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `bestellung`
--

DROP TABLE IF EXISTS `bestellung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bestellung` (
  `BESTELLNR` int NOT NULL AUTO_INCREMENT,
  `KUNDENNR` int DEFAULT NULL,
  `BESTELLDATUM` date DEFAULT NULL,
  `RECHNUNGSBETRAG` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`BESTELLNR`),
  KEY `KUNDENNR` (`KUNDENNR`),
  CONSTRAINT `bestellung_ibfk_1` FOREIGN KEY (`KUNDENNR`) REFERENCES `kunde` (`KUNDENNR`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bestellung`
--

LOCK TABLES `bestellung` WRITE;
/*!40000 ALTER TABLE `bestellung` DISABLE KEYS */;
INSERT INTO `bestellung` VALUES (1,2001,'2020-07-01',6.21),(2,2002,'2020-07-08',32.96),(3,2003,'2020-08-01',24.08),(4,2004,'2020-08-02',19.90),(5,2005,'2020-08-02',6.47),(6,2006,'2020-08-10',6.96),(7,2007,'2020-08-10',2.41),(8,2008,'2020-08-10',13.80),(9,2009,'2020-08-10',8.67),(10,2007,'2020-08-15',17.98),(11,2005,'2020-08-12',8.67),(12,2003,'2020-08-13',20.87);
/*!40000 ALTER TABLE `bestellung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bestellungzutat`
--

DROP TABLE IF EXISTS `bestellungzutat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bestellungzutat` (
  `BESTELLNR` int NOT NULL,
  `ZUTATENNR` int NOT NULL,
  `MENGE` int DEFAULT NULL,
  PRIMARY KEY (`BESTELLNR`,`ZUTATENNR`),
  KEY `ZUTATENNR` (`ZUTATENNR`),
  CONSTRAINT `bestellungzutat_ibfk_1` FOREIGN KEY (`BESTELLNR`) REFERENCES `bestellung` (`BESTELLNR`),
  CONSTRAINT `bestellungzutat_ibfk_2` FOREIGN KEY (`ZUTATENNR`) REFERENCES `zutat` (`ZUTATENNR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bestellungzutat`
--

LOCK TABLES `bestellungzutat` WRITE;
/*!40000 ALTER TABLE `bestellungzutat` DISABLE KEYS */;
INSERT INTO `bestellungzutat` VALUES (1,1001,5),(1,1002,3),(1,1004,3),(1,1006,2),(2,1003,4),(2,1005,5),(2,6408,5),(2,9001,10),(3,3001,5),(3,6300,15),(4,3003,2),(4,5001,7),(5,1001,5),(5,1002,4),(5,1004,5),(6,1010,5),(7,1009,9),(8,1008,7),(8,1012,5),(9,1007,4),(9,1012,5),(10,1011,7),(10,4001,7),(11,1012,5),(11,5001,2),(12,1010,15);
/*!40000 ALTER TABLE `bestellungzutat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kunde`
--

DROP TABLE IF EXISTS `kunde`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kunde` (
  `KUNDENNR` int NOT NULL,
  `NACHNAME` varchar(50) DEFAULT NULL,
  `VORNAME` varchar(50) DEFAULT NULL,
  `GEBURTSDATUM` date DEFAULT NULL,
  `STRASSE` varchar(50) DEFAULT NULL,
  `HAUSNR` varchar(6) DEFAULT NULL,
  `PLZ` varchar(5) DEFAULT NULL,
  `ORT` varchar(50) DEFAULT NULL,
  `TELEFON` varchar(25) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `REGION` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`KUNDENNR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kunde`
--

LOCK TABLES `kunde` WRITE;
/*!40000 ALTER TABLE `kunde` DISABLE KEYS */;
INSERT INTO `kunde` VALUES (2001,'Wellensteyn','Kira','1990-05-05','Eppendorfer Landstrasse','104','20249','Hamburg','040/443322','k.wellensteyn@yahoo.de',NULL),(2002,'Foede','Dorothea','2000-03-24','Ohmstraße','23','22765','Hamburg','040/543822','d.foede@web.de',NULL),(2003,'Leberer','Sigrid','1989-09-21','Bilser Berg','6','20459','Hamburg','0175/1234588','sigrid@leberer.de',NULL),(2004,'Soerensen','Hanna','1974-04-03','Alter Teichweg','95','22049','Hamburg','040/634578','h.soerensen@yahoo.de',NULL),(2005,'Schnitter','Marten','1964-04-17','Stübels','10','22835','Barsbüttel','0176/447587','schni_mart@gmail.com',NULL),(2006,'Maurer','Belinda','1978-09-09','Grotelertwiete','4a','21075','Hamburg','040/332189','belinda1978@yahoo.de',NULL),(2007,'Gessert','Armin','1978-01-29','Küstersweg','3','21079','Hamburg','040/67890','armin@gessert.de',NULL),(2008,'Haessig','Jean-Marc','1982-08-30','Neugrabener Bahnhofstraße','30','21149','Hamburg','0178-67013390','jm@haessig.de',NULL),(2009,'Urocki','Eric','1999-12-04','Elbchaussee','228','22605','Hamburg','0152-96701390','urocki@outlook.de',NULL);
/*!40000 ALTER TABLE `kunde` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lieferant`
--

DROP TABLE IF EXISTS `lieferant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lieferant` (
  `LIEFERANTENNR` int NOT NULL,
  `LIEFERANTENNAME` varchar(50) DEFAULT NULL,
  `STRASSE` varchar(50) DEFAULT NULL,
  `HAUSNR` varchar(6) DEFAULT NULL,
  `PLZ` varchar(5) DEFAULT NULL,
  `ORT` varchar(50) DEFAULT NULL,
  `TELEFON` varchar(25) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `REGION` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`LIEFERANTENNR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lieferant`
--

LOCK TABLES `lieferant` WRITE;
/*!40000 ALTER TABLE `lieferant` DISABLE KEYS */;
INSERT INTO `lieferant` VALUES (101,'Bio-Hof Müller','Dorfstraße','74','24354','Weseby','04354-9080','mueller@biohof.de',NULL),(102,'Obst-Hof Altes Land','Westerjork 74','76','21635','Jork','04162-4523','info@biohof-altesland.de',NULL),(103,'Molkerei Henning','Molkereiwegkundekunde','13','19217','Dechow','038873-8976','info@molkerei-henning.de',NULL);
/*!40000 ALTER TABLE `lieferant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zutat`
--

DROP TABLE IF EXISTS `zutat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zutat` (
  `ZUTATENNR` int NOT NULL,
  `BEZEICHNUNG` varchar(50) DEFAULT NULL,
  `EINHEIT` varchar(25) DEFAULT NULL,
  `NETTOPREIS` decimal(10,2) DEFAULT NULL,
  `BESTAND` int DEFAULT NULL,
  `LIEFERANT` int DEFAULT NULL,
  PRIMARY KEY (`ZUTATENNR`),
  KEY `LIEFERANT` (`LIEFERANT`),
  CONSTRAINT `zutat_ibfk_1` FOREIGN KEY (`LIEFERANT`) REFERENCES `lieferant` (`LIEFERANTENNR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zutat`
--

LOCK TABLES `zutat` WRITE;
/*!40000 ALTER TABLE `zutat` DISABLE KEYS */;
INSERT INTO `zutat` VALUES (1001,'Zucchini','Stück',0.89,100,101),(1002,'Zwiebel','Stück',0.15,50,101),(1003,'Tomate','Stück',0.45,50,101),(1004,'Schalotte','Stück',0.20,500,101),(1005,'Karotte','Stück',0.30,500,101),(1006,'Kartoffel','Stück',0.15,1500,101),(1007,'Rucola','Bund',0.90,10,101),(1008,'Lauch','Stück',1.20,35,101),(1009,'Knoblauch','Stück',0.25,250,101),(1010,'Basilikum','Bund',1.30,10,101),(1011,'Süßkartoffel','Stück',2.00,200,101),(1012,'Schnittlauch','Bund',0.90,10,101),(2001,'Apfel','Stück',1.20,750,102),(3001,'Vollmilch. 3.5%','Liter',1.50,50,103),(3002,'Mozzarella','Packung',3.50,20,103),(3003,'Butter','Stück',3.00,50,103),(4001,'Ei','Stück',0.40,300,102),(5001,'Wiener Würstchen','Paar',1.80,40,101),(6300,'Kichererbsen','Dose',1.00,400,103),(6408,'Couscous','Packung',1.90,15,102),(7043,'Gemüsebrühe','Würfel',0.20,4000,101),(9001,'Tofu-Würstchen','Stück',1.80,20,103);
/*!40000 ALTER TABLE `zutat` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-24 10:22:27
