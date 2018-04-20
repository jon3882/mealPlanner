//**************************************************************************************//
//Creates the USDA Nutrient Database search dialog
//**************************************************************************************//

//Variable stores JSON describing search
//results.
var sResults;

//***********************************************//
//Function is passed the id of the html container
//that contains the search button used to access
//the search dialog and is passed the function
//that is executed when a food is selected.
//***********************************************//	
function attachUSDANutrient( elementID, selectFunc ) {

	var buttonHTML = "<button onclick='usdaSearchDialog( " + selectFunc.toString() + ", \"\" )'>Search</button>";
	document.getElementById( elementID ).innerHTML = buttonHTML;

	} //end of function
//***********************************************//


//***********************************************//
//Function opens a search dialog using the messagebox
//and attaches a function to be executed when the
//the ok button is clicked. Function is called everytime
//the input is changed and the text in the inputbox
//is passed back into the inputbox.  The inputbox is 
//given focus and the cursor moved to the end of the
//input.
//***********************************************//
function usdaSearchDialog( func, textInput ) {
	
	var searchHTML = "<input type=\"text\" placeholder=\"Three character minimum to search.\"  value=\"" + textInput + "\" id=\"foodSearch\" " +
	"onkeyup='requestUpdateSearchResults( this.value );' style=\"width:90%;\">"+
	createResultsHTML( textInput );
		
	displayMessageToUser( "<h4>SEARCH - USDA Nutrient Database</h4>"+
	"<div style=\"font-size: 80%;\"><span style\"\">POWERED BY </span>U.S. Department of Agriculture,"+
	" Agricultural Research Service. 20xx. USDA National Nutrient"+
	" Database for Standard Reference, Release . Nutrient Data Laboratory Home Page, "+
	"http://www.ars.usda.gov/nutrientdata<div>", searchHTML, "okc",
	function() { 
	
		var selFood = $(".searchResultSelect").attr("id");
		func( sResults[selFood] );	
	
		} //end of function
	, hideMessageToUser);
	
	setMsgBoxWidth( "450px" );
	
	var input = document.getElementById("foodSearch");
	input.focus(); //sets focus to element
	var val = input.value; //store the value of the element
	input.value = ''; //clear the value of the element
	input.value = val;
	msgBoxOKBtnDisable( true );
	
	}//end of function
//***********************************************//


//***********************************************//
//Function creates the HTML used to select a food
//from the USDA Nutrient database.
//***********************************************//
function createResultsHTML( stringToMatch ) {
	
	requestUpdateSearchResults( stringToMatch );
	
	var temp = "<table style=\"display:table;"
					+"background-color:white;  height: 200px;"
					+"max-height:200px; width:100%; font-size:small; overflow-y:scroll;\">"
					+"<tr><td style=\"width:100%;\">"
					+"</td></tr></table>";
	
	
	var resultsTable = "<div style=\"width:100%;\">"
	+"<div id=\"matchNum\">Possible Matches: 0</div><table "
	+"style=\"width: 80%; margin-left: auto; margin-right: auto; display:block;"
	+"background-color:white; border-radius: 25px;" 
	+"padding: 10px; border: 2px solid #a1a1a1; table-layout:fixed;\"><tr><td style=\"text-align:left;width:100%;\" id=\"searchRC\">"
	+temp+"</td><td></td></tr></table></div>";
	
	return resultsTable;
	
	} //end of function createResultsHTML
//***********************************************//

