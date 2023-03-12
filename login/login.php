<?php
	// Get the user input
	$username = $_POST['username'];
	$password = $_POST['password'];
    //$hashed_password = password_hash($password, PASSWORD_DEFAULT);


	// Connect to the database
	$servername = "localhost";
	$dbusername = "root";
	$dbpassword = "";
	$dbname = "colors";

	$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
    
    $stmt = $conn->prepare("SELECT * FROM mysql.user WHERE User = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    // $sql = "SELECT * FROM mysql.user WHERE User='$username'";
    // $result = $conn->query($sql);
    if($result->num_rows == 0){
                // Generate a random password hash
        $hash = password_hash($password, PASSWORD_DEFAULT);

        // Create a new user in the database
        // Create a new user in the database and grant privileges
        $sql = "CREATE USER '$username'@'localhost' IDENTIFIED BY '$password';
                GRANT ALL PRIVILEGES ON colors.* TO '$username'@'localhost'";
        if ($conn->multi_query($sql) === TRUE) {
            echo "New user created successfully";
            echo $password;

        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        $conn->close();
    }else{  
        $url = 'http://localhost/pixel/Structure.html';
        $html = file_get_contents($url);
        echo $html;
        
    }
    header("Location: ../Structure.html?username=$username&password=$password");


?>
