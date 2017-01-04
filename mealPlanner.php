<?php 


//***************************************************************
//Interface for meal planner webpage.  Login protected.
//***************************************************************

include('../../private/loginProtect.php');

?>

<!DOCTYPE html>
<html>
<head>

<!-- ***Included files*************************************************************** -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="http://files.codepedia.info/uploads/iScripts/html2canvas.js"></script>
<script src="js/plannerJavaScript.js"></script> 
<script src="js/messageBox.js"></script>
<link rel="stylesheet" href="css/mealPlannerStyle.css">
<link rel="stylesheet" href="css/messageBoxStyle.css">
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
<tr>
<td></td><td class="dTitle" id="sunTitle">Sunday</td><td class="dTitle" id="monTitle">Monday</td><td class="dTitle" id="tueTitle">Tuesday</td><td class="dTitle" id="wedTitle">Wednesday</td><td class="dTitle" id="thuTitle">Thursday</td><td class="dTitle" id="friTitle">Friday</td><td class="dTitle" id="satTitle">Saturday</td>
</tr>
<tr>
<td class="mTitle" id="m0">Breakfast</td><td class="sq" id="sun0"></td><td id="mon0" class="sq"></td><td class="sq" id="tue0"></td><td class="sq" id="wed0"></td><td class="sq" id="thu0"></td><td class="sq" id="fri0"></td><td class="sq" id="sat0"></td>
</tr>
<tr>
<td class="mTitle" id="m1">Snack</td><td class="sq" id="sun1"></td><td id="mon1" class="sq"></td><td class="sq" id="tue1"></td><td class="sq" id="wed1"></td><td class="sq" id="thu1"></td><td class="sq" id="fri1"></td><td class="sq" id="sat1"></td>
</tr>
<tr>
<td class="mTitle" id="m2">Lunch</td><td class="sq" id="sun2"></td><td id="mon2" class="sq"></td><td class="sq" id="tue2"></td><td class="sq" id="wed2"></td><td class="sq" id="thu2"></td><td class="sq" id="fri2"></td><td class="sq" id="sat2"></td>
</tr>
<tr>
<td class="mTitle" id="m3">Snack</td><td class="sq" id="sun3"></td><td id="mon3" class="sq"></td><td class="sq" id="tue3"></td><td class="sq" id="wed3"></td><td class="sq" id="thu3"></td><td class="sq" id="fri3"></td><td class="sq" id="sat3"></td>
</tr>
<tr>
<td class="mTitle" id="m4">Dinner</td><td class="sq" id="sun4"></td><td id="mon4" class="sq"></td><td class="sq" id="tue4"></td><td class="sq" id="wed4"></td><td class="sq" id="thu4"></td><td class="sq" id="fri4"></td><td class="sq" id="sat4"></td>
</tr>
<tr>
<td class="mTitle" id="m5">Snack</td><td class="sq" id="sun5"></td><td id="mon5" class="sq"></td><td class="sq" id="tue5"></td><td class="sq" id="wed5"></td><td class="sq" id="thu5"></td><td class="sq" id="fri5"></td><td class="sq" id="sat5"></td>
</tr>

<tr>
<td class="mTitle" id="totalTitle" >Totals</td> 

<td class="totalSQ">
<table class="dayTotals"><tr><td>
Calories:<br>
Fat:<br>
Carbs:<br>
Protein:<br>
</td><td id="total0">
0<br>
0<br>
0<br>
0<br>
</td></tr>
</table>
</td>

<td class="totalSQ">
<table class="dayTotals"><tr><td>
Calories:<br>
Fat:<br>
Carbs:<br>
Protein:<br>
</td><td id="total1">
0<br>
0<br>
0<br>
0<br>
</td></tr>
</table>
</td>

<td class="totalSQ">
<table class="dayTotals"><tr><td>
Calories:<br>
Fat:<br>
Carbs:<br>
Protein:<br>
</td><td id="total2">
0<br>
0<br>
0<br>
0<br>
</td></tr>
</table>
</td>

<td class="totalSQ">
<table class="dayTotals"><tr><td>
Calories:<br>
Fat:<br>
Carbs:<br>
Protein:<br>
</td><td id="total3">
0<br>
0<br>
0<br>
0<br>
</td></tr>
</table>
</td>

<td class="totalSQ">
<table class="dayTotals"><tr><td>
Calories:<br>
Fat:<br>
Carbs:<br>
Protein:<br>
</td><td id="total4">
0<br>
0<br>
0<br>
0<br>
</td></tr>
</table>
</td>

<td class="totalSQ">
<table class="dayTotals"><tr><td>
Calories:<br>
Fat:<br>
Carbs:<br>
Protein:<br>
</td><td id="total5">
0<br>
0<br>
0<br>
0<br>
</td></tr>
</table>
</td>


<td class="totalSQ">
<table class="dayTotals"><tr><td>
Calories:<br>
Fat:<br>
Carbs:<br>
Protein:<br>
</td><td id="total6">
0<br>
0<br>
0<br>
0<br>
</td></tr>
</table>
</td>

</tr>

</table>



<!-- //////////////////////Dialog Box/////////////////////
////////////////////////////////////////////////////////// -->
<div class="content" >
<div class="dialogueBox">
	<!-- Heading for Dialogue Box -->
	<div class="foodDataContainer">
	<div class="leftSide">
		<select onchange="populateFoodListBox();" id="foodType">
			<option value="1">Meat and Poultry</option>
			<option value="2">Seafood</option>
			<option value="3">Dairy</option>
			<option value="4">Fruit</option>
			<option value="5">Vegetable</option>
			<option value="6">Beverages</option>
			<option value="7">Grains</option>
			<option value="8">Fat</option>
			<option value="9">Nuts and Seeds</option>
			<option value="10">Kitchen Staples</option>
		</select>
		<select id="foodSelect" size = "10">   			
		</select>
		<button class="plannerBtns" id="add" onclick="insertFoodFromSelect()">Add Food</button>
	</div>
	<div class="rightSide">
		<span id="mealID">Monday Breakfast</span>
		<table id="meal">
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
			<tbody id="tbody">			
			</tbody>			
		</table>
		
		<table id="totals">
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



</body>


</div>
</div>


<?php include 'messageBox.php';?>



</html>