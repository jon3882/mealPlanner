<?php 

//**************************************************************************************//
//PHP that is accessed through AJAX requests.  PHP file provides the function of deleting
//a food element to the database.  An id variable is passed as url variable.  The PHP returns
//a JSON object containing the updated table information (foodElement table).  Session variable
//must be set for file to function.
//**************************************************************************************//

include('../../../private/connectDB.php');
include('phpFunctionLoginProtect.php');

if( isset($_GET["id"]) ) $foodID = $_GET["id"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "DELETE FROM foodElement WHERE id = ".$foodID. " AND userID = ".$sessionName;

//print $sql;

$conn->query( $sql ) or die ( mysqli_error($conn) );

$sql = "DELETE FROM mealElement WHERE id = ".$foodID. " AND userID = ".$sessionName;

$conn->query( $sql ) or die ( mysqli_error($conn) );

//**************************************************************************************//
//Creates JSON object from the foodElement table and returns it to the requestor.
//**************************************************************************************//

$sql = "SELECT * FROM foodElement WHERE userID = ".$sessionName." ORDER BY foodDesc";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
$str = "[";

    while($row = $result->fetch_assoc()) {
        if( $str == "[" ) $str = $str . json_encode( $row );
        else $str = $str . "," . json_encode( $row );
    }

$str = $str . "]";

print $str;

} else {
    echo "0 results";
}

mysqli_close( $conn );

?>