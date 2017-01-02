<?php 

//***************************************************************
//Interface for registation webpage. 
//***************************************************************

session_start();



$fname = $_POST['fname'];
$lname = $_POST['lname'];
$userid = $_POST['userid'];
$pass = $_POST['userPassword'];

//use private authentication to connect to the database
include('../../private/connectDB.php');

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	}
//////////////////////////////////////////////////////////	
//Check if the email address is already assigned to a user
//////////////////////////////////////////////////////////

$sql = "SELECT * FROM authorizedUsers WHERE user='".$userid."'";
$result = $conn->query($sql);


if($result->num_rows > 0 && isset($userid) ) {

		$msg = "The email address: ".$userid." is already associated with an account.";
		
		} //end of if statement

//////////////////////////////////////////////////////////	
//If user doesn't exist insert the new user into the 
//authorizedUsers database.
//////////////////////////////////////////////////////////

if($result->num_rows == 0 && isset($userid) ) {

		$sql = "INSERT INTO authorizedUsers (user, status, userPassword, firstName, lastName )".
                                        " VALUES ('".
					$userid."','".
                                        "active"."','". 
                                        crypt( $pass )."','". 
                                        $fname."','".               
                                        $lname."')";
                                                       
                $r = $conn->query($sql);

//////////////////////////////////////////////////////////	
//After user has been inserted into the database.  Find
//out what id was assigned to the user.
//////////////////////////////////////////////////////////
           
                $sql = "SELECT * FROM authorizedUsers WHERE user='".$userid."'";
		$result = $conn->query($sql);
		
		$id = "null";

		if($result->num_rows > 0 ) {

				$row = $result->fetch_assoc();
				$id = $row["id"];
	
				} //end of if statement

//////////////////////////////////////////////////////////	
//After getting the id of the new user, create two tables 
//using the id: foodElement and mealElement.
//////////////////////////////////////////////////////////		

		$sql = "CREATE TABLE IF NOT EXISTS `".$id."_foodElement` (".
  				"`id` int(11) NOT NULL AUTO_INCREMENT,".
  				"`macroType` text NOT NULL,".
  				"`cal` decimal(10,1) NOT NULL,".
  				"`protein` decimal(10,1) NOT NULL,".
  				"`carb` decimal(10,1) NOT NULL,".
  				"`fat` decimal(10,1) NOT NULL,".
  				"`foodDesc` text NOT NULL,".
  				"`servingSize` decimal(10,1) NOT NULL,".
  				"`measurement` text NOT NULL,".
  				"PRIMARY KEY (`id`))";
  				
  		$r = $conn->query($sql);
  		
  		

		$sql = "CREATE TABLE IF NOT EXISTS `".$id."_mealElement` (".
  				"`id` int(11) NOT NULL AUTO_INCREMENT,".
  				"`foodElementID` int(11) NOT NULL,".
  				"`cell` text NOT NULL,".
  				"`servingSize` text NOT NULL,".
  				"`planName` text NOT NULL,".
  				"PRIMARY KEY (`id`))";
  				
  		$r = $conn->query($sql);	
			
		if( $id != "null" ) {	
			$msg = "An account with the email test address: ".$userid." was successfully created.";
		 	} else {
		 	
		 	$msg = "Failed to create an account with the email test address: ".$userid.".";
		 	
		 	} //end of if statement
		 
		 } //end of if statement

mysqli_close( $conn );
		 
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Register</title>
<meta name="description" content=""/>
<meta name="keywords" content=""/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/registerJavaScript.js"></script> 
<script src="js/messageBox.js"></script>
<link href="css/loginStyle.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/messageBoxStyle.css">

</head>
<body>

<!--************Navigation Bar**********************-->
<?php  
$thisPage = 'register';
include_once('navBar.php');
?>
<!--************Navigation Bar End******************-->

<div>&nbsp<br>&nbsp</div>


	<form id="regForm" name="frmregister" action="<?= $_SERVER['PHP_SELF'] ?>" method="post" >
		<table class="form" border="0">

			<tr>
			<td></td><td></td>
				
			</tr> 
			
			<tr>
				<th><label for="fname"><strong>First Name:</strong></label></th>
				<td><input class="inp-text" name="fname" onchange="validate()" onkeyup="validate()"
				 id="fname" type="text" size="30" /></td>
			</tr>
			
			<tr>
				<th><label for="lname"><strong>Last Name:</strong></label></th>
				<td><input class="inp-text" name="lname" onchange="validate()" onkeyup="validate()"
				 id="lname" type="text" size="30" /></td>
			</tr>
			
			
			<tr>
				<th><label for="name"><strong>Email:</strong></label></th>
				<td><input class="inp-text" name="userid" onchange="validate()" onkeyup="validate()"
				 id="userid" type="text" size="30" /></td>
			</tr>
			<tr>
				<th><label for="name"><strong>Password:</strong></label></th>
				<td><input class="inp-text" name="userPassword" id="pass1"
				 onchange="validate()" onkeyup="validate()"
					type="password" size="30" />
						</td>
			<tr>
				<th><label for="name"><strong>Re-enter password:</strong></label></th>
				<td><input class="inp-text" name="userPassword" id="pass2"
				onchange="validate()" onkeyup="validate()"
				type="password" size="30" />
						</td>
			</tr>
			<tr>
			<td></td>
				<td class="submit-button-right">
				<input class="send_btn" id="submitBtn" type="button" 
				value="Submit" alt="Submit" title="Submit" disabled/>
				
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
			<td> <a href="login.php" style="text-decoration: none; color:#4682B4;">Existing User</a> <td>
			</tr>
			</table>
			</div>
			
			</td>
			</tr>
		</table>
	</form>
				<table style="width:100%">
				</tr>
				<td id="msg" style="color:red; text-align:center">
				<?php echo $msg; ?></td>
				</tr>
				</table>
				
			
<?php include 'messageBox.php';?>

</body>
</html>