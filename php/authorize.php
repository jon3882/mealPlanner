<?php
session_start();

function authorizeUser($userid, $userPassword){

// test to make sure git pull is working on server
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
		$lastName = $row["lastName"];
		$userEmail = $row["user"];
		$status = $row["status"];

		

		if (hash_equals($hashed_password, crypt($userPassword, $hashed_password))) {
			if ($status == "active"){
				//fills session variables for authorized user
				$_SESSION["validUser"] = $id;
	   			$_SESSION["firstName"] = $uName;
	   			$_SESSION["lastName"] = $lastName;
	   			$_SESSION["email"] = $userEmail;
	   			return "authorized";
			}else{
				//inactive account
				return "inactive";
			}
		}else{
			//if invalid email or password
			
			return "invalid";
		}
	}else{
		//if no user match is found
		return "invalid";
	
	}
}
?>