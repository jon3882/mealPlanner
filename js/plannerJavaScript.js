//**************************************************************************************//
//JavaScript that is appied to the mealplanner.php
//**************************************************************************************//

//************************************************//
//Global variables
//************************************************//

var mealTitle = new Array;
var mealTitleTemp = new Array();

var mealSchedule = new Array();
var mealScheduleTemp = new Array();

var foods;
var mealIndex;
var meals;
var selectedPlan = "workingDraft";
var returnFlags = new Array(2);
var pdfFunction;
var trashFunction;

//************************************************//
//JQuery Functions
//************************************************//
$(document).ready(function(){ 

	//************************************************//
	//Mouseover and click events for quick links
	//************************************************//
	$('#pdfLink').on('click',pdfFunction);
	
	$('#trashLink').on('click',trashFunction);

           
	}); 
//***********************************************//



//***********************************************//
// Functions dealing with hotlinks
//***********************************************//
function newPlanner() {
		
		displayMessageToUser("Are you sure you want to clear the meal planner?  All changes to the working" + 
		" draft will be lost.", "", "okc", function() {
		clearPlanner();
		hideMessageToUser();
		}, hideMessageToUser);
		
		};	
		
//Changes the quick link and navigation "Create PDF" button to show a message that the 
//PDF is in the processs of being created.
function createPDF() {
	
	var processMsg = '<i class="fa fa-spinner fa-spin fa-lg fa-fw qlink loader"></i>';
	
	// var currentMsg = document.getElementById( "createPDF" ).innerHTML;
	
	
	
	document.getElementById("pdfContainer").title = "Processing";
	//document.getElementById("pdfQLink").alt = "processing";
	//document.getElementById("pdfQLink").src = "./img/msgBoxLoader.gif";
	sendToPDF();
	document.getElementById( "pdfContainer" ).innerHTML = processMsg;
	
			 		
	displayMessageToUser("A PDF is currently being created.  You will be alerted"+
 	" when the PDF is ready for download", "", "ok", hideMessageToUser, 
 	null);
 	
	};

//variables to call functions in jquery on/off
var pdfFunction = function(){
	createPDF();
};

var trashFunction = function(){
	newPlanner();
};






