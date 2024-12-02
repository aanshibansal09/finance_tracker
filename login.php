<?php
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

    // Sanitize inputs
    $inputUsername = mysqli_real_escape_string($conn, $_POST['username']);
    $inputPassword = mysqli_real_escape_string($conn, $_POST['password']);

    // Fetch user from the database
    $sql = "SELECT * FROM `users` WHERE `username` = '$inputUsername'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        if (password_verify($inputPassword, $user['password'])) {
            // Start session and redirect
            session_start();
            $_SESSION['username'] = $user['username'];

            // Redirect to home page
            header("Location: index (3).php");
            exit(); // Ensure the script stops after redirection
        } else {
            echo "<p style='color: red;'>Invalid password. Please try again.</p>";
        }
    } else {
        echo "<p style='color: red;'>User not found. Please register first.</p>";
    }

    // Close connection
    mysqli_close($conn);
}
?>

<!-- HTML form for login -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Personal Finance Tracker</title>
</head>
<body>

    <h2>Login</h2>

    <?php
    // If there is an error message, display it
    if (isset($error_message)) {
        echo "<p style='color:red;'>$error_message</p>";
    }
    ?>

    <form method="POST" action="login.php">
        <input type="text" name="username" placeholder="Username or Email" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>

    <p>Don't have an account? <a href="register.php">Register here</a></p>

</body>
</html>
