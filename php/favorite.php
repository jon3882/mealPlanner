<?php 

//**************************************************************************************//
//PHP that is accessed through AJAX requests.  PHP file provides the function of changing
//returning favorite list and toggling the favorite status of seleced food items.
//**************************************************************************************//

include('phpFunctionLoginProtect.php');
include('../../private/connectDB.php');


if( isset($_GET["foodID"]) ) $foodID = $_GET["foodID"];
if( isset($_GET["foodTable"]) ) $foodTable = $_GET["foodTable"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: ".$conn->error);
	} //end of if statement

if( isset($_GET["foodID"]) && isset($_GET["foodTable"]) ) {	
	
	$sql = "SELECT EXISTS (SELECT 1 FROM favorites WHERE foodID = ".$foodID.
		" AND foodTable = '".$foodTable."')";
	$result = $conn->query($sql);
	
	$row = mysqli_fetch_row($result); 
	$favoriteStatus = $row[0]; 
	
	if( $favoriteStatus ) {
		
		$sql = "DELETE FROM favorites WHERE foodID = ".$foodID. " AND userID = ".$sessionName;
		
		} else {
	
		$sql = "INSERT INTO favorites (foodID, userID, foodTable)". 
		" VALUES (".$foodID.",".$sessionName.",'".$foodTable."')";	
		
		//echo $sql;
	
		} //end of if statement
		
	//echo $sql;	
		
	$result = $conn->query($sql); 

	} //end of if statement

//**************************************************************************************//
//Creates JSON object from favorites table and returns it to the requestor.
//**************************************************************************************//

	$sql = "(SELECT favorites.foodTable,foodelement.id,foodelement.macroType,foodelement.cal,".
		"foodelement.protein,foodelement.carb, foodelement.fat, foodelement.foodDesc,".
		" foodelement.servingSize,foodelement.measurement,foodelement.shortDesc".
		" FROM favorites INNER JOIN foodelement ON favorites.foodID = foodelement.id".
		" WHERE favorites.userID = ".$sessionName." AND favorites.foodTable = 'user')".
		" UNION ALL".
		" (SELECT favorites.foodTable,usdanutrientdb.id,usdanutrientdb.macroType,usdanutrientdb.cal,".
		" usdanutrientdb.protein,usdanutrientdb.carb, usdanutrientdb.fat, usdanutrientdb.foodDesc,".
		" usdanutrientdb.servingSize,usdanutrientdb.measurement,usdanutrientdb.shortDesc".
		" FROM favorites INNER JOIN usdanutrientdb ON favorites.foodID = usdanutrientdb.id".
		" WHERE favorites.userID = ".$sessionName." AND favorites.foodTable = 'usda') ORDER BY foodDesc";
		
	//$sql = "SELECT * FROM favorites WHERE userID = ".$sessionName;
	$result = $conn->query($sql); //or die($conn->error());

	
	
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
	} //end of if statement

mysqli_close( $conn );	

	


