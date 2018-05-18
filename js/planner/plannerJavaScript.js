//**************************************************************************************//
//JavaScript that is appied to the mealplanner.php
//**************************************************************************************//

//************************************************//
//Global variables
//************************************************//

//Data structures used to store the
//meal planner data for the selectedPlan
var mealTitle = new Array(); //Stores list of meal Titles
var mealTitleTemp = new Array();
var mealSchedule = new Array();
var mealScheduleTemp = new Array();

//Stores previous states of datastructures
var undoActions = new Array();
//Stores array data to be pasted
var clipboardData = "";

//Stores returned JSON
var foods; //Food elements entered by user / frequently used.
var usdaFoods;  //Food elements from USDA Nutrient Database.
var mealIndex;  //Stores the currently selected meal
var meals;  //Meal elements as JSON used to builds
			//mealSchedule array
var selectedPlan = "workingDraft";
var returnFlags = new Array(2);

//************************************************//
//JQuery ready function.  Two events attached to
//to the document.
//************************************************//
$(document).ready(function(){ 

	//Attaches a focus event for each of the context menu items.
	//functions called are defined in contextMenuJS.js
	$(document.body).on("contextmenu:focus", ".context-menu-item", 
    function(e){ 
		var contextFocus = $(this).closest('li').find('div').html();		
		var t = mealIndex;
		if( t < 0 ) t = -mealIndex;
		unHighlight( getHighLightID( t, "row") );
		doHighlight( contextFocus, mealIndex);
		
		}); //end of function	
		
	
	
	//Attaches a click event to the pdf link. Executed
	//function is defined in pdfJS.js
	//$(document).on('click', '#pdfLink', function(){
	//	createPDF();
	//	});	        
		
	//attachBrowseDialog( "searchBtn", function( obj ){ alert( obj.foodDesc ); } );
	//attachUSDANutrient( "browseBtn", function( obj ){ alert( obj.foodDesc ); });	
			
	}); //end of document ready function 
//***********************************************//

