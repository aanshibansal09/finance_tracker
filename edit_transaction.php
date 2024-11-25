<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $transaction_id = $_POST['transaction_id'];
    $amount = $_POST['amount'];
    $description = $_POST['description'];

    $sql = "UPDATE transactions SET amount='$amount', description='$description' WHERE id='$transaction_id'";
    
    if ($conn->query($sql) === TRUE) {
        echo "Transaction updated successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>