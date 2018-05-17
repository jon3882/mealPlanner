<?php 


//***************************************************************
//Interface for meal planner webpage.  Login protected.
//***************************************************************

include('../private/loginProtect.php');

?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>

<!-- ***Included files*************************************************************** -->


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
<script src="https://apis.google.com/js/platform.js" async defer></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<script src="resources/bootStrapSelect/dist/js/bootstrap-select.js"></script>
<link rel="stylesheet" href="resources/bootStrapSelect/dist/css/bootstrap-select.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">


<script src="resources/html2canvas.js"></script>
<script src="js/planner/plannerJavaScript.js"></script> 

<script src="js/messageBox.js"></script>
<script src="js/usdaSearch.js"></script>
<script src="js/planner/contextMenuJS.js"></script>
<script src="js/planner/mealTitleEditor.js"></script>
<script src="js/planner/undo.js"></script>
<script src="js/planner/utilityFunctions.js"></script>
<script src="js/planner/pdfJS.js"></script>
<script src="js/planner/drawPlanner.js"></script>
<script src="js/planner/plannerFileOps.js"></script>
<script src="js/planner/mealEdit.js"></script>
<script src="js/usdaSearch.js"></script> 
<script src="js/favorite.js"></script> 
<script src="js/browseFood.js"></script>


<script src="resources/contextMenu/jquery.contextMenu.js" type="text/javascript"></script>
<link rel="stylesheet" href="resources/contextMenu/jquery.contextMenu.css">
<link rel="stylesheet" href="css/mealPlannerStyle.css">
<link rel="stylesheet" href="css/messageBoxStyle.css">
<link rel="stylesheet" href="css/foodStyle.css">

<!-- ******************************************************************************** -->

<title>Meal Planner</title>	

</head>


<body onload="startup()">



<!--***************Navigation Bar**********************-->
<?php  
$thisPage = 'mealPlanner';
include_once('navBar.php');
?>
<!--************Navigation Bar End**********************-->

<div class="content-wrapper" >
<br>

<table id="planner">
</table>

<!-- //////////////////////Dialog Box/////////////////////
////////////////////////////////////////////////////////// 
<div class="content" >
<div class="dialogueBox">
	<!-- Heading for Dialogue Box 
	<div class="foodDataContainer">
	<div class="leftSide">
		<select onchange="populateFoodListBox();" id="foodType">
		</select>
		<select id="foodSelect" size = "10">   			
		</select>
		<button class="plannerBtns" id="add" onclick="insertFoodFromSelect()">Add Food</button>
	</div>
	<div class="rightSide">
		<span id="mealID-1">Monday Breakfast</span>
		<table id="meal-1">
			<thead>
			<tr>
				<th>Food Name</th>
				<th>Servings</th>
				<th>Calories</th>
				<th>Fat (g)</th>
				<th>Carbs (g)</th>
				<th>Protein (g)</th>
				<th>Delete</th>
			</tr>
			</thead>
			<tbody id="tbody-1">			
			</tbody>			
		</table>
		
		<table id="totals-1">
			<tr>
				<th >Meal Totals</th>
				<th>Calories</th>
				<th>Fat (g)</th>
				<th>Carbs (g)</th>
				<th>Protein (g)</th>				
			</tr>
			<tr>				
			</tr>
		</table>
		<button class="plannerBtns" id="saveMeal" onclick="pressSaveMealDialogue()">Save Meal</button>
		<button class="plannerBtns" id="cancelMeal" onclick="pressCancelMealDialogue()">Cancel</button>
	</div>
	</div>
</div>
</div>
<!-- ////////////////////////////////////////////////////////// -->

<br>

<input type="file" id="file-input" style="display:none;" />

</div>
<!--</div>-->

<?php include 'messageBox.php';?>
<?php include 'php/mealEditor.php';?>

</body>
</html>