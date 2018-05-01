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
function browseDialog( func, el ) {
	
	//execute in ajax request callback fill categories global variable
	ajaxPost( "php/browse.php", "No Message", "Error retriving categories.", 
		function(data) {
				
		//alert( data );		
				
		categories = jQuery.parseJSON( data );
	
	var browseHTML = "<select id=\"foodBrowse\" name=\"foodBrowseName\" " +
	"onchange='requestUpdateBrowseResults( this )'"+
	" style=\"width:90%;\"></select>"+
	createBrowseResultsHTML( el );
	
		
	displayMessageToUser( "<h4>Browse - USDA Nutrient Database</h4>"+
	"<div style=\"font-size: 80%;\"><span style\"\">POWERED BY </span>U.S. Department of Agriculture,"+
	" Agricultural Research Service. 20xx. USDA National Nutrient"+
	" Database for Standard Reference, Release . Nutrient Data Laboratory Home Page, "+
	"http://www.ars.usda.gov/nutrientdata<div>", '<div class="row"><div id="foodSelectionWindow" class="col-sm-8">'+
		browseHTML+'</div><div id="mealStatusWindow" class="col-sm-4">'+ displayCellData() +'</div>', "okc",
	function() { 
	
		var selFood = $(".searchResultSelect").attr("id");
		func( bResults[selFood] );	
	
		} //end of function
	, hideMessageToUser);
	
	setMsgBoxWidth( "650px" );
		
	msgBoxOKBtnDisable( true );
	
	document.getElementById("foodBrowse").innerHTML = writeDropDown( "No Category Selected." );
	attachMealEditorEventHandlers();
	
		});
	
	}//end of function
//***********************************************//

function displayCellData(){
	
 	var temp = '<div>'+
		'<span id="mealID">Monday Breakfast</span>'+
		'<table id="meal">'+
			'<thead>'+
			'<tr>'+
				'<th><span style="display:table-cell;width:100px;">Food Name</span>'+
				'<span style="display:table-cell;width:40px;text-align:right">'+
				'<a id="expandMealViewerMsg" href="#" title="Expand meal details.">'+
				'<img data-expanded="F" id="expandMealViewer" height="15" width="15" src="img/plus.png" ></a></span> </th>'+
				'<th class="expandVersion">Servings</th>'+
				'<th class="expandVersion">Calories</th>'+
				'<th class="expandVersion">Fat (g)</th>'+
				'<th class="expandVersion">Carbs (g)</th>'+
				'<th class="expandVersion">Protein (g)</th>'+
				'<th class="expandVersion">Delete</th>'+
			'</tr>'+
			'</thead>'+
			'<tbody id="tbody">'+			
			'</tbody>'+			
		'</table>'+
		'<table id="mealTotals">'+
			'<tr>'+
				'<th >Meal Totals</th>'+
				'<th>Calories</th>'+
				'<th class="expandVersion">Fat (g)</th>'+
				'<th class="expandVersion">Carbs (g)</th>'+
				'<th class="expandVersion">Protein (g)</th>'+				
			'</tr>'+
			'<tr>'+				
			'</tr>'+
		'</table>'+
		//'<button class="plannerBtns" id="saveMeal" onclick="pressSaveMealDialogue()">Save Meal</button>'+
		//'<button class="plannerBtns" id="cancelMeal" onclick="pressCancelMealDialogue()">Cancel</button>'+
	'</div>';
	
	return temp;
	
 } //end of function

