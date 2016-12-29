<?php 

//**************************************************************************************//
//PHP that is accessed through AJAX requests.  PHP file provides the function of destroying
//the session and redirecting the browser to the login page.  
//**************************************************************************************//

session_start();
unset( $_SESSION['valid_user']);
session_destroy();

include('../../../private/loginProtect.php');

?>