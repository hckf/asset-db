<?php

$dbhost = "localhost";
$username = "root";
$password = "";
$dbname = "assetdb";
$table = "assets";

// Connect to MySQL Server
$connect = mysqli_connect($dbhost, $username, $password, $dbname);
if ($connect->connect_error) {
  die('Could not connect: ' . $connect->connect_error);
}

// Retrieve data from the query string (see 'parameters' variable in JavaScript), escape the string to prevent SQL injection
if (isset($_POST['devicename'])) {
  $dname = mysqli_real_escape_string($connect, $_POST['devicename']);
  $dversion = mysqli_real_escape_string($connect, $_POST['deviceversion']);
  $snumber = mysqli_real_escape_string($connect, $_POST['serialnumber']);
  $dvalue = mysqli_real_escape_string($connect, $_POST['devicestatus']);

// Value for 'Device Status' changes based on list option value chosen
  switch($dvalue) {
    case 'option-storage':
      $dstatus = 'In Storage';
      break;
    case 'option-issued':
      $dstatus = 'Issued';
      break;
    case 'option-return':
      $dstatus = 'Due Return';
      break;
    case 'option-damaged':
      $dstatus = 'Damaged';
      break;
    case 'option-lost':
      $dstatus = 'Lost';
      break;
    default:
      $dstatus = 'Unknown';
      break;
  }

  $location = mysqli_real_escape_string($connect, $_POST['location']);
  $uissued = mysqli_real_escape_string($connect, $_POST['userissued']);
  $notes = mysqli_real_escape_string($connect, $_POST['notes']);
}

// Insert data into table
$sqlquery = "INSERT INTO $table (devicename, deviceversion, serialnumber, devicestatus, location, userissued, notes) VALUES ('$dname', '$dversion', '$snumber', '$dstatus', '$location', '$uissued', '$notes')";

if ($connect->query($sqlquery) === TRUE) {
  echo 1;
} else {
  echo 0;
}

mysqli_close($connect);
?>