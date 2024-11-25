<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

    $sql = "INSERT INTO users (`username`, `password`) VALUES ('$username', '$password')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style2.css">
    <title>Register</title>
    <script>
        function handleRegister(event) {
            event.preventDefault(); // Prevent form submission

            // Get form data
            const username = document.querySelector('input[name="username"]').value;
            const password = document.querySelector('input[name="password"]').value;
            const email = document.querySelector('input[name="email"]').value;

            // Assuming successful registration (you would normally send data to the backend here)
            alert('Registration successful!');
            
            // Redirect to homepage after successful registration
            window.location.href = 'index.html';
        }
    </script>
</head>
<body>
    <h2>Register</h2>
    <form onsubmit="handleRegister(event)">
        <input type="text" name="username" placeholder="Enter your name" required>
        <input type="password" name="password" placeholder="Enter your password" required>
        <input type="email" name="email" placeholder="Enter your email" required>
        <button type="submit">Register</button>
    </form>
</body>
</html>
