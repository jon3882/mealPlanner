//**************************************************************************************//
//JavaScript that is appied to files that use a message box to send messages to the
//user.
//**************************************************************************************//

//*********************************************//
//Functions display information to the user.  The message box function
//allows for two possible button configurations: ok and (ok/cancel). A
//reference to the functions executed when these buttons are clicked is
//also passed.
//*********************************************//

//*****************Messagebox Javascript*******************************//	

//***********************************************************//
//Shows the loader message while waiting for AJAX requests
//to return.
//***********************************************************//	
function showLoader() {

	$("#msgQuestion").hide();
	$("#msgItem").hide();
	$(".messageButtons").hide();

	$("#msgContainer").css("display", "flex");
	$("#msgContainer").show();
	$("#loaderContainer").show();

	} //end of function
//***********************************************************//

//***********************************************************//
//Hides the loader message when a AJAX request has returned.
//***********************************************************//	
function hideLoader() {

	$("#msgQuestion").show();
	$("#msgItem").show();
	$(".messageButtons").show();
	
	$("#loaderContainer").hide();

	} //end of function
//***********************************************************//

//***********************************************************//
//Custom Message box.  Arguments are two lines for a message 
//(msgQ and msgI), whether the message type is ok or ok/cancel
//(msgType), a reference for a function to execute if "ok" is 
//pressed and a reference of a function to execute if "cancel" is
//pressed.
//***********************************************************//	
function displayMessageToUser( msgQ, msgI, msgType, okFunction, cancelFunction ) {

	document.getElementById( "msgQuestion" ).innerHTML = msgQ;
	document.getElementById( "msgItem" ).innerHTML = msgI;

	if( msgType == "ok" )  $("#msgCancel").hide(); 
	else $("#msgCancel").show(); 

	$('#msgOK').unbind('click');
	$('#msgCancel').unbind('click');

	$("#msgOK").click( okFunction );
	$("#msgCancel").click( cancelFunction );
	
	$("#msgContainer").css("display", "flex");
	$("#msgContainer").show();
	$(".content-wrapper").fadeTo(.5, .3);
	$(".content-wrapper *").prop('disabled',true); 
	$(".messageBox").fadeIn();

	} //end of function
//***********************************************************//

//***********************************************************//
//Hides custom message box from user.
//***********************************************************//
function hideMessageToUser() {

	$(".content-wrapper").fadeTo(.5, 1);
	$(".content-wrapper *").prop('disabled',false); 
	$(".messageBox").fadeOut();
	$("#msgContainer").hide();

	} //end of function
//***********************************************************//