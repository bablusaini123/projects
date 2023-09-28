-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2023 at 01:37 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adminx`
--

-- --------------------------------------------------------

--
-- Table structure for table `projectname`
--

CREATE TABLE `projectname` (
  `id` int(11) NOT NULL,
  `projectName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projectname`
--

INSERT INTO `projectname` (`id`, `projectName`) VALUES
(1, 'web development'),
(2, 'pcb project'),
(3, 'adminX'),
(7, 'lodu');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `projectName` varchar(100) NOT NULL,
  `customer` int(11) NOT NULL,
  `developer` int(11) NOT NULL,
  `domain` varchar(100) NOT NULL,
  `projectBasicCost` int(11) NOT NULL,
  `gst` varchar(100) NOT NULL,
  `paybleAmount` int(11) NOT NULL,
  `advancePayment` int(11) NOT NULL,
  `balancePayment` int(11) NOT NULL,
  `projectStatus` varchar(25) NOT NULL,
  `Remark` text NOT NULL,
  `projectStart` varchar(50) NOT NULL,
  `projectEnd` varchar(50) NOT NULL,
  `d_projectName` varchar(200) NOT NULL,
  `d_projectBasicCost` varchar(100) NOT NULL,
  `d_gst` varchar(100) NOT NULL,
  `d_paybleAmount` varchar(100) NOT NULL,
  `d_advancePayment` varchar(100) NOT NULL,
  `d_balancePayment` varchar(100) NOT NULL,
  `d_Remark` text NOT NULL,
  `invoiceno` varchar(200) NOT NULL,
  `invoice` varchar(200) NOT NULL,
  `project_manager` int(11) NOT NULL,
  `developersrno` varchar(555) NOT NULL,
  `developeradvanceprice` varchar(555) NOT NULL,
  `customerseno` varchar(555) NOT NULL,
  `customeradvanceprice` varchar(555) NOT NULL,
  `customeradpay1` int(50) NOT NULL,
  `customeradpay2` int(50) NOT NULL,
  `customeradpay3` int(50) NOT NULL,
  `customeradpay4` int(50) NOT NULL,
  `developeradpay1` int(50) NOT NULL,
  `developeradpay2` int(50) NOT NULL,
  `developeradpay3` int(50) NOT NULL,
  `developeradpay4` int(50) NOT NULL,
  `pmadpay1` int(50) NOT NULL,
  `pmadpay2` int(50) NOT NULL,
  `pmadpay3` int(50) NOT NULL,
  `pmadpay4` int(50) NOT NULL,
  `pm_totalProjectCost` int(11) NOT NULL,
  `pm_gst` int(11) NOT NULL,
  `pm_paybleAmount` int(11) NOT NULL,
  `pm_advancePayment` int(11) NOT NULL,
  `pm_balancePayment` int(11) NOT NULL,
  `customeradpaydate1` varchar(50) NOT NULL,
  `customeradpaydate2` varchar(50) NOT NULL,
  `customeradpaydate3` varchar(50) NOT NULL,
  `customeradpaydate4` varchar(50) NOT NULL,
  `developeradpaydate1` varchar(50) NOT NULL,
  `developeradpaydate2` varchar(50) NOT NULL,
  `developeradpaydate3` varchar(50) NOT NULL,
  `developeradpaydate4` varchar(50) NOT NULL,
  `pmadpaydate1` varchar(50) NOT NULL,
  `pmadpaydate2` varchar(50) NOT NULL,
  `pmadpaydate3` varchar(50) NOT NULL,
  `pmadpaydate4` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `projectName`, `customer`, `developer`, `domain`, `projectBasicCost`, `gst`, `paybleAmount`, `advancePayment`, `balancePayment`, `projectStatus`, `Remark`, `projectStart`, `projectEnd`, `d_projectName`, `d_projectBasicCost`, `d_gst`, `d_paybleAmount`, `d_advancePayment`, `d_balancePayment`, `d_Remark`, `invoiceno`, `invoice`, `project_manager`, `developersrno`, `developeradvanceprice`, `customerseno`, `customeradvanceprice`, `customeradpay1`, `customeradpay2`, `customeradpay3`, `customeradpay4`, `developeradpay1`, `developeradpay2`, `developeradpay3`, `developeradpay4`, `pmadpay1`, `pmadpay2`, `pmadpay3`, `pmadpay4`, `pm_totalProjectCost`, `pm_gst`, `pm_paybleAmount`, `pm_advancePayment`, `pm_balancePayment`, `customeradpaydate1`, `customeradpaydate2`, `customeradpaydate3`, `customeradpaydate4`, `developeradpaydate1`, `developeradpaydate2`, `developeradpaydate3`, `developeradpaydate4`, `pmadpaydate1`, `pmadpaydate2`, `pmadpaydate3`, `pmadpaydate4`) VALUES
(19, ' 7', 8, 9, 'xxxxxxxxx', 20000, '100', 20100, 10000, 10100, ' 20', '   jjjj', '2023-08-16', '2023-08-27', ' 7', '10000', '100', '10100', '5000', '5100', '                                                                                                      gdrgftrefre                        \r\n                              \r\n                              \r\n                              ', 'fdger543wdr@3#gfh', 'invoice1692712804784LMS Dashboard System (1).pdf', 22, '', '', '', '', 10000, 1000, 1000, 0, 5000, 500, 500, 0, 2500, 250, 250, 0, 5000, 100, 5100, 2500, 2600, '', '', '', '', '', '', '', '', '', '', '', ''),
(22, ' 1', 8, 9, 'bablusoftech', 1111111111, '1111', 1111112222, 11111, 1111101111, ' 20', '    111111', '2023-08-02', '2023-08-02', ' 1', '222222', '222', '222444', '222', '222222', '                                                                                                                                                                        22222                                          \r\n                                          \r\n                                          \r\n                                          \r\n                                          ', '1666666666666', 'invoice1692730825578LMS Dashboard System (1).pdf', 22, '', '', '', '', 2222, 222, 22222, 0, 33333, 333, 333333, 0, 4444, 44444, 444, 0, 33333, 333, 33666, 3333, 30333, '2023-08-02', '2023-08-18', '2023-08-17', '', '2023-08-02', '2023-08-18', '2023-08-17', '', '2023-08-02', '2023-08-18', '2023-08-17', '');

-- --------------------------------------------------------

--
-- Table structure for table `project_status`
--

CREATE TABLE `project_status` (
  `id` int(11) NOT NULL,
  `value` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_status`
