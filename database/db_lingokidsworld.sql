-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 01-06-2025 a las 06:18:40
-- Versión del servidor: 10.5.23-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_lingokidsworld`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add user', 6, 'add_user'),
(22, 'Can change user', 6, 'change_user'),
(23, 'Can delete user', 6, 'delete_user'),
(24, 'Can view user', 6, 'view_user'),
(25, 'Can add perfil infantil', 7, 'add_perfilinfantil'),
(26, 'Can change perfil infantil', 7, 'change_perfilinfantil'),
(27, 'Can delete perfil infantil', 7, 'delete_perfilinfantil'),
(28, 'Can view perfil infantil', 7, 'view_perfilinfantil'),
(29, 'Can add cuento', 8, 'add_cuento'),
(30, 'Can change cuento', 8, 'change_cuento'),
(31, 'Can delete cuento', 8, 'delete_cuento'),
(32, 'Can view cuento', 8, 'view_cuento'),
(33, 'Can add progreso', 9, 'add_progreso'),
(34, 'Can change progreso', 9, 'change_progreso'),
(35, 'Can delete progreso', 9, 'delete_progreso'),
(36, 'Can view progreso', 9, 'view_progreso'),
(37, 'Can add configuracion parental', 10, 'add_configuracionparental'),
(38, 'Can change configuracion parental', 10, 'change_configuracionparental'),
(39, 'Can delete configuracion parental', 10, 'delete_configuracionparental'),
(40, 'Can view configuracion parental', 10, 'view_configuracionparental'),
(41, 'Can add estadistica juego', 11, 'add_estadisticajuego'),
(42, 'Can change estadistica juego', 11, 'change_estadisticajuego'),
(43, 'Can delete estadistica juego', 11, 'delete_estadisticajuego'),
(44, 'Can view estadistica juego', 11, 'view_estadisticajuego'),
(45, 'Can add juego', 12, 'add_juego'),
(46, 'Can change juego', 12, 'change_juego'),
(47, 'Can delete juego', 12, 'delete_juego'),
(48, 'Can view juego', 12, 'view_juego'),
(49, 'Can add tipo juego', 13, 'add_tipojuego'),
(50, 'Can change tipo juego', 13, 'change_tipojuego'),
(51, 'Can delete tipo juego', 13, 'delete_tipojuego'),
(52, 'Can view tipo juego', 13, 'view_tipojuego'),
(53, 'Can add progreso juego', 14, 'add_progresojuego'),
(54, 'Can change progreso juego', 14, 'change_progresojuego'),
(55, 'Can delete progreso juego', 14, 'delete_progresojuego'),
(56, 'Can view progreso juego', 14, 'view_progresojuego'),
(57, 'Can add avatar', 15, 'add_avatar'),
(58, 'Can change avatar', 15, 'change_avatar'),
(59, 'Can delete avatar', 15, 'delete_avatar'),
(60, 'Can view avatar', 15, 'view_avatar'),
(61, 'Can add recompensa', 16, 'add_recompensa'),
(62, 'Can change recompensa', 16, 'change_recompensa'),
(63, 'Can delete recompensa', 16, 'delete_recompensa'),
(64, 'Can view recompensa', 16, 'view_recompensa'),
(65, 'Can add componente avatar', 17, 'add_componenteavatar'),
(66, 'Can change componente avatar', 17, 'change_componenteavatar'),
(67, 'Can delete componente avatar', 17, 'delete_componenteavatar'),
(68, 'Can view componente avatar', 17, 'view_componenteavatar'),
(69, 'Can add recompensa perfil', 18, 'add_recompensaperfil'),
(70, 'Can change recompensa perfil', 18, 'change_recompensaperfil'),
(71, 'Can delete recompensa perfil', 18, 'delete_recompensaperfil'),
(72, 'Can view recompensa perfil', 18, 'view_recompensaperfil'),
(73, 'Can add progreso general', 19, 'add_progresogeneral'),
(74, 'Can change progreso general', 19, 'change_progresogeneral'),
(75, 'Can delete progreso general', 19, 'delete_progresogeneral'),
(76, 'Can view progreso general', 19, 'view_progresogeneral'),
(77, 'Can add Progreso de Juego', 20, 'add_progresojuego'),
(78, 'Can change Progreso de Juego', 20, 'change_progresojuego'),
(79, 'Can delete Progreso de Juego', 20, 'delete_progresojuego'),
(80, 'Can view Progreso de Juego', 20, 'view_progresojuego'),
(81, 'Can add Progreso de Cuento', 21, 'add_progresocuento'),
(82, 'Can change Progreso de Cuento', 21, 'change_progresocuento'),
(83, 'Can delete Progreso de Cuento', 21, 'delete_progresocuento'),
(84, 'Can view Progreso de Cuento', 21, 'view_progresocuento'),
(85, 'Can add logro', 22, 'add_logro'),
(86, 'Can change logro', 22, 'change_logro'),
(87, 'Can delete logro', 22, 'delete_logro'),
(88, 'Can view logro', 22, 'view_logro'),
(89, 'Can add perfil logro', 23, 'add_perfillogro'),
(90, 'Can change perfil logro', 23, 'change_perfillogro'),
(91, 'Can delete perfil logro', 23, 'delete_perfillogro'),
(92, 'Can view perfil logro', 23, 'view_perfillogro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avatar_avatar`
--