//***********************************************//
//Function creates the HTML used to select a food
//from the browse dialog.
//***********************************************//
function createBrowseResultsHTML( el ) {
	var stringToMatch = "";
	if( el != null ) stringToMatch = el.value;
	//Need to get distinct categories
	if( stringToMatch != "newFood") requestUpdateBrowseResults( el );
	else createNewFood();
	
	var temp = "<table style=\"display:table;"
					+"background-color:white;margin-left: auto; margin-right: auto;  height: 200px;"
					+"max-height:200px; width:100%; font-size:small; overflow-y:scroll;\">"
					+"<tr><td style=\"text-align:center;\">"				
					+"</td></tr></table>";
	
	resultsTable = "<div id=\"resultContentContainer\" style=\"width:100%;\">"
	+"<div id=\"matchNum\">Possible Matches: 0</div><table "
	+"style=\"width: 95%; margin-left: auto; margin-right: auto;"
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
	"background-color:white;margin-left: auto; margin-right: auto;  height: 125px;"+
	"max-height:125px; width:100%; font-size:small; overflow-y:scroll;\">"+
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
function requestUpdateBrowseResults( el ) {
	
	var stringToMatch;
	var categoryType;
	if( el != null ) stringToMatch = el.value;
	if( el != null ) categoryType = $(el).find(':selected').data('category');
	
	
	msgBoxOKBtnDisable( true );
	msgBoxCancelBtnHide( false );
	msgBoxSetOKFunction( msgBoxGetInitFunction() );
	msgBoxSetOKButtonCaption( "OK" );
	msgBoxOKBtnSize( "20%" );
	
	if( document.getElementById( "browseRC" ) != undefined ) {
	
		//html for busy spinner defined.	
		busySpinner = "<table style=\"display:table;"
						+"background-color:white;margin-left: auto; margin-right: auto;  height: 200px;"
						+"max-height:200px; width:100%; font-size:small; overflow-y:scroll;\">"
						+"<tr><td style=\"text-align:center;\">"
						+"<i class=\"fa fa-spinner fa-pulse fa-2x fa-fw qlink loader\"" 
						+"style=\"width:100%;color:#4682B4\"></i>"
						+"</td></tr></table>";
					
		document.getElementById( "browseRC" ).innerHTML = busySpinner;
		
		var temp = "<table class=\"searchResultTable\" style=\"display:block;"
					+"background-color:white;  height: 200px;"
					+"max-height:200px; min-width:100%; font-size:small; overflow-y:scroll;\">";
		
		
		document.getElementById( "matchNum" ).innerHTML = "Possible Matches: 0";
		if( categoryType == "usda") writeUSDAResults( stringToMatch, temp);
		if( categoryType == "user") writeUserResults( stringToMatch, temp);
		if( categoryType == "favorites") writeFavoriteResults( stringToMatch, temp);
	
	} //end of if statement
	} //end of function 
//***********************************************//

function writeFavoriteResults( stringToMatch, temp ) {
	
	
	ajaxPost( "php/favorite.php", "No Message", "Error retriving favorites database.", 
		function(data) {
			
	
		if( data == "0 results" ) document.getElementById( "browseRC" ).innerHTML = makeEmptyResults();
			else {
			
			favoriteObj = jQuery.parseJSON( data );
			var listCateArray = new Array();
			for( var i=0; i<favoriteObj.length; i++ ) {
				listCateArray.push( favoriteObj[i].foodTable );
				}
			
			processResults( favoriteObj, listCateArray, temp );
			writeFavorites();
			//alert( JSON.stringify( favoriteObj ));
			
			} //end of if statement
			
	
		});
	
	
	
	
	/*
	var bResults = 
			var listCateArray = new Array();
			for( var i=0; i<bResults.length; i++ ) {
				listCateArray.push( "user" );
				}
	processResults( bResults, listCateArray, temp );
	*/
	} //end of function


function writeUserResults( stringToMatch, temp ) {
	
	var bResults = organizeFoods( stringToMatch );
			var listCateArray = new Array();
			for( var i=0; i<bResults.length; i++ ) {
				listCateArray.push( "user" );
				}
	processResults( bResults, listCateArray, temp );
	
	} //end of function

function writeUSDAResults( stringToMatch, temp ) {
	
	ajaxPost( "php/browse.php?category="+stringToMatch, "No Message", "Error searching USDA database.", 
		function(data) {		
					
			if( data == "0 results" ) document.getElementById( "browseRC" ).innerHTML = makeEmptyResults();
			else {
			var bResults = jQuery.parseJSON( data );
			var listCateArray = new Array();
			for( var i=0; i<bResults.length; i++ ) {
				listCateArray.push( "usda" );
				}
				processResults( bResults, listCateArray, temp );
				} //end of if statement
			});
	
	} //end of function
	
function processResults( results, listCateArray, temp ) {
	
				var fTable = "usda";
				var bResults = results;
				
				document.getElementById( "matchNum" ).innerHTML = "Possible Matches: " + bResults.length;
			
				//alert( bResults.length );
			
				for( var i = 0; i<bResults.length; i++ ) {
					
					var listing;
					if( listCateArray[i] == "usda" ) listing = makeUSDAListing( bResults[i] );
					if( listCateArray[i] == "user" ) listing = makeUserListing( bResults[i] );
					
					temp = temp + 
						"<tr><td style=\"padding: 2px;\" "+
						"   class=\"searchResult\" id=\"" + i + "\">"+
						listing +
						"</td></tr>";
										
					} //end of for loop
				
				temp = temp +"</table>";
				
				
				document.getElementById( "browseRC" ).innerHTML = temp;
				
				getFavorites( "search", "usda");
				getFavorites( "search", "user");

	} //end of function
	
function makeEmptyResults() {
	
	var temp = "<table style=\"display:table;"
					+"background-color:white;  height: 200px;"
					+"max-height:200px; width:100%; font-size:small; overflow-y:scroll;\">"
					+"<tr><td style=\"width:100%;\"> No results Found."
					+"</td></tr></table>";
					
	return temp;

	} //end of function	
	
function makeUSDAListing( foodListing, temp ) {
	
	var icon = '<a style="color:#4682B4;" href="#" '+
		'onclick="changeFavoriteStatus('+ 
		"'"+foodListing.id+"'"+
		","+
		"'usda'"+ 
		')"'+
		' title= "Favorite">'+
		'<img class="favoriteIcon" id="favusda' + foodListing.id + 
		'" style="display:inline; padding-left:5px;padding-right:5px;" '+
		'src="img/notFavorite.png"></a>'

		//alert( icon );
	
	/*<td id=\"search"+ bResults[i].id + fTable+
						"\" onclick=\"changeFavoriteStatus( 'search', "+bResults[i].id+
						" , '"+ fTable +"' )\"><div class=\"userDefinedHover\"><span class=\"fa-stack fa-1x\">"+
						"<i class=\"fa fa-star-o fa-stack-2x\"  aria-hidden=\"true\" style=\"color:#4682B4\"></i><span>"+
						"</td>;*/
							
	return formatFoodListing( foodListing, temp )+icon;				
	
	} //end of function
	
function makeUserListing( foodListing, temp ) {
	
	var icon = '<a style="color:#4682B4;" href="#" '+
		'onclick="changeFavoriteStatus('+ 
		"'"+foodListing.id+"'"+
		","+
		"'user'"+ 
		')"'+
		' title= "Favorite">'+
		'<img class="favoriteIcon" id="favuser' + foodListing.id + 
		'" style="display:inline; padding-left:5px;padding-right:5px;" '+
		'src="img/notFavorite.png"></a>'
	
	return formatFoodListing( foodListing, temp )+icon;	
	
	} //end of function
	
function formatFoodListing( foodListing, temp ) {
	
	var foodDesc =  foodListing.foodDesc;
	var details = "Calories: "+foodListing.cal+", Carbs: "+foodListing.carb+
					", Protein: "+foodListing.protein+", Fat: "+foodListing.fat;
	foodDesc = '<a onclick="selectBrowseFoodElement( this )" style="color:#4682B4" href="#" title="' + details + '">'+foodDesc + " (" + foodListing.servingSize + " " 
					+ foodListing.measurement + ")</a>";
					
	return foodDesc;
	
	} //end of function

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
		"<option data-category=\"favorites\" value=\"favorites\">Favorites</option>"+
		//"<option value=\"userDefined\">Search</option>"+
		//"<option value=\"newFood\">Create New Food</option>"+
		"<option value disabled>—————————————</option>"+
		populateFoodCategories()+
		"<option value disabled>—————————————</option>";
		
		//alert( placeholder );
	
	for( var i = 0; i<categories.length; i++ ) {
	
	if( currentSelection == categories[i].macroType ) {
		dropdownHTML = dropdownHTML + "<option value=\""+
		categories[i].macroType+"\" data-category=\"usda\" selected=\"selected\">"+categories[i].macroType+"</option>";
		placeholder = "";
		} else dropdownHTML = dropdownHTML + "<option data-category=\"usda\" value=\""+
		categories[i].macroType+"\">"+categories[i].macroType+"</option>";
	
		} //end of if statement
	
	return placeholder + dropdownHTML;
	
	} //end of function

