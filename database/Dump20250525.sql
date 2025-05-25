-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_lingokidsworld
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.23-MariaDB

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add perfil infantil',7,'add_perfilinfantil'),(26,'Can change perfil infantil',7,'change_perfilinfantil'),(27,'Can delete perfil infantil',7,'delete_perfilinfantil'),(28,'Can view perfil infantil',7,'view_perfilinfantil'),(29,'Can add cuento',8,'add_cuento'),(30,'Can change cuento',8,'change_cuento'),(31,'Can delete cuento',8,'delete_cuento'),(32,'Can view cuento',8,'view_cuento'),(33,'Can add progreso',9,'add_progreso'),(34,'Can change progreso',9,'change_progreso'),(35,'Can delete progreso',9,'delete_progreso'),(36,'Can view progreso',9,'view_progreso'),(37,'Can add configuracion parental',10,'add_configuracionparental'),(38,'Can change configuracion parental',10,'change_configuracionparental'),(39,'Can delete configuracion parental',10,'delete_configuracionparental'),(40,'Can view configuracion parental',10,'view_configuracionparental'),(41,'Can add estadistica juego',11,'add_estadisticajuego'),(42,'Can change estadistica juego',11,'change_estadisticajuego'),(43,'Can delete estadistica juego',11,'delete_estadisticajuego'),(44,'Can view estadistica juego',11,'view_estadisticajuego'),(45,'Can add juego',12,'add_juego'),(46,'Can change juego',12,'change_juego'),(47,'Can delete juego',12,'delete_juego'),(48,'Can view juego',12,'view_juego'),(49,'Can add tipo juego',13,'add_tipojuego'),(50,'Can change tipo juego',13,'change_tipojuego'),(51,'Can delete tipo juego',13,'delete_tipojuego'),(52,'Can view tipo juego',13,'view_tipojuego'),(53,'Can add progreso juego',14,'add_progresojuego'),(54,'Can change progreso juego',14,'change_progresojuego'),(55,'Can delete progreso juego',14,'delete_progresojuego'),(56,'Can view progreso juego',14,'view_progresojuego'),(57,'Can add avatar',15,'add_avatar'),(58,'Can change avatar',15,'change_avatar'),(59,'Can delete avatar',15,'delete_avatar'),(60,'Can view avatar',15,'view_avatar'),(61,'Can add recompensa',16,'add_recompensa'),(62,'Can change recompensa',16,'change_recompensa'),(63,'Can delete recompensa',16,'delete_recompensa'),(64,'Can view recompensa',16,'view_recompensa'),(65,'Can add componente avatar',17,'add_componenteavatar'),(66,'Can change componente avatar',17,'change_componenteavatar'),(67,'Can delete componente avatar',17,'delete_componenteavatar'),(68,'Can view componente avatar',17,'view_componenteavatar'),(69,'Can add recompensa perfil',18,'add_recompensaperfil'),(70,'Can change recompensa perfil',18,'change_recompensaperfil'),(71,'Can delete recompensa perfil',18,'delete_recompensaperfil'),(72,'Can view recompensa perfil',18,'view_recompensaperfil');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avatar_avatar`
--

