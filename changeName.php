<?php
//session_start();
// ***************************************************
// Change name page. Login protected.
//****************************************************

include('../../private/loginProtect.php');

$msg = "";

if(isset($_POST['first']) && isset($_POST['last'])){
	$newFirst = $_POST['first'];
	//echo $newFirst;
	$newLast = $_POST['last'];

	include('php/editAccountFunctions.php');
	$edited = editName($newFirst, $newLast);

	if($edited){
		$msg = "<span class='resultMsg success'>You have successfully changed your name!</span>";
	}else{
		$msg = "<span class='resultMsg error'>Something went wrong! Changes were not made to your account!</span>";
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
&nbsp&nbspChange Name
</span>
<span class="box thin section">
<div class="desc">
You may change the name you would like to have associated with your account and click save to finalize the changes.
</div>
<form name="frmregister"action="<?= $_SERVER['PHP_SELF'] ?>" method="post" >
<br>
<br>
<b>First Name</b>
<br>
<?php echo '<input class="box thin" type="text" name="first" id="first" value="'.$_SESSION["firstName"].'">'?>
<br>
<br>
<b>Last Name</b>
<br>
<?php echo '<input class="box thin" type="text" name="last" id="first" value="'.$_SESSION["lastName"].'">'?>
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