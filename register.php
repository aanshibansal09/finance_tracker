<?php
// Enable error reporting for debugging
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

// // Check if form is submitted
// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     // Get form inputs
//     $username = $_POST['username'];
//     $email = $_POST['email'];
//     $password = $_POST['password'];

//     // Check if inputs are not empty
//     if (empty($username) || empty($email) || empty($password)) {
//         echo "All fields are required!";
//         exit();
//     }

//     // Hash the password before storing it
//     $hashed_password = password_hash($password, PASSWORD_BCRYPT);

//     // Create a connection to the database
//     $conn = new mysqli('localhost', 'root', '', 'finance_tracker');

//     // Check connection
//     if ($conn->connect_error) {
//         die('Connection failed: ' . $conn->connect_error);
//     }

//     // Prepare SQL query to insert user data into the database
//     $stmt = $conn->prepare("INSERT INTO `users` (username, email, password) VALUES (?, ?, ?)");

//     // Bind parameters (ss for 2 strings, s for password)
//     $stmt->bind_param("sss", $username, $email, $hashed_password);

//     // Execute the statement and check if successful
//     if ($stmt->execute()) {
//         echo "Registration successful!";
//         // Redirect to the login page after successful registration
//         header('Location: login.php');
//         exit();
//     } else {
//         echo "Something went wrong. Please try again.";
//     }

//     // Close the statement and connection
//     $stmt->close();
//     $conn->close();
// }


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $server = "localhost";
    $username = "root";
    $password = "";
    $dbname = "finance_tracker";

    // Establish database connection
    $conn = mysqli_connect($server, $username, $password, $dbname);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Sanitize and hash the password
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Insert user into database
    $sql = "INSERT INTO `users` (`username`, `password`, `email`) VALUES ('$username', '$hashed_password', '$email')";
    if (mysqli_query($conn, $sql)) {
        echo "Registration successful!";
        header("Location: index (3).php"); // Redirect to the main page
    } else {
        echo "Error: " . mysqli_error($conn);
    }

    // Close connection
    mysqli_close($conn);
}
?>

<!-- HTML form for registration -->
<form method="POST" action="register.php">
    <input type="text" name="username" placeholder="Username" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Register</button>
</form>