DROP TABLE IF EXISTS `avatar_avatar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatar_avatar` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `vista_previa` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `perfil_id` bigint(20) NOT NULL,
  `accesorio_id` bigint(20) DEFAULT NULL,
  `ojos_id` bigint(20) DEFAULT NULL,
  `pelo_id` bigint(20) DEFAULT NULL,
  `ropa_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `perfil_id` (`perfil_id`),
  KEY `avatar_avatar_accesorio_id_ad5f09b3_fk_avatar_co` (`accesorio_id`),
  KEY `avatar_avatar_ojos_id_4841c255_fk_avatar_componenteavatar_id` (`ojos_id`),
  KEY `avatar_avatar_pelo_id_60fc1d2f_fk_avatar_componenteavatar_id` (`pelo_id`),
  KEY `avatar_avatar_ropa_id_f9c699db_fk_avatar_componenteavatar_id` (`ropa_id`),
  CONSTRAINT `avatar_avatar_accesorio_id_ad5f09b3_fk_avatar_co` FOREIGN KEY (`accesorio_id`) REFERENCES `avatar_componenteavatar` (`id`),
  CONSTRAINT `avatar_avatar_ojos_id_4841c255_fk_avatar_componenteavatar_id` FOREIGN KEY (`ojos_id`) REFERENCES `avatar_componenteavatar` (`id`),
  CONSTRAINT `avatar_avatar_pelo_id_60fc1d2f_fk_avatar_componenteavatar_id` FOREIGN KEY (`pelo_id`) REFERENCES `avatar_componenteavatar` (`id`),
  CONSTRAINT `avatar_avatar_perfil_id_3cc4a3ae_fk_users_perfilinfantil_id` FOREIGN KEY (`perfil_id`) REFERENCES `users_perfilinfantil` (`id`),
  CONSTRAINT `avatar_avatar_ropa_id_f9c699db_fk_avatar_componenteavatar_id` FOREIGN KEY (`ropa_id`) REFERENCES `avatar_componenteavatar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatar_avatar`
--

LOCK TABLES `avatar_avatar` WRITE;
/*!40000 ALTER TABLE `avatar_avatar` DISABLE KEYS */;
/*!40000 ALTER TABLE `avatar_avatar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avatar_componenteavatar`
--

DROP TABLE IF EXISTS `avatar_componenteavatar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatar_componenteavatar` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` longtext NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `desbloqueado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatar_componenteavatar`
--

