
<!--////////////////////////////////////////////////////
//Navigation Bar for all pages of site. The navigation 
//bar will also include reference to the general style 
//css file to be applied to all pages in the site.
///////////////////////////////////////////////////////-->

<link rel="stylesheet" href="css/navBarStyle.css">
<!-- Navigation Bar -->
<div id="navbar">
<ul>
<?php 
if ($thisPage == "Login") {
echo "<li id ='login'>Sign In</li>";
}else if($thisPage == "register"){
echo"<li id ='newUser'>Register New Account</li>";
}else if($thisPage == "forgotPassword"){
	echo "<li id ='forgotPassword'>Forgot Password</li>";
}
else{
	?>  
	<li class="links">
	<a <?php if($thisPage == 'Home') echo "id = 'currentPage'";?> href="index.php">Home</a>
	</li>
	<li class="links">
	<a <?php if($thisPage == 'foodData') echo "id = 'currentPage'";?> href="foodData.php">Food Database</a>
	</li>	
	<li class="links">
	<a <?php if($thisPage == 'mealPlanner') echo "id = 'currentPage'";?> href="mealPlanner.php">Meal Planner</a>
	</li>
	<?php 
	// adds hotlinks if on meal planner page
 	if ($thisPage == "mealPlanner"){
 	// buttons for create pdf and trash will be inserted here
 	}
	?>
	<li style='float:right;'><a href='php/logout.php'>Logout</a></li>
<?php } ?>

</ul>
</div>



