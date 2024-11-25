<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $transaction_id = $_POST['transaction_id'];

    $sql = "DELETE FROM transactions WHERE id='$transaction_id'";
    
    if ($conn->query($sql) === TRUE) {
        echo "Transaction deleted successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>