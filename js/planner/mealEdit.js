function displayMessageEditor( msgQ, msgI, msgType, okFunction, cancelFunction ) {

	//setMsgBoxWidth( "300px" );
	//msgBoxOKBtnDisable( false );
	
	document.getElementById( "msgQuestionEditor" ).innerHTML = msgQ;
	document.getElementById( "msgItemEditor" ).innerHTML = msgI;

	if( msgType == "ok" )  $("#editorCancel").hide(); 
	else $("#editorCancel").show(); 
	
	if( msgType.substring( 0, 2 ) == "cu" )
		document.getElementById( "editorOK" ).innerHTML = msgType.substring(3);
		else document.getElementById( "editorOK" ).innerHTML = "Save Meal";
	
	$('#editorOK').unbind('click');
	$('#editorCancel').unbind('click');
	
	$("#editorOK").click( okFunction );
	$("#editorCancel").click( cancelFunction );
	
	$("#mealEditorContainer").css("display", "flex");
	$("#mealEditorContainer").fadeTo(.1, 1);
	$("#mealEditorContainer *").prop('disabled',false); 
	$("#mealEditorContainer").show();
	$(".content-wrapper").fadeTo(.5, .3);
	$(".content-wrapper *").prop('disabled',true); 
	$(".messageBoxEditor").fadeIn();
	
	$('div#mealEditorContainer').click(function(e){
		e.stopPropagation();
		});
	
	editorWriteExistingItemsToCell();

	} //end of function
//***********************************************************//

//***********************************************************//
//Hides custom message box from user.
//***********************************************************//
function hideEditorToUser() {

	//alert( "hide editor" );
	hideMessageToUser();
	
	$(".content-wrapper").fadeTo(.5, 1);
	$(".content-wrapper *").prop('disabled',false);
	
	$(".messageBoxEditor").fadeOut();
	$("#mealEditorContainer").hide();
	

	} //end of function
//***********************************************************//

//***********************************************************//
//Changes the function executed when the OK button is pressed.
//***********************************************************//
function editorWriteExistingItemsToCell() {
	
	if( mealSchedule[mealIndex] != undefined ) {
                   	
                 for( var k = 0; k<mealSchedule[mealIndex].length; k++ ) {  		
                   	insertFoodMealEditor( mealSchedule[mealIndex][k], mealSchedule[mealIndex][k].servingSize );	
                   	} //end for loop
                   	
                   	//updateMacros();
                   	
                } //end of if statement   
	
	} //end of function
	
//***********************************************//
//Function cancels the editor and closes the 
//dialog (no changes to the meal planner)
//***********************************************//
function pressCancelMealEdit() {

	$("#mealEditorContainer").fadeTo(.5, .6);
	$("#mealEditorContainer *").prop('disabled',true); 
	//$("#editorOK").prop('disabled',true); 
	
	//disable all buttons and expansion icon.

	displayMessageToUser("", "Are you sure you want to exit the meal editor?" +
	"  All changes will be lost.", 
				"okc", hideEditorToUser, function(){ 
					hideMessageToUser(); 
					$("#mealEditorContainer *").prop('disabled',false); 
					$("#mealEditorContainer").fadeTo(.1, 1);
					$(".content-wrapper").fadeTo(.1, .3);
					
					} );

	} //end of if statement
//***********************************************//

function pressOKMealEdit( func, mealName ) {

	$("#mealEditorContainer").fadeTo(.5, .6);
	$("#mealEditorContainer *").prop('disabled',true); 
	//$("#editorOK").prop('disabled',true); 
	//disable all buttons and expansion icon.

	displayMessageToUser("", "Are you sure you want to save the changes you have made to the following meal ( " + mealName + " )?",
		"okc", func, function(){ 
					hideMessageToUser(); 
					$("#mealEditorContainer *").prop('disabled',false); 
					$("#mealEditorContainer").fadeTo(.1, 1);
					$(".content-wrapper").fadeTo(.1, .3);
					} );

	} //end of if statement
//***********************************************//