function populateFoodCategories() {
	
	var macroTypes = buildArrayOfMacroType();
	var listboxItems = "";
	
	for( var i = 0; i<macroTypes.length; i++ ) {
	
		 begOpt = "<option data-category=\"user\" value=\"";
	
		//if( i == 0 ) var begOpt = "<option selected data-category=\"user\" value=\"";
		//else  begOpt = "<option data-category=\"user\" value=\"";
		
		//organizes list with food type selected

		listboxItems += begOpt + macroTypes[i] + "\">"+ macroTypes[i]
							+"</option>";	
		} //end of for loop
		
		return listboxItems;
	
	} //end of function

function buildArrayOfMacroType() {
	
	var macroTypes = [];
	var count = 0;

	for(var i = 0; i< foods.length; i++){
		
		if( count == 0 ){
			macroTypes[count] = foods[i].macroType;
			count++;
			} //end of if statement
		else {
				var addMacroTypeToArray = true;
				for( var k = 0; k<macroTypes.length; k++ ) {
					
					if( macroTypes[k] == foods[i].macroType ) addMacroTypeToArray = false;
					
					} //end of for loop
					
				if( addMacroTypeToArray ) {
					//alert( foods[i].macroType );
					macroTypes[count] = foods[i].macroType;
					count++;
					}
			
				} //end of if statement
	
			} //end of for loop	
	return macroTypes.sort();
	
	} //end of function
	