//************************************************//
//Mouseover and click events for menu cells attached
//************************************************//	
function attachMealPlannerEventHandlers() {

	//Clear all current events attached to the class
	$( ".sq" ).unbind(); //cells of meal planner
	$( ".mealName" ).unbind();	//titles of meal planner meals
	$( ".mealModBtn" ).unbind(); //buttons used in the meal planner modfication window
	$('#trashLink').unbind(); //button used to clear the meal planner
	$('#saveLink').unbind(); //button used to save the meal planner
	$('#openLink').unbind(); //button used to open the meal planner
	$('#file-input').unbind(); //button used to select the meal plan file.
	$('#browseUSDA').unbind(); //button used to find a USDA food.
	$('.contextAction').unbind();//buttons for renaming, adding, and deleting meals from the context menu
	
	$('#browseUSDA').click(function(e) {
		
		});
	
	$("#openLink").on('click', function(e){
		e.preventDefault();
        $("#file-input:hidden").trigger('click');
		});
	
	$('#file-input').change(function(e) {
		readSingleFile( e );
		});
	
	$('#saveLink').click(function(){
		savePlanner( selectedPlan );
		});
	
	$('#trashLink').click(function(){
		newPlanner( selectedPlan );
		});
	
	$( ".sq" ).on("click", 
		function() {
	
			var day = this.id.substring(0,3);
            var meal = this.id.substring(3,4);
            //document.getElementById( "mealID" ).innerHTML = getMealName(day, meal);
			
			
                   	
            setMealIndex(this.id);
			
			openMealDialogue( getMealName(day, meal) );      	
          
			
			});
		
	$( ".sq" ).on("mouseover", 
		function() {
           	
			unHighlight( getHighLightID( mealIndex, "cell") );
			unHighlight( getHighLightID( mealIndex, "row") );
					
			$("#"+this.id ).css("color", "white");
			$("#"+this.id ).css("background-color", "#4682B4");					
			$("#"+this.id + " *").css("color", "white");
			$("#"+this.id + " *").css("background-color", "#4682B4");
           	   	             
            var dt = this.id.substring(0,3) + "Title"; 
            var mt = "mea"+this.id.substring(3,4);
            document.getElementById( dt ).style.color = "#4682B4";	             
            document.getElementById( dt ).style.backgroundColor = "white"; 
            document.getElementById( mt ).style.color = "#4682B4";	             
            document.getElementById( mt ).style.backgroundColor = "white";
            });

	 $( ".sq" ).on("mouseout", 
		function() {
                     
			unHighlight( getHighLightID( mealIndex, "cell") );
			unHighlight( getHighLightID( mealIndex, "row") ); 
					 
			$("#"+this.id).css("color", "#4682B4");
			$("#"+this.id).css("background-color", "white"); 
            $("#"+this.id + " *").css("color", "#4682B4");
			$("#"+this.id + " *").css("background-color", "white");
					
            var dt = this.id.substring(0,3) + "Title"; 
            var mt = "mea"+this.id.substring(3,4);
            document.getElementById( dt ).style.color = "white";	             
            document.getElementById( dt ).style.backgroundColor = "#4682B4"; 
            document.getElementById( mt ).style.color = "white";	             
            document.getElementById( mt ).style.backgroundColor = "#4682B4";
                                 
           	});
						
	$( ".mealName" ).on("mouseout", 
		function() {	
				
			this.style.color = "white";	             
            this.style.backgroundColor = "#4682B4";
				
			});
				
	$( ".mealName" ).on("mouseover", 
		function() {	
				
			this.style.color = "#4682B4";	             
            this.style.backgroundColor = "white";
				
			});		
	
	$( ".mealName" ).on("click", null
		/*
		function() {	
				
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
					mealTitleTemp[k] = makeInputSafe( temp );
					} //end of for loop
						
				//The user is asked if they want to commit their changes to the meal planner
				displayMessageToUser("WARNING","The data associated with meals that were deleted "+
					"will be deleted from the meal plan.", "okc", 
					//Executed if the user clicks "OK"
					function() {							
						pushUndoActions();
						mealTitle = mealTitleTemp;							
						mealSchedule = mealScheduleTemp;
						if( !undoActionsMealPlannerChangedState() ) undoActions.pop();
							writePlanner( "workingDraft", function(data){ 
	
								loadDatabaseData(true, false, false);
	
								});
								hideMessageToUser();
								},
							//Executed if user clicks "cancel"
							function(){ $( ".mealName" ).click();} );				
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
				}
				
				*/);	
			
	//Executed when buttons within the meal modification window are
	//pressed
	
	$( ".mealModBtn" ).on("click", 
		function() {
	
			//if add above button is pressed
			if( this.id.substring( 0, 4) == "addA" ) {		
			
				var i = this.id.substring(8);
				writeTempMealTitlesFromModWindow();
				addMealAbove( i, "New Meal" );		
				$( ".mealName" ).click();
			
				} //end of if statement
		
			//if add below button is pressed
			if( this.id.substring( 0, 4) == "addB" ) {
			
				var i = this.id.substring(8);
				writeTempMealTitlesFromModWindow();
				addMealBelow( i, "New Meal" );		
				$( ".mealName" ).click();
			
				} //end of if statement
			
			//if delete button is pressed
			if( this.id.substring( 0, 4) == "delM" ) {
			
				var i = this.id.substring(7);
				writeTempMealTitlesFromModWindow();
				deleteMeal( i );
				$( ".mealName" ).click();
		
				} //end of if statement
	
			});	
				
				
		$( ".contextAction" ).on("mouseover", 
		function() { this.src = $( this ).attr("data-select"); });
		
		$( ".contextAction" ).on("mouseout", 
		function() { this.src = $( this ).attr("data-unselect"); });
		
		} //end of function 
//***********************************************//

	
//***********************************************//
//
//***********************************************//
function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
	  //alert( "error" );
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    loadContents(contents);
  };
  reader.readAsText(file);
}
//***********************************************//


//***********************************************//
//
//***********************************************//
function loadContents(contents) {
	var obj = jQuery.parseJSON( contents );
	mealTitle = obj.mealLabels.split(",");
	mealSchedule = obj.data;
	writePlanner( "workingDraft", function(data){ 
		document.getElementById('file-input').value = null;
		loadDatabaseData(true, false, false); });
	
//check if JSON is correct
//load JSON
//refresh
//alert( contents );
}
//***********************************************//


//***********************************************//
//
//***********************************************//
function savePlanner( selPlanner ) {
		
		//add functionality to save online using selPlanner variable
		
		savePlannerToFile( function( data ) {
		
			displayMessageToUser("The following files are available for download." + 
			'<br> - <a href="php/downloadMeal.php" title="Download data file to your computer." class="downloadLink">Data File</a> - <br>(Used to load meal plan at a later date)'+
			"<br><br>Formatted Copy<br>"+
				'<div id="googleSaveBtnContainer"></div>'+
				'<img id="googleBusy" src="img/smallLoader.gif" >'+
				'<br>(Download sheets document to gDrive)',
				"", "ok", function() {
				hideMessageToUser();
				}, hideMessageToUser);
				
				//loadingSaveButton( 20 );
				
				gapi.savetodrive.render('googleSaveBtnContainer', {"src": "php/downloadSheet.php", "filename": "planner.xlsx", "sitename": "Meal Planner"});
				
				//$( "#googleSaveBtnContainer" ).find("iframe")
				
				document.getElementById( document.getElementById("googleSaveBtnContainer").children[0].id ).onload = function() {
        
						$("#googleBusy").css("display","none");
		
						};
				
				//alert( data );
		
				}) //end of function
		
		};	
