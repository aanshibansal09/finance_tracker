<?php
session_start();
include('config.php');

// Ensure the user is logged in
if (!isset($_SESSION['username'])) {
    header('Location: index.php');
    exit();
}

$username = $_SESSION['username']; // Get logged-in username

// Get user ID from username
$stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username");
$stmt->execute(['username' => $username]);
$user = $stmt->fetch();
$user_id = $user['id'];

// Check if form data is set
if (isset($_POST['description']) && isset($_POST['amount']) && isset($_POST['category'])) {
    $description = $_POST['description'];
    $amount = $_POST['amount'];
    $category = $_POST['category'];

    // Insert transaction into the database
    $stmt = $pdo->prepare("INSERT INTO transactions (user_id, description, amount, category) VALUES (:user_id, :description, :amount, :category)");
    $stmt->execute(['user_id' => $user_id, 'description' => $description, 'amount' => $amount, 'category' => $category]);

    header('Location: dashboard.php'); // Redirect to dashboard after successful transaction submission
} else {
    echo "Please fill out all fields.";
}
?>
