-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2023 at 12:59 PM
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
-- Database: `acme`
--

-- --------------------------------------------------------

--
-- Table structure for table `applyjob`
--

CREATE TABLE `applyjob` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `jobTitle` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `qualification` varchar(200) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `resume` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applyjob`
--

INSERT INTO `applyjob` (`id`, `name`, `jobTitle`, `email`, `qualification`, `phone`, `resume`) VALUES
(2, 'pankaj tak', 'web development', 'pankajtak123gmail.com', 'BCA 1st year', '8959352677', '1686898069908company name.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `broshure`
--

CREATE TABLE `broshure` (
  `id` int(11) NOT NULL,
  `heading` varchar(200) NOT NULL,
  `description` varchar(555) NOT NULL,
  `pdf` varchar(200) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `broshure`
--

INSERT INTO `broshure` (`id`, `heading`, `description`, `pdf`, `status`) VALUES
(2, 'gghfh', 'gfghfghfghf', 'pdf1693810167413LMS Dashboard System (1).pdf', 1);

-- --------------------------------------------------------

--
-- Table structure for table `contectus`
--

CREATE TABLE `contectus` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `jobTitle` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `companyName` varchar(200) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contectus`
--

INSERT INTO `contectus` (`id`, `name`, `jobTitle`, `email`, `companyName`, `phone`, `message`) VALUES
(1, 'bablu saini', 'web development', 'bablusaini90310@gmail.com', 'thought in reality', '8949352677', 'hello i am bablu saini'),
(2, 'kushal', 'frountend development', 'kushal90310@gmail.com', 'thought in reality', '8949352677', 'hello i am kushal saini'),
(3, 'thoughtsinreality', 'undefined', 'kushwa378@gmail.com', 'undefined', '09079084977', 'dfdfdff'),
(4, 'thoughtsinreality', 'undefined', 'kushwa378@gmail.com', 'undefined', '09079084977', 'zdcz'),
(5, 'thoughtsinreality', 'undefined', 'kushwa378@gmail.com', 'undefined', '09079084977', 'sdfvsf'),
(6, 'thoughtsinreality', 'eagfsf', 'kushwa378@gmail.com', 'thoughtsinreality', '09079084977', 'efsdfsd'),
(7, 'thoughtsinreality', 'eagfsf', 'kushwa378@gmail.com', 'thoughtsinreality', '09079084977', 'jhiuhh'),
(8, 'thoughtsinreality', 'eagfsf', 'kushwa378@gmail.com', 'thoughtsinreality', '09079084977', 'sdfdfg'),
(9, 'thoughtsinreality', 'eagfsf', 'kushwa378@gmail.com', 'thoughtsinreality', '09079084977', 'dfdsffdf'),
(10, 'thoughtsinreality', 'eagfsf', 'kushwa378@gmail.com', 'thoughtsinreality', '09079084977', 'dsfdff'),
(11, 'thoughtsinreality', 'eagfsf', 'kushwa378@gmail.com', 'thoughtsinreality', '09079084977', 'fdvcdv'),
(12, 'pradeep agnani', 'jasdlh', 'support@ashimaelectrotech.com', 'ashima', '5575425', 'asdadad'),
(13, 'Vicky', 'Nursing', 'vicky123@gmail.com', 'Khushi kirana store', '1234567890', 'Hello i am bicky');

-- --------------------------------------------------------

--
-- Table structure for table `current_opning`
--

