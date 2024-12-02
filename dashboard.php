<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    // If not logged in, redirect to the login page
    header('Location: index.php');
    exit();
}

$username = $_SESSION['username']; // Get the logged-in user's username

// Fetch transactions or any other user data if needed
// Include your database interaction code here for fetching transactions, etc.
?>

<h1>Welcome to your Dashboard, <?php echo htmlspecialchars($username); ?>!</h1>

<!-- Display User's Data, Transactions, etc. -->
<!-- Example: List of transactions can go here -->

<ul>
    <li>Your transactions or any user-specific data goes here.</li>
    <!-- More dynamic content here -->
</ul>
