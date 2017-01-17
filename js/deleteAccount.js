// funtions for displaying message box to user when deleting account
// these functions call messageBox.js for the message box shell

//global var for userid
var userID;


$(document).ready(function(){
	hideLoader();
}); 

function displaySecondMessage(){
	displayMessageToUser("Last chance you will lose all data associated with your account!",
		"", "cu Delete", deleteAccount, hideMessageToUser );
	
}

//runs ajax post to delete users account.
function deleteAccount(){
	showLoader();
	ajaxPost("php/editAccountFunctions.php?delete=delete",
		"You have successfully deleted your account. We are sorry to see you leave.",
		"Something went wrong!");
}

function logout(){
	window.location.replace("php/logout.php");
}

//***********************************************************//
//ajax posts made through this function
//***********************************************************//	
function ajaxPost( url, successMsg, errorMsg ) {
	
	var params = {};
	//how to add parameters
	//params["username"] = "";

	$.post(
		url, 
		params,
        	function(data,status){
			
			//success
			$("#msgContainer").hide();
			hideLoader();
			
			displayMessageToUser(successMsg, "", "ok", logout, null);
				
				}) //end of success handler
			.fail(function() {
    			
    			displayMessageToUser(errorMsg,"","ok",hideMessageToUser,null);
  			
  				}); //end of fail handler
 		

	} //end of function
//***********************************************************//