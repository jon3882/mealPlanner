
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
<table style="width:100%;background-color:"><tr>
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
	
	<td class="link" <?php if($thisPage == 'mealPlanner') echo "id = 'currentPage'";?> >
	<a style="text-decoration: none;"  href="mealPlanner.php">Meal Planner</a>
	</td>
	<td class="link" <?php if($thisPage == 'accountSettings') echo "id = 'currentPage'";?> >
	<a style="text-decoration: none;"  href="accountSettings.php">Account</a>
	</td>
	
	<td></td>
	
	<?php 
	// adds hotlinks if on meal planner page
 	
 	if ($thisPage == "mealPlanner"){ 
 	?>
 	<!-- Quick links for meal planner -->
	
	<td class="linkIcon" style="">
			<a id="browseUSDA" href="#" title="Search for food item."><img style="" src="img/search.png"></a>
	</td>
	
	<td class="linkIcon" style="">
			<a id="saveLink" href="#" title="Save meal plan."><img style="" src="img/save.png"></a>
	</td>
	
	<td class="linkIcon" style="">
			<a id="openLink" href="#" title="Open meal plan."><img style="" src="img/open.png"></a>
	</td>
 	
	<td class="linkIcon" style="">
			<a id="trashLink" href="#" title="Clear meal plan."><img style="" src="img/trash.png"></a>
	</td>
	
	
	
 	<?php
 	}
 	?>
	
	<td class="linkIcon" style="">
	</td>
	
	<td class="logoutIcon linkIcon" ><a href="php/logout.php">
		<img style="" src="img/logout.png">
	</a></td>
	
<?php } ?>

<tr></table>
</div>



