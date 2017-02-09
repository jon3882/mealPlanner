<?php
session_start();
// ***************************************************
// Account settings page. Login protected.
//****************************************************

include('../../private/loginProtect.php');
?>

<!DOCTYPE html>
<html>
<head>
	<title>Meal Planner</title>
</head>
<link rel="stylesheet" href="css/accountSettingsStyle.css">
<link rel="stylesheet" href="css/messageBoxStyle.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/deleteAccount.js"></script>
<script src="js/messageBox.js"></script>
<body>

<?php
/////////////// Title bar/////////////////
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
&nbsp&nbspDelete Account
</span>
<span class="box thin section">
<div class="desc">
Are you sure you want to delete your account? You will lose all data associated
with your account to include meal plans and custom foods in the database. If you
would like to continue please enter your credentials and click delete account.
</div>
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
<?php include 'messageBox.php';?>
</html>



<?php 
// When user clicks delete this function will authorize user then pass control
// to javascript for user prompts before deleting account.
if(isset($_POST['username']) && isset($_POST['userPass'])){

	$userid = $_POST['username'];
	$userPassword = $_POST['userPass'];

	include('php/authorize.php');

	$authorizedMsg = authorizeUser($userid, $userPassword);
	
	if (strcmp($authorizedMsg, "authorized") == 0){
		?>

		<!-- Call to message box if username and pass are authorized -->
		<script type="text/javascript">
		
		window.onload = displayMessageToUser("Delete account for:", <?php echo "'".$_SESSION["firstName"]." ".$_SESSION["lastName"]."'"; ?>, "okc",	displaySecondMessage, hideMessageToUser);
					
		</script>

		<?php
	}else{
		?>

		<!-- Displays invalid credentials prompt to user -->
		<script type="text/javascript">
		
		window.onload = displayMessageToUser("Invalid Username/Password entered for this account.","", "ok",hideMessageToUser, null);
			
		</script>

		<?php
	}
}
?>