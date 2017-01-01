<?php 


//**************************************************************************************//
//PHP that is accessed through AJAX requests.  PHP file provides the function of editing
//a food element to the database.  Variables are passed as url variables.  The PHP returns
//a JSON object containing the updated table information (foodElement table).  Session variable
//must be set for file to function.
//**************************************************************************************//

include('../../../private/connectDB.php');
include('phpFunctionLoginProtect.php');

if( isset($_GET["id"]) ) $foodID = $_GET["id"];
if( isset($_GET["macroType"]) ) $macroType = $_GET["macroType"];
if( isset($_GET["cal"]) ) $cal = $_GET["cal"];
if( isset($_GET["protein"]) ) $protein = $_GET["protein"];
if( isset($_GET["carb"]) ) $carb = $_GET["carb"];
if( isset($_GET["fat"]) ) $fat = $_GET["fat"];
if( isset($_GET["foodDesc"]) ) $foodDesc = $_GET["foodDesc"];
if( isset($_GET["serve"]) ) $servingSize = $_GET["serve"];
if( isset($_GET["measure"]) ) $measurement = $_GET["measure"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "UPDATE ".$sessionName."foodElement SET macroType='".$macroType."', cal='".$cal."', protein='".$protein."', carb='".$carb."', fat='".$fat."', foodDesc='".$foodDesc."', servingSize='".$servingSize."', measurement='".$measurement."' WHERE id=".$foodID;

//print $sql;

$conn->query( $sql ) or die ( mysqli_error($conn) );

//**************************************************************************************//
//Creates JSON object from the foodElement table and returns it to the requestor.
//**************************************************************************************//

$sql = "SELECT * FROM ".$sessionName."foodElement ORDER BY foodDesc";
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