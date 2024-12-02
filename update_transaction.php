<?php
$conn = new mysqli('localhost', 'root', '', 'finance_tracker');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $description = $_POST['description'];
    $amount = $_POST['amount'];
    $category = $_POST['category'];

    $query = "UPDATE transactions SET description='$description', amount='$amount', category='$category' WHERE id='$id'";
    $conn->query($query);
}
?>
