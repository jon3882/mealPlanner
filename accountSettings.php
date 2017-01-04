<?php

// ***************************************************
// Account settings page. Login protected.
//****************************************************

include('../../private/loginProtect.php');
$uName = $_SESSION["userName"];
$lastName = $_SESSION["lastName"];
$userEmail = $_SESSION["email"];
$fullName = $_SESSION["userName"]." ".$_SESSION["lastName"];
?>

<!DOCTYPE html>
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
User account: <?php echo $fullName;?> 
<div class="settings main">
<span class="box thin section">
<b>Name:</b>
<button class="acctBtns" id="changeName" onclick="location.href = 'changeName.php'" >Edit</button>
<br> <?php echo $fullName;?>	
</span>
<span class="box thin section">
<b>Email/Username:</b>
<button class="acctBtns" onclick="location.href = 'changeEmail.php'">Edit</button>
<br><?php echo $userEmail; ?>
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