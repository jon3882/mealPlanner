
<!--////////////////////////////////////////////////////
//Navigation Bar for all pages of site. The navigation 
//bar will also include reference to the general style 
//css file to be applied to all pages in the site.
///////////////////////////////////////////////////////-->
<link rel="stylesheet" href="resources/fontawesome/css/font-awesome.min.css">
<link rel="stylesheet" href="css/navBarStyle.css">
<link rel="stylesheet" href="css/generalStyle.css">
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
	<li class="links icons" style="float: right;" ><a class ="logoutIcon" href="php/logout.php">
	<i class="fa fa-power-off fa-lg" title="Logout" aria-hidden="true"></i>
	</a></li>
	<?php 
	// adds hotlinks if on meal planner page
 	
 	if ($thisPage == "mealPlanner"){ 
 	?>
 	<!-- Quick links for meal planner -->
 	<li class="links icons qlinkContainer" style="float: right;">
	<i id = "trashLink" class="fa fa-trash-o fa-lg qlink" title="Delete Planner" aria-hidden="true"></i>
	</li> 	
	<li id= "pdfContainer" class="links icons qlinkContainer" style="float: right;">
	<i id = "pdfLink" class="fa fa-file-pdf-o fa-lg qlink" title ="Create PDF" aria-hidden="true"></i>	
	</li>
 	<?php
 	}
 	?>
<?php } ?>

</ul>
</div>



