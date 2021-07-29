-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2021 at 07:21 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gmc`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Designation` varchar(255) NOT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `Name`, `Email`, `Username`, `Password`, `Designation`, `Department`, `Role`) VALUES
(1, 'BBA', 'Hurairahmalik5156558@gmail.com', 'BBA', 'BBA12345', 'HOD', 'BBA', 'Professor'),
(2, 'Botany', 'Hurairahmalik5156558@gmail.com', 'Botany', 'Botany12345', 'HOD', 'Botany', 'Professor'),
(3, 'Chemistry', 'Hurairahmalik5156558@gmail.com', 'Chemistry', 'Chemistry12345', 'HOD', 'Chemistry', 'Professor'),
(4, 'Economics', 'Hurairahmalik5156558@gmail.com', 'Economics', 'Economics12345', 'HOD', 'Economics', 'Professor'),
(5, 'Arif Mehmood', 'Hurairahmalik5156558@gmail.com', 'English', 'English12345', 'HOD', 'English', 'Professor'),
(6, 'Physics', 'Hurairahmalik5156558@gmail.com', 'Physics', 'Physics12345', 'HOD', 'Physics', 'Professor'),
(7, 'Iqbal Roy', 'Hurairahmalik5156558@gmail.com', 'Political Science', 'Political Science12345', 'HOD', 'Political Science', 'Professor'),
(8, 'Psychology', 'Hurairahmalik5156558@gmail.com', 'Psychology', 'Psychology12345', 'HOD', 'Psychology', 'Professor'),
(9, 'Abdul Naheed', 'Hurairahmalik5156558@gmail.com', 'Mathematics', 'Mathematics12345', 'HOD', 'Mathematics', 'Professor'),
(10, 'Chohan', 'Hurairahmalik5156558@gmail.com', 'Statistics', 'Statistics12345', 'HOD', 'Statistics', 'Professor'),
(11, 'Sohail Babar', 'Hurairahmalik5156558@gmail.com', 'Information Technology', 'Information Technology12345', 'HOD', 'Information Technology', 'Professor'),
(12, 'Nadeem', 'Hurairahmalik5156558@gmail.com', 'Islamiyat', 'Islamiyat12345', 'HOD', 'Islamiyat', 'Professor'),
(13, 'Urdu', 'Hurairahmalik5156558@gmail.com', 'Urdu', 'Urdu12345', 'HOD', 'Urdu', 'Professor'),
(14, 'Zoology', 'Hurairahmalik5156558@gmail.com', 'Zoology', 'Zoology12345', 'HOD', 'Zoology', 'Professor'),
(15, 'Ahsan Ilyas', 'Hurairahmalik5156558@gmail.com', 'SSIO', 'SSIO12345', 'SSIO', 'All', 'Associate Professor'),
(16, 'Sardar', 'Hurairahmalik5156558@gmail.com', 'RO', 'RO12345', 'RO', 'All', 'Assistant Professor'),
(19, 'Hurairah', 'Hurairahmalik5156558@gmail.com', 'Hurairah', 'Hurairah', 'Teacher', 'Information Technology', 'Lecturer'),
(20, 'Ramzan', 'Hurairahmalik5156558@gmail.com', 'AO', 'AO12345', 'AO', 'All', 'CTI'),
(26, 'Cheema', 'hurairahmalik5156558@gmail.com', 'Cheema', 'Cheema', 'Teacher', 'BBA', 'Lecturer');

-- --------------------------------------------------------

--
-- Table structure for table `admission_control`
--

