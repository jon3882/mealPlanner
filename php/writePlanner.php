<?php 

//**************************************************************************************//
//PHP that is accessed through AJAX requests.  PHP file provides the function of adding
//a meal elements to the database.  Variables are passed as url variables.  The PHP returns
//a JSON object containing the updated table information (mealElement table).  Session variable
//must be set for file to function.  PHP file receives food elements associated with the plan
//and the cell in the plan that the food element is assigned to.  The PHP file deletes all the 
//elements associated with the meal plan and then writes the new data.
//**************************************************************************************//

include('phpFunctionLoginProtect.php');
include('../../private/connectDB.php');


if( isset($_GET["name"]) ) $plannerName = $_GET["name"];
if( isset($_GET["mealLabels"]) ) $labels = $_GET["mealLabels"];
if( isset($_GET["data"]) ) $plannerData = json_decode( $_GET["data"] );

//print_r( $plannerData );
//$meal = explode( ";", $plannerData );
//for ($i = 0; $i < count($meal); $i++) {
//	$meal[$i] = explode( "," , $meal[$i] );
//	} //end of for loop 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "DELETE FROM mealelement WHERE planName='".$plannerName."' AND userID=".$sessionName;

$conn->query( $sql ) or die ( mysqli_error($conn) );

echo $plannerData->count;

foreach($plannerData as $meal ) {

	foreach( $meal as $mealItem ) {
		
		if( $mealItem->id != null ) { 
	
			$sql = "INSERT INTO mealelement (planName, userID, cell, multiplier, db, foodElementID)"." VALUES ('".
						$plannerName."',".
						$sessionName.",'".
						$mealItem->cell."',".
						$mealItem->multiplier.",'".
						$mealItem->db."',".
						$mealItem->id.")";
	
			//print_r( $plannerData );
			echo $sql;
			$conn->query( $sql ) or die ( mysqli_error($conn) );
		
			} //end of if statement

	} //end of for loop
	
	} //end of for loop



$sql = "UPDATE mealplans SET mealLabels='".$labels."' WHERE planName='".$plannerName."' AND userID=".$sessionName;

echo $sql;

$conn->query( $sql ) or die ( mysqli_error($conn) );


mysqli_close( $conn );

?>