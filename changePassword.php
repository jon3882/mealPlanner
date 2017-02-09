<?php

// ***************************************************
// Password change page. Login protected.
//****************************************************

include('../../private/loginProtect.php');

$msg = "";

if(isset($_POST['currentPass']) && isset($_POST['newPass1']) && isset($_POST['newPass2'])){
	
	$currentPass = $_POST['currentPass'];
	$newPass1 = $_POST['newPass1'];
	$newPass2 = $_POST['newPass2'];
	
	include_once('php/editAccountFunctions.php');
	$msg = editPassword($currentPass, $newPass1, $newPass2);	
}

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
User account: <?php echo $_SESSION["firstName"]." ".$_SESSION["lastName"];?><br>

<div class="settings main">
<span class="breadCrumb"><a href="accountSettings.php">Account Settings</a>
&nbsp&nbsp<i class="fa fa-arrow-right" aria-hidden="true"></i>
&nbsp&nbspChange Password
</span>
<span class="box thin section">
<div class="desc">
You may change the password you have associated with your account but you must first enter your current password, the new password and re-enter the new password again. You must click save changes to finalize the changes.
</div>
<form name="frmregister"action="<?= $_SERVER['PHP_SELF'] ?>" method="post" >
<br>
<br>
<b>Current Password</b>
<br>
<input class="box thin" type="password" name="currentPass" id="currentPass">
<br>
<br>
<b>New Password</b>
<br>
<input class="box thin" type="password" name="newPass1" id="newPass1" size="30">
<br>
<br>
<b>Reenter New Password</b>
<br>
<input class="box thin" type="password" name="newPass2" id="newPass2" size="30">
<br>
<br>
<button type="submit">Save Changes</button>
</form>
</span>
<?php echo $msg;?>
</div>
</div>

</body>
</html>