
<!--////////////////////////////////////////////////////
//Navigation Bar for all pages of site. The navigation 
//bar will also include reference to the general style 
//css file to be applied to all pages in the site.
///////////////////////////////////////////////////////-->

<link rel="stylesheet" href="css/navBarStyle.css">
<!-- Navigation Bar -->
<div id="navbar">
	<ul>
	<li class="links">
	<a <?php if($thisPage == 'Home') echo "id = 'currentPage'";?> href="index.php">Home</a>
	</li>
	<li class="links">
	<a <?php if($thisPage == 'foodData') echo "id = 'currentPage'";?> href="foodData.php">Food Database</a>
	</li>	
	<li class="links">
	<a <?php if($thisPage == 'mealPlanner') echo "id = 'currentPage'";?> href="mealPlanner.php">Meal Planner</a>
	</li>
	</ul>
</div>



