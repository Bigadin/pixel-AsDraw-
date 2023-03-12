<?php

header("Access-Control-Allow-Origin: *");

$conn = mysqli_connect("localhost", "root", "", "colors");

$query = "SELECT raw, col, colorHex FROM color_table";
$result = mysqli_query($conn, $query);

$colors = array();
while ($row = mysqli_fetch_assoc($result)) {
  $colors[] = $row;
}

echo json_encode($colors);
mysqli_close($conn);

?>