//function will organize foods by option selected to populate list box
function organizeFoods( selectedType ) {
	var organizedFoods = [];
	var count = 0;
	for(var i = 0; i< foods.length; i++){

		if (selectedType === foods[i].macroType){
			organizedFoods[count] = foods[i];
			count++;
			} //end of if statement
		} //end of for loop
		
	return organizedFoods;
	
	} //end of function
//***********************************************//
	
//***********************************************//
//Function alters the CSS of the selected Element
//in the results window and enables the OK button
//for the message box.
//***********************************************//
function selectBrowseFoodElement( obj ) {
	
	alert( "where to add food." );
	
	//$(".searchResult").attr("class", "searchResult"); 
	//obj.className = "searchResult searchResultSelect";
	//msgBoxOKBtnDisable( false );
	
	} //end of function 
//***********************************************//

function attachMealEditorEventHandlers() {
	
	$('#foodSelectionWindow').unbind();
	$('#mealStatusWindow').unbind();
	
	/*
	$("#foodSelectionWindow").on("mouseover", function(){
		
		//$("#foodSelectionWindow").removeClass("col-sm-6");
		//$("#foodSelectionWindow").removeClass("col-sm-4");
		//$("#mealStatusWindow").removeClass("col-sm-6");
		//$("#mealStatusWindow").removeClass("col-sm-8");
		
		//$("#mealStatusWindow").addClass("col-sm-4");
		//$("#foodSelectionWindow").addClass("col-sm-8");
		
		});
		
	$("#foodSelectionWindow").on("mouseout", function(){
		
		$("#foodSelectionWindow").removeClass("col-sm-8");
		$("#mealStatusWindow").removeClass("col-sm-4");
		
		$("#mealStatusWindow").addClass("col-sm-6");
		$("#foodSelectionWindow").addClass("col-sm-6");
		
		
		});
		*/
		
		
	$("#expandMealViewer").on("click", function(){
		
	var viewerState = $("#expandMealViewer").attr("data-expanded");
	
	if( viewerState == "F" ) { 
	
		$("#mealStatusWindow").removeClass("col-sm-6");
		
		$("#mealStatusWindow").addClass("col-sm-12");
		$("#mealStatusWindow").css("border-width", "0px");
		$("#foodSelectionWindow").css("display", "none");
		
		$("table#meal").css( "width", "610px" );
		$("span#mealID").css( "width", "610px" );
		$("#mealTotals").css( "width", "400px" );
		$(".expandVersion").css( "display", "table-cell");	
		$("#expandMealViewerMsg").attr("title","Minimize meal details.");
		$("#expandMealViewer").attr("src", "img/minus.png");
		$("#expandMealViewer").attr("data-expanded", "T");
		
			} //end of if statement
		
		if( viewerState == "T" ) { 
			
			$("#mealStatusWindow").removeClass("col-sm-12");
			$("#mealStatusWindow").addClass("col-sm-6");
			$("#mealStatusWindow").css("border-width", "1px");
			$("#foodSelectionWindow").css("display", "initial");
			
			$(".expandVersion").css( "display", "none");
			$("table#meal").css( "width", "160px" );
			$("span#mealID").css( "width", "185px" );
			$("#mealTotals").css( "width", "160px" );
			
			$("#expandMealViewerMsg").attr("title","Expand meal details.");
			$("#expandMealViewer").attr("src", "img/plus.png");
			$("#expandMealViewer").attr("data-expanded", "F");
		
			} //end of if statement
		
		
		});
	
	} //end of function
	
