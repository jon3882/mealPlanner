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

$outputObj = (object) ['mealLabels' => $labels, 'data' => $plannerData];
$outputJSON = json_encode($outputObj);
$myfile = fopen("../userDownload/planner.mplan", "w") or die("Unable to open file!");
fwrite($myfile, $outputJSON );
fclose($myfile);

?>