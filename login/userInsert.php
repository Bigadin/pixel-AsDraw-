<?php
// Start the session to get the previously stored user credentials
session_start();

header('Access-Control-Allow-Headers: content-type');


header('Access-Control-Allow-Origin: *');


    
    $colors = file_get_contents("php://input");
    var_dump($colors);
// Check if the user is logged in
if (!isset($_SESSION['username'])) {
  // If the user is not logged in, redirect them to the login page
  header("Location: login.php");
  exit;
}

// Retrieve the user credentials from the session
$username = $_SESSION['username'];
$password = $_SESSION['password'];

// Connect to the database using the retrieved credentials
$pdo = new PDO("mysql:host=localhost;dbname=colors", $username, $password);
$colors = json_decode($colors,true);

foreach ($colors as $color_data) {
  $row = $color_data["row"];
  $col = $color_data["col"];
  $color = $color_data["color"];
  echo $row;
  echo $col;
  $query = "INSERT INTO color_table (raw,col,colorHex) VALUES ($row, $col, '$color')";
  $result = mysqli_query($conn, $query);

  $count--;
  if ($count == 0) {
      break;
  }
}

// Close the database connection
$pdo = null;
?>