CREATE TABLE `avatar_avatar` (
  `id` bigint(20) NOT NULL,
  `vista_previa` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `perfil_id` bigint(20) NOT NULL,
  `accesorio_id` bigint(20) DEFAULT NULL,
  `ojos_id` bigint(20) DEFAULT NULL,
  `pelo_id` bigint(20) DEFAULT NULL,
  `ropa_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avatar_componenteavatar`
--

CREATE TABLE `avatar_componenteavatar` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` longtext NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `desbloqueado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avatar_recompensa`
--

CREATE TABLE `avatar_recompensa` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` longtext NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `puntos` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `componente_desbloquea_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avatar_recompensaperfil`
--

CREATE TABLE `avatar_recompensaperfil` (
  `id` bigint(20) NOT NULL,
  `fecha_obtencion` datetime(6) NOT NULL,
  `perfil_id` bigint(20) NOT NULL,
  `recompensa_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentos_cuento`
--

CREATE TABLE `cuentos_cuento` (
  `id` bigint(20) NOT NULL,
  `idioma` varchar(50) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `contenido` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`contenido`)),
  `personalizable` tinyint(1) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `cuentos_cuento`
--

INSERT INTO `cuentos_cuento` (`id`, `idioma`, `titulo`, `contenido`, `personalizable`, `categoria`, `imagen`) VALUES
(1, 'es', 'El dragón curioso', '{\"escenas\": [{\"id\": 1, \"texto\": \"\\u00c9rase una vez un drag\\u00f3n curioso que quer\\u00eda aprender a volar.\", \"opciones\": [{\"texto\": \"Intentar saltar desde un \\u00e1rbol\", \"siguiente\": 2}, {\"texto\": \"Leer un libro sobre vuelo\", \"siguiente\": 3}]}, {\"id\": 2, \"texto\": \"Se cay\\u00f3... pero no se rindi\\u00f3.\", \"opciones\": []}, {\"id\": 3, \"texto\": \"Aprendi\\u00f3 la teor\\u00eda... \\u00a1y luego vol\\u00f3!\", \"opciones\": []}]}', 1, 'Aventura', '/img/cuento-dinosaurio.png'),
(2, 'es', 'La Aventura del Bosque Mágico', '{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"Te adentras en el Bosque Mágico y encuentras dos caminos.\",\n        \"opciones\": [\n          { \"texto\": \"Tomar el sendero iluminado\", \"siguiente\": 2 },\n          { \"texto\": \"Explorar el oscuro túnel\", \"siguiente\": 3 }\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"El sendero te lleva a un lago brillante donde vive una sirena.\",\n        \"opciones\": [\n          { \"texto\": \"Hablar con la sirena\", \"siguiente\": 4 },\n          { \"texto\": \"Nadar en el lago\", \"siguiente\": 5 }\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"El túnel te lleva a una cueva con murciélagos dormidos.\",\n        \"opciones\": [\n          { \"texto\": \"Pasar silenciosamente\", \"siguiente\": 6 },\n          { \"texto\": \"Gritar para asustarlos\", \"siguiente\": 7 }\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"La sirena te da una piedra mágica y te enseña el camino al árbol dorado.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"¡Una corriente te arrastra a una cascada secreta!\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"Logras salir al otro lado sin despertar a los murciélagos.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 7,\n        \"texto\": \"Los murciélagos se asustan y tú sales volando con ellos hacia el cielo nocturno.\",\n        \"opciones\": []\n      }\n    ]\n  }', 1, 'Aventura', '/img/cuento-bosque-magico.png'),
(3, 'es', 'El Viaje del Dragón Azul', '{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"Drako, el dragón azul, quiere visitar la cima del Monte Rayo.\",\n        \"opciones\": [\n          { \"texto\": \"Volar por el cielo\", \"siguiente\": 2 },\n          { \"texto\": \"Escalar con sus patas\", \"siguiente\": 3 }\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"El viento es fuerte, pero Drako lo disfruta. Pronto ve una nube con forma de castillo.\",\n        \"opciones\": [\n          { \"texto\": \"Explorar la nube\", \"siguiente\": 4 },\n          { \"texto\": \"Seguir volando\", \"siguiente\": 5 }\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"La montaña es empinada y encuentra una familia de cabras parlantes.\",\n        \"opciones\": [\n          { \"texto\": \"Saludarlas\", \"siguiente\": 6 },\n          { \"texto\": \"Seguir sin hablar\", \"siguiente\": 7 }\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"Dentro de la nube-castillo vive un gigante amable que le regala un mapa mágico.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"Llega a la cima y observa todo el reino de los dragones.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"Las cabras le enseñan un atajo secreto hasta la cima.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 7,\n        \"texto\": \"Pierde la oportunidad de aprender del sabio consejo de las cabras.\",\n        \"opciones\": []\n      }\n    ]\n  }', 0, 'Animales', '/img/cuento-dragon-azul.png'),
(4, 'es', 'El Reloj del Tiempo Curioso', '{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"Encuentras un reloj antiguo que puede detener el tiempo.\",\n        \"opciones\": [\n          { \"texto\": \"Detener el tiempo\", \"siguiente\": 2 },\n          { \"texto\": \"Avanzar al futuro\", \"siguiente\": 3 }\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"Todo se congela excepto tú. Puedes explorar sin límites.\",\n        \"opciones\": [\n          { \"texto\": \"Ir al museo\", \"siguiente\": 4 },\n          { \"texto\": \"Caminar por la ciudad\", \"siguiente\": 5 }\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"Apareces en un mundo futurista donde todos hablan con robots.\",\n        \"opciones\": [\n          { \"texto\": \"Conocer un robot amigo\", \"siguiente\": 6 }\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"Descubres que uno de los cuadros te lleva a otra época.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"Ves cómo todos los pájaros están suspendidos en el aire.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"Tu nuevo amigo robot te enseña cómo regresar al presente.\",\n        \"opciones\": []\n      }\n    ]\n  }', 1, 'Fantasía', '/img/cuento-reloj-tiempo.png'),
(5, 'es', 'La misión del robot R1K', '{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"En el año 3050, el robot R1K despertó en una nave vacía. Su misión: recuperar una muestra perdida en un planeta desconocido.\",\n        \"opciones\": [\n          { \"texto\": \"Explorar el laboratorio\", \"siguiente\": 2 },\n          { \"texto\": \"Acceder al puente de mando\", \"siguiente\": 3 }\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"R1K encontró una nota misteriosa: Confía en los centinelas\",\n        \"opciones\": [\n          { \"texto\": \"Buscar a los centinelas\", \"siguiente\": 4 },\n          { \"texto\": \"Ignorar la nota y salir de la nave\", \"siguiente\": 5 }\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"El puente mostraba coordenadas hacia un planeta cubierto de hielo.\",\n        \"opciones\": [\n          { \"texto\": \"Seguir las coordenadas\", \"siguiente\": 5 },\n          { \"texto\": \"Buscar una ruta alternativa\", \"siguiente\": 6 }\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"Los centinelas eran viejos robots sabios. Le entregaron un mapa escondido.\",\n        \"opciones\": [\n          { \"texto\": \"Usar el mapa\", \"siguiente\": 7 }\n        ]\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"R1K llegó al planeta helado. El terreno era peligroso pero vio una cueva con luz.\",\n        \"opciones\": [\n          { \"texto\": \"Entrar a la cueva\", \"siguiente\": 7 },\n          { \"texto\": \"Evitar la cueva\", \"siguiente\": 8 }\n        ]\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"Ruta alternativa: encontró una base abandonada.\",\n        \"opciones\": [\n          { \"texto\": \"Investigar la base\", \"siguiente\": 7 }\n        ]\n      },\n      {\n        \"id\": 7,\n        \"texto\": \"¡Encontró la muestra perdida y la nave lo recogió triunfante!\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 8,\n        \"texto\": \"Se perdió en una tormenta de nieve. R1K fue rescatado pero sin la muestra.\",\n        \"opciones\": []\n      }\n    ]\n  }', 0, 'Ciencia ficción', '/img/cuento-robote1k.png'),
(6, 'es', 'La corona del reino escondido', '{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"La joven Clara encontró un mapa en el desván de su abuela. Marcaba un lugar llamado El Reino Escondido\",\n        \"opciones\": [\n          { \"texto\": \"Seguir el mapa al bosque\", \"siguiente\": 2 },\n          { \"texto\": \"Investigar en la biblioteca\", \"siguiente\": 3 }\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"El bosque susurraba secretos. Un zorro parlante apareció.\",\n        \"opciones\": [\n          { \"texto\": \"Seguir al zorro\", \"siguiente\": 4 },\n          { \"texto\": \"Ignorar al zorro\", \"siguiente\": 5 }\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"Los libros hablaban de una corona mágica que solo un corazón puro podía encontrar.\",\n        \"opciones\": [\n          { \"texto\": \"Volver al mapa y seguirlo\", \"siguiente\": 2 }\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"El zorro llevó a Clara hasta una cascada mágica con un portal.\",\n        \"opciones\": [\n          { \"texto\": \"Entrar al portal\", \"siguiente\": 6 }\n        ]\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"Se perdió y cayó en un pozo, pero una voz la rescató: un anciano del reino.\",\n        \"opciones\": [\n          { \"texto\": \"Confiar en el anciano\", \"siguiente\": 6 }\n        ]\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"Clara llegó al Reino Escondido. La reina la esperaba con la corona mágica.\",\n        \"opciones\": [\n          { \"texto\": \"Aceptar la corona\", \"siguiente\": 7 },\n          { \"texto\": \"Devolver la corona al reino\", \"siguiente\": 8 }\n        ]\n      },\n      {\n        \"id\": 7,\n        \"texto\": \"La corona brilló y Clara se convirtió en guardiana del reino.\",\n        \"opciones\": []\n      },\n      {\n        \"id\": 8,\n        \"texto\": \"El reino celebró su humildad y Clara se convirtió en leyenda.\",\n        \"opciones\": []\n      }\n    ]\n  }', 1, 'Fantasía', '/img/cuento-corona-reino.png'),
(7, 'es', 'El Bosque de los Secretos', '{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"El Bosque de los Secretos - Escena 1.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 1\", \"siguiente\": 2},\n          {\"texto\": \"Opción B desde 1\", \"siguiente\": 3},\n          {\"texto\": \"Opción C desde 1\", \"siguiente\": 4}\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"El Bosque de los Secretos - Escena 2.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 2\", \"siguiente\": 3},\n          {\"texto\": \"Opción B desde 2\", \"siguiente\": 4},\n          {\"texto\": \"Opción C desde 2\", \"siguiente\": 5}\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"El Bosque de los Secretos - Escena 3.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 3\", \"siguiente\": 4},\n          {\"texto\": \"Opción B desde 3\", \"siguiente\": 5},\n          {\"texto\": \"Opción C desde 3\", \"siguiente\": 6}\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"El Bosque de los Secretos - Escena 4.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 4\", \"siguiente\": 5},\n          {\"texto\": \"Opción B desde 4\", \"siguiente\": 6},\n          {\"texto\": \"Opción C desde 4\", \"siguiente\": 7}\n        ]\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"El Bosque de los Secretos - Escena 5.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 5\", \"siguiente\": 6},\n          {\"texto\": \"Opción B desde 5\", \"siguiente\": 7}\n        ]\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"El Bosque de los Secretos - Escena 6.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 6\", \"siguiente\": 7},\n          {\"texto\": \"Opción B desde 6\", \"siguiente\": 8}\n        ]\n      }\n    ]\n  }', 1, 'Misterio', '/img/cuento-bosque-secreto.png'),
(8, 'es', 'El Castillo de Cristal', '{\n    \"escenas\": [\n      {\n        \"id\": 1,\n        \"texto\": \"El Castillo de Cristal - Escena 1.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 1\", \"siguiente\": 2},\n          {\"texto\": \"Opción B desde 1\", \"siguiente\": 3},\n          {\"texto\": \"Opción C desde 1\", \"siguiente\": 4}\n        ]\n      },\n      {\n        \"id\": 2,\n        \"texto\": \"El Castillo de Cristal - Escena 2.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 2\", \"siguiente\": 3},\n          {\"texto\": \"Opción B desde 2\", \"siguiente\": 4},\n          {\"texto\": \"Opción C desde 2\", \"siguiente\": 5}\n        ]\n      },\n      {\n        \"id\": 3,\n        \"texto\": \"El Castillo de Cristal - Escena 3.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 3\", \"siguiente\": 4},\n          {\"texto\": \"Opción B desde 3\", \"siguiente\": 5},\n          {\"texto\": \"Opción C desde 3\", \"siguiente\": 6}\n        ]\n      },\n      {\n        \"id\": 4,\n        \"texto\": \"El Castillo de Cristal - Escena 4.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 4\", \"siguiente\": 5},\n          {\"texto\": \"Opción B desde 4\", \"siguiente\": 6},\n          {\"texto\": \"Opción C desde 4\", \"siguiente\": 7}\n        ]\n      },\n      {\n        \"id\": 5,\n        \"texto\": \"El Castillo de Cristal - Escena 5.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 5\", \"siguiente\": 6},\n          {\"texto\": \"Opción B desde 5\", \"siguiente\": 7}\n        ]\n      },\n      {\n        \"id\": 6,\n        \"texto\": \"El Castillo de Cristal - Escena 6.\",\n        \"opciones\": [\n          {\"texto\": \"Opción A desde 6\", \"siguiente\": 7},\n          {\"texto\": \"Opción B desde 6\", \"siguiente\": 8}\n        ]\n      }\n    ]\n  }', 0, 'Fantasía', '/img/cuento-castillo-cristal.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2025-04-03 18:22:53.549952', '1', 'El dragón curioso (es)', 1, '[{\"added\": {}}]', 8, 1),
(2, '2025-05-25 11:27:23.637824', '1', 'El dragón curioso (es)', 2, '[]', 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(15, 'avatar', 'avatar'),
(17, 'avatar', 'componenteavatar'),
(16, 'avatar', 'recompensa'),
(18, 'avatar', 'recompensaperfil'),
(4, 'contenttypes', 'contenttype'),
(8, 'cuentos', 'cuento'),
(11, 'juegos', 'estadisticajuego'),
(12, 'juegos', 'juego'),
(14, 'juegos', 'progresojuego'),
(13, 'juegos', 'tipojuego'),
(22, 'logros', 'logro'),
(23, 'logros', 'perfillogro'),
(21, 'progreso', 'progresocuento'),
(19, 'progreso', 'progresogeneral'),
(20, 'progreso', 'progresojuego'),
(5, 'sessions', 'session'),
(10, 'users', 'configuracionparental'),
(7, 'users', 'perfilinfantil'),
(9, 'users', 'progreso'),
(6, 'users', 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-04-03 18:06:47.500304'),
(2, 'contenttypes', '0002_remove_content_type_name', '2025-04-03 18:06:47.572140'),
(3, 'auth', '0001_initial', '2025-04-03 18:06:47.948268'),
(4, 'auth', '0002_alter_permission_name_max_length', '2025-04-03 18:06:47.961460'),
(5, 'auth', '0003_alter_user_email_max_length', '2025-04-03 18:06:47.965946'),
(6, 'auth', '0004_alter_user_username_opts', '2025-04-03 18:06:47.972914'),
(7, 'auth', '0005_alter_user_last_login_null', '2025-04-03 18:06:47.980324'),
(8, 'auth', '0006_require_contenttypes_0002', '2025-04-03 18:06:47.985783'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2025-04-03 18:06:47.990470'),
(10, 'auth', '0008_alter_user_username_max_length', '2025-04-03 18:06:47.997337'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2025-04-03 18:06:48.004552'),
(12, 'auth', '0010_alter_group_name_max_length', '2025-04-03 18:06:48.018947'),
(13, 'auth', '0011_update_proxy_permissions', '2025-04-03 18:06:48.026213'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2025-04-03 18:06:48.033799'),
(15, 'users', '0001_initial', '2025-04-03 18:06:48.477827'),
(16, 'admin', '0001_initial', '2025-04-03 18:06:48.664157'),
(17, 'admin', '0002_logentry_remove_auto_add', '2025-04-03 18:06:48.671461'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2025-04-03 18:06:48.679591'),
(19, 'sessions', '0001_initial', '2025-04-03 18:06:48.734040'),
(20, 'users', '0002_perfilinfantil', '2025-04-03 18:06:48.838983'),
(21, 'cuentos', '0001_initial', '2025-04-03 18:17:09.185846'),
(22, 'users', '0002_configuracionparental', '2025-05-22 21:49:47.591747'),
(23, 'avatar', '0001_initial', '2025-05-22 21:49:48.325755'),
(24, 'juegos', '0001_initial', '2025-05-22 21:49:48.784472'),
(25, 'users', '0003_user_parent', '2025-05-22 21:49:48.905331'),
(26, 'cuentos', '0002_cuento_categoria_cuento_imagen', '2025-05-25 16:01:21.748666'),
(27, 'cuentos', '0003_alter_cuento_imagen', '2025-05-26 01:50:57.658222'),
(28, 'juegos', '0002_alter_juego_contenido_alter_juego_imagen_and_more', '2025-05-31 17:16:33.536219'),
(29, 'progreso', '0001_initial', '2025-05-31 17:16:34.108800'),
(30, 'users', '0004_perfilinfantil_user_infantil', '2025-05-31 21:02:13.328610'),
(31, 'logros', '0001_initial', '2025-05-31 22:11:27.508149');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('2bdrakso52132qy03iwg3atti25q2utm', '.eJxVjEEOwiAQRe_C2pBhwGJduu8ZyMAMUjU0Ke3KeHfbpAvd_vfef6tA61LC2mQOI6urMur0u0VKT6k74AfV-6TTVJd5jHpX9EGbHiaW1-1w_w4KtbLVhJ0xmAE9d9bEs_WZABzbKNTbaLMwIQoCgQBIJsfoXW_dJsaLSerzBdiIN9M:1u0P8J:IuPdbNrhsY_QxGYbmgbMPUL66flykgPsvZplghf-rhw', '2025-04-17 18:17:43.020205'),
('82rvycagu9mf5btaqrtxewslpe5aifn6', '.eJxVjEsOwiAUAO_C2pDHv7h03zOQx4NK1UBS2pXx7oakC93OTObNAh57CUfPW1gTuzLBLr8sIj1zHSI9sN4bp1b3bY18JPy0nc8t5dftbP8GBXsZW-ekoYVAZWGs1UQKzZSMAq09gRSTdQtIFQElRuMF6Zh0zDqDBeMl-3wBv3g29Q:1uIDyu:cgcckywjZQMuAT8bNR9Eax1zq-NCsdr12dCMLT2jEA4', '2025-06-05 22:01:40.002938'),
('p9882bd0knjsgft8vg2scom2s5o1wbqm', '.eJxVjMEOwiAQRP-FsyGVLuB69N5vIMAuUjWQlPZk_Hdp0oPeJvPezFs4v63ZbY0XN5O4CiVOv13w8cllB_Tw5V5lrGVd5iB3RR60yakSv26H-3eQfct9feYU0SQcSRlt0TAFj6is0XSBBMDDyIqJOu85Jk0IA5D1KgQNicTnC_EIOHs:1u128M:GV0-w-963Rakm55aq16eY8wKqoWviYc0vhTWWp53D24', '2025-04-19 11:56:22.155297');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos_estadisticajuego`
--

CREATE TABLE `juegos_estadisticajuego` (
  `id` bigint(20) NOT NULL,
  `total_jugadores` int(11) NOT NULL,
  `promedio_puntuacion` double NOT NULL,
  `tiempo_promedio` int(11) NOT NULL,
  `fecha_actualizacion` datetime(6) NOT NULL,
  `juego_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos_juego`
--

CREATE TABLE `juegos_juego` (
  `id` bigint(20) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descripcion` longtext NOT NULL,
  `contenido` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`contenido`)),
  `idioma` varchar(2) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `tipo_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `juegos_juego`
--

INSERT INTO `juegos_juego` (`id`, `titulo`, `descripcion`, `contenido`, `idioma`, `imagen`, `activo`, `fecha_creacion`, `tipo_id`) VALUES
(1, 'MatchingGame', 'Emparejar palabras e imágenes', '{}', 'es', '', 1, '2025-05-31 18:35:05.275217', 1),
(2, 'MemoryGame', 'Memoria Multilingüe', '{}', 'es', '', 1, '2025-05-31 18:35:05.281716', 1),
(3, 'PuzzleGame', 'Puzzle de Frases', '{}', 'es', '', 1, '2025-05-31 18:35:05.294317', 1),
(4, 'SimonGame', 'Simon dice (Secuencia)', '{}', 'es', '', 1, '2025-05-31 18:35:05.300539', 1),
(5, 'SnakeGame', 'Juego de la Serpiente', '{}', 'es', '', 1, '2025-05-31 18:35:05.307303', 1),
(6, 'WhackAMole', 'Whack-a-Mole (Topos)', '{}', 'es', '', 1, '2025-05-31 18:35:05.313296', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos_tipojuego`
--

CREATE TABLE `juegos_tipojuego` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` longtext NOT NULL,
  `icono` varchar(100) DEFAULT NULL,
  `nivel_dificultad` int(11) NOT NULL,
  `edad_minima` int(11) NOT NULL,
  `edad_maxima` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `juegos_tipojuego`
--

INSERT INTO `juegos_tipojuego` (`id`, `nombre`, `descripcion`, `icono`, `nivel_dificultad`, `edad_minima`, `edad_maxima`) VALUES
(1, 'Juego Interactivo', 'Categoría genérica de juegos', '', 1, 3, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logros_logro`
--

CREATE TABLE `logros_logro` (
  `id` bigint(20) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` longtext NOT NULL,
  `juego_id` int(10) UNSIGNED DEFAULT NULL CHECK (`juego_id` >= 0),
  `cuento_id` int(10) UNSIGNED DEFAULT NULL CHECK (`cuento_id` >= 0),
  `umbral` int(10) UNSIGNED NOT NULL CHECK (`umbral` >= 0),
  `activo` tinyint(1) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `logros_logro`
--

INSERT INTO `logros_logro` (`id`, `codigo`, `titulo`, `descripcion`, `juego_id`, `cuento_id`, `umbral`, `activo`, `fecha_creacion`) VALUES
(1, 'matching_pairs_10', '¡Parejas Imbatibles!', 'Encuentra al menos 10 pares en el MatchingGame para desbloquear este logro.', 1, NULL, 10, 1, '2025-01-01 00:00:00.000000'),
(2, 'memory_matches_15', '¡Memoria de Oro!', 'Obtén al menos 15 coincidencias en MemoryGame para desbloquear este logro.', 2, NULL, 15, 1, '2025-01-01 00:00:00.000000'),
(3, 'puzzle_completado', '¡Rompecabezas Resuelto!', 'Completa al menos una frase en PuzzleGame para desbloquear este logro.', 3, NULL, 1, 1, '2025-01-01 00:00:00.000000'),
(4, 'simon_round_5', '¡Maestro de la Secuencia!', 'Alcanza la ronda 5 en SimonGame para desbloquear este logro.', 4, NULL, 5, 1, '2025-01-01 00:00:00.000000'),
(5, 'snake_apple_20', '¡Devora 20 Manzanas!', 'Come al menos 20 manzanas en SnakeGame para desbloquear este logro.', 5, NULL, 20, 1, '2025-01-01 00:00:00.000000'),
(6, 'whackamole_score_10', '¡Goleador de Topos!', 'Alcanza una puntuación de 10 en WhackAMole para desbloquear este logro.', 6, NULL, 10, 1, '2025-01-01 00:00:00.000000'),
(10, 'cuento1_completado', '¡Leyó La liebre y la tortuga!', 'Completa el cuento \'La liebre y la tortuga\' para desbloquear este logro.', NULL, 1, 0, 1, '2025-01-01 00:00:00.000000'),
(11, 'cuento2_5minutos', '¡Cinco minutos de lectura!', 'Lee al menos 300 segundos (5 minutos) del cuento \'El patito feo\'.', NULL, 2, 300, 1, '2025-01-01 00:00:00.000000'),
(12, 'cuento3_completado', '¡Caperucita completada!', 'Completa el cuento \'Caperucita Roja\' para desbloquear.', NULL, 3, 0, 1, '2025-01-01 00:00:00.000000'),
(13, 'juego_1_puntos_50', '¡50 puntos en Matching!', 'Consigue 50 puntos en MatchingGame.', 1, NULL, 50, 1, '2025-01-01 00:00:00.000000'),
(14, 'juego_2_puntos_100', '¡100 puntos en Memory!', 'Consigue 100 puntos en MemoryGame.', 2, NULL, 100, 1, '2025-01-01 00:00:00.000000'),
(15, 'juego_3_frases_10', '¡10 frases en Puzzle!', 'Completa 10 frases en PuzzleGame.', 3, NULL, 10, 1, '2025-01-01 00:00:00.000000'),
(16, 'juego_4_round_10', '¡Ronda 10 en Simon!', 'Alcanza la ronda 10 en SimonGame.', 4, NULL, 10, 1, '2025-01-01 00:00:00.000000'),
(17, 'juego_5_manzanas_50', '¡50 manzanas en Snake!', 'Come 50 manzanas en SnakeGame.', 5, NULL, 50, 1, '2025-01-01 00:00:00.000000'),
(18, 'juego_6_topos_30', '¡30 topos golpeados!', 'Golpea 30 topos en WhackAMole.', 6, NULL, 30, 1, '2025-01-01 00:00:00.000000'),
(19, 'logro_extra_19', 'Logro Extra 19', 'Descripción del logro extra 19.', 4, NULL, 19, 1, '2025-01-01 00:00:00.000000'),
(20, 'logro_extra_20', 'Logro Extra 20', 'Descripción del logro extra 20.', 5, NULL, 20, 1, '2025-01-01 00:00:00.000000'),
(21, 'logro_extra_21', 'Logro Extra 21', 'Descripción del logro extra 21.', 6, NULL, 21, 1, '2025-01-01 00:00:00.000000'),
(22, 'logro_extra_22', 'Logro Extra 22', 'Descripción del logro extra 22.', 1, NULL, 22, 1, '2025-01-01 00:00:00.000000'),
(23, 'logro_extra_23', 'Logro Extra 23', 'Descripción del logro extra 23.', 2, NULL, 23, 1, '2025-01-01 00:00:00.000000'),
(24, 'logro_extra_24', 'Logro Extra 24', 'Descripción del logro extra 24.', 3, NULL, 24, 1, '2025-01-01 00:00:00.000000'),
(25, 'logro_extra_25', 'Logro Extra 25', 'Descripción del logro extra 25.', 4, NULL, 25, 1, '2025-01-01 00:00:00.000000'),
(26, 'logro_extra_26', 'Logro Extra 26', 'Descripción del logro extra 26.', 5, NULL, 26, 1, '2025-01-01 00:00:00.000000'),
(27, 'logro_extra_27', 'Logro Extra 27', 'Descripción del logro extra 27.', 6, NULL, 27, 1, '2025-01-01 00:00:00.000000'),
(28, 'logro_extra_28', 'Logro Extra 28', 'Descripción del logro extra 28.', 1, NULL, 28, 1, '2025-01-01 00:00:00.000000'),
(29, 'logro_extra_29', 'Logro Extra 29', 'Descripción del logro extra 29.', 2, NULL, 29, 1, '2025-01-01 00:00:00.000000'),
(30, 'logro_extra_30', 'Logro Extra 30', 'Descripción del logro extra 30.', 3, NULL, 30, 1, '2025-01-01 00:00:00.000000'),
(31, 'logro_extra_31', 'Logro Extra 31', 'Descripción del logro extra 31.', 4, NULL, 31, 1, '2025-01-01 00:00:00.000000'),
(32, 'logro_extra_32', 'Logro Extra 32', 'Descripción del logro extra 32.', 5, NULL, 32, 1, '2025-01-01 00:00:00.000000'),
(33, 'logro_extra_33', 'Logro Extra 33', 'Descripción del logro extra 33.', 6, NULL, 33, 1, '2025-01-01 00:00:00.000000'),
(34, 'logro_extra_34', 'Logro Extra 34', 'Descripción del logro extra 34.', 1, NULL, 34, 1, '2025-01-01 00:00:00.000000'),
(35, 'logro_extra_35', 'Logro Extra 35', 'Descripción del logro extra 35.', 2, NULL, 35, 1, '2025-01-01 00:00:00.000000'),
(36, 'logro_extra_36', 'Logro Extra 36', 'Descripción del logro extra 36.', 3, NULL, 36, 1, '2025-01-01 00:00:00.000000'),
(37, 'logro_extra_37', 'Logro Extra 37', 'Descripción del logro extra 37.', 4, NULL, 37, 1, '2025-01-01 00:00:00.000000'),
(38, 'logro_extra_38', 'Logro Extra 38', 'Descripción del logro extra 38.', 5, NULL, 38, 1, '2025-01-01 00:00:00.000000'),
(39, 'logro_extra_39', 'Logro Extra 39', 'Descripción del logro extra 39.', 6, NULL, 39, 1, '2025-01-01 00:00:00.000000'),
(40, 'logro_extra_40', 'Logro Extra 40', 'Descripción del logro extra 40.', 1, NULL, 40, 1, '2025-01-01 00:00:00.000000'),
(41, 'logro_extra_41', 'Logro Extra 41', 'Descripción del logro extra 41.', 2, NULL, 41, 1, '2025-01-01 00:00:00.000000'),
(42, 'logro_extra_42', 'Logro Extra 42', 'Descripción del logro extra 42.', 3, NULL, 42, 1, '2025-01-01 00:00:00.000000'),
(43, 'logro_extra_43', 'Logro Extra 43', 'Descripción del logro extra 43.', 4, NULL, 43, 1, '2025-01-01 00:00:00.000000'),
(44, 'logro_extra_44', 'Logro Extra 44', 'Descripción del logro extra 44.', 5, NULL, 44, 1, '2025-01-01 00:00:00.000000'),
(45, 'logro_extra_45', 'Logro Extra 45', 'Descripción del logro extra 45.', 6, NULL, 45, 1, '2025-01-01 00:00:00.000000'),
(46, 'logro_extra_46', 'Logro Extra 46', 'Descripción del logro extra 46.', 1, NULL, 46, 1, '2025-01-01 00:00:00.000000'),
(47, 'logro_extra_47', 'Logro Extra 47', 'Descripción del logro extra 47.', 2, NULL, 47, 1, '2025-01-01 00:00:00.000000'),
(48, 'logro_extra_48', 'Logro Extra 48', 'Descripción del logro extra 48.', 3, NULL, 48, 1, '2025-01-01 00:00:00.000000'),
(49, 'logro_extra_49', 'Logro Extra 49', 'Descripción del logro extra 49.', 4, NULL, 49, 1, '2025-01-01 00:00:00.000000'),
(50, 'logro_extra_50', 'Logro Extra 50', 'Descripción del logro extra 50.', 5, NULL, 50, 1, '2025-01-01 00:00:00.000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logros_perfillogro`
--

CREATE TABLE `logros_perfillogro` (
  `id` bigint(20) NOT NULL,
  `fecha_desbloqueado` datetime(6) NOT NULL,
  `logro_id` bigint(20) NOT NULL,
  `perfil_infantil_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `logros_perfillogro`
--

INSERT INTO `logros_perfillogro` (`id`, `fecha_desbloqueado`, `logro_id`, `perfil_infantil_id`) VALUES
(1, '2025-06-01 02:43:04.939955', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progreso_progresocuento`
--

CREATE TABLE `progreso_progresocuento` (
  `id` bigint(20) NOT NULL,
  `tiempo_leido` int(11) NOT NULL,
  `pag_actual` int(11) NOT NULL,
  `completado` tinyint(1) NOT NULL,
  `actualizado` datetime(6) NOT NULL,
  `cuento_id` bigint(20) NOT NULL,
  `perfil_infantil_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progreso_progresogeneral`
--

CREATE TABLE `progreso_progresogeneral` (
  `id` bigint(20) NOT NULL,
  `tiempo_total` int(11) NOT NULL,
  `tiempo_juegos` int(11) NOT NULL,
  `tiempo_cuentos` int(11) NOT NULL,
  `actualizado` datetime(6) NOT NULL,
  `perfil_infantil_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progreso_progresojuego`
--

CREATE TABLE `progreso_progresojuego` (
  `id` bigint(20) NOT NULL,
  `tiempo_jugado` int(11) NOT NULL,
  `estadisticas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`estadisticas`)),
  `actualizado` datetime(6) NOT NULL,
  `juego_id` bigint(20) NOT NULL,
  `perfil_infantil_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `progreso_progresojuego`
--

INSERT INTO `progreso_progresojuego` (`id`, `tiempo_jugado`, `estadisticas`, `actualizado`, `juego_id`, `perfil_infantil_id`) VALUES
(1, 34, '{\"total_pairs\": 20, \"pairs_found\": 20, \"failed_attempts\": 2, \"time_seconds\": 34}', '2025-06-01 02:43:04.916653', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_configuracionparental`
--

CREATE TABLE `users_configuracionparental` (
  `id` bigint(20) NOT NULL,
  `idioma` varchar(5) NOT NULL,
  `limite_tiempo` int(10) UNSIGNED NOT NULL CHECK (`limite_tiempo` >= 0),
  `accesibilidad` tinyint(1) NOT NULL,
  `usuario_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `users_configuracionparental`
--

INSERT INTO `users_configuracionparental` (`id`, `idioma`, `limite_tiempo`, `accesibilidad`, `usuario_id`) VALUES
(1, 'es', 30, 0, 3),
(2, 'es', 30, 0, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_perfilinfantil`
--

CREATE TABLE `users_perfilinfantil` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `edad` int(10) UNSIGNED NOT NULL CHECK (`edad` >= 0),
  `avatar` varchar(100) NOT NULL,
  `usuario_padre_id` bigint(20) NOT NULL,
  `user_infantil_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `users_perfilinfantil`
--

INSERT INTO `users_perfilinfantil` (`id`, `nombre`, `edad`, `avatar`, `usuario_padre_id`, `user_infantil_id`) VALUES
(1, 'hijo', 10, 'NULL', 3, NULL),
(2, 'hijo Prueba', 8, 'avatar_default_1', 3, NULL),
(3, 'Hijo De Prueba', 8, 'avatar_default_1', 6, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_user`
--

CREATE TABLE `users_user` (
  `id` bigint(20) NOT NULL,
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
  `parent_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `users_user`
--

INSERT INTO `users_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `es_padre`, `es_infantil`, `parent_id`) VALUES
(1, 'pbkdf2_sha256$600000$iiwguk60OFIR451X8hXq8M$vN//eRnbO52tYgEuT7RQTzMR58PtLfqr6U8A0prr20E=', '2025-05-22 22:01:39.996638', 1, 'admin_lkw', '', '', '', 1, 1, '2025-04-03 18:07:31.139214', 0, 0, NULL),
(2, 'pbkdf2_sha256$870000$VoCbGIyjNp7api8pDrJT8Z$dMcsP1mYwm5bKiT3AbM6H7RYQ+Jip4sTs72hUYtJozs=', '2025-04-05 11:56:22.152381', 1, 'antonio', '', '', '', 1, 1, '2025-04-05 11:56:02.603712', 0, 0, NULL),
(3, 'pbkdf2_sha256$600000$83cpNraw7AQK7GubrkwjmH$FFmDFCtjMqXrNy/T5aeSAdQPZ953l2aVqbVMm8Vjzek=', NULL, 0, 'padrePrueba', '', '', '', 0, 1, '2025-05-26 02:25:37.544543', 1, 0, NULL),
(5, 'pbkdf2_sha256$600000$Ff2vevunIm3wOPM5e4JNRQ$4SA239I45sbiOWpG1M8Zzp5IiUJqfXQMrpu8lRp+OlM=', NULL, 0, 'padrePrueba2', '', '', '', 0, 1, '2025-05-27 17:50:37.908274', 1, 0, NULL),
(6, 'pbkdf2_sha256$600000$PeAwSiKr5l3CqZdwshwHod$qIR14/ifZmNIkltZJVAjrppyouZwoC5rGuUIPC3/wSg=', NULL, 0, 'Padre', '', '', 'padrePrueba3@test.com', 0, 1, '2025-05-31 19:17:27.046399', 1, 0, NULL),
(7, 'pbkdf2_sha256$600000$E03v0NT1FFQjfw6eiHiJjh$UCFQ8F1q95YSRzMcW8psHndSyuXKBEHRwFZodpy1pu4=', NULL, 0, 'HijoPrueba', 'hijo', 'Prueba', '', 0, 1, '2025-05-31 19:19:47.922631', 0, 1, 3),
(9, 'pbkdf2_sha256$600000$rzwiFIgRDegFqTWspg8VPp$6gJ1gUxPTCMIOPaqxX7xnMHpkbQFKJ1JN3JiOQbpKmk=', NULL, 0, 'miHijo', 'Hijo', 'De Prueba', '', 0, 1, '2025-05-31 21:10:01.364652', 0, 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_user_groups`
--

CREATE TABLE `users_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_user_user_permissions`
--

CREATE TABLE `users_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indices de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indices de la tabla `avatar_avatar`
--
ALTER TABLE `avatar_avatar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `perfil_id` (`perfil_id`),
  ADD KEY `avatar_avatar_accesorio_id_ad5f09b3_fk_avatar_co` (`accesorio_id`),
  ADD KEY `avatar_avatar_ojos_id_4841c255_fk_avatar_componenteavatar_id` (`ojos_id`),
  ADD KEY `avatar_avatar_pelo_id_60fc1d2f_fk_avatar_componenteavatar_id` (`pelo_id`),
  ADD KEY `avatar_avatar_ropa_id_f9c699db_fk_avatar_componenteavatar_id` (`ropa_id`);

--
-- Indices de la tabla `avatar_componenteavatar`
--
ALTER TABLE `avatar_componenteavatar`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `avatar_recompensa`
--
ALTER TABLE `avatar_recompensa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `avatar_recompensa_componente_desbloque_82a456bd_fk_avatar_co` (`componente_desbloquea_id`);

--
-- Indices de la tabla `avatar_recompensaperfil`
--
ALTER TABLE `avatar_recompensaperfil`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `avatar_recompensaperfil_perfil_id_recompensa_id_b8192256_uniq` (`perfil_id`,`recompensa_id`),
  ADD KEY `avatar_recompensaper_recompensa_id_f98b56cb_fk_avatar_re` (`recompensa_id`);

--
-- Indices de la tabla `cuentos_cuento`
--
ALTER TABLE `cuentos_cuento`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_users_user_id` (`user_id`);

--
-- Indices de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indices de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indices de la tabla `juegos_estadisticajuego`
--
ALTER TABLE `juegos_estadisticajuego`
  ADD PRIMARY KEY (`id`),
  ADD KEY `juegos_estadisticajuego_juego_id_30c3b6ed_fk_juegos_juego_id` (`juego_id`);

--
-- Indices de la tabla `juegos_juego`
--
ALTER TABLE `juegos_juego`
  ADD PRIMARY KEY (`id`),
  ADD KEY `juegos_juego_tipo_id_340225cd_fk_juegos_tipojuego_id` (`tipo_id`);

--
-- Indices de la tabla `juegos_tipojuego`
--
ALTER TABLE `juegos_tipojuego`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `logros_logro`
--
ALTER TABLE `logros_logro`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `logros_perfillogro`
--
ALTER TABLE `logros_perfillogro`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `logros_perfillogro_perfil_infantil_id_logro_id_d8658a74_uniq` (`perfil_infantil_id`,`logro_id`),
  ADD KEY `logros_perfillogro_logro_id_89373d11_fk_logros_logro_id` (`logro_id`);

--
-- Indices de la tabla `progreso_progresocuento`
--
ALTER TABLE `progreso_progresocuento`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `progreso_progresocuento_perfil_infantil_id_cuent_c9be8f1b_uniq` (`perfil_infantil_id`,`cuento_id`),
  ADD KEY `progreso_progresocuento_cuento_id_805c60b0_fk_cuentos_cuento_id` (`cuento_id`);

--
-- Indices de la tabla `progreso_progresogeneral`
--
ALTER TABLE `progreso_progresogeneral`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `perfil_infantil_id` (`perfil_infantil_id`);

--
-- Indices de la tabla `progreso_progresojuego`
--
ALTER TABLE `progreso_progresojuego`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `progreso_progresojuego_perfil_infantil_id_juego_id_ab95a426_uniq` (`perfil_infantil_id`,`juego_id`),
  ADD KEY `progreso_progresojuego_juego_id_0c7becc6_fk_juegos_juego_id` (`juego_id`);

--
-- Indices de la tabla `users_configuracionparental`
--
ALTER TABLE `users_configuracionparental`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `users_perfilinfantil`
--
ALTER TABLE `users_perfilinfantil`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_infantil_id` (`user_infantil_id`),
  ADD KEY `users_perfilinfantil_usuario_padre_id_1e9ac97e_fk_users_user_id` (`usuario_padre_id`);

--
-- Indices de la tabla `users_user`
--
ALTER TABLE `users_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `users_user_parent_id_f6411e6b_fk_users_user_id` (`parent_id`);

--
-- Indices de la tabla `users_user_groups`
--
ALTER TABLE `users_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_groups_user_id_group_id_b88eab82_uniq` (`user_id`,`group_id`),
  ADD KEY `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` (`group_id`);

--
-- Indices de la tabla `users_user_user_permissions`
--
ALTER TABLE `users_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_user_permissions_user_id_permission_id_43338c45_uniq` (`user_id`,`permission_id`),
  ADD KEY `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` (`permission_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de la tabla `avatar_avatar`
--
ALTER TABLE `avatar_avatar`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `avatar_componenteavatar`
--
ALTER TABLE `avatar_componenteavatar`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `avatar_recompensa`
--
ALTER TABLE `avatar_recompensa`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `avatar_recompensaperfil`
--
ALTER TABLE `avatar_recompensaperfil`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuentos_cuento`
--
ALTER TABLE `cuentos_cuento`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `juegos_estadisticajuego`
--
ALTER TABLE `juegos_estadisticajuego`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `juegos_juego`
--
ALTER TABLE `juegos_juego`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `juegos_tipojuego`
--
ALTER TABLE `juegos_tipojuego`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `logros_logro`
--
ALTER TABLE `logros_logro`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `logros_perfillogro`
--
ALTER TABLE `logros_perfillogro`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `progreso_progresocuento`
--
ALTER TABLE `progreso_progresocuento`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `progreso_progresogeneral`
--
ALTER TABLE `progreso_progresogeneral`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `progreso_progresojuego`
--
ALTER TABLE `progreso_progresojuego`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users_configuracionparental`
--
ALTER TABLE `users_configuracionparental`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users_perfilinfantil`
--
ALTER TABLE `users_perfilinfantil`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users_user`
--
ALTER TABLE `users_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `users_user_groups`
--
ALTER TABLE `users_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users_user_user_permissions`
--
ALTER TABLE `users_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Filtros para la tabla `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Filtros para la tabla `avatar_avatar`
--
ALTER TABLE `avatar_avatar`
  ADD CONSTRAINT `avatar_avatar_accesorio_id_ad5f09b3_fk_avatar_co` FOREIGN KEY (`accesorio_id`) REFERENCES `avatar_componenteavatar` (`id`),
  ADD CONSTRAINT `avatar_avatar_ojos_id_4841c255_fk_avatar_componenteavatar_id` FOREIGN KEY (`ojos_id`) REFERENCES `avatar_componenteavatar` (`id`),
  ADD CONSTRAINT `avatar_avatar_pelo_id_60fc1d2f_fk_avatar_componenteavatar_id` FOREIGN KEY (`pelo_id`) REFERENCES `avatar_componenteavatar` (`id`),
  ADD CONSTRAINT `avatar_avatar_perfil_id_3cc4a3ae_fk_users_perfilinfantil_id` FOREIGN KEY (`perfil_id`) REFERENCES `users_perfilinfantil` (`id`),
  ADD CONSTRAINT `avatar_avatar_ropa_id_f9c699db_fk_avatar_componenteavatar_id` FOREIGN KEY (`ropa_id`) REFERENCES `avatar_componenteavatar` (`id`);

--
-- Filtros para la tabla `avatar_recompensa`
--
ALTER TABLE `avatar_recompensa`
  ADD CONSTRAINT `avatar_recompensa_componente_desbloque_82a456bd_fk_avatar_co` FOREIGN KEY (`componente_desbloquea_id`) REFERENCES `avatar_componenteavatar` (`id`);

--
-- Filtros para la tabla `avatar_recompensaperfil`
--
ALTER TABLE `avatar_recompensaperfil`
  ADD CONSTRAINT `avatar_recompensaper_perfil_id_ebc31fe8_fk_users_per` FOREIGN KEY (`perfil_id`) REFERENCES `users_perfilinfantil` (`id`),
  ADD CONSTRAINT `avatar_recompensaper_recompensa_id_f98b56cb_fk_avatar_re` FOREIGN KEY (`recompensa_id`) REFERENCES `avatar_recompensa` (`id`);

--
-- Filtros para la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`);

--
-- Filtros para la tabla `juegos_estadisticajuego`
--
ALTER TABLE `juegos_estadisticajuego`
  ADD CONSTRAINT `juegos_estadisticajuego_juego_id_30c3b6ed_fk_juegos_juego_id` FOREIGN KEY (`juego_id`) REFERENCES `juegos_juego` (`id`);

--
-- Filtros para la tabla `juegos_juego`
--
ALTER TABLE `juegos_juego`
  ADD CONSTRAINT `juegos_juego_tipo_id_340225cd_fk_juegos_tipojuego_id` FOREIGN KEY (`tipo_id`) REFERENCES `juegos_tipojuego` (`id`);

--
-- Filtros para la tabla `logros_perfillogro`
--
ALTER TABLE `logros_perfillogro`
  ADD CONSTRAINT `logros_perfillogro_logro_id_89373d11_fk_logros_logro_id` FOREIGN KEY (`logro_id`) REFERENCES `logros_logro` (`id`),
  ADD CONSTRAINT `logros_perfillogro_perfil_infantil_id_0913789b_fk_users_per` FOREIGN KEY (`perfil_infantil_id`) REFERENCES `users_perfilinfantil` (`id`);

--
-- Filtros para la tabla `progreso_progresocuento`
--
ALTER TABLE `progreso_progresocuento`
  ADD CONSTRAINT `progreso_progresocue_perfil_infantil_id_efedb879_fk_users_per` FOREIGN KEY (`perfil_infantil_id`) REFERENCES `users_perfilinfantil` (`id`),
  ADD CONSTRAINT `progreso_progresocuento_cuento_id_805c60b0_fk_cuentos_cuento_id` FOREIGN KEY (`cuento_id`) REFERENCES `cuentos_cuento` (`id`);

--
-- Filtros para la tabla `progreso_progresogeneral`
--
ALTER TABLE `progreso_progresogeneral`
  ADD CONSTRAINT `progreso_progresogen_perfil_infantil_id_ca9f860e_fk_users_per` FOREIGN KEY (`perfil_infantil_id`) REFERENCES `users_perfilinfantil` (`id`);

--
-- Filtros para la tabla `progreso_progresojuego`
--
ALTER TABLE `progreso_progresojuego`
  ADD CONSTRAINT `progreso_progresojue_perfil_infantil_id_04a28140_fk_users_per` FOREIGN KEY (`perfil_infantil_id`) REFERENCES `users_perfilinfantil` (`id`),
  ADD CONSTRAINT `progreso_progresojuego_juego_id_0c7becc6_fk_juegos_juego_id` FOREIGN KEY (`juego_id`) REFERENCES `juegos_juego` (`id`);

--
-- Filtros para la tabla `users_configuracionparental`
--
ALTER TABLE `users_configuracionparental`
  ADD CONSTRAINT `users_configuracionparental_usuario_id_151d9809_fk_users_user_id` FOREIGN KEY (`usuario_id`) REFERENCES `users_user` (`id`);

--
-- Filtros para la tabla `users_perfilinfantil`
--
ALTER TABLE `users_perfilinfantil`
  ADD CONSTRAINT `users_perfilinfantil_user_infantil_id_fc77a5ac_fk_users_user_id` FOREIGN KEY (`user_infantil_id`) REFERENCES `users_user` (`id`),
  ADD CONSTRAINT `users_perfilinfantil_usuario_padre_id_1e9ac97e_fk_users_user_id` FOREIGN KEY (`usuario_padre_id`) REFERENCES `users_user` (`id`);

--
-- Filtros para la tabla `users_user`
--
ALTER TABLE `users_user`
  ADD CONSTRAINT `users_user_parent_id_f6411e6b_fk_users_user_id` FOREIGN KEY (`parent_id`) REFERENCES `users_user` (`id`);

--
-- Filtros para la tabla `users_user_groups`
--
ALTER TABLE `users_user_groups`
  ADD CONSTRAINT `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `users_user_groups_user_id_5f6f5a90_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`);

--
-- Filtros para la tabla `users_user_user_permissions`
--
ALTER TABLE `users_user_user_permissions`
  ADD CONSTRAINT `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `users_user_user_permissions_user_id_20aca447_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
