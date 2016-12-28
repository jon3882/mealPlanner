//**************************************************************************************//
//JavaScript that is appied to the file forgotPassword.php.
//**************************************************************************************//

//*********************************************//
//JQuery applied when the document is loaded.
//submit button is disabled.
//*********************************************//
$(document).ready(function(){

	$("#submitBtn").prop('disabled', true);
	$("#submitBtn").fadeTo(10, 0.50);
	
	//Every quarter second the change event is fired for 
	//every input.  This makes the validation function 
	//execute and update the page.
	setTimeout(function() {
    		$('input').each(function() {
        		var elem = $(this);
        		if (elem.val()) elem.change();
    			})
			}, 250);

	});
	
//*********************************************//
//Function enables the submit button if the 
//validateCustomerInput does not return any
//errors.
//*********************************************//	 
function validate() {

	document.getElementById( "msg" ).innerHTML = validateCustomerInput();

	if( validateCustomerInput() == "" ) {
	
		$("#submitBtn").prop('disabled', false);
		$("#submitBtn").fadeTo(10, 1);
	
		} else {
			
	$("#submitBtn").prop('disabled', true);
	$("#submitBtn").fadeTo(10, 0.50);
		
		}//end of if statement

	} //end of function
//*********************************************//

//*********************************************//
//Function returns a string of errors in the user
//input.  Returns an empty string if the user input
//is valid.
//*********************************************//
function validateCustomerInput(){
                      //error message variable
                      var errorMessage = "";
                     
                      //variables for input values
                      
                      var email = document.getElementById("userid").value;			
 
                      //email validation
                      if (email == null || email == ""){
                                errorMessage += "<li>Email has no value.</li>";
                      		} else if (checkEmail(email)){
                                errorMessage += "<li>Email is not valid.</li>";
                      		} //end of if statement
                                                                        
                      return errorMessage;
           } //end function
//*********************************************//

//*********************************************//
//function to check if email is valid.
//*********************************************//
function checkEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email);
	}
//*********************************************//
