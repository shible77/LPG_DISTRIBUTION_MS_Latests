-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2024 at 07:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lpg_distribution`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `account_name` varchar(100) NOT NULL,
  `account_type` varchar(100) NOT NULL,
  `account_number` varchar(100) NOT NULL,
  `short_description` varchar(200) NOT NULL,
  `initial_balance` int(20) NOT NULL,
  `net_balance` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `account_name`, `account_type`, `account_number`, `short_description`, `initial_balance`, `net_balance`) VALUES
(1, 'xyz-Account', 'Bank', 'Acc01778', 'Description-description', 1000000, 1000000);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `contact_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `full_address` varchar(100) NOT NULL,
  `district` varchar(50) NOT NULL,
  `contactType` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`contact_id`, `name`, `company_name`, `email`, `mobile`, `full_address`, `district`, `contactType`) VALUES
(1, 'H.M Imtiaz Uddin', 'Fresh LPG', 'hmimtiaz2@gmail.com', '01930534674', 'Agrabad', 'Chittagong', 'supplier'),
(3, 'Afif', 'Afif Enterprise', 'afif@gmail.com', '01511234598', 'Hathazari', 'Chittagong', 'customer'),
(4, 'Sakib', 'Omera LPG', 'sakib@gmail.com', '01698762742', 'Muradpur', 'Chittagong', 'supplier'),
(7, 'Tamjid', 'Shadakur Enterprise', 'shadakur@gmail.com', '01551987245', 'Jobra', 'Chittagong', 'customer'),
(8, 'Salauddin', 'Saka Enterprise', 'shible0805@gmail.com', '01719683640', 'Hill view', 'Chittagong', 'customer'),
(11, 'Emam', 'UniGas ', 'emam@gmail.com', '01819567432', 'Oxygen', 'Chittagong', 'supplier');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(10) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `present_address` varchar(50) NOT NULL,
  `parmanent_address` varchar(50) DEFAULT NULL,
  `mobile_no` varchar(50) DEFAULT NULL,
  `start_work` date NOT NULL,
  `stop_work` date DEFAULT NULL,
  `designation` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `salary` varchar(10) NOT NULL,
  `active_status` varchar(50) NOT NULL,
  `employee_image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `first_name`, `last_name`, `date_of_birth`, `present_address`, `parmanent_address`, `mobile_no`, `start_work`, `stop_work`, `designation`, `category`, `salary`, `active_status`, `employee_image`) VALUES
(4, 'Md.', 'Salauddin', '1999-09-28', 'Cosmopolitan R/A, Road no: 9, Chittagong', 'Shohagpur, Ashuganj, Brahmanbaria', '01738668434', '2024-01-27', NULL, 'Manager', 'Manegerial', '56000', 'off', 'https://res.cloudinary.com/doh71p23w/image/upload/v1706342655/a6kvls7q2akybiqfvmuj.jpg'),
(5, 'Emam', 'Hossain', '1999-09-07', 'Cosmopolitan R/A, Road No:9, Chittagong', 'Sonaimuri, Chatkhil, Noakhali', '01712233445', '2024-01-27', NULL, 'HR Manager', 'Managerial', '50000', 'On', 'https://res.cloudinary.com/doh71p23w/image/upload/v1706350150/c93aifdl35cwt4i65cj5.jpg'),
(6, 'H M Imtiaz', 'Uddin', '1999-10-07', 'Choumohoni, Agrabad, Chittagong', 'Choumohoni, Agrabad, Chittagong', '01823344556', '2024-01-28', NULL, 'HR Manager', 'Managerial', '45000', 'On', 'https://res.cloudinary.com/doh71p23w/image/upload/v1706422574/ihya9kfanokgdgdhnhg1.jpg'),
(7, 'Shadakur Rahman', 'Tamgid', '2002-05-01', 'Chittagong University', 'Chokoria, Chittagong', '01867453423', '2024-01-29', NULL, 'Operations Manager', 'Managerial', '45000', 'On', 'https://res.cloudinary.com/doh71p23w/image/upload/v1706502331/ufajq1w8tr3rofkvpwkp.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(10) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_type` varchar(50) NOT NULL,
  `product_category` varchar(50) NOT NULL,
  `unit` int(50) NOT NULL,
  `selling_price` int(50) NOT NULL,
  `brand` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_type`, `product_category`, `unit`, `selling_price`, `brand`) VALUES
(13, 'Omera 5.5 Kg Gas', 'single', 'Gas', 600, 650, 'Omera'),
(14, 'Omera 5.5 Kg Cylinder', 'single', 'Cylinder', 800, 850, 'Omera'),
(15, 'Omera 12 Kg Gas', 'single', 'Gas', 1200, 1250, 'Omera'),
(16, 'Omera 12 Kg Cylinder', 'single', 'Cylinder', 1400, 1450, 'Omera'),
(17, 'Omera 25 Kg Gas', 'single', 'Gas', 1500, 1550, 'Omera'),
(18, 'Omera 25 Kg Cylinder', 'single', 'Cylinder', 1700, 1750, 'Omera'),
(19, 'Omera 35 Kg Gas', 'single', 'Gas', 2000, 2050, 'Omera'),
(20, 'Omera 35 Kg Cylinder', 'single', 'Cylinder', 2200, 2250, 'Omera'),
(21, 'Omera 45 Kg Gas', 'single', 'Gas', 2500, 2550, 'Omera'),
(22, 'Omera 45 Kg Cylinder', 'single', 'Cylinder', 2700, 2750, 'Omera');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `purchase_id` int(11) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `location` varchar(100) NOT NULL,
  `supplier` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL,
  `gas_5_5` int(11) NOT NULL,
  `cyl_5_5` int(11) NOT NULL,
  `gas_12` int(11) NOT NULL,
  `cyl_12` int(11) NOT NULL,
  `gas_25` int(11) NOT NULL,
  `cyl_25` int(11) NOT NULL,
  `gas_35` int(11) NOT NULL,
  `cyl_35` int(11) NOT NULL,
  `gas_45` int(11) NOT NULL,
  `cyl_45` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`purchase_id`, `date`, `location`, `supplier`, `status`, `gas_5_5`, `cyl_5_5`, `gas_12`, `cyl_12`, `gas_25`, `cyl_25`, `gas_35`, `cyl_35`, `gas_45`, `cyl_45`, `total`) VALUES
(1, '2024-01-01', 'Chittagong', 'Omera-LPGD', 'Received', 10, 0, 40, 0, 12, 0, 0, 0, 0, 0, 72000),
(2, '2024-01-28', 'Chittagong', 'Omera-LPGD', 'Received', 45, 0, 30, 0, 12, 0, 0, 0, 0, 0, 81000);

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `sales_id` int(11) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `delivery_date` date NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `location` varchar(100) NOT NULL,
  `gas_5_5` int(11) NOT NULL,
  `cyl_5_5` int(11) NOT NULL,
  `gas_12` int(11) NOT NULL,
  `cyl_12` int(11) NOT NULL,
  `gas_25` int(11) NOT NULL,
  `cyl_25` int(11) NOT NULL,
  `gas_35` int(11) NOT NULL,
  `cyl_35` int(11) NOT NULL,
  `gas_45` int(11) NOT NULL,
  `cyl_45` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`sales_id`, `date`, `delivery_date`, `customer_name`, `location`, `gas_5_5`, `cyl_5_5`, `gas_12`, `cyl_12`, `gas_25`, `cyl_25`, `gas_35`, `cyl_35`, `gas_45`, `cyl_45`, `total`) VALUES
(4, '2024-01-22', '2024-01-22', 'Shahriad LPG Shop', 'Chittagong', 13, 0, 7, 0, 8, 0, 0, 0, 0, 0, 29600);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `stock_id` int(11) NOT NULL,
  `kg_5_5` int(11) NOT NULL,
  `kg_12` int(11) NOT NULL,
  `kg_25` int(11) NOT NULL,
  `kg_35` int(11) NOT NULL,
  `kg_45` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`stock_id`, `kg_5_5`, `kg_12`, `kg_25`, `kg_35`, `kg_45`, `total`) VALUES
(1, 20, 60, 20, 50, 10, 184);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Md. Salauddin', 'shible0805@gmail.com', '$2b$10$0Rhq0ntNZV1E01bPoGT9A.SiMYeeg4IPg3xL5os2nD4b1g8Wbybtq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`purchase_id`) USING BTREE;

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`sales_id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`stock_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `purchase_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `sales_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