//***********************************************//
//Function is executed when the search input box is
//changed.  Executes an ajax request that returns
//food elements matching the search term and sorts
//them by the position of the search term (matching
//strings where the search term appears near the
//the front of the string are displayed first).
//***********************************************//
function requestUpdateSearchResults( stringToMatch ) {
	
	msgBoxOKBtnDisable( true );
	
	if( document.getElementById( "searchRC" ) != undefined ) {
	
	var busySpinner = "<table style=\"display:table;"
					+"background-color:white;  height: 200px; margin: 0px auto;"
					+"max-height:200px; width:100%; font-size:small; overflow-y:scroll;\">"
					+"<tr><td style=\"text-align:center;background-color:white;width:100%;\">"
					+"<i class=\"fa fa-spinner fa-pulse fa-2x fa-fw qlink loader\"" 
					+"style=\"width:80%;color:#4682B4\"></i>"
					+"</td></tr></table>";
					
	document.getElementById( "searchRC" ).innerHTML = busySpinner;
	
	ajaxPost( "php/searchUSDA.php?text="+stringToMatch, "No Message", "Error searching USDA database.", 
		function(data) {
			
			//alert( data );
			
			var temp = "<table style=\"display:block;"
					+"background-color:white;  height: 200px;"
					+"max-height:200px; min-width:100%; font-size:small; overflow-y:scroll;\">";
					
			document.getElementById( "matchNum" ).innerHTML = "Possible Matches: 0";
			
			if( data != "0 results" ) { 
				
				sResults = jQuery.parseJSON( data );
				var shortStringToMatch = stringToMatch.split(" ")[0];

				//results sorted
				sResults.sort( function( a,b ){

						var index0 = a.foodDesc.toLowerCase().indexOf( shortStringToMatch.toLowerCase());
						var index1 = b.foodDesc.toLowerCase().indexOf( shortStringToMatch.toLowerCase());
					
					return index0-index1;
				
					});

				document.getElementById( "matchNum" ).innerHTML = "Possible Matches: " + sResults.length;
			
				for( var i = 0; i<sResults.length; i++ ) {
			
			
					var foodDesc = highlight( sResults[i].foodDesc, stringToMatch );
					foodDesc = foodDesc + " (" + sResults[i].servingSize + " " + sResults[i].measurement + ")" +
					"<table><tr><td>&#8226</td><td><table class=\"searchResultDetails\" "+
					"><tr><td>" + "Cal: </td><td>" + sResults[i].cal + "</td>" +
					"<td>Carb: </td><td>"+ sResults[i].carb + "</td></tr>" +
					"<tr><td>Protein: </td><td>" + sResults[i].protein + "</td><td>" +
					"Fat: </td><td>" + sResults[i].fat  + "</td></tr>" +
					"</table></td></tr></table>";
			
					temp = temp + "<tr><td style=\"padding: 10px; border-radius: 25px;\" "+
					" onclick='selectFoodElement( this )'  class=\"searchResult\" id=\"" + i + "\">";
					temp = temp + foodDesc;
					temp = temp + "<td id=\"search"+ sResults[i].id +"usda\" onclick=\"changeFavoriteStatus( 'search', "+sResults[i].id
					+" , 'usda' )\"><i class=\"fa fa-2x fa-star-o\"  aria-hidden=\"true\" style=\"color:#4682B4\"></i>"+
					"<tr>";
							
					} //end of for loop
				} else {

					temp = "<table style=\"display:table;"
					+"background-color:white;  height: 200px;"
					+"max-height:200px; width:100%; font-size:small; overflow-y:scroll;\">"
					+"<tr><td style=\"width:100%;\">"
					+"</td></tr></table>";
				
					}//end of if statement
				
				temp = temp +"</table>";
				document.getElementById( "searchRC" ).innerHTML = temp;
				
		
			});
	
	}
	} //end of function 
//***********************************************//

//***********************************************//
//Function alters the CSS of the selected Element
//in the results window and enables the OK button
//for the message box.
//***********************************************//
function selectFoodElement( obj ) {
	
	$(".searchResult").attr("class", "searchResult"); 
	obj.className = "searchResult searchResultSelect";
	msgBoxOKBtnDisable( false );
	
	} //end of function 
//***********************************************//

	
//***********************************************//
//Function takes the search input and creates an
//array of elements used to modify CSS of 
//descriptions creating a description with the 
//search words highlighted  
//***********************************************//	
function highlight( desc, stringToMatch ) {

	var result = stringToMatch.split(" ");
	
	//sort result longest word first
	result.sort( function( a,b ){

		var index0 = a.length;
		var index1 = b.length;
					
		return index1-index0;
				
		}); //end of sort function
		
	for( var i = 0; i<result.length; i++ ) {
		
		if( result[i].length > 0 ) {
			desc = desc.toLowerCase().replaceAll( result[i].toLowerCase(), "##"+i+"#**"  );	
			} //end of if statement
		
		} //end of for loop 
	
	//Split the description into an array of segments each
	//ending with a code used to identify the search word.
	var descSplit = desc.split( "**" );
	
	//iterate through the array of segments (that make up the description)
	//Run a replace command for all the search word codes against each 
	//seqment.
	for( var i = 0; i<descSplit.length; i++ ) {
		
		 for( var k = 0; k<result.length; k++ ) {
		 
			var insertString = "<span style=\"padding: 2px;border-radius: 5px;background-color:#ff8d3c;color:white\">" + 
			result[k] + "</span>";
			
			descSplit[i] = descSplit[i].replaceAll( "##"+k+"#", insertString ); 
		 
			}	//end of for loop
		
		} //end of for loop 
	
	var completeDescription = "";
	
	//Put the seqments back together to form the description
	for( var i = 0; i<descSplit.length; i++ ) {
		
		completeDescription = completeDescription + descSplit[i];
		
		} //end of for loop
	
	return completeDescription;

	} //end of function	
//***********************************************//




//***********************************************//	
//Function prototype extends object string to 
//include replaceAll function.
//***********************************************//
String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};
