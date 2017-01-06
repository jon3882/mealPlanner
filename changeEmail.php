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
<?php echo '<input class="box thin" type="text" name="first" id="first" value="'.$userEmail.'">'?>
<br>
<br>
<button type="submit">Save Changes</button>
</form>
</span>
</div>
</div>

</body>
</html>