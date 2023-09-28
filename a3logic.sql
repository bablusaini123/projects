-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2023 at 12:31 PM
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
-- Database: `a3logic`
--

-- --------------------------------------------------------

--
-- Table structure for table `awards`
--

CREATE TABLE `awards` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `awards`
--

INSERT INTO `awards` (`id`, `generateId`, `image`, `status`) VALUES
(6, '7izjra23sq', 'image1685964335295digitization-5140071_1920.jpg', 1),
(7, 'y5p8h6p2r1', 'image1685972167974fantasy-4057707.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `awards_master`
--

CREATE TABLE `awards_master` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `awards` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `awards_master`
--

INSERT INTO `awards_master` (`id`, `generateId`, `title`, `awards`, `status`, `type`) VALUES
(3, '2xq1jdfap6', 'home awards', '7izjra23sq', 1, 'master'),
(4, 'xfnwytb24a', 'development awards', '7izjra23sq,y5p8h6p2r1', 1, 'master');

-- --------------------------------------------------------

--
-- Table structure for table `awards_title`
--

CREATE TABLE `awards_title` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `pounchLine` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `awards_title`
--

INSERT INTO `awards_title` (`id`, `title`, `pounchLine`) VALUES
(1, 'AWARDSs', 'We Are Recognized To Have Shown Excellence In TheField And Dedication For Service');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `btn_text` varchar(50) NOT NULL,
  `btn_url` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `generateId`, `title`, `btn_text`, `btn_url`, `status`, `slug`) VALUES
(5, 'se3cgldh1z', 'How to Build A Taxi Booking App like Uberr', 'read more', 'http://localhost:5000', 1, 'how-to-build-a-taxi-booking-app-like-uberr'),
(6, 'tscbsatjde', 'How to Build A writing Book  like Uberr	', 'get started', 'http://localhost:5000', 1, 'how-to-build-a-writing-book--like-uberr	');

-- --------------------------------------------------------

--
-- Table structure for table `blogs_master`
--

CREATE TABLE `blogs_master` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `blogs` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs_master`
--

INSERT INTO `blogs_master` (`id`, `generateId`, `title`, `blogs`, `status`, `type`) VALUES
(4, 'egvj6g63cz', 'home blog', 'se3cgldh1z', 1, 'master'),
(5, '614b7fxtuv', 'development blog', 'se3cgldh1z', 1, 'master');

-- --------------------------------------------------------

--
-- Table structure for table `blog_title`
--

CREATE TABLE `blog_title` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `pounchLine` varchar(200) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_title`
--

INSERT INTO `blog_title` (`id`, `title`, `pounchLine`, `image`) VALUES
(1, 'BLOGS', 'Explore The World Of Technology & Its Advanced Applications', 'image1683900668516Screenshot 2023-03-15 012027.png');

-- --------------------------------------------------------

--
-- Table structure for table `careers_page_title`
--

