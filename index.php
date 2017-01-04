<?php 


//***************************************************************
//Interface for home webpage.  Login protected.
//***************************************************************

include('../../private/loginProtect.php');
$uName = $_SESSION["userName"];

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
<div class="buttons">
<h2>Welcome <?php echo $uName; ?>!</h2>
<button class = "indexBtns" onclick="location.href = 'mealPlanner.php'"  id="mealPlanner" type="button">Meal Planner</button>
<button class = "indexBtns" onclick="location.href = 'foodData.php'"  id="foodData" type="button">Food Database</button>
<button class = "indexBtns" onclick="location.href = 'accountSettings.php'"  id="settings" type="button">Account Settings</button>
<button class = "indexBtns" onclick="location.href = 'php/logout.php'"  id="logout" type="button">Logout</button>
</div>
</div>

</body>

</html>