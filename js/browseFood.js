//**************************************************************************************//
//Creates the food element browse dialog
//**************************************************************************************//

//Variable stores JSON describing categories
var categories;
//Variable stores JSON describing search
//results.
var bResults;

//***********************************************//
//Function is passed the id of the html container
//that contains the browse button used to access
//the browse dialog and is passed the function
//that is executed when a food is selected.
//***********************************************//	
function attachBrowseDialog( elementID, selectFunc ) {

	var buttonHTML = "<button onclick='browseDialog( " + selectFunc.toString() + ", \"\" )'>Browse</button>";
	document.getElementById( elementID ).innerHTML = buttonHTML;

	} //end of function
//***********************************************//

//***********************************************//
//Function opens a browse dialog using the messagebox
//and attaches a function to be executed when the
//the ok button is clicked. Function is called everytime
//the input is changed and the text in the inputbox
//is passed back into the inputbox.  The inputbox is 
//given focus and the cursor moved to the end of the
//input.
//***********************************************//
function browseDialog( func, textInput ) {
	
	//execute in ajax request callback fill categories global variable
	ajaxPost( "php/browse.php", "No Message", "Error retriving categories.", 
		function(data) {
				
		//alert( data );		
				
		categories = jQuery.parseJSON( data );
	
	var browseHTML = "<select id=\"foodBrowse\" name=\"foodBrowseName\" " +
	"onchange='requestUpdateBrowseResults( this.value );' style=\"width:90%;\"></select>"+
	createBrowseResultsHTML( textInput );
		
	displayMessageToUser( "<h4>Browse - USDA Nutrient Database</h4>"+
	"<div style=\"font-size: 80%;\"><span style\"\">POWERED BY </span>U.S. Department of Agriculture,"+
	" Agricultural Research Service. 20xx. USDA National Nutrient"+
	" Database for Standard Reference, Release . Nutrient Data Laboratory Home Page, "+
	"http://www.ars.usda.gov/nutrientdata<div><br>", browseHTML, "okc",
	function() { 
	
		var selFood = $(".searchResultSelect").attr("id");
		func( bResults[selFood] );	
	
		} //end of function
	, hideMessageToUser);
	
	setMsgBoxWidth( "450px" );
		
	msgBoxOKBtnDisable( true );
	
	document.getElementById("foodBrowse").innerHTML = writeDropDown( "No Category Selected." );
	
		});
	
	}//end of function
//***********************************************//

//***********************************************//
//Function creates the HTML used to select a food
//from the browse dialog.
//***********************************************//
function createBrowseResultsHTML( stringToMatch ) {
	
	//Need to get distinct categories
	if( stringToMatch != "newFood") requestUpdateBrowseResults( stringToMatch );
	else createNewFood();
	
	var temp = "<table style=\"display:table;"
					+"background-color:white;margin-left: auto; margin-right: auto;  height: 250px;"
					+"max-height:250px; width:100%; font-size:small; overflow-y:scroll;\">"
					+"<tr><td style=\"text-align:center;\">"				
					+"</td></tr></table>";
	
	resultsTable = "<div id=\"resultContentContainer\" style=\"width:100%;\">"
	+"<div id=\"matchNum\">Possible Matches: 0</div><table "
	+"style=\"width: 80%; margin-left: auto; margin-right: auto;"
	+"background-color:white;border-collapse: separate; border-radius: 25px;" 
	+"padding: 10px; border: 2px solid #a1a1a1; table-layout:auto;\"><tr><td style=\"text-align:left;width:100%;\" id=\"browseRC\">"
	+temp+"</td></tr></table></div>";
	
	return resultsTable;
	
	} //end of function createResultsHTML
//***********************************************//

function createNewFood() {
	
	msgBoxOKBtnDisable( false );
	msgBoxCancelBtnHide( true );
	msgBoxSetOKButtonCaption( "Create Food" );
	msgBoxSetOKFunction( function(){ alert( "create function" );} );
	msgBoxOKBtnSize( "40%" );
	writeFoodInputHTML();
		
	}//end of function 

