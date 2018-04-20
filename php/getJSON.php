<?php 

//**************************************************************************************//
//PHP that is accessed through AJAX requests.  PHP file provides the function of returning
//table data from the database.  Table name is passed as url variable.  The PHP returns
//a JSON object containing the updated table information.  Session variable
//must be set for file to function.
//**************************************************************************************//

include('../../../private/connectDB.php');
include('phpFunctionLoginProtect.php');

if( isset($_GET["table"]) ) $tableName = $_GET["table"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sortingSQL = "";
if( $tableName == "customer" ) $sortingSQL = " ORDER BY customerLastName, customerFirstName";
if( $tableName == "foodElement" ) $sortingSQL = " ORDER BY foodDesc";

$sql = "SELECT * FROM ".$tableName." WHERE userID=".$sessionName.$sortingSQL;

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


?>