CREATE TABLE `admission_control` (
  `Open` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admission_control`
--

INSERT INTO `admission_control` (`Open`) VALUES
('Open');

-- --------------------------------------------------------

--
-- Table structure for table `admission_form`
--

CREATE TABLE `admission_form` (
  `id` int(11) NOT NULL,
  `Full_Name` varchar(255) DEFAULT NULL,
  `Father_Name` varchar(255) DEFAULT NULL,
  `Gender` varchar(30) DEFAULT NULL,
  `CNIC` varchar(30) DEFAULT NULL,
  `DOB` varchar(30) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(30) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Shift` varchar(255) DEFAULT NULL,
  `Matric_Roll` varchar(255) DEFAULT NULL,
  `Matric_Total_Marks` varchar(255) DEFAULT NULL,
  `Matric_Obtained_Marks` varchar(255) DEFAULT NULL,
  `Matric_Year` varchar(255) DEFAULT NULL,
  `Matric_Board` varchar(255) DEFAULT NULL,
  `Inter_Roll` varchar(255) DEFAULT NULL,
  `Inter_Total_Marks` varchar(255) DEFAULT NULL,
  `Inter_Obtained_Marks` varchar(255) DEFAULT NULL,
  `Inter_Year` varchar(255) DEFAULT NULL,
  `Inter_Board` varchar(255) DEFAULT NULL,
  `merit` varchar(255) DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `Admission_Time` varchar(255) DEFAULT NULL,
  `Year` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admission_form`
--

INSERT INTO `admission_form` (`id`, `Full_Name`, `Father_Name`, `Gender`, `CNIC`, `DOB`, `Email`, `Phone`, `Address`, `Department`, `Shift`, `Matric_Roll`, `Matric_Total_Marks`, `Matric_Obtained_Marks`, `Matric_Year`, `Matric_Board`, `Inter_Roll`, `Inter_Total_Marks`, `Inter_Obtained_Marks`, `Inter_Year`, `Inter_Board`, `merit`, `Status`, `Admission_Time`, `Year`) VALUES
(10948, 'Abu Hurairah', 'Malik Karam Alahi', 'Male', '3460118984387', '2021-07-30', 'hurairahmalik5156558@gmail.com', '03075156558', 'Daska', 'Information Technology', 'Morning', '123', '1100', '845', '2015', 'Guj', '321', '1100', '731', '2017', 'Guj', '69.56363636363636', 'WhiteList', '2021-07-28 21:12:08.020', '2021'),
(10949, 'Abu Hurairah', 'Malik Karam Alahi', 'Male', '3460118984387', '2021-07-30', 'hurairahmalik5156558@gmail.com', '03075156558', 'Daska', 'Information Technology', 'Morning', '123', '1100', '845', '2015', 'Guj', '321', '1100', '731', '2017', 'Guj', '73.70909090909092', 'WhiteList', '2021-07-28 21:14:52.335', '2021'),
(10950, 'Abu Hurairah', 'Malik Karam Alahi', 'Male', '3460118984387', '2021-07-30', 'hurairahmalik5156558@gmail.com', '03075156558', 'Daska', 'Information Technology', 'Morning', '123', '1100', '500', '2015', 'Guj', '321', '1100', '500', '2017', 'Guj', '45.45454545454545', 'WhiteList', '2021-07-28 21:17:00.762', '2021'),
(10951, 'Abu Hurairah', 'Malik Karam Alahi', 'Male', '3460118984387', '2021-07-30', 'hurairahmalik5156558@gmail.com', '03075156558', 'Daska', 'Information Technology', 'Evening', '123', '1100', '500', '2015', 'Guj', '321', '1100', '500', '2017', 'Guj', '45.45454545454545', 'WhiteList', '2021-07-28 21:18:30.952', '2021'),
(10952, 'Abu Hurairah', 'Malik Karam Alahi', 'Male', '3460118984387', '2021-07-30', 'hurairahmalik5156558@gmail.com', '03075156558', 'Daska', 'Information Technology', 'Evening', '123', '1100', '845', '2015', 'Guj', '321', '1100', '731', '2017', 'Guj', '73.70909090909092', 'WhiteList', '2021-07-28 21:18:38.617', '2021');

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `Subject` varchar(255) DEFAULT NULL,
  `Announcement` longtext DEFAULT NULL,
  `Timing` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `Subject`, `Announcement`, `Timing`) VALUES
(14, 'Admissions', 'Admissions will open in August', '2021-07-09T00:03:31.336Z'),
(15, 'Dummy', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one ', '2021-07-09T00:04:09.924Z'),
(17, 'Admissions', 'Admissions will open in August', '2021-07-09T00:14:39.408Z');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `Roll` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Attendance` varchar(255) DEFAULT NULL,
  `Course_Title` varchar(255) DEFAULT NULL,
  `Course_Code` varchar(255) DEFAULT NULL,
  `Instructor` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Semester` varchar(255) DEFAULT NULL,
  `Fall_Spring` varchar(255) DEFAULT NULL,
  `Shift` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `Roll`, `Name`, `Attendance`, `Course_Title`, `Course_Code`, `Instructor`, `Department`, `Semester`, `Fall_Spring`, `Shift`) VALUES
(46, '17651556-016', 'Aaqil', '50', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(47, '17651556-043', 'Aarif', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(48, '17651556-015', 'Abbas', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(49, '17651556-045', 'Abdul Aalee', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(50, '17651556-054', 'Abdul Azim', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(51, '17651556-038', 'Abdul Baari', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(52, '17651556-048', 'Abdul Ghafoor', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(53, '17651556-038', 'Abdul Hakeem', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(54, '17651556-053', 'Abdul Haq', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(55, '17651556-026', 'Abdul Muiz', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(56, '17651556-019', 'Abdul Muti', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(57, '17651556-051', 'Abdul Qadir', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(58, '17651556-028', 'Abdul Qayyum', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(59, '36', 'Abu Hurairah', '90', 'DB', 'IT-245', 'Sohail Babar', 'Information Technology', '3', 'Fall-2021', 'Morning');

-- --------------------------------------------------------

--
-- Table structure for table `attendance_unique`
--

CREATE TABLE `attendance_unique` (
  `id` int(11) NOT NULL,
  `Instructor` varchar(255) DEFAULT NULL,
  `Course_Title` varchar(255) DEFAULT NULL,
  `Course_Code` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Shift` varchar(255) DEFAULT NULL,
  `Semester` varchar(255) DEFAULT NULL,
  `Fall_Spring` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance_unique`
--

INSERT INTO `attendance_unique` (`id`, `Instructor`, `Course_Title`, `Course_Code`, `Department`, `Shift`, `Semester`, `Fall_Spring`) VALUES
(6, 'BBA', 'Data Structure', 'IT-209', 'BBA', 'Morning', '1', 'Fall-2021'),
(7, 'Sohail Babar', 'DB', 'IT-245', 'Information Technology', 'Morning', '3', 'Fall-2021');

-- --------------------------------------------------------

--
-- Table structure for table `awardlist`
--

CREATE TABLE `awardlist` (
  `id` int(11) NOT NULL,
  `Roll` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Mids` varchar(255) DEFAULT NULL,
  `Sessional` varchar(255) DEFAULT NULL,
  `Course_Title` varchar(255) DEFAULT NULL,
  `Course_Code` varchar(255) DEFAULT NULL,
  `Instructor` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Semester` varchar(255) DEFAULT NULL,
  `Fall_Spring` varchar(255) DEFAULT NULL,
  `Shift` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `awardlist`
--

INSERT INTO `awardlist` (`id`, `Roll`, `Name`, `Mids`, `Sessional`, `Course_Title`, `Course_Code`, `Instructor`, `Department`, `Semester`, `Fall_Spring`, `Shift`) VALUES
(1104, '17651556-016', 'Aaqil', 'df', 'df', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1105, '17651556-043', 'Aarif', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1106, '17651556-015', 'Abbas', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1107, '17651556-045', 'Abdul Aalee', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1108, '17651556-054', 'Abdul Azim', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1109, '17651556-038', 'Abdul Baari', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1110, '17651556-048', 'Abdul Ghafoor', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1111, '17651556-038', 'Abdul Hakeem', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1112, '17651556-053', 'Abdul Haq', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1113, '17651556-026', 'Abdul Muiz', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1114, '17651556-019', 'Abdul Muti', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1115, '17651556-051', 'Abdul Qadir', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1116, '17651556-028', 'Abdul Qayyum', '', '', 'Data Structure', 'IT-209', 'BBA', 'BBA', '1', 'Fall-2021', 'Morning'),
(1117, '36', 'Abu Hurairah', '65', '36', 'DB', 'IT-245', 'Sohail Babar', 'Information Technology', '1', 'Fall-2021', 'Morning');

-- --------------------------------------------------------

--
-- Table structure for table `awardlist_unique`
--

CREATE TABLE `awardlist_unique` (
  `id` int(11) NOT NULL,
  `Instructor` varchar(255) DEFAULT NULL,
  `Course_Title` varchar(255) DEFAULT NULL,
  `Course_Code` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Shift` varchar(255) DEFAULT NULL,
  `Semester` varchar(255) DEFAULT NULL,
  `Fall_Spring` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `awardlist_unique`
--

INSERT INTO `awardlist_unique` (`id`, `Instructor`, `Course_Title`, `Course_Code`, `Department`, `Shift`, `Semester`, `Fall_Spring`) VALUES
(21, 'BBA', 'Data Structure', 'IT-209', 'BBA', 'Morning', '1', 'Fall-2021'),
(22, 'Sohail Babar', 'DB', 'IT-245', 'Information Technology', 'Morning', '1', 'Fall-2021');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `Course_Title` varchar(255) DEFAULT NULL,
  `Course_Code` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `Course_Title`, `Course_Code`, `Department`) VALUES