LOCK TABLES `avatar_componenteavatar` WRITE;
/*!40000 ALTER TABLE `avatar_componenteavatar` DISABLE KEYS */;
/*!40000 ALTER TABLE `avatar_componenteavatar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avatar_recompensa`
--

DROP TABLE IF EXISTS `avatar_recompensa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatar_recompensa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` longtext NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `puntos` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `componente_desbloquea_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `avatar_recompensa_componente_desbloque_82a456bd_fk_avatar_co` (`componente_desbloquea_id`),
  CONSTRAINT `avatar_recompensa_componente_desbloque_82a456bd_fk_avatar_co` FOREIGN KEY (`componente_desbloquea_id`) REFERENCES `avatar_componenteavatar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatar_recompensa`
--

LOCK TABLES `avatar_recompensa` WRITE;
/*!40000 ALTER TABLE `avatar_recompensa` DISABLE KEYS */;
/*!40000 ALTER TABLE `avatar_recompensa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avatar_recompensaperfil`
--

DROP TABLE IF EXISTS `avatar_recompensaperfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatar_recompensaperfil` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_obtencion` datetime(6) NOT NULL,
  `perfil_id` bigint(20) NOT NULL,
  `recompensa_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `avatar_recompensaperfil_perfil_id_recompensa_id_b8192256_uniq` (`perfil_id`,`recompensa_id`),
  KEY `avatar_recompensaper_recompensa_id_f98b56cb_fk_avatar_re` (`recompensa_id`),
  CONSTRAINT `avatar_recompensaper_perfil_id_ebc31fe8_fk_users_per` FOREIGN KEY (`perfil_id`) REFERENCES `users_perfilinfantil` (`id`),
  CONSTRAINT `avatar_recompensaper_recompensa_id_f98b56cb_fk_avatar_re` FOREIGN KEY (`recompensa_id`) REFERENCES `avatar_recompensa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatar_recompensaperfil`
--

LOCK TABLES `avatar_recompensaperfil` WRITE;
/*!40000 ALTER TABLE `avatar_recompensaperfil` DISABLE KEYS */;
/*!40000 ALTER TABLE `avatar_recompensaperfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuentos_cuento`
--

DROP TABLE IF EXISTS `cuentos_cuento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuentos_cuento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idioma` varchar(50) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `contenido` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`contenido`)),
  `personalizable` tinyint(1) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentos_cuento`
--

LOCK TABLES `cuentos_cuento` WRITE;
/*!40000 ALTER TABLE `cuentos_cuento` DISABLE KEYS */;
INSERT INTO `cuentos_cuento` VALUES (1,'es','El dragón curioso','{\"escenas\": [{\"id\": 1, \"texto\": \"\\u00c9rase una vez un drag\\u00f3n curioso que quer\\u00eda aprender a volar.\", \"opciones\": [{\"texto\": \"Intentar saltar desde un \\u00e1rbol\", \"siguiente\": 2}, {\"texto\": \"Leer un libro sobre vuelo\", \"siguiente\": 3}]}, {\"id\": 2, \"texto\": \"Se cay\\u00f3... pero no se rindi\\u00f3.\", \"opciones\": []}, {\"id\": 3, \"texto\": \"Aprendi\\u00f3 la teor\\u00eda... \\u00a1y luego vol\\u00f3!\", \"opciones\": []}]}',1,'Aventura','/img/cuento-dinosaurio.png'),(2,'es','La Aventura del Bosque Mágico','{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"Te adentras en el Bosque Mágico y encuentras dos caminos.\",\n        \"opciones\": [\n          { \"texto\": \"Tomar el sendero iluminado\", \"siguiente\": 2 },\n          { \"texto\": \"Explorar el oscuro túnel\", \"siguiente\": 3 }\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"El sendero te lleva a un lago brillante donde vive una sirena.\",\n        \"opciones\": [\n          { \"texto\": \"Hablar con la sirena\", \"siguiente\": 4 },\n          { \"texto\": \"Nadar en el lago\", \"siguiente\": 5 }\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"El túnel te lleva a una cueva con murciélagos dormidos.\",\n        \"opciones\": [\n          { \"texto\": \"Pasar silenciosamente\", \"siguiente\": 6 },\n          { \"texto\": \"Gritar para asustarlos\", \"siguiente\": 7 }\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"La sirena te da una piedra mágica y te enseña el camino al árbol dorado.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"¡Una corriente te arrastra a una cascada secreta!\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"Logras salir al otro lado sin despertar a los murciélagos.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 7,\n        \"texto\": \"Los murciélagos se asustan y tú sales volando con ellos hacia el cielo nocturno.\",\n        \"opciones\": []\n      }\n    ]\n  }',1,'Aventura','/img/cuento-bosque-magico.png'),(3,'es','El Viaje del Dragón Azul','{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"Drako, el dragón azul, quiere visitar la cima del Monte Rayo.\",\n        \"opciones\": [\n          { \"texto\": \"Volar por el cielo\", \"siguiente\": 2 },\n          { \"texto\": \"Escalar con sus patas\", \"siguiente\": 3 }\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"El viento es fuerte, pero Drako lo disfruta. Pronto ve una nube con forma de castillo.\",\n        \"opciones\": [\n          { \"texto\": \"Explorar la nube\", \"siguiente\": 4 },\n          { \"texto\": \"Seguir volando\", \"siguiente\": 5 }\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"La montaña es empinada y encuentra una familia de cabras parlantes.\",\n        \"opciones\": [\n          { \"texto\": \"Saludarlas\", \"siguiente\": 6 },\n          { \"texto\": \"Seguir sin hablar\", \"siguiente\": 7 }\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"Dentro de la nube-castillo vive un gigante amable que le regala un mapa mágico.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"Llega a la cima y observa todo el reino de los dragones.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"Las cabras le enseñan un atajo secreto hasta la cima.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 7,\n        \"texto\": \"Pierde la oportunidad de aprender del sabio consejo de las cabras.\",\n        \"opciones\": []\n      }\n    ]\n  }',0,'Animales','/img/cuento-dragon-azul.png'),(4,'es','El Reloj del Tiempo Curioso','{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"Encuentras un reloj antiguo que puede detener el tiempo.\",\n        \"opciones\": [\n          { \"texto\": \"Detener el tiempo\", \"siguiente\": 2 },\n          { \"texto\": \"Avanzar al futuro\", \"siguiente\": 3 }\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"Todo se congela excepto tú. Puedes explorar sin límites.\",\n        \"opciones\": [\n          { \"texto\": \"Ir al museo\", \"siguiente\": 4 },\n          { \"texto\": \"Caminar por la ciudad\", \"siguiente\": 5 }\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"Apareces en un mundo futurista donde todos hablan con robots.\",\n        \"opciones\": [\n          { \"texto\": \"Conocer un robot amigo\", \"siguiente\": 6 }\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"Descubres que uno de los cuadros te lleva a otra época.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"Ves cómo todos los pájaros están suspendidos en el aire.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"Tu nuevo amigo robot te enseña cómo regresar al presente.\",\n        \"opciones\": []\n      }\n    ]\n  }',1,'Fantasía','/img/cuento-reloj-tiempo.png'),(5,'es','La misión del robot R1K','{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"En el año 3050, el robot R1K despertó en una nave vacía. Su misión: recuperar una muestra perdida en un planeta desconocido.\",\n        \"opciones\": [\n          { \"texto\": \"Explorar el laboratorio\", \"siguiente\": 2 },\n          { \"texto\": \"Acceder al puente de mando\", \"siguiente\": 3 }\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"R1K encontró una nota misteriosa: Confía en los centinelas\",\n        \"opciones\": [\n          { \"texto\": \"Buscar a los centinelas\", \"siguiente\": 4 },\n          { \"texto\": \"Ignorar la nota y salir de la nave\", \"siguiente\": 5 }\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"El puente mostraba coordenadas hacia un planeta cubierto de hielo.\",\n        \"opciones\": [\n          { \"texto\": \"Seguir las coordenadas\", \"siguiente\": 5 },\n          { \"texto\": \"Buscar una ruta alternativa\", \"siguiente\": 6 }\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"Los centinelas eran viejos robots sabios. Le entregaron un mapa escondido.\",\n        \"opciones\": [\n          { \"texto\": \"Usar el mapa\", \"siguiente\": 7 }\n        ]\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"R1K llegó al planeta helado. El terreno era peligroso pero vio una cueva con luz.\",\n        \"opciones\": [\n          { \"texto\": \"Entrar a la cueva\", \"siguiente\": 7 },\n          { \"texto\": \"Evitar la cueva\", \"siguiente\": 8 }\n        ]\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"Ruta alternativa: encontró una base abandonada.\",\n        \"opciones\": [\n          { \"texto\": \"Investigar la base\", \"siguiente\": 7 }\n        ]\n      },\n      {\n        \"id\": 7,\n        \"texto\": \"¡Encontró la muestra perdida y la nave lo recogió triunfante!\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 8,\n        \"texto\": \"Se perdió en una tormenta de nieve. R1K fue rescatado pero sin la muestra.\",\n        \"opciones\": []\n      }\n    ]\n  }',0,'Ciencia ficción','/img/cuento-robote1k.png'),(6,'es','La corona del reino escondido','{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"La joven Clara encontró un mapa en el desván de su abuela. Marcaba un lugar llamado El Reino Escondido\",\n        \"opciones\": [\n          { \"texto\": \"Seguir el mapa al bosque\", \"siguiente\": 2 },\n          { \"texto\": \"Investigar en la biblioteca\", \"siguiente\": 3 }\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"El bosque susurraba secretos. Un zorro parlante apareció.\",\n        \"opciones\": [\n          { \"texto\": \"Seguir al zorro\", \"siguiente\": 4 },\n          { \"texto\": \"Ignorar al zorro\", \"siguiente\": 5 }\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"Los libros hablaban de una corona mágica que solo un corazón puro podía encontrar.\",\n        \"opciones\": [\n          { \"texto\": \"Volver al mapa y seguirlo\", \"siguiente\": 2 }\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"El zorro llevó a Clara hasta una cascada mágica con un portal.\",\n        \"opciones\": [\n          { \"texto\": \"Entrar al portal\", \"siguiente\": 6 }\n        ]\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"Se perdió y cayó en un pozo, pero una voz la rescató: un anciano del reino.\",\n        \"opciones\": [\n          { \"texto\": \"Confiar en el anciano\", \"siguiente\": 6 }\n        ]\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"Clara llegó al Reino Escondido. La reina la esperaba con la corona mágica.\",\n        \"opciones\": [\n          { \"texto\": \"Aceptar la corona\", \"siguiente\": 7 },\n          { \"texto\": \"Devolver la corona al reino\", \"siguiente\": 8 }\n        ]\n      },\n      {\n        \"id\": 7,\n        \"texto\": \"La corona brilló y Clara se convirtió en guardiana del reino.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 8,\n        \"texto\": \"El reino celebró su humildad y Clara se convirtió en leyenda.\",\n        \"opciones\": []\n      }\n    ]\n  }',1,'Fantasía','/img/cuento-corona-reino.png'),(7,'es','El Bosque de los Secretos','{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"El Bosque de los Secretos - Escena 1.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 1\", \"siguiente\": 2},\n          {\"texto\": \"Opción B desde 1\", \"siguiente\": 3},\n          {\"texto\": \"Opción C desde 1\", \"siguiente\": 4}\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"El Bosque de los Secretos - Escena 2.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 2\", \"siguiente\": 3},\n          {\"texto\": \"Opción B desde 2\", \"siguiente\": 4},\n          {\"texto\": \"Opción C desde 2\", \"siguiente\": 5}\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"El Bosque de los Secretos - Escena 3.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 3\", \"siguiente\": 4},\n          {\"texto\": \"Opción B desde 3\", \"siguiente\": 5},\n          {\"texto\": \"Opción C desde 3\", \"siguiente\": 6}\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"El Bosque de los Secretos - Escena 4.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 4\", \"siguiente\": 5},\n          {\"texto\": \"Opción B desde 4\", \"siguiente\": 6},\n          {\"texto\": \"Opción C desde 4\", \"siguiente\": 7}\n        ]\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"El Bosque de los Secretos - Escena 5.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 5\", \"siguiente\": 6},\n          {\"texto\": \"Opción B desde 5\", \"siguiente\": 7}\n        ]\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"El Bosque de los Secretos - Escena 6.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 6\", \"siguiente\": 7},\n          {\"texto\": \"Opción B desde 6\", \"siguiente\": 8}\n        ]\n      }\n    ]\n  }',1,'Misterio','/img/cuento-bosque-secreto.png'),(8,'es','El Castillo de Cristal','{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"El Castillo de Cristal - Escena 1.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 1\", \"siguiente\": 2},\n          {\"texto\": \"Opción B desde 1\", \"siguiente\": 3},\n          {\"texto\": \"Opción C desde 1\", \"siguiente\": 4}\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"El Castillo de Cristal - Escena 2.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 2\", \"siguiente\": 3},\n          {\"texto\": \"Opción B desde 2\", \"siguiente\": 4},\n          {\"texto\": \"Opción C desde 2\", \"siguiente\": 5}\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"El Castillo de Cristal - Escena 3.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 3\", \"siguiente\": 4},\n          {\"texto\": \"Opción B desde 3\", \"siguiente\": 5},\n          {\"texto\": \"Opción C desde 3\", \"siguiente\": 6}\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"El Castillo de Cristal - Escena 4.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 4\", \"siguiente\": 5},\n          {\"texto\": \"Opción B desde 4\", \"siguiente\": 6},\n          {\"texto\": \"Opción C desde 4\", \"siguiente\": 7}\n        ]\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"El Castillo de Cristal - Escena 5.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 5\", \"siguiente\": 6},\n          {\"texto\": \"Opción B desde 5\", \"siguiente\": 7}\n        ]\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"El Castillo de Cristal - Escena 6.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 6\", \"siguiente\": 7},\n          {\"texto\": \"Opción B desde 6\", \"siguiente\": 8}\n        ]\n      }\n    ]\n  }',0,'Fantasía','/img/cuento-castillo-cristal.png');
/*!40000 ALTER TABLE `cuentos_cuento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_users_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2025-04-03 18:22:53.549952','1','El dragón curioso (es)',1,'[{\"added\": {}}]',8,1),(2,'2025-05-25 11:27:23.637824','1','El dragón curioso (es)',2,'[]',8,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(15,'avatar','avatar'),(17,'avatar','componenteavatar'),(16,'avatar','recompensa'),(18,'avatar','recompensaperfil'),(4,'contenttypes','contenttype'),(8,'cuentos','cuento'),(11,'juegos','estadisticajuego'),(12,'juegos','juego'),(14,'juegos','progresojuego'),(13,'juegos','tipojuego'),(5,'sessions','session'),(10,'users','configuracionparental'),(7,'users','perfilinfantil'),(9,'users','progreso'),(6,'users','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-04-03 18:06:47.500304'),(2,'contenttypes','0002_remove_content_type_name','2025-04-03 18:06:47.572140'),(3,'auth','0001_initial','2025-04-03 18:06:47.948268'),(4,'auth','0002_alter_permission_name_max_length','2025-04-03 18:06:47.961460'),(5,'auth','0003_alter_user_email_max_length','2025-04-03 18:06:47.965946'),(6,'auth','0004_alter_user_username_opts','2025-04-03 18:06:47.972914'),(7,'auth','0005_alter_user_last_login_null','2025-04-03 18:06:47.980324'),(8,'auth','0006_require_contenttypes_0002','2025-04-03 18:06:47.985783'),(9,'auth','0007_alter_validators_add_error_messages','2025-04-03 18:06:47.990470'),(10,'auth','0008_alter_user_username_max_length','2025-04-03 18:06:47.997337'),(11,'auth','0009_alter_user_last_name_max_length','2025-04-03 18:06:48.004552'),(12,'auth','0010_alter_group_name_max_length','2025-04-03 18:06:48.018947'),(13,'auth','0011_update_proxy_permissions','2025-04-03 18:06:48.026213'),(14,'auth','0012_alter_user_first_name_max_length','2025-04-03 18:06:48.033799'),(15,'users','0001_initial','2025-04-03 18:06:48.477827'),(16,'admin','0001_initial','2025-04-03 18:06:48.664157'),(17,'admin','0002_logentry_remove_auto_add','2025-04-03 18:06:48.671461'),(18,'admin','0003_logentry_add_action_flag_choices','2025-04-03 18:06:48.679591'),(19,'sessions','0001_initial','2025-04-03 18:06:48.734040'),(20,'users','0002_perfilinfantil','2025-04-03 18:06:48.838983'),(21,'cuentos','0001_initial','2025-04-03 18:17:09.185846'),(22,'users','0002_configuracionparental','2025-05-22 21:49:47.591747'),(23,'avatar','0001_initial','2025-05-22 21:49:48.325755'),(24,'juegos','0001_initial','2025-05-22 21:49:48.784472'),(25,'users','0003_user_parent','2025-05-22 21:49:48.905331'),(26,'cuentos','0002_cuento_categoria_cuento_imagen','2025-05-25 16:01:21.748666');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('2bdrakso52132qy03iwg3atti25q2utm','.eJxVjEEOwiAQRe_C2pBhwGJduu8ZyMAMUjU0Ke3KeHfbpAvd_vfef6tA61LC2mQOI6urMur0u0VKT6k74AfV-6TTVJd5jHpX9EGbHiaW1-1w_w4KtbLVhJ0xmAE9d9bEs_WZABzbKNTbaLMwIQoCgQBIJsfoXW_dJsaLSerzBdiIN9M:1u0P8J:IuPdbNrhsY_QxGYbmgbMPUL66flykgPsvZplghf-rhw','2025-04-17 18:17:43.020205'),('82rvycagu9mf5btaqrtxewslpe5aifn6','.eJxVjEsOwiAUAO_C2pDHv7h03zOQx4NK1UBS2pXx7oakC93OTObNAh57CUfPW1gTuzLBLr8sIj1zHSI9sN4bp1b3bY18JPy0nc8t5dftbP8GBXsZW-ekoYVAZWGs1UQKzZSMAq09gRSTdQtIFQElRuMF6Zh0zDqDBeMl-3wBv3g29Q:1uIDyu:cgcckywjZQMuAT8bNR9Eax1zq-NCsdr12dCMLT2jEA4','2025-06-05 22:01:40.002938'),('p9882bd0knjsgft8vg2scom2s5o1wbqm','.eJxVjMEOwiAQRP-FsyGVLuB69N5vIMAuUjWQlPZk_Hdp0oPeJvPezFs4v63ZbY0XN5O4CiVOv13w8cllB_Tw5V5lrGVd5iB3RR60yakSv26H-3eQfct9feYU0SQcSRlt0TAFj6is0XSBBMDDyIqJOu85Jk0IA5D1KgQNicTnC_EIOHs:1u128M:GV0-w-963Rakm55aq16eY8wKqoWviYc0vhTWWp53D24','2025-04-19 11:56:22.155297');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegos_estadisticajuego`
--

DROP TABLE IF EXISTS `juegos_estadisticajuego`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegos_estadisticajuego` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `total_jugadores` int(11) NOT NULL,
  `promedio_puntuacion` double NOT NULL,
  `tiempo_promedio` int(11) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `juego_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `juegos_estadisticajuego_juego_id_30c3b6ed_fk_juegos_juego_id` (`juego_id`),
  CONSTRAINT `juegos_estadisticajuego_juego_id_30c3b6ed_fk_juegos_juego_id` FOREIGN KEY (`juego_id`) REFERENCES `juegos_juego` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos_estadisticajuego`
--

LOCK TABLES `juegos_estadisticajuego` WRITE;
/*!40000 ALTER TABLE `juegos_estadisticajuego` DISABLE KEYS */;
/*!40000 ALTER TABLE `juegos_estadisticajuego` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegos_juego`
--

DROP TABLE IF EXISTS `juegos_juego`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegos_juego` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `descripcion` longtext NOT NULL,
  `contenido` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`contenido`)),
  `idioma` varchar(2) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `tipo_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `juegos_juego_tipo_id_340225cd_fk_juegos_tipojuego_id` (`tipo_id`),
  CONSTRAINT `juegos_juego_tipo_id_340225cd_fk_juegos_tipojuego_id` FOREIGN KEY (`tipo_id`) REFERENCES `juegos_tipojuego` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos_juego`
--

LOCK TABLES `juegos_juego` WRITE;
/*!40000 ALTER TABLE `juegos_juego` DISABLE KEYS */;
/*!40000 ALTER TABLE `juegos_juego` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegos_progresojuego`
--

DROP TABLE IF EXISTS `juegos_progresojuego`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegos_progresojuego` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `puntuacion` int(10) unsigned NOT NULL CHECK (`puntuacion` >= 0),
  `nivel_completado` int(10) unsigned NOT NULL CHECK (`nivel_completado` >= 0),
  `tiempo_jugado` int(10) unsigned NOT NULL CHECK (`tiempo_jugado` >= 0),
  `fecha_ultima_partida` datetime(6) NOT NULL,
  `completado` tinyint(1) NOT NULL,
  `juego_id` bigint(20) NOT NULL,
  `perfil_infantil_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `juegos_progresojuego_perfil_infantil_id_juego_id_b5b5f11e_uniq` (`perfil_infantil_id`,`juego_id`),
  KEY `juegos_progresojuego_juego_id_83f8fba9_fk_juegos_juego_id` (`juego_id`),
  CONSTRAINT `juegos_progresojuego_juego_id_83f8fba9_fk_juegos_juego_id` FOREIGN KEY (`juego_id`) REFERENCES `juegos_juego` (`id`),
  CONSTRAINT `juegos_progresojuego_perfil_infantil_id_e54ae9ea_fk_users_per` FOREIGN KEY (`perfil_infantil_id`) REFERENCES `users_perfilinfantil` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos_progresojuego`
--

LOCK TABLES `juegos_progresojuego` WRITE;
/*!40000 ALTER TABLE `juegos_progresojuego` DISABLE KEYS */;
/*!40000 ALTER TABLE `juegos_progresojuego` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegos_tipojuego`
--

DROP TABLE IF EXISTS `juegos_tipojuego`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegos_tipojuego` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` longtext NOT NULL,
  `icono` varchar(100) DEFAULT NULL,
  `nivel_dificultad` int(11) NOT NULL,
  `edad_minima` int(11) NOT NULL,
  `edad_maxima` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos_tipojuego`
--

LOCK TABLES `juegos_tipojuego` WRITE;
/*!40000 ALTER TABLE `juegos_tipojuego` DISABLE KEYS */;
/*!40000 ALTER TABLE `juegos_tipojuego` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_configuracionparental`
--

DROP TABLE IF EXISTS `users_configuracionparental`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_configuracionparental` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idioma` varchar(5) NOT NULL,
  `limite_tiempo` int(10) unsigned NOT NULL CHECK (`limite_tiempo` >= 0),
  `accesibilidad` tinyint(1) NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `users_configuracionparental_usuario_id_151d9809_fk_users_user_id` FOREIGN KEY (`usuario_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_configuracionparental`
--

LOCK TABLES `users_configuracionparental` WRITE;
/*!40000 ALTER TABLE `users_configuracionparental` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_configuracionparental` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_perfilinfantil`
--

DROP TABLE IF EXISTS `users_perfilinfantil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_perfilinfantil` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `edad` int(10) unsigned NOT NULL CHECK (`edad` >= 0),
  `avatar` varchar(100) NOT NULL,
  `usuario_padre_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_perfilinfantil_usuario_padre_id_1e9ac97e_fk_users_user_id` (`usuario_padre_id`),
  CONSTRAINT `users_perfilinfantil_usuario_padre_id_1e9ac97e_fk_users_user_id` FOREIGN KEY (`usuario_padre_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_perfilinfantil`
--

LOCK TABLES `users_perfilinfantil` WRITE;
/*!40000 ALTER TABLE `users_perfilinfantil` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_perfilinfantil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user`
--

DROP TABLE IF EXISTS `users_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `es_padre` tinyint(1) NOT NULL,
  `es_infantil` tinyint(1) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `users_user_parent_id_f6411e6b_fk_users_user_id` (`parent_id`),
  CONSTRAINT `users_user_parent_id_f6411e6b_fk_users_user_id` FOREIGN KEY (`parent_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user`
--

LOCK TABLES `users_user` WRITE;
/*!40000 ALTER TABLE `users_user` DISABLE KEYS */;
INSERT INTO `users_user` VALUES (1,'pbkdf2_sha256$600000$inlZH8b2DVSZ9FseUuQ7ra$Ke7pbwQse+a47dH+O8omfQ2BFRpQTIqgelqyI693Mtw=','2025-05-22 22:01:39.996638',1,'admin_lkw','','','',1,1,'2025-04-03 18:07:31.139214',0,0,NULL),(2,'pbkdf2_sha256$870000$VoCbGIyjNp7api8pDrJT8Z$dMcsP1mYwm5bKiT3AbM6H7RYQ+Jip4sTs72hUYtJozs=','2025-04-05 11:56:22.152381',1,'antonio','','','',1,1,'2025-04-05 11:56:02.603712',0,0,NULL);
/*!40000 ALTER TABLE `users_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_groups`
--

DROP TABLE IF EXISTS `users_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_user_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_groups_user_id_group_id_b88eab82_uniq` (`user_id`,`group_id`),
  KEY `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` (`group_id`),
  CONSTRAINT `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `users_user_groups_user_id_5f6f5a90_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_groups`
--

LOCK TABLES `users_user_groups` WRITE;
/*!40000 ALTER TABLE `users_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_user_user_permissions`
--

DROP TABLE IF EXISTS `users_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_user_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_user_permissions_user_id_permission_id_43338c45_uniq` (`user_id`,`permission_id`),
  KEY `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `users_user_user_permissions_user_id_20aca447_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_user_user_permissions`
--

LOCK TABLES `users_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `users_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-25 20:57:04
