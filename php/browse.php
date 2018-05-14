<?php 

//**************************************************************************************//
//PHP that is accessed through AJAX requests.  PHP file provides the function of 
//**************************************************************************************//

error_reporting(E_ERROR | E_PARSE);

include('../../private/connectDB.php');
include('phpFunctionLoginProtect.php');

if( isset($_GET["category"]) ) $category = $_GET["category"];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	} //end of if statement

if( isset($_GET["category"]) ) {	
	
	$sql = "SELECT * FROM usdanutrientdb WHERE macroType = '".$category."' ORDER BY foodDesc";

	//must account for user defined favorites - taken from foodElement table???
	
	if( $category == "favorites" ) {
		
		$sql = "(SELECT a.id, a.macroType, a.protein, a.cal, a.carb, a.fat, a.foodDesc, a.servingSize, a.measurement, a.shortDesc, b.foodTable".
			" FROM usdanutrientdb a, favorites b WHERE a.id = b.foodID AND b.userID =".$sessionName." AND b.foodTable = 'usda') UNION ALL ".
			"(SELECT a.id, a.macroType, a.protein, a.cal, a.carb, a.fat, a.foodDesc, a.servingSize, a.measurement, a.shortDesc, b.foodTable".
			" FROM foodelement a, favorites b WHERE a.id = b.foodID AND b.userID =".$sessionName." AND b.foodTable = 'user') ORDER BY foodDesc";
	
		} //end of if statement 
		
	if ($category == "userDefined") {
			
		$sql = "SELECT * FROM foodelement WHERE userID = ".$sessionName." ORDER BY foodDesc";
		
		} //end of if statement	
	
	
	} else {
	
    //distinct macrotypes	
	$sql = "SELECT DISTINCT macroType FROM usdanutrientdb ORDER BY macroType"; 

	} //end of if statement

//**************************************************************************************//
//Creates JSON object from favorites table and returns it to the requestor.
//**************************************************************************************//

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
		//echo $sql;
	} //end of if statement

mysqli_close( $conn );	

	


