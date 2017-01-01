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
	<link rel="stylesheet" href="css/indexStyle.css">
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
<button onclick="location.href = 'mealPlanner.php'"  id="mealPlanner" type="button">Meal Planner</button>
<button onclick="location.href = 'foodData.php'"  id="foodData" type="button">Food Database</button>
<button onclick="location.href = 'php/logout.php'"  id="logout" type="button">Logout</button>
</div>
</div>

</body>

</html>