<?php 

//***************************************************************
//Interface for food database webpage.  Login protected.
//***************************************************************

include('../../private/loginProtect.php');

?>

<!DOCTYPE html>
<html>
<head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/foodJavaScript.js"></script> 
<script src="js/messageBox.js"></script> 

	<title>Slims Fitness - Food Data</title>
	<link rel="stylesheet" href="css/foodStyle.css">
	<link rel="stylesheet" href="css/messageBoxStyle.css">
</head>
<body onload="startup()">

<!--************Navigation Bar**********************-->
<?php  
$thisPage = 'foodData';
include_once('navBar.php');
?>
<!--**************Navigation Bar End*****************-->
<div>&nbsp<br>&nbsp</div>
<!--******************Content******************** -->
<div class="content-wrapper">
<div class="content">
<!-- left side of inner content box -->




<div class="left">
	<div class="addbtn">
	<button id="add" type="button">Add Food</button>
	</div>
	<!-- Client input form -->
	<div class="input" id="input">
	<div class="foodInputs">
	<div class="topFood">
	<div class="innerFoodBoxLeft">
	Food Name<br>
	<input type="food" id="foodDesc" style="width:90%;" ><br>	
	Serving Size<br>
	<input type="servingSize" id="servingSize" style="width:45%;" >
	</div>
	<div class="innerFoodBoxRight">
	Food Type<br>		
	<select size="1" id="macroType" class="foods">
		<option id="macroTypeOption" class="option" value="0" selected disabled hidden>Pick one...</option>
		<option class="option" value="2">Vegetable</option>
		<option class="option" value="4">Fruit</option>
		<option class="option" value="5">Fat</option>
		<option class="option" value="6">Nuts and Seeds</option>
		<option class="option" value="7">Grains</option>
		<option class="option" value="8">Beverages</option>
		<option class="option" value="9">Meat and Poultry</option>
		<option class="option" value="10">Seafood</option>
		<option class="option" value="11">Dairy</option>
		<option class="option" value="12">Kitchen Staples</option>
		<option class="option" value="13">Supplements</option>
		
	</select><br>	
	Measurement<br>
	<select size="1" id="measurement" class="size">
		<option id="measurementOption" class="size" value="0" selected disabled hidden>Pick one...</option>
		<option class="size" value="1">TBSP(s)</option>
		<option class="size" value="1">Oz</option>
		<option class="size" value="2">Cups</option>
		<option class="size" value="3">Grams</option>
		<option class="size" value="4">Small</option>
		<option class="size" value="5">Medium</option>
		<option class="size" value="6">Large</option>
		<option class="size" value="7">X-Large</option>	
		<option class="size" value="8">Jumbo</option>
		<option class="size" value="9">Pieces</option>	
		<option class="size" value="10">Slices</option>			
	</select>
	</div>		        						
   	
	</div>
	
	<div class="bottomFood">
	<hr>
	<div class="innerFoodBoxLeft">
	Calories<br>
	<input type="text" name="calories" id="calories" style="width:45%;"><br>
	Carbs (g) <br>
	<input type="text" name="carbs" id="carbs" style="width:45%;"><br>	
	</div>
	<div class="innerFoodBoxRight">
	Fat (g) <br>
	<input type="text" name="fat" id="fat" style="width:45%;"><br>	
	Protein (g) <br>
	<input type="text" name="protein" id="protein" style="width:45%;"><br>
	</div>
	
	
	</div>
	</div>

	<!-- Save Cancel buttons -->
	<div class="saveCancel">
	<div id="msgInput"></div>
	<div>&nbsp</div>
	<button id="save" value="0" type="button">Save</button>
	<button id="cancel" type="button">Cancel</button>
	</div>
	
	</div>

</div>

<!-- right side of inner content box -->
<div class="right">


<select id="foodSelect" size = "10">   				
	</select>


<div class="editDelete">
	<button id="edit" type="button">Edit</button>
	<button id="delete" type="button">Delete</button>
</div>
</div>
</div>
</div>

</body>

<?php include 'messageBox.php';?>


</html>