//************************************************//
//Mouseover and click events for menu cells
//************************************************//	
function attachMealPlannerEventHandlers() {

	$( ".sq" ).unbind();
	
	$( ".sq" ).on("click", function() {
	
			var day = this.id.substring(0,3);
                   	var meal = this.id.substring(3,4);
                   	document.getElementById( "mealID" ).innerHTML = getMealName(day, meal);
                   	
                   	setMealIndex(day, meal);
                   	if( mealSchedule[mealIndex] != undefined ) {
                   	
                   		for( var k = 0; k<mealSchedule[mealIndex].length; k++ ) {
                   		
                   			insertFood( mealSchedule[mealIndex][k].id, mealSchedule[mealIndex][k].servingSize );	
                   		
                   			} //end for loop
                   	
                   		updateMacros();
                   	
                   		} //end of if statement         	
                   	
			openMealDialogue();
			});
		
	$( ".sq" ).on("mouseover", function() {
           	
           	   	this.style.color = "white";	             
                   	this.style.backgroundColor = "#4682B4";
                   	var dt = this.id.substring(0,3) + "Title"; 
                  	var mt = "m"+this.id.substring(3,4);
                   	document.getElementById( dt ).style.color = "#4682B4";	             
                  	document.getElementById( dt ).style.backgroundColor = "white"; 
                   	document.getElementById( mt ).style.color = "#4682B4";	             
                   	document.getElementById( mt ).style.backgroundColor = "white";
                   
                   	});

	 $( ".sq" ).on("mouseout", function() {
                     
                   	this.style.color = "#4682B4";	             
                   	this.style.backgroundColor = "white";
                   	var dt = this.id.substring(0,3) + "Title"; 
                   	var mt = "m"+this.id.substring(3,4);
                   	document.getElementById( dt ).style.color = "white";	             
                  	 document.getElementById( dt ).style.backgroundColor = "#4682B4"; 
                   	document.getElementById( mt ).style.color = "white";	             
                   	document.getElementById( mt ).style.backgroundColor = "#4682B4";
                                 
           		});
				
	$( ".mealName" ).unbind();			
	$( ".mealName" ).on("mouseout", function() {	
				
				this.style.color = "white";	             
                this.style.backgroundColor = "#4682B4";
				
				});
				
	$( ".mealName" ).on("mouseover", function() {	
				
				this.style.color = "#4682B4";	             
                this.style.backgroundColor = "white";
				
				});		
	
	$( ".mealName" ).on("click", function() {	
				
				//Creates modification window within a messagebox.
				displayMessageToUser("<h3 style=\"\">Meal Modification Window</h3>", 
					//this function writes the HTML of the modification window
					createMealModificationHTML(), "cu-Save", 
					//This function is executed when the user clicks "Ok"
					function() { 
						
						//The value of the input boxes that label the meals are 
						//written to the temp array.
						for( var k = 0; k<mealTitleTemp.length; k++ ) {
									var temp = document.getElementById( "modMTitle"+k ).value;
									mealTitleTemp[k] = temp.replace(",", " ");
									} //end of for loop
						
						//The user is asked if they want to commit their changes to the meal planner
						displayMessageToUser("WARNING","The data associated with meals that were deleted "+
							"will be deleted from the meal plan.", "okc", 
							//Executed if the user clicks "OK"
							function() {							
								
								mealTitle = mealTitleTemp;							
								mealSchedule = mealScheduleTemp;
								writePlanner( selectedPlan );
								hideMessageToUser();
								},
							//Executed if user clicks "cancel"
							function(){ 
								$( ".mealName" ).click();} );				
						}, 
					//Executed the user clicks "cancel on the modification window
					function() {
						//Temp array used to store the meal labels is recreated and 
						//the temp array used to store the meal elements is 
						//recreated.
						loadMealArray( "workingDraft", mealSchedule.length );
						mealTitleTemp = new Array();
						for( var i = 0; i<mealTitle.length; i++ ) {					
							mealTitleTemp.push( mealTitle[i] );
							} //end of for loop
						
						hideMessageToUser();
						}	);
				
				//Must be called everytime the meal modification window is created.
				attachMealPlannerEventHandlers();				
				});	
			
	//Executed when buttons within the meal modification window are
	//pressed
	$( ".mealModBtn" ).unbind();
	$( ".mealModBtn" ).on("click", function() {
	
		if( this.id.substring( 0, 4) == "addA" ) {		
			
			var i = this.id.substring(8);
			addMealAbove( i );		
			$( ".mealName" ).click();
			
			} //end of if statement
		
		if( this.id.substring( 0, 4) == "addB" ) {
			
			var i = this.id.substring(8);
			addMealBelow( i );		
			$( ".mealName" ).click();
			
			} //end of if statement
			
		if( this.id.substring( 0, 4) == "delM" ) {
			
			var i = this.id.substring(7);
			deleteMeal( i );
			$( ".mealName" ).click();
		
			} //end of if statement
	
		});	
				
	
	} //end of function 
	
function addMealAbove( i ) {

	var oldLabelLength = mealTitleTemp.length;
	for( var k = 0; k<mealTitleTemp.length; k++ ) {
		mealTitleTemp[k] = document.getElementById( "modMTitle"+k ).value;
		} //end of for loop
		mealTitleTemp.splice(i, 0, "New Meal");
			
	for( var k = 0; k<7; k++ ) {	
		var index = (6*oldLabelLength)-(k*oldLabelLength) + parseInt(i);
		mealScheduleTemp.splice(index, 0, new Array()); 
		} //end of for loop

	} //end of function