function openEditor(){
	
	populateFoodCategories();
	updateEditorTotals(); //creates total box
	
}//end of function
	
//***********************************************//
//Function gets food object from json objects
//***********************************************//
function getFoodElement(id){
	for (var i = 0; i < foods.length; i++){
		if(foods[i].id == id){
			return foods[i];
			} //end of if statement
		} //end of for loop
	} //end of function
//***********************************************//
	
//inserts food into meal table
function insertFoodMealEditor( foodID, servingUserInput ) {
	var id = foodID;
	var foodElement = getFoodElement(id);
	var tbody = document.getElementById("tbody");
    var row = tbody.insertRow(-1);
    var foodDesc = row.insertCell(0);
    var servingSize = row.insertCell(1);
    var calories = row.insertCell(2);
    var fat = row.insertCell(3);
    var carbs = row.insertCell(4);
    var protein = row.insertCell(5);
    var deleteBtn = row.insertCell(6);
    
    if( servingUserInput == "NA" ) servingUserInput = foodElement.servingSize;
   
    foodDesc.innerHTML = foodElement.foodDesc;
    servingSize.innerHTML = "<input class ='servingInput' id='" + foodElement.id + "' value=" + 
		servingUserInput + " oninput='updateMacros()'> &nbsp" + foodElement.measurement; 
    calories.innerHTML = parseFloat(foodElement.cal).toFixed(1);
    fat.innerHTML = parseFloat(foodElement.fat).toFixed(1);
    carbs.innerHTML = parseFloat(foodElement.carb).toFixed(1);
    protein.innerHTML = parseFloat(foodElement.protein).toFixed(1);
    deleteBtn.innerHTML = "<button class='deleteBtn' onclick= 'deleteRow(this)'>X</button>";
    updateEditorTotals();     
}//end of function
//***********************************************//

//***********************************************//
//Dynamically updates macros on change of 
//serving size
//***********************************************//
function updateMacros(){
	var rows = document.getElementById("tbody").rows;
	var table = document.getElementById("tbody");
	//console.log(rows.length);
	for(var i = 0; i < rows.length; i++){

		// food id for original macros
		var id = rows[i].cells[1].children[0].id;

		//food element
		var foodItem = getFoodElement(id);		
		
		//gets the current serving in input and returns 0 if not a number
		var currentServing = isNumber(rows[i].cells[1].children[0].value);
		
		//math to multiply food item macros
		var multiplier = currentServing / foodItem.servingSize;		
	
		//updates serving in input will output 0 if not a number
		rows[i].cells[1].children[0].value = currentServing;				
		//updates calories
		rows[i].cells[2].innerHTML = (foodItem.cal * multiplier).toFixed(1);
		//updates fat
		rows[i].cells[3].innerHTML = (foodItem.fat * multiplier).toFixed(1);
		//updates carbs
		rows[i].cells[4].innerHTML = (foodItem.carb * multiplier).toFixed(1);
		//updates protein
		rows[i].cells[5].innerHTML = (foodItem.protein * multiplier).toFixed(1);		
	}//end of loop

	updateTotals();
}//end of function
//***********************************************//


