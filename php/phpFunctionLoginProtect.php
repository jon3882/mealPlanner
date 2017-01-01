<?php

//error_reporting(E_ERROR | E_PARSE);

session_start();

if( isset($_SESSION["validUser"])) {

	//do nothing

	} else {
	echo "You are no longer logged in.  Press 'OK' to be redirected to the".
			" login page.";
	exit;
	
	} //end of if statement

?>