<?php 

session_start();

$userid = $_POST['userid'];
$userPassword = $_POST['userPassword'];

include('../../private/connectDB.php');

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	}
	
$sql = "SELECT * FROM authorizedUsers WHERE user='".$userid."'";
$result = $conn->query($sql);
mysqli_close( $conn );

if($result->num_rows > 0 ) {

	$row = $result->fetch_assoc();

	$hashed_password = $row["userPassword"];
	$id = $row["id"];
	$uName = $row["firstName"];
	
	
	$status = $row["status"];

	//$hashed_password = crypt( $hashed_password ); //remove after hash is saved.

	if (hash_equals($hashed_password, crypt($userPassword, $hashed_password))) {
   		
   		if( $status == "active" ) {	
   		
   			$_SESSION["validUser"] = $id;
   			$_SESSION["userName"] = $uName;
   			header("Location: http://bryankristofferson.com/mealPlanner/");
			exit;
		
			} else {
			
			$msg = "The account associated with email ".$userid." is not active: ".$status;
			
			} //end of if statement
   		
		} else {
		
		if(isset($userid) || isset($userPassword)) $msg = "The email/password combination entered were not found.";
		
		} //end of if statement

	} else {

	if( isset($userid) || isset($userPassword) ) $msg = "The email/password combination entered were not found.";

	} //end of if statement

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

<div id="title" class="title">
 
<span style="float:left; color:#4682B4;">Menu</span>
 
<span>Login</span>
<span style="float:right; color:#4682B4;">Menu</span>
 
</div>


<div>&nbsp<br>&nbsp</div>


	<form name="frmregister"action="<?= $_SERVER['PHP_SELF'] ?>" method="post" >
		<table class="form" border="0">

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
				<input class="send_btn" type="submit" value="Submit" alt="Submit" title="Submit" />
				
				<input class="send_btn" type="reset" value="Reset" alt="Reset" title="Reset" /></td>
				
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