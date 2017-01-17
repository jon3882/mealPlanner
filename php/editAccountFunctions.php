<?php
session_start();
// This php file contains functions to be used to edit a 
// user account from the settings page

		
//runs delete account function from ajax post
if( isset($_GET["delete"]) ){
	echo '<script type="text/javascript">alert("hello!");</script>';
	$userID = $_SESSION['validUser'];
	deleteAccount($userID);	
}

//function will change the users first and last name and
//return true if successful
function editName($newFirst, $newLast){
	$result = false;

	include_once('../../private/connectDB.php');
	$conn = new mysqli($servername, $username, $password, $dbname);	
	// Check connection
	if (!$conn) {
	    die("Connection failed: " . $conn->connect_error);
			}

	$sql = "UPDATE authorizedUsers SET firstName='".$newFirst."',
	lastName='".$newLast."' WHERE id=".$_SESSION["validUser"];
	
	$result = $conn->query( $sql );

	if(mysqli_affected_rows($conn) == 1){
		$result = true;
		$_SESSION["firstName"] = $newFirst;
		$_SESSION["lastName"] = $newLast;
	}

	
	mysqli_close( $conn );

	return $result;
}

//function will will change email address for user
function editEmail($newEmail){
	$result = false;

	include_once('../../private/connectDB.php');
	$conn = new mysqli($servername, $username, $password, $dbname);	
	// Check connection
	if (!$conn) {
	    die("Connection failed: " . $conn->connect_error);
			}

	$sql = "UPDATE authorizedUsers SET user='".$newEmail."' WHERE id=".$_SESSION["validUser"];

	$result = $conn->query( $sql );

	if(mysqli_affected_rows($conn) == 1){
		$result = true;
		$_SESSION["email"] = $newEmail;		
	}

	return $result;
}


//function changes password if user enters correct new password
//and the new password match. This function checks password match 
//on server side. Could be offloaded to client side later
function editPassword($currentPass, $newPass1, $newPass2){
	$result = "<span class='resultMsg error'>Something went wrong! Changes were not made to your account!</span>";

	include_once('../../private/connectDB.php');
	include_once('authorize.php');

	
	if(strcmp($newPass1,$newPass2) == 0){
		//checks current password
		
		$authorizedMsg = authorizeUser($_SESSION['email'],$currentPass);


		// makes changes if authorized user
		if(strcmp($authorizedMsg, "authorized")==0){
			$conn = new mysqli($servername, $username, $password, $dbname);	
			// Check connection
			if (!$conn) {
			    die("Connection failed: " . $conn->connect_error);
					}

			$sql = "UPDATE authorizedUsers SET userPassword='".crypt( $newPass2 )."' WHERE id=".$_SESSION["validUser"];
			
			$result = $conn->query( $sql );

			if(mysqli_affected_rows($conn) == 1){
				$result = "<span class='resultMsg success'>You have successfully changed your password!</span>";						
			}

		}else{
			$result = "<span class='resultMsg error'>Invalid current password entered.</span>";
		}
	}else{
		$result = "<span class='resultMsg error'>New password values do not match!</span>";
	}
	
	return $result;	
}

//function will delete all tables associated with user as well
//as the row in authorized users table
function deleteAccount($userID){
	$result = false;

	include_once('../../private/connectDB.php');

	$conn = new mysqli($servername, $username, $password, $dbname);	
	// Check connection
	if (!$conn) {
	    die("Connection failed: " . $conn->connect_error);
			}

	$table1 = $userID."_foodElement";
	$table2 = $userID."_mealElement";
	$table3 = $userID."_mealplans";

	$sql =  "DROP TABLE ".$table1.", ".$table2.", ".$table3;

	$result = $conn->query( $sql );

	$sql = "DELETE FROM authorizedUsers WHERE id='".$userID."'";

	$result = $conn->query( $sql );	
	
}

//ajax post to delete the user account
if( isset($_GET["delete"]) ){
	$userID = $_SESSION['validUser'];
	deleteAccount($userID);	
} 

?>