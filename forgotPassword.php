<?php 

//***************************************************************
//Interface for forgot password webpage.  (Not Complete)
//***************************************************************
$msg = ""; //needs to be initialized for local server
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Forgot Password</title>
<meta name="description" content=""/>
<meta name="keywords" content=""/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="js/forgotJavaScript.js"></script> 
<link href="css/loginStyle.css" rel="stylesheet" type="text/css">

</head>
<body>

<!--************Navigation Bar**********************-->
<?php  
$thisPage = 'forgotPassword';
include_once('navBar.php');
?>
<!--************Navigation Bar end******************-->


<div>&nbsp<br>&nbsp</div>


	<form name="frmregister"action="<?= $_SERVER['PHP_SELF'] ?>" method="post" >
		<table class="form box thin" border="0">

			<tr>
			<td></td><td></td>
				
			</tr> 
			
			<tr>
				<th><label for="name"><strong>Email:</strong></label></th>
				<td><input class="inp-text" name="userid" onchange="validate()" onkeyup="validate()"
				 id="userid" type="text" size="30" /></td>
			</tr>
			
			<tr>
			<td colspan="3">
			
			<table>
			<tr>
			
			<td style="width: 198px;">
				</td>
			<td >
			<input class="btn send_btn" id="submitBtn" type="submit" 
				value="Submit" alt="Submit" title="Submit" disabled/>
				<input class="btn send_btn" type="reset" value="Reset" alt="Reset" title="Reset" />
				</td>
			</tr>
			</table>
			
			</td>	
			</tr>
			<tr>
			<td colspan="3" style="color:#4682B4; text-align:center;">
			
			<div style="width:100%;">
			<table id="links">
			<tr>
			<td>
			<a href="register.php" style="text-decoration: none; color:#4682B4;">Create An Account</a>
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

</body>
</html>