function writeFoodInputHTML() {
	
	var temp = 
	"<table style=\"display:table;"+
	"background-color:white;margin-left: auto; margin-right: auto;  height: 250px;"+
	"max-height:250px; width:100%; font-size:small; overflow-y:scroll;\">"+
	"<tr><td style=\"text-align:center;\">"+
	"<div class=\"foodInputs\" style=\"text-align:left;\">"+ 
	"<div class=\"topFood\">"+
	"Food Name<br>"+
	"<input type=\"food\" id=\"foodDesc\" style=\"width:90%;background-color:#f2f0c1;\" ><br>"+	
	"<div class=\"innerFoodBoxLeft\">"+
	"Serving Size<br>"+
	"<input type=\"servingSize\" id=\"servingSize\" style=\"width:45%;background-color:#f2f0c1;\" >"+
	"</div>"+
	"</select>"+
	"<div class=\"innerFoodBoxRight\">"+
	"Measurement<br>"+
	"<select size=\"1\" id=\"measurement\" class=\"size\" style=\"background-color:#f2f0c1;\">"+
		"<option id=\"measurementOption\" class=\"size\" value=\"0\" selected disabled hidden>Pick one...</option>"+
		"<option class=\"size\" value=\"1\">TBSP(s)</option>"+
		"<option class=\"size\" value=\"1\">Oz</option>"+
		"<option class=\"size\" value=\"2\">Cups</option>"+
		"<option class=\"size\" value=\"3\">Grams</option>"+
		"<option class=\"size\" value=\"4\">Small</option>"+
		"<option class=\"size\" value=\"5\">Medium</option>"+
		"<option class=\"size\" value=\"6\">Large</option>"+
		"<option class=\"size\" value=\"7\">X-Large</option>"+	
		"<option class=\"size\" value=\"8\">Jumbo</option>"+
		"<option class=\"size\" value=\"9\">Pieces</option>"+
		"<option class=\"size\" value=\"10\">Slices</option>"+			
	"</select>"+
	"</div>"+
	"</div>"+		        						
	"<div class=\"bottomFood\">"+
	"<div class=\"innerFoodBoxLeft\">"+
	"Calories<br>"+
	"<input type=\"text\" name=\"calories\" id=\"calories\" style=\"width:45%;background-color:#f2f0c1;\"><br>"+
	"Carbs (g) <br>"+
	"<input type=\"text\" name=\"carbs\" id=\"carbs\" style=\"width:45%;background-color:#f2f0c1;\"><br>"+	
	"</div>"+
	"<div class=\"innerFoodBoxRight\">"+
	"Fat (g) <br>"+
	"<input type=\"text\" name=\"fat\" id=\"fat\" style=\"width:45%;background-color:#f2f0c1;\"><br>"+	
	"Protein (g) <br>"+
	"<input type=\"text\" name=\"protein\" id=\"protein\" style=\"width:45%;background-color:#f2f0c1;\"><br>"+
	"</div>"+
	"</div>"+
	"</tr></table>";
	
	document.getElementById( "matchNum" ).innerHTML = "<br>";
	document.getElementById( "browseRC" ).innerHTML = temp;
	
	} //end of function

//***********************************************//
//Function is executed when the search input box is
//changed.  Executes an ajax request that returns
//food elements matching the search term and sorts
//them by the position of the search term (matching
//strings where the search term appears near the
//the front of the string are displayed first).
//***********************************************//
function requestUpdateBrowseResults( stringToMatch ) {
	
	msgBoxOKBtnDisable( true );
	msgBoxCancelBtnHide( false );
	msgBoxSetOKFunction( msgBoxGetInitFunction() );
	msgBoxSetOKButtonCaption( "OK" );
	msgBoxOKBtnSize( "20%" );
	
	if( stringToMatch != "newFood") {
	
	
	if( document.getElementById( "browseRC" ) != undefined ) {
	
	//html for busy spinner defined.	
	busySpinner = "<table style=\"display:table;"
					+"background-color:white;margin-left: auto; margin-right: auto;  height: 250px;"
					+"max-height:250px; width:100%; font-size:small; overflow-y:scroll;\">"
					+"<tr><td style=\"text-align:center;\">"
					+"<i class=\"fa fa-spinner fa-pulse fa-2x fa-fw qlink loader\"" 
					+"style=\"width:100%;color:#4682B4\"></i>"
					+"</td></tr></table>";
					
	document.getElementById( "browseRC" ).innerHTML = busySpinner;
	
	ajaxPost( "php/browse.php?category="+stringToMatch, "No Message", "Error searching USDA database.", 
		function(data) {
			
			//alert( data );
			
			var temp = "<table class=\"searchResultTable\" style=\"display:block;"
					+"background-color:white;  height: 250px;"
					+"max-height:250px; min-width:100%; font-size:small; overflow-y:scroll;\">";
					
			document.getElementById( "matchNum" ).innerHTML = "Possible Matches: 0";
			
			if( data != "0 results" ) { 
			
				var fTable = "usda";
				if( stringToMatch == "userDefined" ) fTable = "user";
			
				bResults = jQuery.parseJSON( data );
				//var shortStringToMatch = stringToMatch.split(" ")[0];

				document.getElementById( "matchNum" ).innerHTML = "Possible Matches: " + bResults.length;
			
				for( var i = 0; i<bResults.length; i++ ) {
			
					if( stringToMatch == "favorites" ) fTable = bResults[i].foodTable; 
			
					var foodDesc =  bResults[i].foodDesc;
					foodDesc = foodDesc + " (" + bResults[i].servingSize + " " + bResults[i].measurement + ")" +
					"<table><tr><td>&#8226</td><td><table class=\"searchResultDetails\" "+
					"><tr><td>" + "Cal: </td><td>" + bResults[i].cal + "</td>" +
					"<td>Carb: </td><td>"+ bResults[i].carb + "</td></tr>" +
					"<tr><td>Protein: </td><td>" + bResults[i].protein + "</td><td>" +
					"Fat: </td><td>" + bResults[i].fat  + "</td></tr>" +
					"</table></td></tr></table>";
			
					temp = temp + "<tr><td style=\"padding: 10px; border-radius: 25px;\" "+
					" onclick='selectBrowseFoodElement( this )'  class=\"searchResult\" id=\"" + i + "\">";
					temp = temp + foodDesc;
					
					if( fTable == "user" && stringToMatch != "favorites" ) {
						
						temp = temp + "</td><td id=\"edit"+bResults[i].id+"\" onclick=\"editUserDefined( "+bResults[i].id+")\">"+
						"<i class=\"fa fa-2x fa-pencil userDefinedHover\"  aria-hidden=\"true\" style=\"color:#4682B4\"></i>"+
						"</td>"+
						"<td id=\"del"+bResults[i].id+"\" onclick=\"delUserDefined( "+bResults[i].id+")\">"+
						"<i class=\"fa fa-2x fa-trash userDefinedHover\"  aria-hidden=\"true\" style=\"color:#4682B4\"></i>"+
						"</td>";
						}
					
					temp = temp + "</td><td id=\"search"+ bResults[i].id + fTable +"\" onclick=\"changeFavoriteStatus( 'search', "+bResults[i].id
					+" , '"+ fTable +"' )\"><div class=\"userDefinedHover\"><span class=\"fa-stack fa-1x\"><i class=\"fa fa-star-o fa-stack-2x\"  aria-hidden=\"true\" style=\"color:#4682B4\"></i><span>"+
					"</td></tr>";
							
							 
							
					} //end of for loop
				} else {

					temp = "<table style=\"display:table;"
					+"background-color:white;  height: 200px;"
					+"max-height:200px; width:100%; font-size:small; overflow-y:scroll;\">"
					+"<tr><td style=\"width:100%;\">"
					+"</td></tr></table>";
				
					}//end of if statement
				
				temp = temp +"</table>";
				document.getElementById( "browseRC" ).innerHTML = temp;
				getFavorites( "search", "usda");
				getFavorites( "search", "user");
				
		
			});
	
	} //end of if statement
	} else createNewFood(); //end of if statement
	} //end of function 
