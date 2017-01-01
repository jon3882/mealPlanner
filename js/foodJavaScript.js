//**************************************************************************************//
//JavaScript that is appied to the file foodData.php.
//**************************************************************************************//


//global variable for customers
var food;

//************************************************//
//JQuery Functions
//************************************************//
$(document).ready(function(){

    	$("#add").click(function(){
    		clearInput();	
        	$("#input").fadeIn();
        	$(".addbtn").hide();
    		});

    	$("#edit").click(function(){
    		submitAction( "edit" );
        	$("#input").fadeIn();
    		});

    	$("#save").click(function(){
    	
    		if( validateFoodInput() == "" ) {
    			submitAction( "save" );
    			$("#input").fadeIn();
    			} else {
    	
    			displayMessageToUser("", validateFoodInput(), "ok", hideMessageToUser, null);
    			$("#input").fadeIn();
    	
    			} //end of if statement  
    		});

	$("#cancel").click(function(){
    
        	$("#input").fadeOut();
        	$(".addbtn").show();
        
    		});
    	  	
    	$("#delete").click(function(){
    		submitAction( "del" );	
	  	});	
	  	
	$( ".menu" ).mouseover(function() {
                      $("#dropbtn").show();             
                      document.getElementById("dropbtn").style.top = getTitleHeight() + "px";
           	});
 
        $( ".menu" ).mouseout(function() {
                      $("#dropbtn").hide();
           	}); 	
	}); 
//************************************************//

function getTitleHeight(){
           return document.getElementById("title").clientHeight;
           } //end of function

//function loads global variable with data from database
//and populates the listbox.
function startup() {

	// var spanWidth = document.getElementById("menu").clientWidth;
          
 //        document.getElementById("menu").style.height = getTitleHeight() + "px";
 //        document.getElementById("menu").style.width = (spanWidth * 2) + "px";
	
	showLoader();
	
	ajaxPost( "php/getJSON.php?table=foodElement", "No Message", "Error"); 

	} //end of function

//*********************************************************//
//Functions associated with input validation and user feedback
//to input.
//***********************************************************//

function submitAction( actionType ) {

	if( document.getElementById('foodSelect').options.length == 0 ) { 
	
		//do nothing
			
		} else {

		var foodElement = getFoodElement( $('#foodSelect option:selected').val() );
	
		} //end of if statement

	if( actionType == "save" ) {
	
		var foodDesc = document.getElementById( "foodDesc" ).value;
	
		var func = function() {
			var index = document.getElementById( "save" ).value;		
			if( index == 0) ajaxPost( makeAddURL( index ), "The following food element was successfully added:<br>" + 
				foodDesc, "Error" );
			   else ajaxPost( makeAddURL( index ), "The following food element was successfully edited:<br>" + 
				foodDesc, "Error" );
			showLoader();
			} //end of fucntion definition
	
		var index = document.getElementById( "save" ).value;
		if( index == 0 ) displayMessageToUser( "Are you sure you want to add the following food element?", 
		foodDesc, "okc",func, hideMessageToUser);
		else displayMessageToUser( "Are you sure you want to edit the following food element?", 
		foodDesc, "okc",func, hideMessageToUser); 
	
		} //end of if statement
		
	if( actionType == "del" ) {
	
		if( document.getElementById('foodSelect').options.length == 0 ) { 
	
		displayMessageToUser("", "The database contains no food elements to be deleted.", "ok", hideMessageToUser, null);	
			
		} else {
	
		var func = function() {
			var delURL = "php/deleteFoodElement.php?id="+$('#foodSelect option:selected').val();
		
			ajaxPost( delURL, "The following food element was successfully deleted:<br>" + 
				foodElement.foodDesc, "Error" );
			showLoader();
			} //end of fucntion definition
	
		displayMessageToUser( "Are you sure you want to delete the following food item?", 
		foodElement.foodDesc, "okc",func, hideMessageToUser);
		
		
		} //end of if statement
		
		
		} //end of if statement
		
	if( actionType == "edit" ) {
	
		if( document.getElementById('foodSelect').options.length == 0 ) { 
	
		displayMessageToUser("", "The database contains no food elements to be edited.", "ok", hideMessageToUser, null);	
			
		} else {
		
		$("#input").fadeIn();
		$(".addbtn").hide();
	
		document.getElementById( "msgInput" ).innerHTML = "*Changes applied to " + 
    		foodElement.foodDesc + ".";
		document.getElementById( "save" ).value = $('#foodSelect option:selected').val();		
				
		document.getElementById( "foodDesc" ).value = foodElement.foodDesc;
		document.getElementById( "macroTypeOption" ).innerHTML = foodElement.macroType;
		document.getElementById( "servingSize" ).value = foodElement.servingSize;
		document.getElementById( "measurementOption" ).innerHTML = foodElement.measurement;
		
		document.getElementById( "calories" ).value = foodElement.cal;
		document.getElementById( "carbs" ).value = foodElement.carb;
		document.getElementById( "protein" ).value = foodElement.protein;
		document.getElementById( "fat" ).value = foodElement.fat;
		
		document.getElementById("measurement").selectedIndex = "0";
		document.getElementById("macroType").selectedIndex = "0";
		
		}//end of if statement
		
		} //end of if statement

	} //end of function

