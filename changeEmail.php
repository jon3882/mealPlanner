<?php
session_start();
// ***************************************************
// Change name page. Login protected.
//****************************************************

include('../../private/loginProtect.php');

$msg = "";

if(isset($_POST['email'])){
	$newEmail = $_POST['email'];
	
	include('php/editAccountFunctions.php');
	$edited = editEmail($newEmail);

	if($edited){
		$msg = "<span class='resultMsg success'>You have successfully changed your email address!</span>";
	}else{
		$msg = "<span class='resultMsg error'>Something went wrong. Changes were not made to your account!</span>";
	}
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
&nbsp&nbspChange Email Address
</span>
<span class="box thin section">
<div class="desc">
You may change the email address you would like to have associated
with your account and click save to finalize the changes.
</div>
<form name="frmregister"action="<?= $_SERVER['PHP_SELF'] ?>" method="post" >
<br>
<br>
<b>Email/Username</b>
<br>
<?php echo '<input class="box thin" type="text" name="email" id="email" value="'.$_SESSION["email"].'">'?>
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