<?php
header('Access-Control-Allow-Headers: content-type');


header('Access-Control-Allow-Origin: *');


    $data = json_decode(file_get_contents('php://input'), true);    

    $conn = mysqli_connect("localhost", "root", "", "colors");
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
  }
  $count = count($data["colors"]);
  foreach ($data["colors"] as $color_data) {
      $row = $color_data["row"];
      $col = $color_data["col"];
      $color = $color_data["color"];
     
      $query = "INSERT INTO color_table (raw,col,colorHex) VALUES ($row, $col, '$color')";
      $result = mysqli_query($conn, $query);
  
      $count--;
      if ($count == 0) {
          break;
      }
  }    
    if ($result) {
      echo "Query executed successfully";
  } else {
      echo "Error executing query: " . mysqli_error($conn);
  }
    mysqli_close($conn);



?>
