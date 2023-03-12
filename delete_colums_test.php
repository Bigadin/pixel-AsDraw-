<?php

header('Access-Control-Allow-Origin: *');


if ($_SERVER['REQUEST_METHOD'] === 'GET' ) {
    $conn = mysqli_connect("localhost", "root", "", "colors");
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
    }
    
    $query = "DELETE FROM color_table";
    
    mysqli_query($conn, $query);
    mysqli_close($conn);
  
    if (mysqli_query($conn, $query)) {
        echo "Query executed successfully";
    } else {
        echo "Error executing query: " . mysqli_error($conn);
    }
}
?>