function addMealBelow( i ) {

	var oldLabelLength = mealTitleTemp.length;
	for( var k = 0; k<mealTitleTemp.length; k++ ) {
		mealTitleTemp[k] = document.getElementById( "modMTitle"+k ).value;
		} //end of for loop
	i = parseInt( i ) + 1;
	mealTitleTemp.splice(i, 0, "New Meal");
			
	for( var k = 0; k<7; k++ ) {	
		var index = (6*oldLabelLength)-(k*oldLabelLength) + parseInt(i);
		mealScheduleTemp.splice(index, 0, new Array()); 
		} //end of for loop
	} //end of function

function deleteMeal( i ) {

	var oldLabelLength = mealTitleTemp.length;
	for( var k = 0; k<mealTitleTemp.length; k++ ) {
			mealTitleTemp[k] = document.getElementById( "modMTitle"+k ).value;
			} //end of for loop
			mealTitleTemp.splice(i, 1);
			
	for( var k = 0; k<7; k++ ) {	
		var index = (6*oldLabelLength)-(k*oldLabelLength) + parseInt(i);
		mealScheduleTemp.splice(index, 1); 
			} //end of for loop	

	} //end of function	
	
function createMealModificationHTML() {
	
	var mealTable = "<table style=\"display:block; background-color:white; border-radius: 25px;" 
	+"padding: 10px; border: 2px solid #a1a1a1;\"><tr><td><table style=\"display:block;"
	+"background-color:white; max-height:350px; overflow-y:scroll;\">";
				
				for( var i = 0; i<mealTitleTemp.length; i++ ) {
				
					mealTable = mealTable + "<tr>"+
						"<td><input type=\"text\" id=\"modMTitle"+i+"\" value=\""+mealTitleTemp[i]+"\" size=\"10\"></td>"+
						"<td><table style=\"height:30px;\"><tr>"+
							"<td><button type=\"button\" class=\"mealModBtn\" id=\"addAbove"+i+"\">ADD ⇧</td>"+
							"<td><button type=\"button\" class=\"mealModBtn\" id=\"addBelow"+i+"\">ADD ⇩</td>";
									
						if( mealTitleTemp.length > 1 ) mealTable = mealTable + 
						"<td><button type=\"button\" class=\"deleteBtn mealModBtn\" id=\"delMeal"+i+"\">X</td>";
					
						mealTable = mealTable + "</tr></table></td></tr>";
				
					}//end of for loop
					
				mealTable = mealTable + "</table></td></tr></table>";
				
			return mealTable;
	
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
//Function enlarges the meal planner 3X and applies
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
				//enables click after pdf created
				$('#pdfLink').on("click", pdfFunction);

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
//Clears the contents of the meal planner and 
//writes an empty planner to the database.
//***********************************************//
function clearPlanner() {

	mealSchedule = new Array(42);
	selectedCustomerID = -1;
	writePlanner( "workingDraft" );
	//writeCustomer(); Deleted customer no longer part of planner
	populateCalendar();
	updatePlannerTotals();

	} //end of if statement
//***********************************************//


//***********************************************//
//Uses the global variable meals to create the
//array used to write the meal elements to the
//plan.
//***********************************************//
function loadMealArray( mealName, mealPlanSize ) {

	mealSchedule = new Array( mealPlanSize );
	mealScheduleTemp = new Array( mealPlanSize );
	
	if( meals != undefined ) {

	for( var i = 0; i<meals.length; i++ ) {
	
		var index = parseInt( meals[i].cell );
	
		var f = getFoodElement( meals[i].foodElementID );	
		
		if( f != undefined && meals[i].planName == mealName ) {
			
			if( mealSchedule[index] == undefined ) mealSchedule[index] = new Array();
			if( mealScheduleTemp[index] == undefined ) mealScheduleTemp[index] = new Array();
			
			var foodElement = new food(f.id,f.macroType, f.cal, f.protein, 
			f.carb, f.fat, f.foodDesc, meals[i].servingSize, f.measurement, parseFloat(meals[i].servingSize/f.servingSize) );
	
			//alert( index );
	
			mealSchedule[index].push( foodElement );
			mealScheduleTemp[index].push( foodElement );
			} //end of if statement
			
		} //end of for loop
		
		} //end of if statement
		
	} //end of function
//***********************************************//


//***********************************************//
//Function makes the AJAX request that sends the 
//meal planner data to writePlanner.php to be 
//written to the database.
//***********************************************//
function writePlanner( plannerName ) {

	var dType = "w";
	if( plannerName != "workingDraft" ) dType = "save";

	var menuItems = getPlannerItems();
	
	var labels = "";
	
	for( var i = 0; i<mealTitle.length; i++ ) {
		
		if( labels == "" ) labels = mealTitle[i];
		else labels = labels + "," + mealTitle[i];
		
		} //end of for loop 
		
	
	ajaxPost( "php/writePlanner.php?name="+plannerName+"&mealLabels="+labels+"&data="+menuItems, "No Message", 
		"Error", dType);

	} //end of function
//***********************************************//

//***********************************************//
//
//***********************************************//
function drawPlanner() {
	
	var rowString = "<tr><td></td><td class=\"dTitle\" id=\"sunTitle\">Sunday</td><td class=\"dTitle\""+ 
		"id=\"monTitle\">Monday</td><td class=\"dTitle\" id=\"tueTitle\">Tuesday</td>"+
		"<td class=\"dTitle\" id=\"wedTitle\">Wednesday</td><td class=\"dTitle\" id=\"thuTitle\">Thursday</td>"+
		"<td class=\"dTitle\" id=\"friTitle\">Friday</td><td class=\"dTitle\" id=\"satTitle\">Saturday</td>"+
		"</tr>";
	
	for( var i = 0; i<mealTitle.length; i++ ) {
		
		rowString = rowString + "<tr>";
		rowString = rowString + "<td class=\"mTitle mealName\" id=\"m"+ i +"\">"+mealTitle[i]+"</td><td class=\"sq\" id=\"sun"+i+"\"></td>"+
					  "<td id=\"mon"+i+"\" class=\"sq\"></td><td class=\"sq\" id=\"tue" +i+ "\">"+
					  "</td><td class=\"sq\" id=\"wed"+i+"\">"+
					  "</td><td class=\"sq\" id=\"thu"+i+"\"></td><td class=\"sq\" id=\"fri"+i+"\"></td>"+
					  "<td class=\"sq\" id=\"sat"+i+"\"></td>";
		rowString = rowString + "</tr>";
			
		} //end of for loop
	
	rowString = rowString + "<tr><td class=\"mTitle\" id=\"totalTitle\" >Totals</td>"; 

	for( var i = 0; i<7; i++ ) {
	
		rowString = rowString + "<td class=\"totalSQ\">"+
			"<table class=\"dayTotals\"><tr><td>"+
			"Calories:<br>"+
			"Fat:<br>"+
			"Carbs:<br>"+
			"Protein:<br>"+
			"</td><td id=\"total"+i+"\">"+
			"0<br>"+
			"0<br>"+
			"0<br>"+
			"0<br>"+
			"</td></tr>"+
			"</table>"+
			"</td>";
	
	} //end of for loop
	
	rowString = rowString + "</tr>";
	
	//alert( rowString );
	
	document.getElementById( "planner" ).innerHTML = rowString;
	
	} //end of function

//***********************************************//
//Function creates string that is passed to
//writePlanner.php as the data variable.  The
//data string is parsed by writePlanner.php to
//create an array of food elements.	
//***********************************************//	
function getPlannerItems() {

	var items = "";

	for( var i = 0; i<mealSchedule.length; i++ ) {
	
		if( mealSchedule[i] != undefined ) {
		
			for( var k = 0; k < mealSchedule[i].length; k++ ) {
			
				if ( items == "" ) {
					items = items + i + "," + mealSchedule[i][k].servingSize + "," + mealSchedule[i][k].id
					} else {
					items = items + ";" + i + "," + mealSchedule[i][k].servingSize + "," + 
						mealSchedule[i][k].id;
					}
			
				} //end of for loop
			
		
			} //end of if statement
	
		} //end of for loop

	return items;

	} //end of function
//***********************************************//


//***********************************************//
//Function is executed at startup to fill the global
//variables with the meal plan data for the user.
//***********************************************//
function loadDatabaseData() {

	showLoader();
	
	returnFlags[0] = false;
	returnFlags[1] = false;
	returnFlags[2] = false;
	
	ajaxPost( "php/getJSON.php?table=foodElement", "No Message", "Error", "f"); 
	ajaxPost( "php/getJSON.php?table=mealElement", "No Message", "Error", "m");	
	ajaxPost( "php/getJSON.php?table=mealplans", "No Message", "Error", "p");	
	setTimeout(checkLoadStatus, 200);

	} //end of function
//***********************************************//


//***********************************************//
//Function hides the loading message and populates
//the meal planner after the global variables 
//have been loaded.
//***********************************************//
function checkLoadStatus() {

	if( returnFlags[0] && returnFlags[1] && returnFlags[2]) {	
			
						
				$("#msgContainer").hide();
				hideLoader();
				
				//alert( mealTitle.length );

				mealSchedule = new Array(7*mealTitle.length);
				mealScheduleTemp = new Array(7*mealTitle.length);
				
				//alert( mealSchedule.length );
				
				
				loadMealArray( "workingDraft", mealSchedule.length );  
				
				//alert( mealSchedule.length );
				
				drawPlanner();
				attachMealPlannerEventHandlers();
				
				//alert( mealSchedule.length );
				
				populateCalendar();
				updatePlannerTotals();
							
		} else {
				
		setTimeout(checkLoadStatus, 200);
		
		} //end of if statement

	} //end of if statement
//***********************************************//


//***********************************************//
//Function loads the global variables and populates
//the meal planer with the current data.
//***********************************************//
function startup() {

		loadDatabaseData();
		
	 	
		} //end of function
//***********************************************//


//***********************************************//
//Function returns a readable string describing the
//selected meal that is being modified.
//***********************************************//
function getMealName(day, meal) {

	var fullName = "";

	if( day == "sun") fullName = "Sunday - ";
	if( day == "mon") fullName = "Monday - ";
	if( day == "tue") fullName = "Tuesday - ";
	if( day == "wed") fullName = "Webnesday - ";
	if( day == "thu") fullName = "Thursday - ";
	if( day == "fri") fullName = "Friday - ";
	if( day == "sat") fullName = "Saturday - ";

	fullName = fullName + mealTitle[meal];
	
	return fullName;

	} //end of function
//***********************************************//


//***********************************************//
//Function returns an index that is used to 
//access the appropriate element of the array
//used to store the plan meal entries.
//***********************************************//
function setMealIndex(day, meal) {

	var d;

	if( day == "sun" ) d = 0;
	if( day == "mon" ) d = 1;
	if( day == "tue" ) d = 2;
	if( day == "wed" ) d = 3;
	if( day == "thu" ) d = 4;
	if( day == "fri" ) d = 5;
	if( day == "sat" ) d = 6;

	mealIndex = (mealTitle.length*d)+parseInt(meal);
 
	} //end of function
//***********************************************//


//***********************************************//
//Function used to get the id of the cell when
//clicked or moused over/over.
//***********************************************//
function getMealPlannerDayId( index ) {

	var day = Math.floor(index/mealTitle.length);
	var meal = index % mealTitle.length;
	
	if( day == 0 ) day = "sun";
	if( day == 1 ) day = "mon";
	if( day == 2 ) day = "tue";
	if( day == 3 ) day = "wed";
	if( day == 4 ) day = "thu";
	if( day == 5 ) day = "fri";
	if( day == 6 ) day = "sat";
	
	return day+meal;

	} //end of function
//***********************************************//


//***********************************************//
//Function iterates through the mealSchedule array
//and writes each of the 42 cells of the planner.
//***********************************************//
function populateCalendar() {

	//alert( mealSchedule.length );

	var temp = "";
	
	for( var i = 0; i<mealSchedule.length; i++ ) {
	
		var mealBlock = document.getElementById(getMealPlannerDayId(i));
		
		temp = temp + ", " + i + ":" + getMealPlannerDayId(i) + "<br>";

		if( mealSchedule[i] != undefined ) {
			
			var mealFoodList = "";

			for( var k = 0; k<mealSchedule[i].length; k++ ) {

				
				mealFoodList = mealFoodList + 
					"<table><tr><td>&#8226&nbsp</td><td>" +
					mealSchedule[i][k].foodDesc +
					" (" + mealSchedule[i][k].servingSize + " " + mealSchedule[i][k].measurement + ")" + 
					"</td></tr></table>";
						

				} //end of for loop
				
			

			mealBlock.innerHTML = mealFoodList;

			} else { mealBlock.innerHTML = ""; 
				} //end of if statement

		} //end of for loop

		
		
		//alert( temp );
		
	} //end of function
//***********************************************//


//***********************************************//
//Function writes the totals for each day of the 
//meal planner.
//***********************************************//
function updatePlannerTotals() {

	var cal = new Array(7);
	var fat = new Array(7);
	var carb = new Array(7);
	var protein = new Array(7);
	
	for( var i = 0; i<7; i++ ) {
	
		cal[i] = 0;
		fat[i] = 0;
		carb[i] = 0;
		protein[i] = 0;
	
		} //end of for loop
	
	for( var i = 0; i<mealSchedule.length; i++ ) {

		if( mealSchedule[i] != undefined ) {
		
			for( var k = 0; k<mealSchedule[i].length; k++ ) {
			
				var totalIndex = Math.floor(i/mealTitle.length);
				
				//var multiplier = mealSchedule[i][k].servingSize / foodItem.servingSize;	
			
				cal[totalIndex] = cal[totalIndex] + mealSchedule[i][k].multiplier*parseFloat( mealSchedule[i][k].cal );	
				fat[totalIndex] = fat[totalIndex] + mealSchedule[i][k].multiplier*parseFloat( mealSchedule[i][k].fat );
				carb[totalIndex] = carb[totalIndex] + mealSchedule[i][k].multiplier*parseFloat( mealSchedule[i][k].carb );
				protein[totalIndex] = protein[totalIndex] + mealSchedule[i][k].multiplier*parseFloat( mealSchedule[i][k].protein );
			
				} //end of for loop	
		
		
			} //end of if statement
		
		} //end of for loop
	
	for( var i = 0; i<7; i++ ) {
	
	document.getElementById( "total"+i ).innerHTML = 
		round(cal[i],1)+" <br>"+round(fat[i],1)+"g <br>"+round(carb[i],1)+"g <br>"+round(protein[i],1)+"g <br>";

		} //end of for loop
	
	} //end of function
//***********************************************//


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
function ajaxPost( url, successMsg, errorMsg, dataType ) {

	var params = {};
	//how to add parameters
	//params["username"] = "";

	$.post(
		url, 
		params,
        	function(data,status){
				
			if( data.substring(0, 3) == "You" ) {
				displayMessageToUser("", data, "ok", function(){ location.reload();}, null);
				} else { 	
			
				if( data != "0 results" ) { 
			
					if( successMsg != "No Message" ) {
						displayMessageToUser("", successMsg, "ok", hideMessageToUser, null);
						} //end of if statement
								 	
					if( dataType == "f" ) {
						//alert( "f returned" );
						foods = jQuery.parseJSON( data );
						//alert( foods.length );
						returnFlags[0] = true;
						} //end of if statement
				
					if( dataType == "m" ) {
						//alert( "m returned" );
						meals = jQuery.parseJSON( data ); 	
						returnFlags[1] = true;
						} //end of if statement			
				
					if( dataType == "p" ) {
						
						var temp = jQuery.parseJSON( data ); 
						
						for( var i = 0; i<temp.length; i++ ) {
							
							if( temp[i].planName == selectedPlan ) {
								mealTitle = temp[i].mealLabels.split(",");
								mealTitleTemp = temp[i].mealLabels.split(",");
								} //end of if statement
							
							} //end of for loop
						
						
						
						returnFlags[2] = true;
						
						} //end of if statment
				
					if( dataType == "w" ) {
						
						//alert( data );
						
						showLoader();
	
							returnFlags[0] = true;
							returnFlags[1] = false;
							returnFlags[2] = false;
	
							ajaxPost( "php/getJSON.php?table=mealElement", "No Message", "Error", "m");	
							ajaxPost( "php/getJSON.php?table=mealplans", "No Message", "Error", "p");	
							setTimeout(checkLoadStatus, 200);
						
						
						} //end of if statement
				
				
					} else {
									
					if( dataType == "f" ) { 	
				
						returnFlags[0] = true;
						} //end of if statement
					if( dataType == "m" ) { 
					
						returnFlags[1] = true;
						} //end of if statement			
				
					if( dataType == "p" ) { 
					
						returnFlags[2] = true;
						} //end of if statement
				
				
					} //end of if statement		

				} //end of if statement
				
				}) //end of success handler
			.fail(function() {
    			
    			//fail
    			alert( errorMsg );
  			
  				}); //end of fail handler		

	} //end of function
//***********************************************************//

//******************************************************************************************************//
//Meal Editor dialog
//******************************************************************************************************//

/////////////////////////////////////////////////////////////
//////functions to start dialogue and close dialogue/////////
/////////////////////////////////////////////////////////////

//opens dialogue
function openMealDialogue(){
	showDialogueBox();
	populateFoodListBox();
	updateTotals(); //creates total box
	finalMeal = []; //empties final meal array for new meal
	
}//end of function

//closes dialogue
function saveMealDialogue(){

	updateTotals();
	hideDialogueBox();	
	populateFinalMeal();	
	clearMealTable();	
	// sets select back to default
	$("#foodType").val('1');

}//end of function

function pressCancelMealDialogue() {

	displayMessageToUser("", "Are you sure you want to exit the meal editor?  All changes will be lost.", 
				"okc", cancelMealDialogue, hideMessageToUser);

	} //end of if statement
	
function pressSaveMealDialogue() {

	displayMessageToUser("", "Are you sure you want to save the changes you have made? The working copy of this meal plan will be modified.", "okc", 
	function() { 
	
	
	saveMealDialogue(); 
	writePlanner( "workingDraft" );
	hideMessageToUser();
	
	}, hideMessageToUser);

	} //end of if statement

function cancelMealDialogue(){

	hideMessageToUser();
	hideDialogueBox();
	clearMealTable();
	$("#foodType").val('1');
	//might want to put function here to ask user if they are sure they want to cancel???
}

////////////////////////////////////////////////////
//////Jquery functions to hide and show dialogue///
//////////////////////////////////////////////////

var pdfFunction = function(){
		createPDF();
	};

var trashFunction = function(){
	newPlanner();
};
// opens the meal dialogue box
function showDialogueBox(){
	$(".dialogueBox").fadeIn();
	$("#planner").hide();
	$('#trashLink').off();
	$('#pdfLink').off();
}

function hideDialogueBox(){
	$(".dialogueBox").hide();
	$("#planner").fadeIn(); 
	$('#trashLink').on("click", trashFunction);
	$('#pdfLink').on("click", pdfFunction);
}



/////////////////////////////////////////////////////
// Delete and Insert Food functions for the meal/////
/////////////////////////////////////////////////////

function insertFoodFromSelect() {

	insertFood( document.getElementById("foodSelect").value, "NA" );

	}//end of function


//inserts food into meal table
function insertFood( foodID, servingUserInput ) {
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
    
    //alert( servingSize );
   
    foodDesc.innerHTML = foodElement.foodDesc;
    servingSize.innerHTML = "<input class ='servingInput' id='" + foodElement.id + "' value=" + servingUserInput + " oninput='updateMacros()'> &nbsp" + foodElement.measurement; 
    calories.innerHTML = parseFloat(foodElement.cal).toFixed(1);
    fat.innerHTML = parseFloat(foodElement.fat).toFixed(1);
    carbs.innerHTML = parseFloat(foodElement.carb).toFixed(1);
    protein.innerHTML = parseFloat(foodElement.protein).toFixed(1);
    deleteBtn.innerHTML = "<button class='deleteBtn' onclick= 'deleteRow(this)'>X</button>";
    updateTotals();     
}//end of function

//function gets food object from json objects
function getFoodElement(id){
	for (var i = 0; i < foods.length; i++){
		if(foods[i].id == id){
			return foods[i];
		}
	}
}

////////////////////////////////////////////////////////////////
///Functions that organize food objects and populate listbox///
////////////////////////////////////////////////////////////////

//fills food item list box
function populateFoodListBox() {

	var selectedFoods = organizeFoods();
	var listboxItems = "";
	
	for( var i = 0; i<selectedFoods.length; i++ ) {
	
		if( i == 0 ) var begOpt = "<option selected value=\"";
		else begOpt = "<option value=\"";
		
		//organizes list with food type selected

		listboxItems += begOpt + selectedFoods[i].id +"\">"+ selectedFoods[i].foodDesc
							+"</option>";	
		} //end of for loop
		
		document.getElementById("foodSelect").innerHTML = listboxItems;

	} //end of function


//function will organize foods by option selected to populate list box
function organizeFoods() {
	var selectedType = $("#foodType option:selected").text();
	var organizedFoods = [];
	var count = 0;
	for(var i = 0; i< foods.length; i++){

		if (selectedType === foods[i].macroType){
			organizedFoods[count] = foods[i];
			count++;
		}
	}
	return organizedFoods;
}

////////////////////////////////////////////////////////////////////////
//////Dynamically updates macros on change of serving size//////////////
///////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////
//deletes individual food for delete button///
/////////////////////////////////////////////
function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("meal").deleteRow(i);
    updateMacros();
    updateTotals();
}//end of function


