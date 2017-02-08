//**************************************************************************************//
//JavaScript that is used to create a PDF of the meal planner.
//**************************************************************************************//

//***********************************************//
//Function enlargers the meal planner 3X and applies
//CSS that makes the planner more printer friendly.
//An image is created from the modified planner. 
//The image is translated into base64 code and
//sent to pdfCreator.php
//***********************************************//
function sendToPDF() {
	
	applyTempCSS();
	
	var w = parseInt( document.getElementById("planner").offsetWidth )/3;
	var h = parseInt( document.getElementById("planner").offsetHeight )/3;
	
	html2canvas($("#planner"), {
		
            onrendered : function(canvas) {
            	
                var data = canvas.toDataURL();
                
                htmlJSON = {"pdfHTML":"<!DOCtype html><html>" +
	 		"<head><link type=\"text/css\" href=\"../css/pdfStyle.css\" rel=\"stylesheet\" />"+
	 		"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />"+
			"<title></title></head><body><img src=\"../pdf/image.png\" height=\"" + h 
	 		+ "\" width=\"" + w + "\"></body></html>"};	
        var params = {};
	params["pdfHTML"] = htmlJSON.pdfHTML;
	params["planImage"] = data;
	url = "php/pdfCreator.php";
           
          $.post(
		url, 
		params,
        	function(data,status){
				
        	
			if( data.substring(0, 3) == "You" ) {
				displayMessageToUser("", data, "ok", function(){ location.reload();}, null);
				} else { 	
			
				document.getElementById( "pdfContainer" ).innerHTML = 
				'<i id = "pdfLink" class="fa fa-file-pdf-o fa-lg qlink" title ="Create PDF" aria-hidden="true"></i>';				
				

				displayMessageToUser("Click \"OK\" to access the requested PDF. ", 
				"",
				"okc", function() {
				window.open("./pdf/plan.pdf");
				hideMessageToUser();
				}, 
				hideMessageToUser);
			
				} //end of if statement
        	
        	}).fail(function() {
    			
    			//fail
    			alert( "Problem with page: " + data  );
  			
  			}); //end of fail handler
             
            	} //end of onrender handler
        	}); // end of html2canvas handler
	
	reverseTempCSS();
	} //end of function
//***********************************************//


//***********************************************//
//CSS that is applied to meal planner to create
//printer friendly image.
//***********************************************//	
function applyTempCSS() {

		var ELEMENT = jQuery( "#planner" );
	
		ELEMENT.css( "font-size", "300%" );
		ELEMENT.css( "border", "6px solid #c4c4c4" );
    	ELEMENT.css( "padding",  "3px 3px 3px 3px" );

		var ELEMENT = jQuery( ".sq"  );
    	ELEMENT.css( "border", "6px solid #c4c4c4" );
    	ELEMENT.css( "padding",  "3px 3px 3px 3px" );
    	ELEMENT.css( "color",  "black" );
    	
    	var ELEMENT = jQuery( ".mTitle"  );
    	ELEMENT.css( "background-color",  "#c4c4c4" );
    	ELEMENT.css( "border", "2px solid black" );
    	
    	var ELEMENT = jQuery( ".dTitle"  );
    	ELEMENT.css( "background-color",  "#c4c4c4" );
    	ELEMENT.css( "border", "2px solid black" );
    	
    	var ELEMENT = jQuery( ".dayTotals"  );
    	ELEMENT.css( "color",  "black" );
    	
		var ELEMENT = jQuery( "#custInfo"  );
    	ELEMENT.css( "color", "black" );
    	
    	var ELEMENT = jQuery( ".snack"  );
    	ELEMENT.css( "background-color", "#e0f5f9" );
	
	} //end of function
//***********************************************//


//***********************************************//
//Returns CSS to normal
//***********************************************//
function reverseTempCSS() {

		var ELEMENT = jQuery( "#planner"  );
		ELEMENT.css( "font-size", "100%" );
		ELEMENT.css( "border", "2px solid #4682B4" );
    	ELEMENT.css( "padding",  "1px 1px 1px 1px" );
    	
    	var ELEMENT = jQuery( ".sq"  );
    	ELEMENT.css( "border", "2px solid #4682B4" );
    	ELEMENT.css( "padding",  "1px 1px 1px 1px" );
    	ELEMENT.css( "color",  "#4682B4" );
    	
    	var ELEMENT = jQuery( ".mTitle"  );
    	ELEMENT.css( "background-color",  "#4682B4" );
    	ELEMENT.css( "border", "2px solid #4682B4" );
    	
    	var ELEMENT = jQuery( ".dTitle"  );
    	ELEMENT.css( "background-color",  "#4682B4" );
    	ELEMENT.css( "border", "2px solid #4682B4" );
    	
    	var ELEMENT = jQuery( ".dayTotals"  );
    	ELEMENT.css( "color",  "#4682B4" );
    	
    	var ELEMENT = jQuery( "#custInfo"  );
    	ELEMENT.css( "color", "#4682B4" );
    	
    	var ELEMENT = jQuery( ".snack"  );
    	ELEMENT.css( "background-color", "white" );

	} //end of function
//***********************************************//

//***********************************************//
//Changes the quick link and navigation 
//"Create PDF" button to show a message that the 
//PDF is in the processs of being created.
//***********************************************//
	function createPDF() {
		
		var processMsg = '<i class="fa fa-spinner fa-pulse fa-lg fa-fw qlink loader"></i>';
			
		document.getElementById("pdfContainer").title = "processing";
		
		sendToPDF();
		document.getElementById( "pdfContainer" ).innerHTML = processMsg;
		
				 		
		displayMessageToUser("A PDF is currently being created.  You will be alerted"+
	 	" when the PDF is ready for download", "", "ok", hideMessageToUser, 
	 	hideMessageToUser);
	 	
		}; //end of function
//***********************************************//