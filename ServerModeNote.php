<?php
   print("111111");
   header("Access-Control-Allow-Methods: POST");
   print("222222");

    $colors = json_decode($_POST["colors"], true);
    $conn = mysqli_connect("localhost", "root", "", "colors");
    echo ("HYYYYYYYYYYYYYYYYYYY");
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }
    foreach ($colors as $color) {
      $row = $color["row"];
      $col = $color["col"];
      $color = $color["color"];

      $query = "INSERT INTO colors (row, col, color) VALUES ($row, $col, '$color')";
      mysqli_query($conn, $query);
    }
    
    mysqli_close($conn);



?>
