<?php

$servername = "localhost";
$username = "chalkboa_admin";
$password = "DBAccess117646xx";
$dbname = "chalkboa_southbeachslim";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$code = "3600";
$offset = "0";

$url =	"http://api.nal.usda.gov/ndb/nutrients/?".
	"format=json&api_key=NCsIJRtIVxKx6tCUfqrmKapgRhkQtGdMskTQMN53&".
	"nutrients=205&nutrients=204&nutrients=208&nutrients=203&".
	"sort=f&offset=".$offset."&fg=";

ini_set("allow_url_fopen", 1);
$json = file_get_contents( $url.$code );
$obj = json_decode($json);

$totalItemCount = $obj->report->total;
$desc = $obj->report->groups[0]->description;

echo "Total: ".$totalItemCount."<br><br>";
$runningCount = 0;

while( $runningCount < $totalItemCount ) {

foreach($obj->report->foods as $food ) {

	

	$fName =  $conn->real_escape_string($food->name);
	$measure = explode( " ", $food->measure, 2);
	$mAmount = $conn->real_escape_string($measure[0]);
	$mDesc =  $conn->real_escape_string($measure[1]);
	
	$cal =  $conn->real_escape_string($food->nutrients[1]->value) ;
	$protein = $conn->real_escape_string( $food->nutrients[0]->value) ;
	$fat =  $conn->real_escape_string($food->nutrients[2]->value) ;
	$carb =  $conn->real_escape_string($food->nutrients[3]->value) ;

	if( $cal == "--" ) $cal = "0.00";
	if( $protein == "--" ) $protein = "0.00";
	if( $fat == "--" ) $fat = "0.00";
	if( $carb == "--" ) $carb = "0.00";

	echo "<br>";
	echo "Index: ".$runningCount."<br>";
	echo "Name: ".$fName."<br>";
	echo "Measure Desc: ".$mDesc."<br>";
	echo "Measure Amount: ".$mAmount."<br>";
	echo "Cal: ".$cal."<br>";
	echo "Protein: ".$protein."<br>";
	echo "fat: ".$fat."<br>";
	echo "carb: ".$carb."<br>";

	$sql ='INSERT INTO USDANutrientDB (macroType,cal,protein,carb,'.
		'fat, foodDesc, servingSize, measurement) '.
		'VALUES ("'.$desc.'",'.$cal.','.$protein.','.$carb.','.$fat.',"'.$fName.'",'.$mAmount.',"'.$mDesc.'")';
	echo $sql."<br>";

	if (!mysqli_query($conn,$sql))
  		{
  		echo("Error description: " . mysqli_error($conn));
  		}

	$runningCount++;
	


	}

if( $runningCount < $totalItemCount ) {

	$offset = $runningCount;

	$url =	"http://api.nal.usda.gov/ndb/nutrients/?".
	"format=json&api_key=NCsIJRtIVxKx6tCUfqrmKapgRhkQtGdMskTQMN53&".
	"nutrients=205&nutrients=204&nutrients=208&nutrients=203&".
	"sort=f&offset=".$offset."&fg=";

	$json = file_get_contents( $url.$code );
	$obj = json_decode($json);

	}

} //end of while loop

echo $runningCount;




?>