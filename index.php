<?php 


//***************************************************************
//Interface for home webpage.  Login protected.
//***************************************************************

include('../../private/loginProtect.php');


?>

<!DOCTYPE html>
<html>
<head>
	<title>Slims Fitness</title>
	<!-- *****************Included File************************** -->
	<link rel="stylesheet" href="css/indexStyle.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>

<!--************Title Bar**********************-->
<?php 
$thisPage = "Home";
include_once('navBar.php');
?>

<!-- *****************Buttons********************* -->
<div class="content" >
<h2>Welcome <?php echo $_SESSION["firstName"]; ?>!</h2>
<div class="buttons">
<button class = "indexBtns" onclick="location.href = 'mealPlanner.php'"  id="mealPlanner" type="button">Meal Planner</button>
</div>
<div class="buttons">
<button class = "indexBtns" onclick="location.href = 'foodData.php'"  id="foodData" type="button">Food Database</button>
</div>
<div class="buttons">
<button class = "indexBtns" onclick="location.href = 'accountSettings.php'"  id="settings" type="button">Account Settings</button>
</div>
<div class="buttons">
<button class = "indexBtns" onclick="location.href = 'php/logout.php'"  id="logout" type="button">Logout</button>
</div>
</div>
</div>

</body>

</html>