//////////////////////////////////////////////
////Deletes all foods for closing dialogue////
//////////////////////////////////////////////

function clearMealTable(){
	$("#meal tbody tr").remove();
}//end of function


////////////////////////////////////////////////////////////
//This function generates the totals for totals table///////
////////////////////////////////////////////////////////////
function updateTotals(){
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

////////////////////////////////////////////////////
//////Function to validate serving size inputs//////
////////////////////////////////////////////////////

function isNumber(e){
	if (isNaN(e)){
		return "";
	}else if (e <= 0 || e > 1000){
		return "";
	}else{
		return e;
	}
}


//////////////////////////////////////////////////
///Functions to get data from table cells/////////
//////////////////////////////////////////////////

//function will get total calories in meal
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

//function will get fat totals in meal
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


///////////////////////////////////////////////////////////
//this variable will store the items in the meal table/////
//with correct values that the user wants to save in your//
//meal table///////////////////////////////////////////////

//get final meal into array
function populateFinalMeal(){
	var finalMeal = [];
	var rows = document.getElementById("tbody").rows;
	
	for(var i = 0; i < rows.length; i++){		
		//id
		var id = rows[i].cells[1].children[0].id;
		//macroType
		var macroType = getFoodElement(id).macroType;
		//foodDesc	
		var foodDesc = rows[i].cells[0].innerHTML;	
		//Serving size		
		var servingSize = rows[i].cells[1].children[0].value;
		//measurement
		var measurement = getFoodElement(id).measurement;				
		//final calories		
		var cal = rows[i].cells[2].innerHTML
		//final fat		
		var fat = rows[i].cells[3].innerHTML
		//final carbs		
		var carb = rows[i].cells[4].innerHTML
		//final protein		
		var protein = rows[i].cells[5].innerHTML
		//constructs food object in array
		finalMeal[i] = new food(id,macroType, cal, protein, carb, fat, foodDesc, servingSize, measurement, null);
		

		
	}//end of loop
	
	mealSchedule[ mealIndex ] = finalMeal;
	populateCalendar();
	updatePlannerTotals();
}

//constructs food object
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











	