//***********************************************//

function loadingSaveButton( count ) {
	
	
	
	console.log( htmlContent );
	count--;
	
	if( count > 0 ) setTimeout( function(){ loadingSaveButton( count ); }, 100);
	
	} //end of function


//***********************************************//
//Clears the contents of a selected planner and
//writes the empty cells to the database.
//***********************************************//
function newPlanner( selPlanner ) {
		
		displayMessageToUser("Are you sure you want to clear the meal planner?  All changes to the working" + 
		" draft will be lost.", "", "okc", function() {
		clearPlanner( selPlanner );
		hideMessageToUser();
		}, hideMessageToUser);
		
		};	
//***********************************************//

//***********************************************//
//Function is executed at startup to fill the global
//variables with the meal plan data for the user.
//***********************************************//
function loadDatabaseData(isLoadedFood, isLoadedMeal, isLoadedPlan) {

	//alert( "Executing" );

	showLoader();
	
	returnFlags[0] = isLoadedFood;
	returnFlags[1] = isLoadedMeal;
	returnFlags[2] = isLoadedPlan;
	
	if( !isLoadedFood ) ajaxPost( "php/getJSON.php?table=foodelement", "No Message", "Error", function(data) {
		
		//alert( data );
		if( data != "0 results" ) { 
			data = data.replace(/\'/g, "" );
			
			//alert( data );
			
			foods = jQuery.parseJSON( data );
			returnFlags[0] = true;
			} else {
			returnFlags[0] = true;	
			
			}});
		
	if( !isLoadedMeal ) ajaxPost( "php/loadPlanner.php", "No Message", "Error", function(data) {
		
		if( data != "0 results" ) { 
			data = data.replace(/\'/g, "" );
			//alert( data );
			meals = jQuery.parseJSON( data ); 	
			returnFlags[1] = true;
			} else {
			meals = new Array();
			returnFlags[1] = true;
			
			}});
		
	if( !isLoadedPlan ) ajaxPost( "php/getJSON.php?table=mealplans", "No Message", "Error", function(data) {
		
		//alert( data );
		
		if( data != "0 results" ) { 	
			var temp = jQuery.parseJSON( data ); 
			for( var i = 0; i<temp.length; i++ ) {
							
				if( temp[i].planName == selectedPlan ) {
					mealTitle = temp[i].mealLabels.split(",");
					mealTitleTemp = temp[i].mealLabels.split(",");
					} //end of if statement
							
				} //end of for loop
			returnFlags[2] = true;
			} else {
			returnFlags[1] = true;
			}});	
		
	setTimeout(checkLoadStatus, 200);

	} //end of function
//***********************************************//


//***********************************************//
//Function hides the loading message, builds the
//mealSchedule array, creates the planner, attaches
//the mouse events to the planner, populates
//the meal planner with values from the working draft,
//and updates the planner totals.  The return flags
//ensure the JSON representing the food elements 
//(frequently used), the meal elements in the 
//workingdraft, and meal titles associated with
//the workingdraft have been loaded into the global 
//variables.
//***********************************************//
function checkLoadStatus() {

	if( returnFlags[0] && returnFlags[1] && returnFlags[2]) {	
			
						
				$("#msgContainer").hide();
				hideLoader();
				refreshPlanner();		
							
		} else {
				
		setTimeout(checkLoadStatus, 200);
		
		} //end of if statement

	} //end of if statement
//***********************************************//


//***********************************************//
//
//***********************************************//
function refreshPlanner() {
	
		mealSchedule = new Array(7*mealTitle.length);
		mealScheduleTemp = new Array(7*mealTitle.length);
		loadMealArray( "workingDraft", mealSchedule.length );  
		drawPlanner();
		attachMealPlannerEventHandlers();
		populateCalendar();
		updatePlannerTotals();
	
	} //end of function
//***********************************************//
	
//***********************************************//
//Function loads the global variables and populates
//the meal planer with the current data.
//***********************************************//
function startup() {

		loadDatabaseData(false, false, false);
		 	
		} //end of function
//***********************************************//






//***********************************************//
//Function returns an index that is used to 
//access the appropriate element of the array
//used to store the plan meal entries.
//***********************************************//
function setMealIndex(el) {

	var day = el.substring(0,3);
    var meal = el.substring(3,4);

	var d;

	//meal title "id" used to return
	//generic index "sunday" cell
	//for context menu
	if( day == "mea" ) d = 0;
	if( day == "mea" ) meal = -meal;
	
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
//Function used to get the element id of the
//element that displays the food elements of 
//a specified index (within the mealSchedule 
//data structure.
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
//Adds a row (meal) above the row of the selected
//index
//***********************************************//
function addMealAbove( i, mealLabel ) {

	var oldLabelLength = mealTitleTemp.length;
	mealTitleTemp.splice(i, 0, mealLabel);
					
	for( var k = 0; k<7; k++ ) {	
		var index = (6*oldLabelLength)-(k*oldLabelLength) + parseInt(i);
		mealScheduleTemp.splice(index, 0, new Array()); 
		} //end of for loop
			
	for( var i2 = 0; i2<mealScheduleTemp.length; i2++ ) {
		for( var k2 = 0; k2<mealScheduleTemp[i2].length; k2++ ) {
			mealScheduleTemp[i2][k2].cell = i2;
			} //end of for loop
		} //end of for loop

	} //end of function
//***********************************************//

	
//***********************************************//	
//Adds a row (meal) below the row of the selected
//index.
//***********************************************//
function addMealBelow( i, mealLabel ) {

	var oldLabelLength = mealTitleTemp.length;
	i = parseInt( i ) + 1;
	mealTitleTemp.splice(i, 0, mealLabel);
			
	for( var k = 0; k<7; k++ ) {	
		var index = (6*oldLabelLength)-(k*oldLabelLength) + parseInt(i);
		mealScheduleTemp.splice(index, 0, new Array()); 
		} //end of for loop
		
	for( var i2 = 0; i2<mealScheduleTemp.length; i2++ ) {
		for( var k2 = 0; k2<mealScheduleTemp[i2].length; k2++ ) {
			mealScheduleTemp[i2][k2].cell = i2;
			} //end of for loop
		} //end of for loop
	
	
	} //end of function

//***********************************************//
	
	
//***********************************************//
//Deletes a row (meal) from the planner table.
//***********************************************//
function deleteMeal( i ) {

	var oldLabelLength = mealTitleTemp.length;
	mealTitleTemp.splice(i, 1);
			
	for( var k = 0; k<7; k++ ) {	
		var index = (6*oldLabelLength)-(k*oldLabelLength) + parseInt(i);
		mealScheduleTemp.splice(index, 1); 
			} //end of for loop	
			
	for( var i2 = 0; i2<mealScheduleTemp.length; i2++ ) {
		for( var k2 = 0; k2<mealScheduleTemp[i2].length; k2++ ) {
			mealScheduleTemp[i2][k2].cell = i2;
			} //end of for loop
		} //end of for loop

	} //end of function	
//***********************************************//

//***********************************************//
//Clears the contents of the meal planner and 
//writes an empty planner to the database.
//***********************************************//
function clearPlanner( selPlanner ) {

	
	pushUndoActions();
	mealSchedule = new Array( mealSchedule.length );
	if( !undoActionsMealPlannerChangedState() ) undoActions.pop();
	writePlanner( "workingDraft", function(data){ 
	
		loadDatabaseData(true, false, false);
	
		});
		
	
	//pushUndoActions();
	//mealSchedule[ mealIndex ] = finalMeal;
	//if( !undoActionsMealPlannerChangedState() )	undoActions.pop();
	//populateCalendar();
	//updatePlannerTotals();
	
		
		//mealSchedule[mealIndex] = JSON.parse( clipboardData );
		//writePlanner( "workingDraft", function(data){ loadDatabaseData(true, false, false); });

	} //end of if statement
//***********************************************//

//***********************************************//
//Uses the global variable meals, created from
//returned JSON, to create the mealSchedule
//array used to write the meal elements to the
//plan.
//***********************************************//
function loadMealArray( mealName, mealPlanSize ) {

	mealSchedule = new Array( mealPlanSize );
	mealScheduleTemp = new Array( mealPlanSize );
	
	for( var k = 0; k<mealSchedule.length; k++ ) {
	
		mealSchedule[k] = new Array();
		mealScheduleTemp[k] = new Array();
	
		} //end of for loop
	
	if( meals != undefined ) {

	for( var i = 0; i<meals.length; i++ ) {
	
		var index = parseInt( meals[i].cell );
	
		var f = meals[i];
		//var f = getFoodElement( meals[i].foodElementID );	
		
		if( f != undefined && meals[i].planName == mealName ) {
			
			if( mealSchedule[index] == undefined ) mealSchedule[index] = new Array();
			if( mealScheduleTemp[index] == undefined ) mealScheduleTemp[index] = new Array();
			
			var foodElement = new food(f.id,f.macroType, f.cal, f.protein, 
			f.carb, f.fat, f.foodDesc, f.servingSize, f.measurement, f.multiplier, f.db, f.cell);
	
			//alert( index );
	
			mealSchedule[index].push( foodElement );
			mealScheduleTemp[index].push( foodElement );
			} //end of if statement
			
		} //end of for loop
		
		} //end of if statement
		
	} //end of function
//***********************************************//





