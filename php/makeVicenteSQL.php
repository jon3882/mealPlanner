<?php

$servername = "localhost";
$username = "root";
$password = "117646xx";
$dbname = "mealplanner";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$file = fopen("vicenteFoods.txt","r");

while(! feof($file))
  {
  $lineOfFile = fgets($file);
  $element = explode(",",$lineOfFile);
  insertFood($conn, $element[0], $element[1],$element[2],$element[3],
	$element[4],$element[5],$element[6],$element[7]);
  }

fclose($file);

echo "Complete";

function insertFood( $conn, $macroType, $foodDesc, $servingSize, $measurement, $cal, $fat, $carb, $protein ){

$sql = "INSERT INTO foodElement (macroType, cal, protein, carb, fat, servingSize, measurement, userID, foodDesc, shortDesc)".
                                        " VALUES ('".
										$macroType."','".
                                        $cal."','".
										$protein."','".
										$carb."','".
                                        $fat."','". 
                                        $servingSize."','". 
                                        $measurement."',".   
										"0,'".
                                        $foodDesc."',0)";

	echo $sql."<br>";									
										
	$conn->query( $sql ) or die ( mysqli_error($conn) );

	} //end of function


?>