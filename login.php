<?php 

session_start();

$userid = null;
$userPassword = null;
$msg = '';

if(isset($_POST['userid']) && isset($_POST['userPassword'])){

	$userid = $_POST['userid'];
	$userPassword = $_POST['userPassword'];
    
	include('php/authorize.php');
	
	$authorizedMsg = authorizeUser($userid, $userPassword);
	
		
	if (strcmp($authorizedMsg, "authorized") == 0){
		header("Location: mealPlanner.php");		
	}else if(strcmp($authorizedMsg, "inactive") == 0){
		$msg = "The account associated with email ".$userid." is no longer active.";
	}else{
		$msg = "The email/password combination entered were not found."; //.$authorizedMsg."-";
	}
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login</title>
<meta name="description" content=""/>
<meta name="keywords" content=""/>
<link href="css/loginStyle.css" rel="stylesheet" type="text/css">

</head>
<body>

<!--************Title Bar**********************-->
<?php 
$thisPage = "Login";
include_once('navBar.php');
?>


<div>&nbsp<br>&nbsp</div>


	<form name="frmregister"action="<?= $_SERVER['PHP_SELF'] ?>" method="post" >
		<table class="form box thin" border="0">

			<tr>
			<td></td><td></td>
				
			</tr> 
			
			<tr>
				<th><label for="name"><strong>Email:</strong></label></th>
				<td><input class="inp-text" name="userid" id="userid" type="text" size="30" /></td>
			</tr>
			<tr>
				<th><label for="name"><strong>Password:</strong></label></th>
				<td><input class="inp-text" name="userPassword" id="userPassword" type="password" size="30" /></td>
			</tr>
			<tr>
			<td></td>
				<td class="submit-button-right">
				<input class="send_btn btn" type="submit" value="Submit" alt="Submit" title="Submit" />
				
				<input class="send_btn btn" type="reset" value="Reset" alt="Reset" title="Reset" />
				</td>
				
			</tr>
			<tr>
			<td colspan="3" style="color:#4682B4; text-align:center;">
			
			<div style="width:100%;">
			<table id="links">
			<tr>
			<td>
			<a href="forgotPassword.php" style="text-decoration: none; color:#4682B4;">Forgot Password</a>
			</td><td>|</td>
			<td> <a href="register.php" style="text-decoration: none; color:#4682B4;">Create an Account</a> <td>
			</tr>
			</table>
			</div>
			
			</td>
			</tr>
		</table>
	</form>
				<table style="width:100%">
				</tr>
				<td style="color:red; text-align:center">
				<?php echo $msg; ?></td>
				</tr>
				</table>

</body>
</html>