CREATE TABLE `current_opning` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `image` varchar(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `brief_desc` text NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `current_opning`
--

INSERT INTO `current_opning` (`id`, `generateId`, `image`, `title`, `brief_desc`, `status`, `slug`) VALUES
(11, '288136', 'image1690445862028residency-clip.jpg', 'Residential', '<ul>\r\n	<li>Pipe Earthing &amp; Copper clad rods</li>\r\n	<li>HDPE pit covers</li>\r\n	<li>Surge Protection Devices</li>\r\n</ul>\r\n', 1, 'residential'),
(12, '487426', 'image1690445961842power-clip.jpg', 'Power', '<ul>\r\n	<li>Our highly conductive earth enhancemnet material is very useful as backfill for 33Kv/ 132Kv/ 400Kv substations. It maintains the mesh earth resistance even in the hot summer (&gt;45&deg;C) of india.</li>\r\n	<li>Specially designed and tested earth electrode for high voltage / MVA transformers are approved by electricity boards.</li>\r\n</ul>\r\n', 1, 'power'),
(13, '285856', 'image1690446011419health-clip.jpg', 'Healthcare', '<ul>\r\n	<li>Pure Copper earth electrode to provide best contact resistance for sensitive electromagnatic equipments like MRI, Linear Accelerator, Cathlab.</li>\r\n</ul>\r\n', 1, 'healthcare'),
(14, '226045', 'image1690446080608tele-clip.jpg', 'Telecom', '<ul>\r\n	<li>Ul listed copper bonded rods</li>\r\n	<li>Lighting Arrester</li>\r\n	<li>Surge Protection Device</li>\r\n</ul>\r\n', 1, 'telecom'),
(15, '601515', 'image1690446141937rail-clip.jpg', 'Railways', '<ul>\r\n	<li>Ul listed copper bonded rods are as per RDSO compliance and are widely used in signal earthing applications.</li>\r\n	<li>Perforated pipe earthing is mostly used in electrical earthing application of railways. These are RDSO compliant.</li>\r\n	<li>Earth discharge rod manufactured and tested as per RDSO specification are also very commonly used to discharge overhead line for maintenance.</li>\r\n</ul>\r\n', 1, 'railways'),
(16, '707515', 'image1690446213600data-clip.jpg', 'Data Center', '<ul>\r\n	<li>Data center need very low earthing value for their smooth data flow. Acme low resistance earthing solutions are best available source for this.</li>\r\n</ul>\r\n', 1, 'data-center'),
(17, '160720', 'image1690446322219bank.jpg', 'Banking', '<ul>\r\n	<li>Now a days banks uses internet and computers for their every activity. A prfect grounding is a must requirement of every bank. ACME ground rod and premium earth enhancement compound is being used regularly by many banks of india.</li>\r\n</ul>\r\n', 1, 'banking'),
(18, '443924', 'image1690446415795industrial.jpg', 'Industrial', '<ul>\r\n	<li>High current with stand capacity earth electrode _&gt;50kA.</li>\r\n	<li>Industrial &amp; semiconductor fuses.</li>\r\n	<li>High end surge protection devices.</li>\r\n	<li>Ground Resistance Monitors.</li>\r\n</ul>\r\n', 1, 'industrial'),
(19, '137621', 'image1690446459695airport.jpg', 'Airports', '<ul>\r\n	<li>Airports uses radar systems to communicate with flight crew. Copper bonded rods along with low resistivity earth enhancement material is regular requirement of Airports authorities.</li>\r\n	<li>Airport also uses advance lightning protection system along with SPDs.</li>\r\n</ul>\r\n', 1, 'airports'),
(20, '476168', 'image1690446541691realstate-clip.jpg', 'Real-state', '<ul>\r\n	<li>Pipe Earthing &amp; Copper clad rods</li>\r\n	<li>HDPE pit covers</li>\r\n	<li>Surge Protection Devices</li>\r\n</ul>\r\n', 1, 'real-state');

-- --------------------------------------------------------

--
-- Table structure for table `offering`
--

CREATE TABLE `offering` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `backLogo` varchar(100) NOT NULL,
  `heading` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offering`
--

INSERT INTO `offering` (`id`, `generateId`, `backLogo`, `heading`, `description`, `status`, `slug`) VALUES
(25, '603631', 'frountLogo1690869914028testing01.jpg', 'Earthing Calculations', '<p>Based on soil resistivity survey AEPL provide calculation of earth electrode cross section, earth rod size, no. of Electrodes to form a grid, this help to achieve a desired resistance of grid Electrode.</p>\r\n', 1, 'earthing-calculations'),
(26, '37842', 'frountLogo1691062158287RISK02.jpg', 'Risk Assessment', '<p>AEPL team of Engineers with the help to latest Risk assessment software provides the data of risk involved to property and human beings. This data analysis help to take safety measures and install safety system, to reduce the loss to property or human.</p>\r\n', 1, 'risk-assessment'),
(27, '984441', 'frountLogo1691136294918safety.jpg', 'Electrical Safety Audits', '<p>AEPL offers Electrical Safety audits to commercial, Industrial as well as residential establishments with the help of latest High End Equipment our engineers check for safety of motors, Generators, cables and other electrical installations machine equipment are tested individually for safety purpose.</p>\r\n', 1, 'electrical-safety-audits');

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
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`id`, `generateId`, `image`, `heading`, `description`, `status`) VALUES
(12, '847042', 'image1690449637263slider-images01.jpg', ' ', ' ', '1'),
(14, '461432', 'image1690802830994compound-slider.jpeg', ' ', ' ', '1'),
(15, '239880', 'image1690806165195dcdb-slider.jpg', ' ', ' ', '1'),
(16, '478453', 'image1693808240506digitization-5140071_1920.jpg', ' hh', ' hh', '1');

-- --------------------------------------------------------

--
-- Table structure for table `solutions`
--

CREATE TABLE `solutions` (
  `id` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `heading` varchar(200) NOT NULL,
  `imager` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `solutions`
--

INSERT INTO `solutions` (`id`, `category`, `heading`, `imager`, `description`, `status`) VALUES
(34, 15, 'ESE Lightning Arrester', 'image1690448684349ese-la.png', '<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Standerd</strong></td>\r\n			<td>French Standerd NFC 17-102 (July 1995)</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Protection</strong></td>\r\n			<td>Direct Lightning Strike</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Design Parameters</strong></td>\r\n			<td>Collection Volume Method</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Basic Theory</strong></td>\r\n			<td>The Design parameters of collection volume method include height, field intensification of structurs projection, leader charge, site altitude and relative propagation velocities of the interception leader. it is known as early stremer emmision method.</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>All Weather Protection Method</strong></td>\r\n			<td>System developed by Collectiom volume method are known as all weather performances, which perform in all weather conditions which takes into account the reletive velocities of upward and downward leaders. This leads to the development of limiting parabola &amp; protect from all cloud or all types of cloud charge carries in any weather or stormy conditions</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Risk Factor Calculation</strong></td>\r\n			<td>\r\n			<p><strong>Risk assessment method or factors based on:</strong></p>\r\n\r\n			<ol>\r\n				<li>Building Environment</li>\r\n				<li>Type of constructions</li>\r\n				<li>Structure contents</li>\r\n				<li>Structure occupancy</li>\r\n				<li>Lightning strike frequency</li>\r\n			</ol>\r\n			</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Main Features</strong></td>\r\n			<td>\r\n			<ul>\r\n				<li>Complete Maintenance free</li>\r\n				<li>Does not require any external power supply.</li>\r\n				<li>Create automatic electronic circuit of high voltage impluse emitter during all weather conditions.</li>\r\n				<li>Single discharge tip for effactive charge spread.</li>\r\n				<li>Wholly Manufactures with stainless steel AISI-316</li>\r\n				<li>High quality anti corrosive &amp; conductive coating</li>\r\n			</ul>\r\n			</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(35, 15, 'Copper Lightning Arrester', 'image1690448880526copper-la.png', '<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Spikes</strong></td>\r\n			<td>5 Nos.</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Length of Spike</strong></td>\r\n			<td>90 mm.</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Mounting bar height</strong></td>\r\n			<td>500 mm. - 1500 mm.</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Mounting bar Dia</strong></td>\r\n			<td>14 mm. - 17 mm.</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Mounting Base</strong></td>\r\n			<td>85 mm.</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Sphere Dia</strong></td>\r\n			<td>53 mm.</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(36, 15, 'Acme Supporting Mast', 'image1690448954060mast.jpeg', '<p><strong>Acme support mast are made out of Quality steel with Galvanization. These mast are available in different sizes of 40mm. and 58mm. dia and height of mast 2mtr, 3mtr, 5mtr, 9mtr. Support mast is fixed with a insulating material on top this insulation prevents any under flow of current.</strong></p>\r\n', 1),
(38, 16, 'GI Earthing Electrode (GI Strip)', 'image1690454958111electrode01.jpg', '<ul>\r\n	<li>Gi strip is used as primary conductor inside the GI Pipe</li>\r\n	<li>Availability of different size GI strip ensure the availability of plenty of models according to fault current requirement.</li>\r\n	<li>Hot Dip Galvanization (HDG) of strip and pipe ensure the better anticorrosion resistence.&nbsp; &nbsp;&nbsp;</li>\r\n</ul>\r\n\r\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<h3><strong>Description</strong></h3>\r\n			</td>\r\n			<td><strong>Length</strong></td>\r\n			<td>\r\n			<h3><strong>Inner Size</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Catalogue Code</strong></h3>\r\n			</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 50mm. GI Pipe with GI Strip Earth Electrode</strong></td>\r\n			<td>2 mtr.</td>\r\n			<td>25x3 mm.</td>\r\n			<td>A50G2532</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 50mm. GI Pipe with GI Strip Earth Electrode</strong></td>\r\n			<td>2 mtr.</td>\r\n			<td>32x5 mm.</td>\r\n			<td>A50G3252</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 50mm. GI Pipe with GI Strip Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>25x3 mm.</td>\r\n			<td>A50G2533</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 80mm. GI Pipe with GI Strip Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>25x3 mm.</td>\r\n			<td>A80G2533</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 80mm. GI Pipe with GI Strip Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>32x6 mm.</td>\r\n			<td>A80G3253</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 80mm. GI Pipe with GI Strip Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>50x6 mm.</td>\r\n			<td>A80G5063</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(39, 16, 'GI Earthing Electrode (Copper Strip)', 'image1690455952690electrode02.jpg', '<ul>\r\n	<li>99.9% Pure copper strip is used as primary conductor along with GI Pipe.</li>\r\n	<li>Acme-GIPCS electrodes are used mainaly for heavy fault current requirements.</li>\r\n	<li>Pressure filled conductive &amp; heat absorbent materials are used inside the electrode to sustain heavy fault current.</li>\r\n</ul>\r\n\r\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<h3><strong>Description</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Length</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Inner Size</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Catalogue Code</strong></h3>\r\n			</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 50mm. GI Pipe with Copper Strip Earth Electrode</strong></td>\r\n			<td>2 mtr.</td>\r\n			<td>25x3 mm.</td>\r\n			<td>A50C2532</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 50mm. GI Pipe with Copper Strip Earth Electrode</strong></td>\r\n			<td>2 mtr.</td>\r\n			<td>32x5 mm.</td>\r\n			<td>A50C3252</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 50mm. GI Pipe with Copper Strip Earth Electrode</strong></td>\r\n			<td>2 mtr.</td>\r\n			<td>40x6 mm.</td>\r\n			<td>A50C4062</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 50mm. GI Pipe with Copper Strip Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>25x3 mm.</td>\r\n			<td>A50C2533</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 50mm. GI Pipe with Copper Strip Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>32x5 mm.</td>\r\n			<td>A50C3253</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 50mm. GI Pipe with Copper Strip Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>40X6 mm.</td>\r\n			<td>A50C4063</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 80mm. GI Pipe with Copper Strip Earth Electrode</strong></td>\r\n			<td>2 mtr.</td>\r\n			<td>25X3 mm.</td>\r\n			<td>A80C2532</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 80mm. GI Pipe with Copper Strip Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>25X3 mm.</td>\r\n			<td>A80C2533</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 80mm. GI Pipe with Copper Strip Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>32X5 mm.</td>\r\n			<td>A80C3253</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 80mm. GI Pipe with Copper Strip Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>50X6 mm.</td>\r\n			<td>A80C5063</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(40, 16, 'GI Earthing Electrode (Pipe in pipe)', 'image1690458419678Untitled-1.png', '<ul>\r\n	<li>Acme-GIPP Earth Electrode ensure longer life to equipment and safety of humans.</li>\r\n	<li>Acme-EEC is used to make Electrode surrounding moisture high and provinding easy path to fault current.</li>\r\n	<li>Circular path for fault current to spread in more uniformly in all directions.</li>\r\n</ul>\r\n\r\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<h3><strong>Description</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Length</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Inner Size</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Catalogue Code</strong></h3>\r\n			</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 50mm. GI Pipe in Pipe Earth Electrode</strong></td>\r\n			<td>2 mtr.</td>\r\n			<td>25 mm.</td>\r\n			<td>AGP50252</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 50mm. GI Pipe in Pipe Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>25 mm.</td>\r\n			<td>AGP50253</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 80mm. GI Pipe in Pipe Earth Electrode</strong></td>\r\n			<td>2 mtr.</td>\r\n			<td>40 mm.</td>\r\n			<td>AGP80402</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Acme 80mm. GI Pipe in Pipe Earth Electrode</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>40 mm.</td>\r\n			<td>AGP80403</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(41, 16, 'Copper Bonded Ground Rod', 'image1690458637114copper-rod.jpg', '<ul>\r\n	<li>Acme-CBGR made by molecularly bonding pure electrolytic copper into a low carbon high tensile steel core.</li>\r\n	<li>The copper bonded grounding rods have characters of anti-corrosion and ductility, which is superior then common copper bonded steel rods and easy to install deeply.</li>\r\n	<li>Made with low carbon steel core bonded 99.9% pure electrolytic copper.</li>\r\n</ul>\r\n\r\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<h3><strong>Description</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Length</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Inner Size</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Catalogue Code</strong></h3>\r\n			</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Copper Bonded Rod</strong></td>\r\n			<td>1 mtr.</td>\r\n			<td>&nbsp;</td>\r\n			<td>ACBR101</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Copper Bonded Rod</strong></td>\r\n			<td>2 mtr.</td>\r\n			<td>&nbsp;</td>\r\n			<td>ACBR202</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Copper Bonded Rod</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>&nbsp;</td>\r\n			<td>ACBR403</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Copper Bonded Rod</strong></td>\r\n			<td>3 mtr.</td>\r\n			<td>&nbsp;</td>\r\n			<td>ACBR253</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(42, 19, 'Earth Enhancement Compound', 'image1690458976194eec.jpg', '<p><strong>Acme EEC is developed to enhance the conductivity, it reduces the earthing resistance in all kind of soil (Rocky, Sandy and any low Moisture) areas. The characteristic of the earthing system is dependent on the nature of soil. In an ideal earthing system, the resistance must be kept as low possible to provide safe way for fault current. Acme EEC major element contains mainly: Ti, Na, Mg, Ca, C and so on. This is mixture of natural minerals which in non hazardous for human being. Applied to high earth resistivity rainy soil loss area.Corrosion free and average life span: 20 to 30years.</strong></p>\r\n\r\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Compliance</strong></td>\r\n			<td>IEC 62651-7</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Certification</strong></td>\r\n			<td>NABL, CE, ROHS</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Colour</strong></td>\r\n			<td>Dark Gray</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>PH Value</strong></td>\r\n			<td>7-10 ph</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Electric Resistivity</strong></td>\r\n			<td>Less than 0.12 &Omega;m.</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>conductivity Rate</strong></td>\r\n			<td>High</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Water Solubility</strong></td>\r\n			<td>30% to 40%</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Bag Size</strong></td>\r\n			<td>10kg, 20kg, 25kg,</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Moisture Content at 105&deg;C(%)</strong></td>\r\n			<td>10.05%</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Sulpher Content</strong></td>\r\n			<td>Less than 2%</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(43, 19, 'Acme Bentonite Powder', 'image1690459032967bentonite.jpg', '<p><strong>Bentonite is a natural mineral extracted from mines. It is a clay and Sodium activated montmorillonite. When this clay is mixwd with water swells many time its dry volume. this clay has the ability to retain moisture from surrounding soil and thus keeps the earthing system more effactive.</strong></p>\r\n', 1),
(44, 19, 'Acme Conductive Cement', 'image1690459189134conductive.jpg', '<p><strong>Acme conductive cement is a powerful low resistivity grounding material, It is prepared to provide conductive property along with setteling properties of cement. the ratio of hardering material with that of conductive material like Graphite of carbon, plays vital role in defining the properties of conductive cement. A corrosion inhibitor material is also mixed to prevent the corrosion.</strong></p>\r\n\r\n<p><strong>Features :-</strong></p>\r\n\r\n<ul>\r\n	<li>Positive low contact resistance.</li>\r\n	<li>No hazerdous chemicals.</li>\r\n	<li>Does not leach or wash away.</li>\r\n	<li>Corrosion Inhibitor properties.</li>\r\n	<li>No expansion or shrinkage.</li>\r\n</ul>\r\n', 1),
(45, 20, 'FRP Earth Pit Covers', 'image1690461036961frp-pit.jpg', '<p><strong>FRP Earth Pit cover is manufactured with the use of quality polypropylene material which is reliable<br />\r\nto use. They are used in order to secure Protection for earthing terminations. They ensure easy access<br />\r\nfor routine testing of electrical earths. They provide secure and user friendly accesses.</strong></p>\r\n\r\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<h3><strong>Dimensions (Aprox.)</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Features</strong></h3>\r\n			</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Top - 265 mm.</strong></td>\r\n			<td>Construction Material PVC for Extra durability</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Bottom - 300 mm.</strong></td>\r\n			<td>Factory-built long holes for accessing pipes strip</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Height - 265 mm.</strong></td>\r\n			<td>Resistant materials, assuring long use-life</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Thickness - 5.5 mm.</strong></td>\r\n			<td>Light weight</td>\r\n		</tr>\r\n		<tr>\r\n			<td>&nbsp;</td>\r\n			<td>Maximum Safe Working load</td>\r\n		</tr>\r\n		<tr>\r\n			<td>&nbsp;</td>\r\n			<td>Easy to Install</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(46, 20, 'MS Earth Pit Covers', 'image1690461749014ms-pit.jpg', '<p><strong>MS Earth Pit cover is manufactured with the use of quality Steel Sheet. They are used in order to secure<br />\r\nProtection for all earthing terminations. They are available in different MS sheet thickness (2mm, 4mm,<br />\r\n6mm,). They ensure easy access for routine testing of electrical earths. They provide secure and user<br />\r\nfriendly accesses.</strong></p>\r\n\r\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td>\r\n			<h3><strong>Features</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Size</strong></h3>\r\n			</td>\r\n			<td>\r\n			<h3><strong>Thickness</strong></h3>\r\n			</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Light weight</strong></td>\r\n			<td>300x300 mm.</td>\r\n			<td>2 mm.</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Maximum Safe Working load</strong></td>\r\n			<td>450x450 mm.</td>\r\n			<td>4 mm.</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Easy to Install</strong></td>\r\n			<td>600x600 mm.</td>\r\n			<td>6 mm.</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(47, 20, 'Acme Cast Iron Pit Covers', 'image1690461797255ci-pit.jpg', '<p><strong>Cast Iron pit covers are heavy duty pit covers. They are mainly used where movement of persons is more. These pit covers are made by dye casting techniques. These are available in various sizes.</strong></p>\r\n', 1),
(48, 20, 'RCC Earth Pit Covers', 'image1690462433092rcc-pit.jpg', '<p><strong>These Pit covres are mainly used where a massonary work is not yough to do. At remote sites of petrol<br />\r\npumps ans substations where empty land is not a problem for brick work. Various sizes available as per<br />\r\nrequirement.</strong></p>\r\n\r\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Sizes available in :-</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td>300x300 mm.</td>\r\n		</tr>\r\n		<tr>\r\n			<td>450x450 mm.</td>\r\n		</tr>\r\n		<tr>\r\n			<td>600x600 mm.</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(49, 21, 'FRP Discharge Rods', 'image1690526391086dis-rod.jpg', '<p><strong>Acme-Highly insulated FRP Telescopic Earth Discharge rod manufactured in automatic pultrusion plant having strong electrical &amp; mechanical strength.</strong></p>\r\n\r\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Material</strong></td>\r\n			<td>FRP Pultruded</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Process</strong></td>\r\n			<td>Automatic pultrusion plant</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Surface</strong></td>\r\n			<td>Smooth and Glossy</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Design</strong></td>\r\n			<td>Telescopic Type</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Locking</strong></td>\r\n			<td>Push button type locking system</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Total Section</strong></td>\r\n			<td>03 Section</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Assembled Lenght</strong></td>\r\n			<td>18 Feet Lenght</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>One Minute dry power frenquency voltage with stand</strong></td>\r\n			<td>11 Kv rms, 33 Kv rms, 132 kv rms,</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Glass Content</strong></td>\r\n			<td>65%</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Top Section Dia</strong></td>\r\n			<td>25 mm.</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Botton Section Dia</strong></td>\r\n			<td>45 mm.</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Earthing</strong></td>\r\n			<td>Die Cast aluminium earhting instrument for 30 mm. Dia</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Cable (for 11Kv)</strong></td>\r\n			<td>4 sq. mm. copper cable 06 mtr. long</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Cable (for 33Kv)</strong></td>\r\n			<td>10 sq. mm. copper cable 09 mtr. long</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Cable (for 132Kv)</strong></td>\r\n			<td>35 sq. mm. copper cable 15 mtr. long</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Clamp</strong></td>\r\n			<td>Crocodile grounding clamp</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Cover</strong></td>\r\n			<td>Cover Including</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(52, 18, 'Graphite Mould', 'image1690891168866graphite-mould.jpg', 'Graphite mould is made of high quality graphite, and can be used for serveral times. The exothermic welding reaction takes place in a specially designed and manufactured with a specific weld cavity and in this cavity the molten metal is allowed to flow to all sections of the required connection creating the permanent connection.', 1),
(53, 18, 'Mould Handle Clamp', 'image1690891236997mould-handle-clamp.jpg', '<p>Suitable for maximum exothermic moulds.</p>\r\n', 1),
(54, 18, 'Steel Metal disk', 'image1690891335885metal disk.jpeg', '<p>Exothermic weld powder is the main part of any exothermic process. Upon weld powder is specially packaged in moisture-resistant plastic tubes. Standerd size packing are 25 grams, 90 grams, 150 grams, 200 grams, 250 grams,</p>\r\n', 1),
(55, 18, 'Exothermic Weld Powder', 'image1690891400015weld-powder.jpg', '<p>Steel Discs are very important. The disc act as timing device to allow the welding powder to heat to proper temperature.</p>\r\n', 1),
(56, 18, 'Ignite Powder', 'image1690891432045ignite-powder.jpg', '<p>Ignite powder also known as starting powder is required to start the reaction. starting powder on the mould followed by the exothermic weld powder and again pour little on the top side of mould. Then ignite starting powder with a spark gun, ignite powder og 5 grams is sufficient for this process.</p>\r\n', 1),
(57, 18, 'Hand Gloves', 'image1690891462732gloves.jpg', '<p>Gloves are required for safety purpose as the exothermic weld powder melts at more than 1500&deg;C. One hand gloves pair is good for 250 joints.</p>\r\n', 1),
(58, 18, 'Flint Gun', 'image1690891493273gun.jpg', '<p>It is designed with the advantages of safety and convenience. It is used to ignite starting powder in order to result in exothermic reaction.</p>\r\n', 1),
(59, 18, 'Soft and Hard Brush', 'image1690891552105clean-brush.jpg', '<p>Soft Brush :- Its used to clean mould weld cavity because its shape is very sensitive and cavity should not be any damage while using brush.<br />\r\nHard Brush :- Its used to clean other section of mould.</p>\r\n', 1),
(60, 18, 'Slag Remaoval Tool', 'image1690891603196slag.jpg', '<p>It is used to remove the metal scarp and dust from mould.</p>\r\n', 1),
(61, 18, 'File Card', 'image1690891669139hard-brush.jpg', '<p>It is used to clean the objects to be welded to remove rust and dirt.</p>\r\n', 1),
(62, 18, 'Sealing Compound', 'image1690891708388compound.jpg', '<p>sealing compound is used to fill the gap on the mould where the conductor is passing.</p>\r\n', 1),
(63, 18, 'Flame Torch', 'image1690891773397torch.jpg', '<p>sealing compound is used to fill the gap on the mould where the conductor is passing. Flame torch can be used for 200+ joints.</p>\r\n', 1),
(64, 18, 'Safety Eye Glasses.', 'image1690891826095goggle.jpg', '<p>Safety eye glasses should be wear to protect eyes.</p>\r\n', 1),
(65, 27, 'Direct Current Distribution Box (DCDB)', 'image1690961287644DCDB-BOX.jpg', '<ul>\r\n	<li><strong>DC Distribution Box is used to collect output of solar cells and supply it to get AC output.</strong></li>\r\n	<li><strong>Main parts used in any DCDB are DC MCB, DC Fuses, Connectors, DC SPDs etc.</strong></li>\r\n	<li><strong>Specification of DCDB are usually defined in terms of input &amp; output like 2 in 2 out.</strong></li>\r\n	<li><strong>DCDB may be defined a disconnectors unit to disconnect the solar output from inverter section.</strong></li>\r\n</ul>\r\n', 1),
(66, 17, 'Mersen PV Fuses', 'image1690962477623mersen-fuses.jpg', '<p><strong>Engineered to protect photovoltaic applications Mersen&#39;s HP10M photovoltaic (PV) fuse series was engineered and designed specifically for the protection of photovoltaic systems. Its enhanced fuse construction makes it ideal for constant temperature and current cycling withstand adding to system longevity. The 1000VDC rated HP10M, designed for low minimum breaking capacity capabilities of 1.35 times the fuse rated current value, allows for safe circuit interruption under typical low fault current conditions produced by PV arrays. Protect your off-grid or grid tied PV system from unexpected ground faults and line faults using Mersen&#39;s HelioProtection fuse line.</strong></p>\r\n\r\n<ul>\r\n	<li><strong>Low fault current interrupting capability</strong></li>\r\n	<li><strong>Durable construction for enhanced system longevity</strong></li>\r\n	<li><strong>Temperature cycle withstand capability</strong></li>\r\n	<li><strong>Guaranteed operation at temperature extremes</strong></li>\r\n	<li><strong>Industry&rsquo;s first UL Listed Solution</strong></li>\r\n	<li><strong>Globally accepted</strong></li>\r\n</ul>\r\n\r\n<h3><strong><ins>APPROVALS &amp; STANDARDS</ins></strong></h3>\r\n\r\n<ul>\r\n	<li><strong>UL Listed to Standard UL2579 File E333668</strong></li>\r\n	<li><strong>CSA Component Certified C22.2</strong></li>\r\n	<li><strong>IEC 60269-6 Approved (CB Tested)</strong></li>\r\n</ul>\r\n\r\n<h3><strong><ins>APPLICATIONS</ins></strong></h3>\r\n\r\n<ul>\r\n	<li><strong>All photovoltaic applications</strong></li>\r\n	<li><strong>PV string/array level protection</strong></li>\r\n	<li><strong>Combiner box applications</strong></li>\r\n	<li><strong>In-line PV module protection</strong></li>\r\n	<li><strong>Inverters</strong></li>\r\n	<li><strong>Battery charge controllers</strong></li>\r\n</ul>\r\n\r\n<h3><strong><ins>Specifications</ins></strong></h3>\r\n\r\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:800px\">\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Frequency (Hz)</strong></td>\r\n			<td><strong>50/60 Hz</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Ampere Range</strong></td>\r\n			<td><strong>1 to 30 A</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Fuse Class</strong></td>\r\n			<td><strong>Photovoltaic</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Speed/Characteristic</strong></td>\r\n			<td><strong>gPV</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>UL File Number</strong></td>\r\n			<td><strong>File E333668</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>UL Category Code</strong></td>\r\n			<td><strong>JFGA</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>REACH Compliant</strong></td>\r\n			<td><strong>Yes</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Max Operating Temp.</strong></td>\r\n			<td><strong>80&deg;C</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Max Storage Temp.</strong></td>\r\n			<td><strong>80&deg;C</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Min Storage Temp.</strong></td>\r\n			<td><strong>-25&deg;C</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Harmonized System</strong></td>\r\n			<td><strong>853610</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td>&nbsp;</td>\r\n			<td>&nbsp;</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1),
(67, 15, 'LIGHTNING COUNTER', 'image1691142763612Lightning-Counter.png', '<p><strong>The Protector lightning counter is produced to count the lightning strike discharges that goes through the conductor down to the ground. The counter is to be installed on the down conductor. It can whether be installed serial or parallel. The device consists of electronical parts. No maintenance required. Do not try to unscrew or uninstall the equipment as this will cause damage and will break down the product guarantee conditions. The device is a high technology product and conforms the working and laboratory test conditions.</strong></p>\r\n\r\n<h2><strong>Specifications:</strong></h2>\r\n\r\n<table border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\">\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Dimensions</strong></td>\r\n			<td>&nbsp;173 x 82 x 44 mm</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Weight</strong></td>\r\n			<td>740 gr</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Temperature range</strong></td>\r\n			<td>-20 to +50 &deg;C</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Counter</strong></td>\r\n			<td>6 digits</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Protection</strong></td>\r\n			<td>IP 65</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Starting treshold</strong></td>\r\n			<td>1 &ndash; 100 kA in 8/20 wave</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Min. Time between 2 discharges</strong></td>\r\n			<td>100 ms</td>\r\n		</tr>\r\n		<tr>\r\n			<td><strong>Connection</strong></td>\r\n			<td>f8 &ndash; 30x2 &ndash; 30x3 available</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n', 1);

-- --------------------------------------------------------

--
-- Table structure for table `solutionscategory`
--

CREATE TABLE `solutionscategory` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `backgroundImage` varchar(300) NOT NULL,
  `short_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `solutionscategory`
--

INSERT INTO `solutionscategory` (`id`, `title`, `image`, `backgroundImage`, `short_description`) VALUES
(15, 'Lightning Arrester', 'image1690373669511Lightning-arrester.jpg', 'backgroundImage1690871028575slider-images01.jpg', '<p><strong>Lightning is one of the most beautiful natural phenomena to see &amp; most disastrous one to experience. Lightning discharge may carry current up to hundreds of kiloamperes (KA). It may cause damage to human life, structure, electrical as well as electronic equipments. It may also cause fire &amp; disrupt working operations of any industry. It&rsquo;s been an electronic era and our dependence on electronics has been increased. One lightning strike can destroy partially / completely all equipments installed in any establishment. Hence, protection from such natural disasters from lightning strike is essential.</strong></p>\r\n'),
(16, 'Earthing Electrode', 'image1690373747789earthing-images.jpg', 'backgroundImage1690870995273slider-images06.jpeg', '<p><strong>We are manufacturer and Supplier of Chemical Earthing Electrode from Jaipur ,Rajasthan. Our Chemical Earthing Electrode can be used in various organization.We are Supply Chemical Earthing Electrode to various cities like Delhi, Noida, Ghaziabad,Jodhpur,Bikaner, Kota, Faridabad, Gurgaon, Sonipat, Ambala, Karnal, Bhiwadi, Neemrana, Bulandshahr, Kanpur, Lucknow,Varanasi, Allahabad, Dehradun, Haridwar, Chandigarh, Shimala,Guwahati, Panchkula, Ludhaiana, Gwalior, Jhansi, Agra &amp; many more.</strong></p>\r\n\r\n<p><strong>We are Supply Chemical Earthing Electrode to various country also like Bangladesh, Jaimeca, Africa, Pakistan, Uganda, Nepal &amp; many more.</strong></p>\r\n'),
(17, 'SPD & Fuses', 'image1690373794945surge-protection.jpg', 'backgroundImage1690870967940spd-slider.jpg', '<p><strong>A surge protector is an electronic device used to protect the connected equipment from voltage inconsistencies to save the system from different magnitudes of surge voltages, the capacity or magnitude of the arrestor varies. The amplitude can range from a few millivolts to some ten thousand volts. Schneider Electric India comes with a series of surge protection devices that can be installed in the system to ensure protection from over or under voltage. To use this, install a plug-in, point-of-use electrical surge protector. The device can be plugged into a grounded electrical outlet or can be directly connected into the appliance. Lightning protective devices are developed, tested, and classified according to their international series of product standards, and they have defined surge protection functions and performance parameters to make them suitable for use with similar protection concepts. Hence, it is imperative to have a surge protection device to safeguard your house, family, colleagues and friends from any harm. Every year, many electronic devices get damaged due to transient voltages. This major mishap is protected by surge protection devices. Surge protectors are also used in electrical installation systems for protecting them. Schneider offers a wide variety of surge protectors that help in keeping your loved ones safe.</strong></p>\r\n'),
(18, 'Welding Material', 'image1690437417668weld.jpg', 'backgroundImage1690976912690WELDING01.jpg', '<p><strong>Exothermic welding is a fusion welding process. Unlike many other welding processes, the source of energy does not come from electricity, combustion or mechanical means. Instead, the energy is obtained from a chemical reaction. The heat from this chemical reaction coalesces two or more materials together. Exothermic welding creates the heat necessary for welding using the chemical reaction that occurs when aluminum powder is combined with a metal oxide. The two or more materials that are to be combined are placed together with a special crucible. The combination of aluminum powder and metal oxide is then ignited. This sets off the chemical reaction. The heat from this chemical reaction melts the powders. The molten metal flows down the crucible and melts the materials to be welded. Once the chemical reaction is finished, the metal solidifies. The crucible is removed and the slag and excess metal is cleaned up.</strong></p>\r\n'),
(19, 'EEC & Bentonite Powder', 'image1690437602582earthing-images.jpg', 'backgroundImage1690870878622compound-slider.jpeg', '<p><strong>Acme EEC is developed to enhance the conductivity, it reduces the earthing resistance in all kind of soil (Rocky, Sandy and any low Moisture) areas. The characteristic of the earthing system is dependent on the nature of soil. In an ideal earthing system, the resistance must be kept as low possible to provide safe way for fault current. Acme EEC major element contains mainly: Ti, Na, Mg, Ca, C and so on. This is mixture of natural minerals which in non hazardous for human being. Applied to high earth resistivity rainy soil loss area.Corrosion free and average life span: 20 to 30years.</strong></p>\r\n'),
(20, 'Earth Pit Covers', 'image1690439119156earthing-images.jpg', 'backgroundImage1690870863383PIT-COVER-SLIDER.jpg', '<p><strong>We are Manufacturer, Supplier and Exporter of Earth Pit Cover, FRP Earth Pit Cover, PVC Earth Pit Cover, RCC Earth Pit Chamber and CI Earth Pit Chamber. Earth Pit Cover are basically used to maintain hygienic environment and to cover earthing terminations. These are also required to verify and to register ground resistance data. Installation of these Earth Pit Covers at construction sites helps to save construction charge. Earth Pit Covers, FRP Earth Pit Cover, PVC Earth Pit Cover, are acknowledged for their longevity, excellent toughness level and ability to endure heavy load. These included features such as protection, environmental friendliness, light weight, and high efficiency. It is waterproof, chemically resistant, and has a long lifespan of at least 20 years..</strong></p>\r\n'),
(21, 'Discharge Rods', 'image1690439148473earthing-images.jpg', 'backgroundImage1690870830168discharge-rods-slider.jpg', '<p><strong>FRP discharge rod used for in all sectors like Railways, Industries, Power Houses ets. We, Ashima Electrotech Private Limited, are offering wide range of varieties in Earth Discharge Rods. We are doing this business since many years with extreme loyalty and honesty. We put our customer&#39;s satisfaction in our top priority.</strong></p>\r\n'),
(27, 'Direct Current Distribution box', 'image1690960728477earthing-images.jpg', 'backgroundImage1690960728478dcdb-slider.jpg', '');

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
-- Table structure for table `technologies_list`
--

CREATE TABLE `technologies_list` (
  `id` int(11) NOT NULL,
  `generateId` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `title` varchar(50) NOT NULL,
  `status` int(11) NOT NULL,
  `slug` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `technologies_list`
--

INSERT INTO `technologies_list` (`id`, `generateId`, `image`, `title`, `status`, `slug`) VALUES
(14, '96552', 'image1690443732745rvpnl.jpg', 'RVUNL', 1, 'rvunl'),
(15, '492696', 'image1690443782399jjm.jpg', 'JJM UP', 1, 'jjm-up'),
(16, '343518', 'image1690443808936housing-board.jpg', 'RBH', 1, 'rbh'),
(17, '659323', 'image1690443870819DD.jpg', 'Doordarshan', 1, 'doordarshan'),
(18, '191220', 'image1690443921955indian-railway.jpg', 'Indian Railways', 1, 'indian-railways'),
(19, '796211', 'image1690444010909tata.jpg', 'Tata Power', 1, 'tata-power'),
(20, '183571', 'image1690444511369SBI.jpg', 'SBI Bank', 1, 'sbi-bank'),
(21, '538328', 'image1690444576647Jio.jpg', 'Reliance JIO', 1, 'reliance-jio'),
(22, '290037', 'image1690444604085maruti.jpg', 'Maruti', 1, 'maruti'),
(23, '515509', 'image1690444633198berger-paint.jpg', 'Berger Paint', 1, 'berger-paint'),
(24, '132789', 'image1690444669154HDFC-Bank.jpg', 'HDFC Bank', 1, 'hdfc-bank'),
(25, '484358', 'image1690444701688au-bank.jpg', 'AU Bank', 1, 'au-bank'),
(26, '330636', 'image1690444774991Bharti.jpg', 'Prasar Bharti', 1, 'prasar-bharti'),
(27, '121692', 'image1690444812996HCL.jpg', 'HCL', 1, 'hcl'),
(28, '158570', 'image1690444842018Eicher.jpg', 'Eicher', 1, 'eicher'),
(29, '287535', 'image1690444892346mahindra.jpg', 'Tech Mahindra', 1, 'tech-mahindra'),
(30, '57823', 'image1690444959117shree-cemant.jpg', 'Shree Cement', 1, 'shree-cement'),
(31, '772254', 'image1690445156910wonder-cemant.jpg', 'Wonder Cement', 1, 'wonder-cement'),
(32, '473192', 'image1690445223183pnb.jpg', 'PNB Bank', 1, 'pnb-bank'),
(33, '324466', 'image1690445409664icici.jpg', 'ICICI Bank', 1, 'icici-bank');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applyjob`
--
ALTER TABLE `applyjob`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `broshure`
--
ALTER TABLE `broshure`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contectus`
--
ALTER TABLE `contectus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `current_opning`
--
ALTER TABLE `current_opning`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offering`
--
ALTER TABLE `offering`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `solutions`
--
ALTER TABLE `solutions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `solutionscategory`
--
ALTER TABLE `solutionscategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_admin`
--
ALTER TABLE `tb_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `technologies_list`
--
ALTER TABLE `technologies_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applyjob`
--
ALTER TABLE `applyjob`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `broshure`
--
ALTER TABLE `broshure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `contectus`
--
ALTER TABLE `contectus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `current_opning`
--
ALTER TABLE `current_opning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `offering`
--
ALTER TABLE `offering`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `solutions`
--
ALTER TABLE `solutions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `solutionscategory`
--
ALTER TABLE `solutionscategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `technologies_list`
--
ALTER TABLE `technologies_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