//***********************************************//
//This function generates the totals for 
//totals table.
//***********************************************//
function updateEditorTotals(){
	var table = document.getElementById("totals");
	var row = table.insertRow(-1);
	table.deleteRow(1);

	//create cells in total table
	var blankCell = row.insertCell(0);
	blankCell.style.backgroundColor = "#DCDCDC";
	var calories = row.insertCell(1);
	var fat = row.insertCell(2);
	var carbs = row.insertCell(3);
	var protein = row.insertCell(4);

	//inserts new totals in cells
	calories.innerHTML = getCaloriesTotal();
	fat.innerHTML = getFatTotal();
	carbs.innerHTML = getCarbsTotal();
	protein.innerHTML = getProteinTotal();
	
	}//end of function
//***********************************************//

//***********************************************//
//deletes individual food for delete button
//***********************************************//
function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("meal").deleteRow(i);
    updateMacros();
    updateTotals();
	}//end of function
//***********************************************//

//***********************************************//
//Deletes all foods for closing dialogue
//***********************************************//
function clearMealTable(){
	$("#meal tbody tr").remove();
	}//end of function


//***********************************************//
//Functions to get data from table cells
//***********************************************//

//***********************************************//
//function will get total calories in meal
//***********************************************//
function getCaloriesTotal(){
	var calorieTotal = 0.0;
	var rows = document.getElementById("meal").rows;
	var td = null;

	//iterates through calorie cells
	for(var i = 1; i < rows.length;i++){
		td = rows[i].cells;
		for(var j = 0; j < td.length; j++){
			
			if (j === 2){
				calorieTotal += parseFloat(td[j].innerHTML);
			}
		}
	}//end of loops
	
	return calorieTotal.toFixed(1);
}//end of function
//***********************************************//


//***********************************************//
//function will get fat totals in meal
//***********************************************//
function getFatTotal(){
	var fatTotal = 0.0;
	
	var rows = document.getElementById("meal").rows;
	var td = null;

	//iterates through fat cells
	for(var i = 1; i < rows.length;i++){
		td = rows[i].cells;
		for(var j = 0; j < td.length; j++){
			
			if (j === 3){
				fatTotal += parseFloat(td[j].innerHTML);
			}
		}
	}//end of loops

	return fatTotal.toFixed(1);
}//end of function
//***********************************************//


//***********************************************//
//function will get carbs totals in meal
//***********************************************//
function getCarbsTotal(){
	var carbTotal = 0.0;
	
	var rows = document.getElementById("meal").rows;
	var td = null;

	//iterates through carb cells
	for(var i = 1; i < rows.length;i++){
		td = rows[i].cells;
		for(var j = 0; j < td.length; j++){
			
			if (j === 4){
				carbTotal += parseFloat(td[j].innerHTML);
			}
		}
	}//end of loops

	return carbTotal.toFixed(1);
}//end of function
//***********************************************//


//***********************************************//
//function will get protein totals in meal
//***********************************************//
function getProteinTotal(){
	var proteinTotal = 0.0;
	
	var rows = document.getElementById("meal").rows;
	var td = null;

	//iterates through carb cells
	for(var i = 1; i < rows.length;i++){
		td = rows[i].cells;
		for(var j = 0; j < td.length; j++){
			
			if (j === 5){
				proteinTotal += parseFloat(td[j].innerHTML);
			}
		}
	}//end of loops

	return proteinTotal.toFixed(1);
}//end of function
//***********************************************//

//***********************************************//
//Food element object constructor
//***********************************************//
function food(id,macroType, cal, protein, carb, fat, foodDesc, servingSize, measurement, multiplier){
	this.id = id;
	this.macroType = macroType;
	this.cal = cal;
	this.protein = protein;
	this.carb = carb;
	this.fat = fat;	
	this.foodDesc = foodDesc;
	this.servingSize = servingSize;
	this.measurement = measurement;
	this.multiplier = multiplier;
	}//end of constructor
//***********************************************//