function getFoodElement( id ) {

	for( var i = 0; i<food.length; i++ ) {
	
		if( food[i].id == id ) {
			return food[i];
			} //end of if statement 
	
		} //end of for loop

	} //end of function
	
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
			
			//alert( data );
			
			if( data != "0 results" ) { 
				if( successMsg != "No Message" ) {
					displayMessageToUser("", successMsg, "ok", hideMessageToUser, null);
					}
				food = jQuery.parseJSON( data );
				populateListBox();
				$(".addbtn").show();
				$("#input").fadeOut();
				} else {
				
				displayMessageToUser("", "The database contains no food elements.", 
					"ok", hideMessageToUser, null);
				document.getElementById("foodSelect").innerHTML = "";
				
				} //end of if statement
				
				}) //end of success handler
			.fail(function() {
    			
    			//fail
    			alert( errorMsg );
  			
  				}); //end of fail handler
 		

	} //end of function
//***********************************************************//


//***********************************************************//
//Grabs the global variable "food" which is a JSON object that
//was returned from the AJAX request.  Uses variable to 
//populate the listbox the user selects foods from.
//***********************************************************//
function populateListBox() {

	var listboxItems = "";
	
	for( var i = 0; i<food.length; i++ ) {
	
		if( i == 0 ) var begOpt = "<option selected value=\"";
		else begOpt = "<option value=\"";
	
		listboxItems = listboxItems + begOpt + food[i].id +"\">"+ food[i].foodDesc +"</option>";
		
		} //end of for loop
		
		document.getElementById("foodSelect").innerHTML = listboxItems;
			

	} //end of function

//***********************************************************//
//Creates the url used to pass data needed to create a new
//food element.  The file addFoodElement.php receives arguments
//via url variables to write to the database.
//***********************************************************//
	function makeAddURL( index ) {

		var foodDesc = document.getElementById( "foodDesc" ).value;
		var servingSize = document.getElementById( "servingSize" ).value;
		
		
		var e = document.getElementById( "measurement" );
		var measurement = e.options[e.selectedIndex].text;
		e = document.getElementById( "macroType" );
		var macroType = e.options[e.selectedIndex].text;
		
		var cal = document.getElementById( "calories" ).value;
		var carb = document.getElementById( "carbs" ).value;
		var protein = document.getElementById( "protein" ).value;
		var fat = document.getElementById( "fat" ).value;
	

	var url;
	if( index == 0 ) {
		url = "php/addFoodElement.php?foodDesc=" + foodDesc + "&serve=" + servingSize + "&measure=" + measurement + 
			"&macroType=" + macroType + "&cal=" + cal + "&carb=" + carb + "&protein=" + protein + "&fat=" + fat;
			
		} else {
		
		//alert( index );
	
		url = "php/editFoodElement.php?id=" + index + "&foodDesc=" + foodDesc + "&serve=" + servingSize +
		 "&measure=" + measurement + "&macroType=" + macroType + "&cal=" + cal + "&carb=" + carb + 
		 "&protein=" + protein + "&fat=" + fat;
	
		} //end of if statement

	//alert( url );
	return url;

	} //end of function
//***********************************************************//

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