(6, 'Data Structure', 'IT-209', 'BBA'),
(7, 'DCN', 'IT-213', 'BBA'),
(8, 'PKS', 'MCM-101', 'BBA'),
(10, 'DB', 'IT-245', 'Information Technology');

-- --------------------------------------------------------

--
-- Table structure for table `datesheet`
--

CREATE TABLE `datesheet` (
  `id` int(11) NOT NULL,
  `Course_Title` varchar(255) DEFAULT NULL,
  `Course_Code` varchar(255) DEFAULT NULL,
  `Instructor` varchar(255) DEFAULT NULL,
  `Instructor_Department` varchar(255) DEFAULT NULL,
  `Semester` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Shift` varchar(255) DEFAULT NULL,
  `Time_Slot` varchar(255) DEFAULT NULL,
  `Fall_Spring` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `datesheet`
--

INSERT INTO `datesheet` (`id`, `Course_Title`, `Course_Code`, `Instructor`, `Instructor_Department`, `Semester`, `Department`, `Shift`, `Time_Slot`, `Fall_Spring`) VALUES
(18, 'Data Structures', 'IT-209', 'Aadil', NULL, '3', 'BBA', 'Evening', '8:30 AM to 9:20 AM', 'Fall-2021'),
(22, 'DCN', 'IT-213', 'Aadil', NULL, '1', 'BBA', 'Evening', '9:20 AM to 10:10 AM', 'Fall-2021'),
(23, 'Data Structure', 'IT-209', 'Aadil', NULL, '1', 'BBA', 'Morning', '8:30 AM to 9:20 AM', 'Fall-2021'),
(24, 'Data Structure', 'IT-209', 'Aadil', NULL, '1', 'BBA', 'Morning', '8:30 AM to 9:20 AM', 'Fall-2021'),
(27, 'Data Structure', 'IT-209', 'Aadil', NULL, '1', 'BBA', 'Evening', '8:30 AM to 9:20 AM', 'Fall-2021'),
(29, 'DB', 'IT-245', 'Cheema', 'BBA', '1', 'Information Technology', 'Morning', '8:30 AM to 9:20 AM', 'Fall-2021'),
(30, 'DB', 'IT-245', 'Hurairah', 'Information Technology', '5', 'Information Technology', 'Evening', '9:20 AM to 10:10 AM', 'Fall-2021');

-- --------------------------------------------------------

--
-- Table structure for table `fall_spring`
--

CREATE TABLE `fall_spring` (
  `Fall_Spring` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fall_spring`
--

INSERT INTO `fall_spring` (`Fall_Spring`) VALUES
('Fall-2021');

-- --------------------------------------------------------

--
-- Table structure for table `fee_record`
--

CREATE TABLE `fee_record` (
  `id` int(11) NOT NULL,
  `Roll` varchar(255) DEFAULT NULL,
  `Full_Name` varchar(255) DEFAULT NULL,
  `Father_Name` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Semester` varchar(255) DEFAULT NULL,
  `Shift` varchar(255) DEFAULT NULL,
  `Fee_Status` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Original_id` int(11) DEFAULT NULL,
  `Fall_Spring` varchar(255) DEFAULT NULL,
  `Time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fee_record`
--

INSERT INTO `fee_record` (`id`, `Roll`, `Full_Name`, `Father_Name`, `Department`, `Semester`, `Shift`, `Fee_Status`, `Phone`, `Original_id`, `Fall_Spring`, `Time`) VALUES
(696, '32', 'Abu Hurairah', 'Malik Karam Alahi', 'Information Technology', '4', 'Morning', 'Paid', '03075156558', 14024, 'Fall-2021', '2021-07-29 11:18:57.078'),
(697, '36', 'Abu Hurairah', 'Malik Karam Alahi', 'Information Technology', '1', 'Evening', 'Paid', '03075156558', 14025, 'Fall-2021', '2021-07-29 11:18:57.078');

-- --------------------------------------------------------

--
-- Table structure for table `instructors`
--

CREATE TABLE `instructors` (
  `id` int(11) NOT NULL,
  `Instructor` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructors`
--

INSERT INTO `instructors` (`id`, `Instructor`, `Department`) VALUES
(1, 'Sir Ehtesham', 'Information Technology'),
(2, 'Sir Touseef', 'Information Technology'),
(3, 'Sir Ahsan Ilyas', 'Economics'),
(4, 'Sir Tehsin', 'English'),
(61, 'Aadil', 'BBA'),
(62, 'Aafiya', 'BBA'),
(63, 'Aahil', 'BBA'),
(64, 'Aalam', 'BBA'),
(65, 'Aalee', 'Botany'),
(66, 'Aalim', 'Botany'),
(67, 'Aamil', 'Botany'),
(68, 'Aamir', 'Botany'),
(69, 'Aamirah', 'Chemistry'),
(70, 'Aaqib', 'Chemistry'),
(71, 'Aaqil', 'Chemistry'),
(72, 'Aarif', 'Chemistry'),
(73, 'Aariz', 'Economics'),
(74, 'Aashif', 'Economics'),
(75, 'Aashir', 'Economics'),
(76, 'Aasif', 'Economics'),
(77, 'Aasim', 'English'),
(78, 'Aatif', 'English'),
(79, 'Aazim', 'English'),
(80, 'Abaan', 'English'),
(81, 'Aban', 'Physics'),
(82, 'Abbas', 'Physics'),
(83, 'Abbud', 'Physics'),
(84, 'Abbudin', 'Physics'),
(85, 'Abd Al-Ala', 'Political Science'),
(86, 'Abdul Aalee', 'Political Science'),
(87, 'Abdul Adl', 'Political Science'),
(88, 'Abdul Afuw', 'Political Science'),
(89, 'Abdul Ahad', 'Psychology'),
(90, 'Abdul Aleem', 'Psychology'),
(91, 'Abdul Ali', 'Psychology'),
(92, 'Abdul Alim', 'Psychology'),
(93, 'Abdul Aliyy', 'Mathematics'),
(94, 'Abdul Awwal', 'Mathematics'),
(95, 'Abdul Azeez', 'Mathematics'),
(96, 'Abdul Azim', 'Mathematics'),
(97, 'Abdul Aziz', 'Statistics'),
(98, 'Abdul Baari', 'Statistics'),
(99, 'Abdul Baasit', 'Statistics'),
(100, 'Abdul Badee', 'Statistics'),
(101, 'Abdul Badi', 'Information Technology'),
(102, 'Abdul Baith', 'Information Technology'),
(103, 'Abdul Baqi', 'Information Technology'),
(104, 'Abdul Bari', 'Information Technology'),
(105, 'Abdul Barr', 'Islamiyat'),
(106, 'Abdul Baseer', 'Islamiyat'),
(107, 'Abdul Basir', 'Islamiyat'),
(108, 'Abdul Basit', 'Islamiyat'),
(109, 'Abdul Batin', 'Urdu'),
(110, 'Abdul Fattah', 'Urdu'),
(111, 'Abdul Ghafaar', 'Urdu'),
(112, 'Abdul Ghaffar', 'Urdu'),
(113, 'Abdul Ghafoor', 'Zoology'),
(114, 'Abdul Ghafur', 'Zoology'),
(115, 'Abdul Ghani', 'Zoology'),
(116, 'Abdul Hadi', 'Zoology');

-- --------------------------------------------------------

--
-- Table structure for table `meritlist_controller`
--

CREATE TABLE `meritlist_controller` (
  `id` int(11) NOT NULL,
  `MeritList` longtext DEFAULT NULL,
  `NOS_Start` varchar(255) DEFAULT NULL,
  `NOS_End` varchar(255) DEFAULT NULL,
  `Display` tinyint(1) DEFAULT NULL,
  `Department` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meritlist_controller`
--

INSERT INTO `meritlist_controller` (`id`, `MeritList`, `NOS_Start`, `NOS_End`, `Display`, `Department`) VALUES
(45, '1st Merit List', '1', '55', 1, 'BBA'),
(46, '', '0', '0', 0, 'Botany'),
(47, '', '0', '0', 0, 'Chemistry'),
(48, '', '0', '0', 0, 'Economics'),
(49, '', '0', '0', 0, 'English'),
(50, '', '0', '0', 0, 'Physics'),
(51, '', '0', '0', 0, 'Political Science'),
(52, '', '0', '0', 0, 'Psychology'),
(53, '', '0', '0', 0, 'Mathematics'),
(54, '', '0', '0', 0, 'Statistics'),
(55, '1st Merit List', '1', '5', 1, 'Information Technology'),
(56, '', '0', '0', 0, 'Islamiyat'),
(57, '', '0', '0', 0, 'Urdu'),
(58, '', '0', '0', 0, 'Zoology');

-- --------------------------------------------------------

--
-- Table structure for table `meritlist_controller2`
--

CREATE TABLE `meritlist_controller2` (
  `id` int(11) NOT NULL,
  `MeritList` varchar(255) DEFAULT NULL,
  `NOS_Start` varchar(255) DEFAULT NULL,
  `NOS_End` varchar(255) DEFAULT NULL,
  `Display` tinyint(50) DEFAULT NULL,
  `Department` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meritlist_controller2`
--

INSERT INTO `meritlist_controller2` (`id`, `MeritList`, `NOS_Start`, `NOS_End`, `Display`, `Department`) VALUES
(1, '1st Merit List', '1', '55', 1, 'BBA'),
(2, '', '0', '0', 0, 'Botany'),
(3, '', '0', '0', 0, 'Chemistry'),
(4, '', '0', '0', 0, 'Economics'),
(5, '', '0', '0', 0, 'English'),
(6, '', '0', '0', 0, 'Physics'),
(7, '', '0', '0', 0, 'Political Science'),
(8, '', '0', '0', 0, 'Psychology'),
(9, '', '0', '0', 0, 'Mathematics'),
(10, '', '0', '0', 0, 'Statistics'),
(11, '1st Merit List', '1', '5', 1, 'Information Technology'),
(12, '', '0', '0', 0, 'Islamiyat'),
(13, '', '0', '0', 0, 'Urdu'),
(14, '', '0', '0', 0, 'Zoology');

-- --------------------------------------------------------

--
-- Table structure for table `merit_list`
--

CREATE TABLE `merit_list` (
  `id` int(11) NOT NULL,
  `MeritList` longtext NOT NULL,
  `MeritList2` longtext NOT NULL,
  `MeritList3` longtext NOT NULL,
  `NOS` int(11) NOT NULL,
  `Department` varchar(50) NOT NULL,
  `Display` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `merit_list`
--

INSERT INTO `merit_list` (`id`, `MeritList`, `MeritList2`, `MeritList3`, `NOS`, `Department`, `Display`) VALUES
(57, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'BBA', 'False'),
(58, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Botany', 'False'),
(59, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Chemistry', 'False'),
(60, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Economics', 'False'),
(61, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'English', 'False'),
(62, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Physics', 'False'),
(63, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Political Science', 'False'),
(64, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Psychology', 'False'),
(65, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Mathematics', 'False'),
(66, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Statistics', 'False'),
(67, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Information Technology', 'False'),
(68, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Islamiyat', 'False'),
(69, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Urdu', 'False'),
(70, '1st Merit List', '2nd Merit List', '3rd Merit List', 55, 'Zoology', 'False');

-- --------------------------------------------------------

--
-- Table structure for table `merit_list_formula`
--

CREATE TABLE `merit_list_formula` (
  `Matric` varchar(255) DEFAULT NULL,
  `Inter` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `merit_list_formula`
--

INSERT INTO `merit_list_formula` (`Matric`, `Inter`) VALUES
('70', '30');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('2WT_06plC0yqPdfR0y3LIypuXOmUkCw2', 1627735693, '{\"cookie\":{\"originalMaxAge\":1314000000,\"expires\":\"2021-07-31T12:34:02.359Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"hod\":{\"id\":20,\"Name\":\"Ramzan\",\"Email\":\"Hurairahmalik5156558@gmail.com\",\"Username\":\"AO\",\"Password\":\"AO12345\",\"Designation\":\"AO\",\"Department\":\"All\"}}'),
('3iv1HzY2g-IvJFqXpGdQ019x0uKEECvO', 1628803474, '{\"cookie\":{\"originalMaxAge\":1314000000,\"expires\":\"2021-08-12T21:16:02.226Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"hod\":{\"id\":11,\"Name\":\"Sohail Babar\",\"Email\":\"Hurairahmalik5156558@gmail.com\",\"Username\":\"Information Technology\",\"Password\":\"Information Technology12345\",\"Designation\":\"HOD\",\"Department\":\"Information Technology\",\"Role\":\"Professor\"}}'),
('9aOKo08tcxlaKjpTUpZ0ZRU7iM1tS57k', 1627767612, '{\"cookie\":{\"originalMaxAge\":1314000000,\"expires\":\"2021-07-31T21:40:06.335Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"hod\":{\"id\":20,\"Name\":\"Ramzan\",\"Email\":\"Hurairahmalik5156558@gmail.com\",\"Username\":\"AO\",\"Password\":\"AO12345\",\"Designation\":\"AO\",\"Department\":\"All\"}}'),
('K7EhXMT0Ob1rqQ3pARdcPlZuz260g41V', 1628283287, '{\"cookie\":{\"originalMaxAge\":1314000000,\"expires\":\"2021-08-06T20:54:46.873Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"hod\":{\"id\":12800,\"Roll\":\"17651556-011\",\"Full_Name\":\"Adel\",\"Father_Name\":\"Father_Name\",\"Gender\":\"Female\",\"CNIC\":\"3460163598769\",\"DOB\":\"05-29-2022\",\"Email\":\"hurairah@558\",\"Phone\":\"03015696326\",\"Address\":\"Daska\",\"Department\":\"Botany\",\"Matric_Roll\":\"369565\",\"Matric_Total\":\"1100\",\"Matric_Obtained_Marks\":\"627\",\"Matric_Year\":\"2021\",\"Matric_Board\":\"Guj\",\"Inter_Roll\":\"369865\",\"Inter_Total\":\"1100\",\"Inter_Obtained_Marks\":\"627\",\"Inter_Year\":\"2021\",\"Inter_Board\":\"Guj\",\"Semester\":\"8\",\"Fee_Status\":\"Unpaid\",\"Status\":\"Active\",\"Degree_Status\":\"Continue\",\"Courses\":\"\",\"Shift\":\"Morning\",\"Admission_Time\":\"2021-07-22 20:20:49.814431\",\"Year\":\"2022\",\"Password\":\"Hurairah\",\"Designation\":\"Student\"}}'),
('WCs57Dg-Vu1w64YVI9F9p-po3d5T22PZ', 1628282602, '{\"cookie\":{\"originalMaxAge\":1314000000,\"expires\":\"2021-08-06T20:43:21.579Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"hod\":{\"id\":12800,\"Roll\":\"17651556-011\",\"Full_Name\":\"Adel\",\"Father_Name\":\"Father_Name\",\"Gender\":\"Female\",\"CNIC\":\"3460163598769\",\"DOB\":\"05-29-2022\",\"Email\":\"hurairah@558\",\"Phone\":\"03015696326\",\"Address\":\"Daska\",\"Department\":\"Botany\",\"Matric_Roll\":\"369565\",\"Matric_Total\":\"1100\",\"Matric_Obtained_Marks\":\"627\",\"Matric_Year\":\"2021\",\"Matric_Board\":\"Guj\",\"Inter_Roll\":\"369865\",\"Inter_Total\":\"1100\",\"Inter_Obtained_Marks\":\"627\",\"Inter_Year\":\"2021\",\"Inter_Board\":\"Guj\",\"Semester\":\"8\",\"Fee_Status\":\"Unpaid\",\"Status\":\"Active\",\"Degree_Status\":\"Continue\",\"Courses\":\"\",\"Shift\":\"Morning\",\"Admission_Time\":\"2021-07-22 20:20:49.814431\",\"Year\":\"2022\",\"Password\":\"Hurairah\",\"Designation\":\"Student\"}}'),
('Y5-Ek_HuHKQvNmr1LoOUWrzVfVlaxHHu', 1628253118, '{\"cookie\":{\"originalMaxAge\":1314000000,\"expires\":\"2021-08-06T11:40:34.924Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"hod\":{\"id\":15,\"Name\":\"Ahsan Ilyas\",\"Email\":\"Hurairahmalik5156558@gmail.com\",\"Username\":\"SSIO\",\"Password\":\"SSIO12345\",\"Designation\":\"SSIO\",\"Department\":\"All\"}}'),
('bV41LY7GyH_5s5k6mkGhZMQKob3yt3Fq', 1628282333, '{\"cookie\":{\"originalMaxAge\":1314000000,\"expires\":\"2021-08-06T20:32:21.545Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"hod\":{\"id\":12800,\"Roll\":\"17651556-011\",\"Full_Name\":\"Adel\",\"Father_Name\":\"Father_Name\",\"Gender\":\"Female\",\"CNIC\":\"3460163598769\",\"DOB\":\"05-29-2022\",\"Email\":\"hurairah@558\",\"Phone\":\"03015696326\",\"Address\":\"Daska\",\"Department\":\"Botany\",\"Matric_Roll\":\"369565\",\"Matric_Total\":\"1100\",\"Matric_Obtained_Marks\":\"627\",\"Matric_Year\":\"2021\",\"Matric_Board\":\"Guj\",\"Inter_Roll\":\"369865\",\"Inter_Total\":\"1100\",\"Inter_Obtained_Marks\":\"627\",\"Inter_Year\":\"2021\",\"Inter_Board\":\"Guj\",\"Semester\":\"8\",\"Fee_Status\":\"Unpaid\",\"Status\":\"Active\",\"Degree_Status\":\"Continue\",\"Courses\":\"\",\"Shift\":\"Morning\",\"Admission_Time\":\"2021-07-22 20:20:49.814431\",\"Year\":\"2022\",\"Password\":\"Hurairah\",\"Designation\":\"Student\"}}'),
('yapsyyWV9g-BOiWhaQYLk95LdMSvgH5L', 1628452770, '{\"cookie\":{\"originalMaxAge\":1314000000,\"expires\":\"2021-08-08T07:56:15.402Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"hod\":{\"id\":20,\"Name\":\"Ramzan\",\"Email\":\"Hurairahmalik5156558@gmail.com\",\"Username\":\"AO\",\"Password\":\"AO12345\",\"Designation\":\"AO\",\"Department\":\"All\",\"Role\":\"CTI\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `Roll` varchar(255) DEFAULT NULL,
  `Full_Name` varchar(255) DEFAULT NULL,
  `Father_Name` varchar(255) DEFAULT NULL,
  `Gender` varchar(30) DEFAULT NULL,
  `CNIC` varchar(30) DEFAULT NULL,
  `DOB` varchar(30) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(30) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Matric_Roll` varchar(255) DEFAULT NULL,
  `Matric_Total` varchar(255) DEFAULT NULL,
  `Matric_Obtained_Marks` varchar(255) DEFAULT NULL,
  `Matric_Year` varchar(255) DEFAULT NULL,
  `Matric_Board` varchar(255) DEFAULT NULL,
  `Inter_Roll` varchar(255) DEFAULT NULL,
  `Inter_Total` varchar(255) DEFAULT NULL,
  `Inter_Obtained_Marks` varchar(255) DEFAULT NULL,
  `Inter_Year` varchar(255) DEFAULT NULL,
  `Inter_Board` varchar(255) DEFAULT NULL,
  `Semester` varchar(255) DEFAULT NULL,
  `Fee_Status` varchar(255) DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `Degree_Status` varchar(255) DEFAULT NULL,
  `Courses` varchar(255) DEFAULT NULL,
  `Shift` varchar(255) DEFAULT NULL,
  `Admission_Time` varchar(255) DEFAULT NULL,
  `Year` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Designation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `Roll`, `Full_Name`, `Father_Name`, `Gender`, `CNIC`, `DOB`, `Email`, `Phone`, `Address`, `Department`, `Matric_Roll`, `Matric_Total`, `Matric_Obtained_Marks`, `Matric_Year`, `Matric_Board`, `Inter_Roll`, `Inter_Total`, `Inter_Obtained_Marks`, `Inter_Year`, `Inter_Board`, `Semester`, `Fee_Status`, `Status`, `Degree_Status`, `Courses`, `Shift`, `Admission_Time`, `Year`, `Password`, `Designation`) VALUES
(14024, '17651556-018', 'Abu Hurairah', 'Malik Karam Alahi', 'Male', '3460118984387', '2021-07-30', 'hurairahmalik5156558@gmail.com', '03075156558', 'Daska', 'Information Technology', '123', '1100', '500', '2015', 'Guj', '321', '1100', '500', '2017', 'Guj', '4', 'Paid', 'Active', 'Continue', '', 'Morning', '2021-07-29 10:53:14.749', '2021', '5156558h', 'Student'),
(14025, '367', 'Abu Hurairah', 'Malik Karam Alahi', 'Male', '3460118984387', '2021-07-30', 'hurairahmalik558@gmail.com', '03075156558', 'Daska', 'Information Technology', '123', '1100', '845', '2015', 'Guj', '321', '1100', '731', '2017', 'Guj', '1', 'Paid', 'Active', 'Continue', 'IT-245:DB,', 'Evening', '2021-07-29 11:16:09.023', '2021', 'dqqvrm', 'Student');

-- --------------------------------------------------------

--
-- Table structure for table `timetable`
--

CREATE TABLE `timetable` (
  `id` int(11) NOT NULL,
  `Department` varchar(255) DEFAULT NULL,
  `Instructor` varchar(255) DEFAULT NULL,
  `Instructor_Designation` varchar(255) DEFAULT NULL,
  `Instructor_Department` varchar(255) DEFAULT NULL,
  `Course_Title` varchar(255) DEFAULT NULL,
  `Course_Code` varchar(255) DEFAULT NULL,
  `Semester` varchar(255) DEFAULT NULL,
  `Time_Slot` varchar(255) DEFAULT NULL,
  `Shift` varchar(255) DEFAULT NULL,
  `Fall_Spring` varchar(255) DEFAULT NULL,
  `Room_no` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timetable`
--

INSERT INTO `timetable` (`id`, `Department`, `Instructor`, `Instructor_Designation`, `Instructor_Department`, `Course_Title`, `Course_Code`, `Semester`, `Time_Slot`, `Shift`, `Fall_Spring`, `Room_no`) VALUES
(201, 'BBA', 'Sohail Babar', 'Professor', 'Information Technology', 'Data Structure', 'IT-209', '1', '8:30 AM to 9:20 AM', 'Morning', 'Fall-2021', '1'),
(203, 'Information Technology', 'Hurairah', 'Lecturer', 'Information Technology', 'DB', 'IT-245', '5', '11:50 AM to 12:40 PM', 'Morning', 'Fall-2021', '36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admission_form`
--
ALTER TABLE `admission_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance_unique`
--
ALTER TABLE `attendance_unique`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `awardlist`
--
ALTER TABLE `awardlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `awardlist_unique`
--
ALTER TABLE `awardlist_unique`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `datesheet`
--
ALTER TABLE `datesheet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fee_record`
--
ALTER TABLE `fee_record`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructors`
--
ALTER TABLE `instructors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meritlist_controller`
--
ALTER TABLE `meritlist_controller`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meritlist_controller2`
--
ALTER TABLE `meritlist_controller2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `merit_list`
--
ALTER TABLE `merit_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `timetable`
--
ALTER TABLE `timetable`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `admission_form`
--
ALTER TABLE `admission_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10953;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `attendance_unique`
--
ALTER TABLE `attendance_unique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `awardlist`
--
ALTER TABLE `awardlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1118;

--
-- AUTO_INCREMENT for table `awardlist_unique`
--
ALTER TABLE `awardlist_unique`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `datesheet`
--
ALTER TABLE `datesheet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `fee_record`
--
ALTER TABLE `fee_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=698;

--
-- AUTO_INCREMENT for table `instructors`
--
ALTER TABLE `instructors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `meritlist_controller`
--
ALTER TABLE `meritlist_controller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `meritlist_controller2`
--
ALTER TABLE `meritlist_controller2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `merit_list`
--
ALTER TABLE `merit_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14026;

--
-- AUTO_INCREMENT for table `timetable`
--
ALTER TABLE `timetable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
