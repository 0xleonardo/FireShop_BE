-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Feb 05, 2023 at 04:57 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `imageName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `imageName`) VALUES
(1, 'Monitors', 'monitor.png'),
(2, 'Keyboards', 'keyboards.png'),
(3, 'Mouses', 'mouse.png');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `series` varchar(255) NOT NULL,
  `description` varchar(70) NOT NULL,
  `detailedDescription` longtext NOT NULL,
  `amount` bigint(20) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  `images` longtext NOT NULL,
  `idCategory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `brand`, `series`, `description`, `detailedDescription`, `amount`, `price`, `discount`, `images`, `idCategory`) VALUES
(1, 'ACER', 'B247Ybmiprzx', '23.8\", LED, IPS, 1920x1080px, 4ms, AMD AdaptiveSync, HDMI, VGA, DP', 'Perfect ergonomics for your office Feel free to turn this screen mounted on a solid robust stand to any position needed at the moment. Clearer, Sharper Full Color Images Ace rmonitor brings users into a perfect colorful world in FHD 1920x 1080 and provides the finest natural and sharp original quality 100,000,000:1 contrast ratio. Engineered for precision Acer ColorPlus™ is a suite of technologies that strive to create realistic, uniform colors and a sharper image. Casual adaptation to you No need to push buttons. Easily adjust your monitor settings with our handy Acer Display Widget utility. Inputs and connectors 1x HDMI®-in 1x DisplayPort Speakers 2 x 2 W', 4, '224.99', '15.00', '[{\"url\":\"https://iili.io/H1rsJcX.jpg\"}]', 1),
(2, 'ACER', 'KG272SBMIIPX', '27\", IPS, FHD 1920x1080px, 165Hz, 2ms, HDMI', 'Poboljšaj svoju igru besprijekornim i sveobuhvatnim vizualnim efektima i živopisnim bojama uz frekvenciju osvježavanja do 165 Hz. Istraži nove svjetove na zapanjujućem Full HD zaslonu s tehnologijom AMD FreeSync™ Premium.', 2, '250.00', '0.00', '[{\"url\":\"https://iili.io/H1rsvUX.jpg\"},{\"url\":\"https://iili.io/H1rLjku.jpg\"}]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`) VALUES
(1, 'admin', 'admin', 'admin', '$2b$11$pp01R0jOSJGWwBWuVTtbhenyaMtSHf5sfsLDFLsfSPQtT1Xd6lB.2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
