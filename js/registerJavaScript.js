//**************************************************************************************//
//JavaScript applied to the file register.php.
//**************************************************************************************//

//*********************************************//
//JQuery applied when the document is loaded.
//submit button is disabled.
//*********************************************//
$(document).ready(function(){

	$("#submitBtn").prop('disabled', true);
	$("#submitBtn").fadeTo(10, 0.50);
	
	
	setTimeout(function() {
    		$('input').each(function() {
        		var elem = $(this);
        		if (elem.val()) elem.change();
    			})
			}, 250);
			
	$("#submitBtn").click(function(){
    		
			hideLoader();
			displayMessageToUser("<h3 style=\"color:red\">DISCLAIMER</h3>", "The meal plans created with this website are intended"+
				" for PERSONAL USE.  The creation of individual meal plans for renumeration is regulated"+
				" by state law (I.E. commerical use).  If you intend to create meal plans commerically, "+ 
				" please review the following website for further information." + 
				" <br>"+	
				"<a href=\"http://www.nutritionadvocacy.org/laws-state\">http://www.nutritionadvocacy.org/laws-state</a>"+
				" <br>In summary, IF YOU DON'T HAVE THE EDUCATION REQUIRED"+
				" BY YOUR RESPECTIVE STATE TO PROVIDE INDIVIDUALIZED NUTRITION COUNSELING," + 
				" IT IS ILLEGAL TO CHARGE PEOPLE TO MAKE MEAL PLANS FOR THEM.", "okc", 
				function(){
				document.getElementById("regForm").submit();
			}, hideMessageToUser);
			
    		});

	});
//*********************************************//

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
                      var fname = document.getElementById("fname").value;
                      var lname = document.getElementById("lname").value;
                      var pass1 = document.getElementById("pass1").value;
                      var pass2 = document.getElementById("pass2").value;
                      var email = document.getElementById("userid").value;
                    
                      if (fname == null || fname == ""){                                      
                                 errorMessage += "<li>First name has no value.</li>";
                       		} //end of if statement
                       		
                     if (lname == null || lname == ""){                                      
                                 errorMessage += "<li>Last name has no value.</li>";
                       		} //end of if statement
                    
                      //password validation             
                      if (pass1 == null || pass1 == ""){                                      
                                 errorMessage += "<li>Password has no value.</li>";
                       		} //end of if statement
 
                      //re-enter password validation
                      if (pass2 == null || pass2 == ""){
                                 errorMessage += "<li>Re-enter password has no value.</li>";
                      		} //end of if statement
                      		
                      		
                      //password match validation
                      if (pass1 != pass2 ){
                                 errorMessage += "<li>Passwords do not match.</li>";
                      		} //end of if statement				
 
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
