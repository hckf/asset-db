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

echo var_dump($_POST);

$sqlquery = "INSERT INtTO $table (devicename, deviceversion, serialnumber, devicestatus, location, userissued, notes) VALUES ('1', '2', '3', '4', '5', '6', '7')";

if ($connect->query($sqlquery) === TRUE) {
  echo 1;
} else {
  echo 0;
}

mysqli_close($connect);
?>