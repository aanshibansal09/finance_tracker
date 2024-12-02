<?php
$conn = new mysqli('localhost', 'root', '', 'finance_tracker');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $query = "DELETE FROM transactions WHERE id='$id'";
    $conn->query($query);
}
?>
