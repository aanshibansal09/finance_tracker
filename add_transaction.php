 <?php 
// include 'db.php';

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // $amount = $_POST['amount'];
    // $description = $_POST['description'];
    // $username = $_SESSION['username']; // Assuming user is logged in

    //$sql = "INSERT INTO transactions (`username`, `amount`, `description`) VALUES ('$username', '$amount', '$description')";
    
    // if ($conn->query($sql) === TRUE) {
        // echo "Transaction added successfully!";
    //} else {
        // echo "Error: " . $sql . "<br>" . $conn->error;
    // }
// }

//$conn->close();

$server="localhost";
$username="root";
$password="";
$con= mysqli_connect($server,$username,$password);
if(!$con){
    die("connection to this database failed due to ".mysqli_connect_error());

}

$uername=$_POST['username'];
$amount=$_POST['amount'];
$description=$_POST['description'];
$sql="INSERT INTO `finance_trackerid`.`finance`(`username`, `amount`, `description`) VALUES ('$username', '$amount', '$description')";
echo $sql;
if($con-.query($sql)==true){
    echo"successfully inserted";
}
else{
    echo"ERROR: $sql <br> $con->error";
}
    
$con->close();
 ?>