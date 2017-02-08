//**************************************************************************************//
//Utility functions used in the meal planner.
//**************************************************************************************//

//***********************************************//
//Function rounds numbers.  Used when totals are
//calculated to round to one decimal place.
//***********************************************//	
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
} //end of function
//***********************************************//

//***********************************************************//
//Function is used to make ajax requests.  Function also
//sets returnFlags to True to notify the checkLoadStatus 
//that the global variables are set.
//***********************************************************//	
function ajaxPost( url, successMsg, errorMsg, func) {

	var params = {};
	//how to add parameters
	//params["username"] = "";

	$.post(
		url, 
		params,
        	function(data,status){
				
			//Checks if session is valid	
			if( data.substring(0, 3) == "You" ) {
				displayMessageToUser("", data, "ok", function(){ location.reload();}, null);
				} else { 	
			
					if( successMsg != "No Message" ) {
						displayMessageToUser("", successMsg, "ok", hideMessageToUser, null);
						} //end of if statement
			
					func( data );

				} //end of if statement
				
				}) //end of success handler
			.fail(function() {
    			
    			//fail
    			alert( errorMsg );
  			
  				}); //end of fail handler		

	} //end of function

//***********************************************//
//Function preloads images so they are loaded more
//quickly.
//***********************************************//
function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}
//***********************************************//

//***********************************************//
//Function returns the height of the title bar
//***********************************************//
function getTitleHeight(){
              return document.getElementById("title").clientHeight;
              } //end of function
//***********************************************//

//***********************************************//
//Function returns safe input for the planner.
//***********************************************//
function makeInputSafe( inputText ) {
	
	inputText = inputText.replace(",", " ");
	return inputText;
	
	} //end of function 