CREATE TABLE `careers_page_title` (
  `id` int(11) NOT NULL,
  `main_title` varchar(100) NOT NULL,
  `main_desc` text NOT NULL,
  `middle_title` varchar(100) NOT NULL,
  `bottom_title` varchar(200) NOT NULL,
  `bottom_desc` text NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `careers_page_title`
--

INSERT INTO `careers_page_title` (`id`, `main_title`, `main_desc`, `middle_title`, `bottom_title`, `bottom_desc`, `image`) VALUES
(1, 'hello', 'hello i am balu', 'current opning', 'hello at work', 'jeelo i am bablu saini', 'backgroundImage1683540646278Screenshot_20230210_185357.png');

-- --------------------------------------------------------

--
-- Table structure for table `carrers`
--

CREATE TABLE `carrers` (
  `id` int(11) NOT NULL,
  `section` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `btnText` varchar(50) NOT NULL,
  `btnUrl` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carrers`
--

INSERT INTO `carrers` (`id`, `section`, `title`, `description`, `btnText`, `btnUrl`, `image`, `status`) VALUES
(1, 'Careers', 'hello', 'hello i am bablu', 'apply', 'http://localhost:5000/', 'backLogo1683875139977Screenshot 2023-05-09 014152.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `clients_master`
--

CREATE TABLE `clients_master` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `clients` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients_master`
--

INSERT INTO `clients_master` (`id`, `generateId`, `title`, `clients`, `status`, `type`) VALUES
(4, 'yjr52js88r', 'home client ', 'wam5gdu782,3sa80dlv73', 1, 'master'),
(5, 'q7jzbcy7p4', 'development client', 'wam5gdu782,3sa80dlv73', 1, 'master');

-- --------------------------------------------------------

--
-- Table structure for table `contect`
--

CREATE TABLE `contect` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `company` varchar(200) NOT NULL,
  `phoneNo` varchar(50) NOT NULL,
  `interested` varchar(100) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contect`
--

INSERT INTO `contect` (`id`, `name`, `email`, `company`, `phoneNo`, `interested`, `message`) VALUES
(1, 'bablu saini', 'bablusaini90310@gmail.com', 'thoughts of reality', '1111111111', 'EDI Service', 'hello sir , i am intersted in EDI Service can you provide this service'),
(2, 'pankaj tak', 'pankajtak123gmail.com', 'thoughts of reality', '5435454354', 'EDI Service', 'hello i am pankaj , i am intersted in EDI Service can you provide this service');

-- --------------------------------------------------------

--
-- Table structure for table `createpage_master`
--

CREATE TABLE `createpage_master` (
  `id` int(11) NOT NULL,
  `header` varchar(50) NOT NULL,
  `slider` varchar(50) NOT NULL,
  `client` varchar(50) NOT NULL,
  `successStory` varchar(50) NOT NULL,
  `technologies` varchar(50) NOT NULL,
  `offering` varchar(50) NOT NULL,
  `industries` varchar(50) NOT NULL,
  `award` varchar(50) NOT NULL,
  `blog` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `headerSr` int(11) NOT NULL,
  `sliderSr` int(11) NOT NULL,
  `clientSr` int(11) NOT NULL,
  `successStorySr` int(11) NOT NULL,
  `technologiesSr` int(11) NOT NULL,
  `offeringSr` int(11) NOT NULL,
  `industriesSr` int(11) NOT NULL,
  `awardsSr` int(11) NOT NULL,
  `blogSr` int(11) NOT NULL,
  `menuLink` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `createpage_master`
--

INSERT INTO `createpage_master` (`id`, `header`, `slider`, `client`, `successStory`, `technologies`, `offering`, `industries`, `award`, `blog`, `title`, `type`, `status`, `headerSr`, `sliderSr`, `clientSr`, `successStorySr`, `technologiesSr`, `offeringSr`, `industriesSr`, `awardsSr`, `blogSr`, `menuLink`) VALUES
(6, 'nfravdfwx6', 'exwic26sfz', 'yjr52js88r', 'fv4se6uwy7', 'pik718fgth', '9un83jfsia', 'x6z7g8xi8h', '2xq1jdfap6', 'egvj6g63cz', 'professional service', 'master', 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'profesional-service'),
(7, 'nfravdfwx6', 'g3sxbmead9', 'yjr52js88r', '45s90m9958', 'pik718fgth', 'wxkf1a6dyn', 'x6z7g8xi8h', 'xfnwytb24a', 'egvj6g63cz', 'company', 'master', 1, 1, 2, 3, 4, 4, 6, 7, 1, 9, 'company');

-- --------------------------------------------------------

--
-- Table structure for table `current_opning`
--

CREATE TABLE `current_opning` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `image` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `exp` varchar(200) NOT NULL,
  `location` varchar(500) NOT NULL,
  `brief_desc` text NOT NULL,
  `responsbility` text NOT NULL,
  `skills` text NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `current_opning`
--

INSERT INTO `current_opning` (`id`, `generateId`, `image`, `title`, `exp`, `location`, `brief_desc`, `responsbility`, `skills`, `status`, `slug`) VALUES
(5, 'z2wkxizy5l', 'image1685965799013fantasy-4057707.jpg', 'EDO', '0 - 1 Year Experience', 'Sanganer railway station 66a dav nagar', '<p><strong><em>otp-generator</em>&#39; is simple one time password generg</strong></p>\r\n', '<p><strong><em>otp-generator</em>&#39; is simple one time password generator and can be used as password generator. Build Status&nbsp;<em>npm</em>&nbsp;version&nbsp;<em>npm</em>&nbsp;Test Coverage js</strong></p>\r\n', '<ol>\r\n	<li><strong>html</strong></li>\r\n	<li><strong>css</strong></li>\r\n	<li><strong>js</strong></li>\r\n</ol>\r\n', 1, 'edo');

-- --------------------------------------------------------

--
-- Table structure for table `footer_links`
--

CREATE TABLE `footer_links` (
  `id` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `url` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `footer_links`
--

INSERT INTO `footer_links` (`id`, `category`, `name`, `url`, `status`, `slug`) VALUES
(4, 1, 'Bablu Saini', 'https://front.getprowriter.com/', 1, 'bablu-saini'),
(5, 2, 'hhh', 'https://81.0.246.73/', 1, 'hhh'),
(6, 2, 'hhh', 'https://81.0.246.73/', 1, 'hhh-6215');

-- --------------------------------------------------------

--
-- Table structure for table `footer_title`
--

CREATE TABLE `footer_title` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `footer_title`
--

INSERT INTO `footer_title` (`id`, `title`) VALUES
(1, 'Solutions'),
(2, 'Company');

-- --------------------------------------------------------

--
-- Table structure for table `header_master`
--

CREATE TABLE `header_master` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `logoSection` varchar(50) NOT NULL,
  `menuSection` varchar(50) NOT NULL,
  `type` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `header_master`
--

INSERT INTO `header_master` (`id`, `generateId`, `logoSection`, `menuSection`, `type`, `title`, `status`) VALUES
(1, 'nfravdfwx6', 'qzje5y83dw', '2r8ah03fsl', 'master', 'home headers', 1),
(2, 'nfravdtgvd', 'xzjepvdtvg', '2r8ah03fsl', 'master', 'development header', 1);

-- --------------------------------------------------------

--
-- Table structure for table `industries`
--

CREATE TABLE `industries` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `frountLogo` varchar(100) NOT NULL,
  `heading` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `url` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `industries`
--

INSERT INTO `industries` (`id`, `generateId`, `frountLogo`, `heading`, `description`, `url`, `status`, `slug`) VALUES
(7, '5o40gpum5i', 'frountLogo1685964849833giraffe-1959110_1280.jpg', 'clover it services', 'hello i am bablu sainiiii', 'https://81.0.246.73', 1, 'clover-it-services'),
(8, 'yk5wxmbwib', 'frountLogo1685971908268fantasy-4057707.jpg', 'clover it services 2', 'hello i am bablu saini', 'https://81.0.246.73/', 1, 'clover-it-services-2');

-- --------------------------------------------------------

--
-- Table structure for table `industries_master`
--

CREATE TABLE `industries_master` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `industries` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `industries_master`
--

INSERT INTO `industries_master` (`id`, `generateId`, `title`, `industries`, `status`, `type`) VALUES
(3, 'x6z7g8xi8h', 'home industries', 'yk5wxmbwib', 1, 'master'),
(4, 's5nem9hhf4', 'development industries', '5o40gpum5i,yk5wxmbwib', 1, 'master');

-- --------------------------------------------------------

--
-- Table structure for table `industries_title`
--

CREATE TABLE `industries_title` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `pounchLine` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `industries_title`
--

INSERT INTO `industries_title` (`id`, `title`, `pounchLine`) VALUES
(1, 'INDUSTRIES', 'Setting Standards & Transforming Your Industries');

-- --------------------------------------------------------

--
-- Table structure for table `logo_master`
--

CREATE TABLE `logo_master` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `logo` varchar(200) NOT NULL,
  `inverseLogo` varchar(200) NOT NULL,
  `tooltip` varchar(200) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logo_master`
--

INSERT INTO `logo_master` (`id`, `generateId`, `title`, `logo`, `inverseLogo`, `tooltip`, `status`) VALUES
(2, 'xzjepvdtvg', 'home logo', 'logo1684742328361Screenshot 2023-03-23 182734.png', 'inverseLogo1684742328368Screenshot 2023-03-25 164831.png', 'this is home logo', 1),
(3, 'xzjepvrewi', 'carrer logo', 'logo1684745827493Screenshot_20230204_110237.png', 'inverseLogo1684742363893Screenshot_20230204_110237.png', 'this is carrer logo', 1),
(4, 'qzje5y83dw', 'development page logo', 'logo1684742391568Screenshot 2023-03-25 164745.png', 'inverseLogo1684742391572Screenshot 2023-03-25 164831.png', 'this is development logo', 1),
(5, 'hqt7rbtdlb', 'testing logo', 'logo1686025162306fantasy-4057707.jpg', 'inverseLogo1686025162322nnn.jpg', 'this is testing logo', 1);

-- --------------------------------------------------------

--
-- Table structure for table `master_page`
--

CREATE TABLE `master_page` (
  `id` int(11) NOT NULL,
  `page_name` varchar(200) NOT NULL,
  `p_category` int(11) NOT NULL,
  `url` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `master_page`
--

INSERT INTO `master_page` (`id`, `page_name`, `p_category`, `url`, `slug`, `status`) VALUES
(2, 'custom softwere', 17, 'https://front.getprowriter.com/', 'custom-softwere', 0),
(3, 'App development', 14, 'https://getprowriter.onrender.com/', 'app-development', 1);

-- --------------------------------------------------------

--
-- Table structure for table `menu_list`
--

CREATE TABLE `menu_list` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `category` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `url` varchar(100) NOT NULL,
  `level` int(11) NOT NULL,
  `page_isComplete` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_list`
--

INSERT INTO `menu_list` (`id`, `generateId`, `category`, `name`, `url`, `level`, `page_isComplete`, `status`, `slug`) VALUES
(10, 'se3cgldh1z', 0, 'company', 'https://81.0.246.73/', 0, 1, 1, 'company'),
(11, 'sefg3rdh1z', 0, 'services', 'https://81.0.246.73/', 0, 0, 1, 'services'),
(12, 'se3cglfger', 0, 'technology', 'https://81.0.246.73/', 0, 0, 1, 'technology'),
(13, 'se3cgldh1q', 0, 'industries', 'https://front.getprowriter.com/', 0, 0, 1, 'industries'),
(18, 'se3cgldh2w', 10, 'about us', 'https://getprowriter.onrender.com/chats', 1, 0, 1, 'about-us'),
(19, 'se3cgldh3e', 10, 'meet the team', 'https://front.getprowriter.com/', 1, 0, 1, 'meet-the-team'),
(20, 'se3cgldh4r', 10, 'brand story', 'https://front.getprowriter.com/', 1, 0, 1, 'brand-story'),
(21, 'se3cgldhf5', 10, 'careers', 'https://getprowriter.onrender.com/chats', 1, 0, 1, 'careers'),
(22, 'se3cgdh11', 11, 'product engineering', 'https://getprowriter.onrender.com/chats', 1, 0, 1, 'product-engineering'),
(23, 'se3cgldhm8', 11, 'mobilelity', 'https://getprowriter.onrender.com/chats', 1, 0, 1, 'mobilelity'),
(24, 'se3cgldhb6', 11, 'profesional service', 'https://getprowriter.onrender.com/chats', 1, 1, 1, 'profesional-service'),
(25, '3e3cgldhf5', 12, 'blockchain & web', 'https://front.getprowriter.com/', 1, 0, 1, 'blockchain-&-web'),
(26, 'se3c5ydhf5', 12, 'disital information', 'https://front.getprowriter.com/', 1, 0, 1, 'disital-information'),
(27, 's28ugldhv6', 12, 'cloud', 'https://getprowriter.onrender.com/chats', 1, 0, 1, 'cloud'),
(28, '1b3cgldh3m', 13, 'education & Elearning', 'https://81.0.246.73/', 1, 0, 1, 'education-&-elearning'),
(29, '6e3cgldh2v', 13, 'retail & cEcommerce', 'https://81.0.246.73/', 1, 0, 1, 'retail-&-cecommerce'),
(30, '3h3cgldhs8', 13, 'Logistic & supply chain', 'https://81.0.246.73/', 1, 0, 1, 'logistic-&-supply-chain'),
(31, '233cgldh10', 22, 'custom engineering softwere', 'https://81.0.246.73/', 2, 0, 1, 'custom-engineering-softwere'),
(32, 'se3cgl3459', 22, 'maintence', 'https://81.0.246.73/', 2, 0, 1, 'maintence'),
(33, 'se3cgl1c5k', 22, 're-engineering', 'https://81.0.246.73/', 2, 0, 1, 're-engineering'),
(34, 'se3cglzwrf', 23, 'mobile app development', 'https://81.0.246.73/', 2, 0, 1, 'mobile-app-development'),
(35, 'bbcqo20rsm', 10, 'xxx', 'https://81.0.246.73/', 1, 0, 1, 'xxx'),
(36, 'xzjepv834g', 10, 'niti', 'https://81.0.246.73', 1, 0, 1, 'niti');

-- --------------------------------------------------------

--
-- Table structure for table `menu_master`
--

CREATE TABLE `menu_master` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `menu` varchar(200) NOT NULL,
  `type` varchar(100) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_master`
--

INSERT INTO `menu_master` (`id`, `generateId`, `title`, `menu`, `type`, `status`) VALUES
(3, '2r8ah03fsl', 'home menu', 'se3cgldh1z,sefg3rdh1z,se3cgldh1q', 'master', 1);

-- --------------------------------------------------------

--
-- Table structure for table `offering`
--

CREATE TABLE `offering` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `frountLogo` varchar(100) NOT NULL,
  `backLogo` varchar(100) NOT NULL,
  `heading` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `url` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offering`
--

INSERT INTO `offering` (`id`, `generateId`, `frountLogo`, `backLogo`, `heading`, `description`, `url`, `status`, `slug`) VALUES
(6, 'uiqdvbc2ah', 'frountLogo1685964522904fantasy-4057707.jpg', 'backLogo1685964522913fantasy-4057707.jpg', 'creative web pixal', 'hello i am bablu saini', 'https://81.0.246.73', 1, 'creative-web-pixal'),
(7, 'pb6rbpacmx', 'frountLogo1685971223557fantasy-4057707.jpg', 'backLogo1685971223567beautiful-beauty-dandelion-160699.jpg', 'creative web pixal2', 'hello i am bablu saini', 'https://81.0.246.73/', 1, 'creative-web-pixal2');

-- --------------------------------------------------------

--
-- Table structure for table `offering_master`
--

CREATE TABLE `offering_master` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `offering` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offering_master`
--

INSERT INTO `offering_master` (`id`, `generateId`, `title`, `offering`, `status`, `type`) VALUES
(6, '9un83jfsia', 'home offering', 'uiqdvbc2ah', 1, 'master'),
(7, 'wxkf1a6dyn', 'development offering', 'uiqdvbc2ah,pb6rbpacmx', 1, 'master');

-- --------------------------------------------------------

--
-- Table structure for table `offring_title`
--

CREATE TABLE `offring_title` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `pounchLine` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offring_title`
--

INSERT INTO `offring_title` (`id`, `title`, `pounchLine`) VALUES
(1, 'WHAT WE ARE OFFERING', 'Changemakers’ Choice ForCutting-Edge Solution');

-- --------------------------------------------------------

--
-- Table structure for table `our_clients`
--

CREATE TABLE `our_clients` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `frountLogo` varchar(100) NOT NULL,
  `backLogo` varchar(100) NOT NULL,
  `backgroundImage` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `description` varchar(555) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `our_clients`
--

INSERT INTO `our_clients` (`id`, `generateId`, `frountLogo`, `backLogo`, `backgroundImage`, `status`, `description`) VALUES
(6, 'wam5gdu782', 'frountLogo16859620464712022-01-12.png', 'backLogo16859616988282022-01-12.png', 'backgroundImage16859616988642023-05-28.png', 1, 'hello i am bablu saini'),
(7, '3sa80dlv73', 'frountLogo1685970464845fantasy-4057707.jpg', 'backLogo1685970464858fantasy-4057707.jpg', 'backgroundImage1685970464867fantasy-4057707.jpg', 1, 'hello i am bablu saini');

-- --------------------------------------------------------

--
-- Table structure for table `our_client_title`
--

CREATE TABLE `our_client_title` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `pounchLine` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `our_client_title`
--

INSERT INTO `our_client_title` (`id`, `title`, `pounchLine`) VALUES
(1, 'Our Client', 'In Our Success Story, You Take Center Stage');

-- --------------------------------------------------------

--
-- Table structure for table `slaider_master`
--

CREATE TABLE `slaider_master` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `slaiders` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slaider_master`
--

INSERT INTO `slaider_master` (`id`, `generateId`, `title`, `slaiders`, `status`, `type`) VALUES
(4, 'exwic26sfz', 'home slider', 'jilow18z2d,zfvno7rq17', 1, 'master'),
(5, 'g3sxbmead9', 'development slider', 'jilow18z2d,dlmp4fipo7,zfvno7rq17', 1, 'master');

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `heading` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `btnText` varchar(50) NOT NULL,
  `btnUrl` varchar(50) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`id`, `generateId`, `image`, `heading`, `description`, `btnText`, `btnUrl`, `status`) VALUES
(5, 'jilow18z2d', 'image1685963630407fantasy-4057707.jpg', 'creative web pixal', 'hello i am bablu saini', 'get started', 'http://localhost:5000', 1),
(6, 'dlmp4fipo7', 'image1685969113284beautiful-beauty-dandelion-160699.jpg', 'creative web pixal 2', 'hello i am bablu saini', 'get started', 'http://localhost:5000', 1),
(7, 'zfvno7rq17', 'image1685969125278fantasy-4057707.jpg', 'creative web pixal 3', 'hello i am bablu saini', 'get started', 'http://localhost:5000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `successstory_master`
--

CREATE TABLE `successstory_master` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `successStory` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `successstory_master`
--

INSERT INTO `successstory_master` (`id`, `generateId`, `title`, `successStory`, `status`, `type`) VALUES
(3, 'fv4se6uwy7', 'home success story', 'pm365i6bie', 1, 'master'),
(4, '45s90m9958', 'development success story', 'pm365i6bie,zy9tqh9k2r', 1, 'master');

-- --------------------------------------------------------

--
-- Table structure for table `success_strories`
--

CREATE TABLE `success_strories` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `section` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `sub_title` varchar(200) NOT NULL,
  `description` varchar(500) NOT NULL,
  `btnText` varchar(50) NOT NULL,
  `btnUrl` varchar(50) NOT NULL,
  `image` varchar(200) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `success_strories`
--

INSERT INTO `success_strories` (`id`, `generateId`, `section`, `title`, `sub_title`, `description`, `btnText`, `btnUrl`, `image`, `status`) VALUES
(4, 'pm365i6bie', 'success storie', 'hello success story', 'cyber security', 'hello i am bablu saini', 'get started', 'http://localhost:5000', 'image1685965068986giraffe-1959110_1280.jpg', 1),
(5, 'zy9tqh9k2r', 'success stories', 'success story 2', 'cyber security', 'hello i am bablu saini', 'get started', 'http://localhost:5000', 'image1685970865351fantasy-4057707.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_admin`
--

CREATE TABLE `tb_admin` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `user_name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tb_admin`
--

INSERT INTO `tb_admin` (`id`, `firstName`, `lastName`, `user_name`, `email`, `phone`, `password`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin', 'admin', 'admin@gmail.com', '9999999999', '$2b$10$XDFxl4NvTCB4m29RTREZH.THKmpPc1zUaWs/MwMsQUjlqE9s9.NwC', 1, 1, '2022-09-12 06:14:04', '2023-04-14 07:17:11');

-- --------------------------------------------------------

--
-- Table structure for table `technologies`
--

CREATE TABLE `technologies` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `pounchLine` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `technologies`
--

INSERT INTO `technologies` (`id`, `title`, `pounchLine`) VALUES
(1, 'TECHNOLOGIE', 'Improve And Innovate With The Tech Trends');

-- --------------------------------------------------------

--
-- Table structure for table `technologies_list`
--

CREATE TABLE `technologies_list` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `title` varchar(50) NOT NULL,
  `url` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `technologies_list`
--

INSERT INTO `technologies_list` (`id`, `generateId`, `image`, `title`, `url`, `status`, `slug`) VALUES
(8, 'pik718jg08', 'image1685963909694fantasy-4057707.jpg', 'technologies-1', 'https://81.0.246.73/', 1, 'technologies-1'),
(9, 'tpstmxzzlb', 'image1685967577644love-3187623_1920.jpg', 'technologies  2', 'https://81.0.246.73/', 1, 'technologies--2');

-- --------------------------------------------------------

--
-- Table structure for table `technologies_master`
--

CREATE TABLE `technologies_master` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `technologies` varchar(200) NOT NULL,
  `status` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `technologies_master`
--

INSERT INTO `technologies_master` (`id`, `generateId`, `title`, `technologies`, `status`, `type`) VALUES
(9, 'pik718fgth', 'home technologies', 'tpstmxzzlb', 1, 'master'),
(10, 'boda5xrnzk', 'development technologies', 'pik718jg08,tpstmxzzlb', 1, 'master');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `awards`
--
ALTER TABLE `awards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `awards_master`
--
ALTER TABLE `awards_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `awards_title`
--
ALTER TABLE `awards_title`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs_master`
--
ALTER TABLE `blogs_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_title`
--
ALTER TABLE `blog_title`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careers_page_title`
--
ALTER TABLE `careers_page_title`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carrers`
--
ALTER TABLE `carrers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clients_master`
--
ALTER TABLE `clients_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contect`
--
ALTER TABLE `contect`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `createpage_master`
--
ALTER TABLE `createpage_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `current_opning`
--
ALTER TABLE `current_opning`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `footer_links`
--
ALTER TABLE `footer_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `footer_title`
--
ALTER TABLE `footer_title`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `header_master`
--
ALTER TABLE `header_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `industries`
--
ALTER TABLE `industries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `industries_master`
--
ALTER TABLE `industries_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `industries_title`
--
ALTER TABLE `industries_title`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logo_master`
--
ALTER TABLE `logo_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `master_page`
--
ALTER TABLE `master_page`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_list`
--
ALTER TABLE `menu_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_master`
--
ALTER TABLE `menu_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offering`
--
ALTER TABLE `offering`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offering_master`
--
ALTER TABLE `offering_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offring_title`
--
ALTER TABLE `offring_title`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `our_clients`
--
ALTER TABLE `our_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `our_client_title`
--
ALTER TABLE `our_client_title`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slaider_master`
--
ALTER TABLE `slaider_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `successstory_master`
--
ALTER TABLE `successstory_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `success_strories`
--
ALTER TABLE `success_strories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_admin`
--
ALTER TABLE `tb_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `technologies`
--
ALTER TABLE `technologies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `technologies_list`
--
ALTER TABLE `technologies_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `technologies_master`
--
ALTER TABLE `technologies_master`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `awards`
--
ALTER TABLE `awards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `awards_master`
--
ALTER TABLE `awards_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `awards_title`
--
ALTER TABLE `awards_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blogs_master`
--
ALTER TABLE `blogs_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `blog_title`
--
ALTER TABLE `blog_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `careers_page_title`
--
ALTER TABLE `careers_page_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `carrers`
--
ALTER TABLE `carrers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `clients_master`
--
ALTER TABLE `clients_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contect`
--
ALTER TABLE `contect`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `createpage_master`
--
ALTER TABLE `createpage_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `current_opning`
--
ALTER TABLE `current_opning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `footer_links`
--
ALTER TABLE `footer_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `footer_title`
--
ALTER TABLE `footer_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `header_master`
--
ALTER TABLE `header_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `industries`
--
ALTER TABLE `industries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `industries_master`
--
ALTER TABLE `industries_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `industries_title`
--
ALTER TABLE `industries_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `logo_master`
--
ALTER TABLE `logo_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `master_page`
--
ALTER TABLE `master_page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menu_list`
--
ALTER TABLE `menu_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `menu_master`
--
ALTER TABLE `menu_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `offering`
--
ALTER TABLE `offering`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `offering_master`
--
ALTER TABLE `offering_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `offring_title`
--
ALTER TABLE `offring_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `our_clients`
--
ALTER TABLE `our_clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `our_client_title`
--
ALTER TABLE `our_client_title`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `slaider_master`
--
ALTER TABLE `slaider_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `successstory_master`
--
ALTER TABLE `successstory_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `success_strories`
--
ALTER TABLE `success_strories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `technologies`
--
ALTER TABLE `technologies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `technologies_list`
--
ALTER TABLE `technologies_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `technologies_master`
--
ALTER TABLE `technologies_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
