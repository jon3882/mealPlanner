<?php

// ***************************************************
// Account settings page. Login protected.
//****************************************************
include('../../private/loginProtect.php');
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>Meal Planner</title>
</head>
<link rel="stylesheet" href="css/accountSettingsStyle.css">
<body>

<!--************Title Bar**********************-->
<?php 
$thisPage = "accountSettings";
include_once('navBar.php');
?>
<!-- ******************************************* -->
<br>
<br>
<div class="content" >
<h2>Change Account Settings</h2>
User account: <?php echo $_SESSION["firstName"]." ".$_SESSION["lastName"];?> 
<div class="settings main">
<span class="box thin section">
<b>Name:</b>
<button class="acctBtns" id="changeName" onclick="location.href = 'changeName.php'" >Edit</button>
<br> <?php echo $_SESSION["firstName"]." ".$_SESSION["lastName"];?>	
</span>
<span class="box thin section">
<b>Email/Username:</b>
<button class="acctBtns" onclick="location.href = 'changeEmail.php'">Edit</button>
<br><?php echo $_SESSION["email"]; ?>
</span>
<span class="box thin section">
<b>Password:</b>
<button class="acctBtns" onclick="location.href = 'changePassword.php'">Edit</button>
<br>********
</span>
<span class="box thin section delete">
<button class="dltAccount" onclick="location.href = 'deleteAccount.php'">Delete Account</button>
</span>
</div> 









</body>
</html>