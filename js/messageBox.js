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

//Global variable holds inital execution function
var initFunction;

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

	setMsgBoxWidth( "300px" );
	msgBoxOKBtnDisable( false );

	document.getElementById( "msgQuestion" ).innerHTML = msgQ;
	document.getElementById( "msgItem" ).innerHTML = msgI;

	if( msgType == "ok" )  $("#msgCancel").hide(); 
	else $("#msgCancel").show(); 
	
	if( msgType.substring( 0, 2 ) == "cu" )
		document.getElementById( "msgOK" ).innerHTML = msgType.substring(3);
		else document.getElementById( "msgOK" ).innerHTML = "OK";
	
	$('#msgOK').unbind('click');
	$('#msgCancel').unbind('click');

	initFunction = okFunction;
	
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

//***********************************************************//
//Enables and disables the OK button using a boolean argument.
//***********************************************************//
function msgBoxOKBtnDisable( requestedState ) {
	
	if( requestedState ) {
		$("#msgOK").prop("disabled",true);
		$("#msgOK").fadeTo(0, 0.5);
		} //end of if statement
		
	if( !requestedState ) {
		$("#msgOK").prop("disabled",false);
		$("#msgOK").fadeTo(0, 1);
		} //end of if statement

	} //end of function 
	
//***********************************************************//
//Changes the width of the displayed message box.
//***********************************************************//
function setMsgBoxWidth( w ) {
	
	$(".messageBox").css( "width", w );
	
	} //end of function

//***********************************************************//
//Changes the function executed when the OK button is pressed.
//***********************************************************//
function msgBoxSetOKFunction( func ) {
	
	$('#msgOK').unbind('click');	
	$("#msgOK").click( func );
	
	} //end of function

//***********************************************************//
//Retrieves the initial function set for the msgbox.
//***********************************************************//	
function msgBoxGetInitFunction() {
	
	return initFunction;
	
	} //end of function
	
function msgBoxCancelBtnHide( state ) {
	
	if( state )  $("#msgCancel").hide(); 
	else $("#msgCancel").show(); 
	
	} //end of if statement
	
function msgBoxOKBtnSize( percent ) {
	
	$("#msgOK").css( "width", percent );
		
	} //end of if statement
	
//***********************************************************//
//Sets the text displayed on the OK button.
//***********************************************************//	
function msgBoxSetOKButtonCaption( btnText ) {

	document.getElementById( "msgOK" ).innerHTML = btnText;

	} //end of function 
