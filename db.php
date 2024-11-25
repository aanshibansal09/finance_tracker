<?php
$servername = "localhost"; // Your database server
$username = "trackers"; // Your database username
$password ="ipdtrack4"; // Your database password
$database = "finance_tracker"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);/
    
}
// Fetch data
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "User: " . $row['username'] . "<br>";
    }
} else {
    echo "No users found.";
}

?>