//***********************************************************//
//Clears the inputboxes used to create a new food item.
//***********************************************************//	
function clearInput() {

	document.getElementById( "calories" ).value = "";
	document.getElementById( "carbs" ).value = "";
	document.getElementById( "fat" ).value = "";
	document.getElementById( "protein" ).value = "";
	document.getElementById( "foodDesc" ).value = "";
	document.getElementById( "servingSize" ).value = "";
			
	document.getElementById( "measurementOption" ).innerHTML = "Pick one...";
	document.getElementById( "macroTypeOption" ).innerHTML = "Pick one...";
	document.getElementById( "msgInput" ).innerHTML = "";
	document.getElementById("measurement").selectedIndex = "0";
	document.getElementById("macroType").selectedIndex = "0";
	document.getElementById( "save" ).value = "0";

	} //end of function
//***********************************************************//
	
//foodInput validation////////////////////////////////////////////
function validateFoodInput(){

	var errorMessage = "";
	var foodName = document.getElementById("foodDesc").value;
	var foodType = $( "#macroType option:selected" ).text();
                             
	var servingSize = document.getElementById("servingSize").value;
	var servingType = $( "#measurement option:selected" ).text(); 
	var calories = document.getElementById("calories").value;
	var fat = document.getElementById("fat").value;
	var carbs = document.getElementById("carbs").value;
	var protein = document.getElementById("protein").value;
                     
//checks food name
	if (foodName == null || foodName == ""){                                  
		errorMessage += "<li>Food Name has no value</li>";
		} else if (checkSpecialChars(foodName, false)){
			errorMessage += "<li>Food Name has illegal character(s)</li>"
		}
 
//checks foodType
	if(foodType == "Pick one..."){
		errorMessage += "<li>Food Type not selected.</li>"
		}
 
//checks servingType
	if(servingType == "Pick one..."){
		errorMessage += "<li>Serving Type not selected.</li>"
		}
 
//check serving size
	if (servingSize == null || servingSize == ""){
		errorMessage += "<li>Serving Size has no value.</li>";
		}else if (isNaN(servingSize)){
			errorMessage += "<li>Invalid serving size</li>";
		}else if (servingSize <= 0 || servingSize > 1000){
			errorMessage += "<li>Serving Size is out of range.</li>";
			} //end of if statement
 
//check calories
	if (calories == null || calories == ""){
		errorMessage += "<li>Calorie amount has no value.</li>";
		}else if (isNaN(calories)){
			errorMessage += "<li>Invalid calorie amount.</li>";
		}else if (calories < 0 || calories > 1000){
			errorMessage += "<li>Calorie amount is out of range.</li>";
			} //end of if statment
 
//check fat
	if (fat == null || fat == ""){
		errorMessage += "<li>Fat has no value.</li>";
		}else if (isNaN(fat)){
			errorMessage += "<li>Invalid fat amount.</li>";
		}else if (fat < 0 || fat > 1000){
			errorMessage += "<li>Fat amount is out of range.</li>";
			} //end of if statement
 
//check carbs
	if (carbs == null || carbs == ""){
		errorMessage += "<li>Carbs has no value.</li>";
		}else if (isNaN(carbs)){
		errorMessage += "<li>Invalid carbs amount.</li>";
		}else if (carbs < 0 || carbs > 1000){
		errorMessage += "<li>Carbs amount is out of range.</li>";
		} //end of if statement
 
//check protein
	if (protein == null || protein == ""){
			errorMessage += "<li>Protein has no value.</li>";
		}else if (isNaN(protein)){
			errorMessage += "<li>Invalid protein amount.</li>";
		}else if (protein < 0 || protein > 1000){
			errorMessage += "<li>Protein amount is out of range.</li>";
		} //end of if statement
 		return errorMessage;
	} //end of function 
 
 
//function to check string for special chars
function checkSpecialChars(str, email){
	if (email == true){
			var specialChars = "~!#$%^&*()+={}\"|[];',/\\?<>";
		}else{
			var specialChars = "~!@#$%^&*()+={}\"|[];',/\\?<>.";
		} //end of function                  
                     
	for (var i = 0; i < str.length; i++) {
		if(specialChars.indexOf(str.charAt(i)) != -1){
			return true;
			} //end of if statement
		} //end of for loop	
	return false;
	} //end of function	
	