--

INSERT INTO `project_status` (`id`, `value`) VALUES
(1, '0'),
(2, '25'),
(3, '50'),
(4, '75'),
(5, '100');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `status`) VALUES
(1, 20),
(4, 30),
(5, 50),
(6, 70),
(7, 80),
(8, 100);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `phone_no` varchar(50) NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `gst_no` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `domain` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(250) NOT NULL,
  `status` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `phone_no`, `company_name`, `address`, `gst_no`, `name`, `domain`, `email`, `password`, `status`, `type`) VALUES
(8, '000000000000000', 'pcb power point', 'Sanganer railway station 66a dav nagar', 'hjgjgj', 'pcb', 'pcb', 'pcb123@gmail.com', '123', 1, 'customer'),
(9, '+918949352677', 'Bablu  Softech', 'Sanganer railway station 66a dav nagar', 'hghjgjy789687hjg', 'Bablu Saini', 'bablusoftech', 'bablusaini90310@gmail.com', 'bablu@123', 1, 'developer'),
(10, '1111111111', 'octel', 'Sanganer railway station 66a dav nagar', 'hghjgjy789687hjg', 'admin', 'octel', 'admin123@gmail.com', 'admin@1234', 1, 'admin'),
(11, '+918949352677', 'tor', 'Sanganer railway station 66a dav nagar', 'hghjgjy789687hjg', 'sidharth', 'teconel', 'teconel123@gmail.com', 'teconel@123', 1, 'developer'),
(12, '1111111111', 'khusi kirana store', 'Sanganer railway station 66a dav nagar', 'hghjgjy789687hjg', 'vikas', 'khushi', 'vikas123@gmail.com', 'vikas@123', 1, 'customer'),
(13, '1111111111', 'tir', 'Sanganer railway station 66a dav nagar', 'hghjgjy789687hjg', 'sonu', 'sonuin', 'sonu123@gmail.com', 'sonu@123', 1, 'developer'),
(18, '+918949352677', 'Bablu  Softech', 'Sanganer railway station 66a dav nagar', 'hghjgjy789687hjg', 'PPP', 'teconel', 'PPP@gmail.com', 'PPP', 1, 'customer'),
(19, '+918949352677', 'vvv', 'Sanganer railway station 66a dav nagar', 'hghjgjy789687hjg', 'vvv', 'vvv', 'vvv@gmail.com', 'vvv', 1, 'developer'),
(22, '+918949352677', 'octel', 'Sanganer railway station 66a dav nagar', 'hghjgjy789687hjg', 'rahul', 'octel', 'rahul123@gmail.com', 'rahul@123', 1, 'projectManager'),
(23, '78678678', 'Bablu  Softech', 'Sanganer railway station 66a dav nagar', 'hghjgjy789687hjg', 'xxxxxxxxxxx', 'xxxxx', 'xxxx123@gmail.com', 'xxx', 1, 'projectManager');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projectname`
--
ALTER TABLE `projectname`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_status`
--
ALTER TABLE `project_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
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
-- AUTO_INCREMENT for table `projectname`
--
ALTER TABLE `projectname`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `project_status`
--
ALTER TABLE `project_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
