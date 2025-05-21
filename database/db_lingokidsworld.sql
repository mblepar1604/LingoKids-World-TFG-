-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 20-05-2025 a las 21:27:55
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
(40, 'Can view configuracion parental', 10, 'view_configuracionparental');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuentos_cuento`
--

CREATE TABLE `cuentos_cuento` (
  `id` bigint(20) NOT NULL,
  `idioma` varchar(50) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `contenido` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`contenido`)),
  `personalizable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `cuentos_cuento`
--

INSERT INTO `cuentos_cuento` (`id`, `idioma`, `titulo`, `contenido`, `personalizable`) VALUES
(1, 'es', 'El dragón curioso', '{\"escenas\": [{\"id\": 1, \"texto\": \"\\u00c9rase una vez un drag\\u00f3n curioso que quer\\u00eda aprender a volar.\", \"opciones\": [{\"texto\": \"Intentar saltar desde un \\u00e1rbol\", \"siguiente\": 2}, {\"texto\": \"Leer un libro sobre vuelo\", \"siguiente\": 3}]}, {\"id\": 2, \"texto\": \"Se cay\\u00f3... pero no se rindi\\u00f3.\", \"opciones\": []}, {\"id\": 3, \"texto\": \"Aprendi\\u00f3 la teor\\u00eda... \\u00a1y luego vol\\u00f3!\", \"opciones\": []}]}', 0);

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
(1, '2025-04-03 18:22:53.549952', '1', 'El dragón curioso (es)', 1, '[{\"added\": {}}]', 8, 1);

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
(4, 'contenttypes', 'contenttype'),
(8, 'cuentos', 'cuento'),
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
(22, 'users', '0002_configuracionparental', '2025-05-20 18:46:13.402733');

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
('2bdrakso52132qy03iwg3atti25q2utm', '.eJxVjEEOwiAQRe_C2pBhwGJduu8ZyMAMUjU0Ke3KeHfbpAvd_vfef6tA61LC2mQOI6urMur0u0VKT6k74AfV-6TTVJd5jHpX9EGbHiaW1-1w_w4KtbLVhJ0xmAE9d9bEs_WZABzbKNTbaLMwIQoCgQBIJsfoXW_dJsaLSerzBdiIN9M:1u0P8J:IuPdbNrhsY_QxGYbmgbMPUL66flykgPsvZplghf-rhw', '2025-04-17 18:17:43.020205');

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_perfilinfantil`
--

CREATE TABLE `users_perfilinfantil` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `edad` int(10) UNSIGNED NOT NULL CHECK (`edad` >= 0),
  `avatar` varchar(100) NOT NULL,
  `usuario_padre_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

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
  `es_infantil` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `users_user`
--

INSERT INTO `users_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `es_padre`, `es_infantil`) VALUES
(1, 'pbkdf2_sha256$870000$coeolE6sApDaKADxJSosOM$tpJfhbFo6c56a1T2XsPdk4URxj87OXiTMyb0NThLgUk=', '2025-04-03 18:17:43.014404', 1, 'admin_lkw', '', '', '', 1, 1, '2025-04-03 18:07:31.139214', 0, 0);

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
  ADD KEY `users_perfilinfantil_usuario_padre_id_1e9ac97e_fk_users_user_id` (`usuario_padre_id`);

--
-- Indices de la tabla `users_user`
--
ALTER TABLE `users_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `cuentos_cuento`
--
ALTER TABLE `cuentos_cuento`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `users_configuracionparental`
--
ALTER TABLE `users_configuracionparental`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users_perfilinfantil`
--
ALTER TABLE `users_perfilinfantil`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users_user`
--
ALTER TABLE `users_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- Filtros para la tabla `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`);

--
-- Filtros para la tabla `users_configuracionparental`
--
ALTER TABLE `users_configuracionparental`
  ADD CONSTRAINT `users_configuracionparental_usuario_id_151d9809_fk_users_user_id` FOREIGN KEY (`usuario_id`) REFERENCES `users_user` (`id`);

--
-- Filtros para la tabla `users_perfilinfantil`
--
ALTER TABLE `users_perfilinfantil`
  ADD CONSTRAINT `users_perfilinfantil_usuario_padre_id_1e9ac97e_fk_users_user_id` FOREIGN KEY (`usuario_padre_id`) REFERENCES `users_user` (`id`);

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
