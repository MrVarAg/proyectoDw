-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-11-2024 a las 17:24:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ig_asistencia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `idasistencia` int(11) NOT NULL,
  `dniempleado` varchar(13) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora_entrada` time DEFAULT NULL,
  `hora_salida` time DEFAULT NULL,
  `estado` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`idasistencia`, `dniempleado`, `fecha`, `hora_entrada`, `hora_salida`, `estado`) VALUES
(1, '12345678', '2024-11-05', '08:30:00', NULL, NULL),
(2, NULL, '2024-11-06', NULL, NULL, NULL),
(3, '0318200500266', '2024-11-06', '10:07:51', NULL, NULL),
(4, '', '0000-00-00', '00:00:00', NULL, NULL),
(5, '0318200500266', '2024-11-06', '10:11:32', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE `cargo` (
  `idcargo` int(11) NOT NULL,
  `cargo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`idcargo`, `cargo`) VALUES
(1, 'Gerente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `iddepartamento` int(11) NOT NULL,
  `departamento` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`iddepartamento`, `departamento`) VALUES
(1, 'IT');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `dniempleado` varchar(13) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(75) DEFAULT NULL,
  `genero` smallint(6) DEFAULT NULL,
  `direccion` varchar(80) DEFAULT NULL,
  `fecha_nac` date DEFAULT NULL,
  `estado_civil` char(1) DEFAULT NULL,
  `sueldo` float DEFAULT NULL,
  `idcargo` int(11) DEFAULT NULL,
  `iddepartamento` int(11) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`dniempleado`, `nombre`, `apellido`, `telefono`, `correo`, `genero`, `direccion`, `fecha_nac`, `estado_civil`, `sueldo`, `idcargo`, `iddepartamento`, `estado`) VALUES
('0318200500266', 'Donal', 'Varela', '99455215', 'adsadad', 1, 'BA', '2024-11-05', '1', 16000, 1, 1, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `idhorario` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `horaentrada` time DEFAULT NULL,
  `horasalida` time DEFAULT NULL,
  `diainicio` varchar(15) DEFAULT NULL,
  `diafin` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`idhorario`, `nombre`, `horaentrada`, `horasalida`, `diainicio`, `diafin`) VALUES
(1, 'Matutino', '06:00:00', '18:00:00', 'Lunes', 'Viernes'),
(2, 'Matutino', '06:00:00', '17:00:00', 'Lunes', 'Martes'),
(3, '', '00:00:00', '00:00:00', '', ''),
(4, 'Sabatino', '10:00:00', '15:00:00', 'Sabado', 'Sabado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_asistencia_emp`
--

CREATE TABLE `rel_asistencia_emp` (
  `idasistencia` int(11) NOT NULL,
  `dniempleado` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_emp_cargo`
--

CREATE TABLE `rel_emp_cargo` (
  `dniempleado` varchar(13) NOT NULL,
  `idcargo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rel_horario_emp`
--

CREATE TABLE `rel_horario_emp` (
  `idhorario` int(11) NOT NULL,
  `dniempleado` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`idasistencia`);

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
  ADD PRIMARY KEY (`idcargo`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`iddepartamento`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`dniempleado`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`idhorario`);

--
-- Indices de la tabla `rel_asistencia_emp`
--
ALTER TABLE `rel_asistencia_emp`
  ADD PRIMARY KEY (`idasistencia`,`dniempleado`);

--
-- Indices de la tabla `rel_emp_cargo`
--
ALTER TABLE `rel_emp_cargo`
  ADD PRIMARY KEY (`dniempleado`,`idcargo`);

--
-- Indices de la tabla `rel_horario_emp`
--
ALTER TABLE `rel_horario_emp`
  ADD PRIMARY KEY (`idhorario`,`dniempleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  MODIFY `idasistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
  MODIFY `idcargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `departamento`
--
ALTER TABLE `departamento`
  MODIFY `iddepartamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `idhorario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
