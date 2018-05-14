<?php 

//**************************************************************************************//
//PHP that is accessed through AJAX requests.  
//**************************************************************************************//

include('phpFunctionLoginProtect.php');
include('../../private/connectDB.php');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: ".$conn->error);
	} //end of if statement

//**************************************************************************************//
//
//**************************************************************************************//

	$sql = "(SELECT foodelement.id, mealelement.db, mealelement.cell, mealelement.multiplier, mealelement.planName, foodelement.macroType,foodelement.cal,".
			"foodelement.protein,foodelement.carb, foodelement.fat, foodelement.foodDesc,".
			"foodelement.servingSize,foodelement.measurement,foodelement.shortDesc ".
			"FROM mealelement INNER JOIN foodelement ON mealelement.foodElementID = foodelement.id ".
			"WHERE mealelement.userID = ".$sessionName." AND mealelement.db = 'user')".
		" UNION ALL ".
		"(SELECT usdanutrientdb.id, mealelement.db, mealelement.cell, mealelement.multiplier, mealelement.planName, usdanutrientdb.macroType,usdanutrientdb.cal,".
			"usdanutrientdb.protein,usdanutrientdb.carb, usdanutrientdb.fat, usdanutrientdb.foodDesc,".
			"usdanutrientdb.servingSize,usdanutrientdb.measurement,usdanutrientdb.shortDesc ".
			"FROM mealelement INNER JOIN usdanutrientdb ON mealelement.foodElementID = usdanutrientdb.id ".
			"WHERE mealelement.userID = ".$sessionName." AND mealelement.db = 'usda')";
		
	//echo $sql;	
		
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