//***********************************************//

function editUserDefined( id ) {
	
	msgBoxOKBtnDisable( false );
	msgBoxCancelBtnHide( true );
	msgBoxSetOKButtonCaption( "Save" );
	msgBoxSetOKFunction( function(){ alert( "edit function " + id );} );
	msgBoxOKBtnSize( "40%" );
	writeFoodInputHTML();
	document.getElementsByName("foodBrowseName")[0].options[0].innerHTML = "Edit -"+id;
	document.getElementsByName("foodBrowseName")[0].options[0].selected = true;
	//document.getElementsByName("foodBrowseName")[0].options[0].visibility = 
	
	} //end of function
	
function delUserDefined( id ) {
	
	//var delBtnHTML = "<button>Cancel</button>";
	
	document.getElementById( "del"+id ).innerHTML = "<i class=\"fa fa-2x fa-times-circle userDefinedHover\"  aria-hidden=\"true\" style=\"color:#f44242\"></i>";
	document.getElementById( "edit"+id ).innerHTML = "<div class=\"userDefinedHover\"><span class=\"fa-stack fa-1x\">"+
			"<i class=\"fa fa-lg fa-trash fa-stack-1x\" aria-hidden=\"true\" style=\"color:#4682B4\"></i>"+
			"<i class=\"fa fa-3x fa-ban fa-stack-2x text-danger\" style=\"color:#f44242\"></i>"+
			"</span></div>";
	
	} //end function

function writeDropDown( currentSelection ) {
	
	var dropdownHTML = "";
	var placeholder = "<option value disabled>—————————————</option>" +
		"<option value=\"\" disabled selected hidden>Please select a food category.</option>"+
		"<option value=\"favorites\">Favorites</option>"+
		"<option value=\"userDefined\">User Defined</option>"+
		"<option value=\"newFood\">Create New Food</option>"+
		"<option value disabled>—————————————</option>"+
		"<option value>All foods</option>";
	
	for( var i = 0; i<categories.length; i++ ) {
	
	if( currentSelection == categories[i].macroType ) {
		dropdownHTML = dropdownHTML + "<option value=\""+
		categories[i].macroType+"\" selected=\"selected\">"+categories[i].macroType+"</option>";
		placeholder = "";
		} else dropdownHTML = dropdownHTML + "<option value=\""+
		categories[i].macroType+"\">"+categories[i].macroType+"</option>";
	
		} //end of if statement
	
	return placeholder + dropdownHTML;
	
	} //end of function


//***********************************************//
//Function alters the CSS of the selected Element
//in the results window and enables the OK button
//for the message box.
//***********************************************//
function selectBrowseFoodElement( obj ) {
	
	$(".searchResult").attr("class", "searchResult"); 
	obj.className = "searchResult searchResultSelect";
	msgBoxOKBtnDisable( false );
	
	} //end of function 
//***********************************************//
