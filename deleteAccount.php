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

<!-- ***************Content of Page**************-->
<div class="content" >
<h2>Change Account Settings</h2>
User account: <?php echo $fullName;?><br>

<div class="settings main">
<span class="breadCrumb"><a href="accountSettings.php">Account Settings</a>
&nbsp&nbsp<i class="fa fa-arrow-right" aria-hidden="true"></i>
&nbsp&nbspDelete Account
</span>
<span class="box thin section">
Are you sure you want to delete your account? You will lose all data associated<br>
with your account to include meal plans and custom foods in the database. If you<br>
would like to continue please enter your credentials and click delete account.
<form name="frmregister"action="<?= $_SERVER['PHP_SELF'] ?>" method="post" >
<br>
<br>
<b>Email/Username</b>
<br>
<input class="box thin" type="text" name="username" id="username">
<br>
<br>
<b>Password</b>
<br>
<input class="box thin" type="password" name="userPass" id="userPass">
<br>
<br>
<button class="dltAccount" type="submit">Delete Account</button>
</form>
</span>
</div>
</div>

</body>
</html>