//**************************************************************************************//
//JavaScript that is used to write changes in the meal planner to the database.
//**************************************************************************************//

//***********************************************//
//Function makes the AJAX request that sends the 
//meal planner data to writePlanner.php to be 
//written to the database.
//***********************************************//
function writePlanner( plannerName, func ) {

	var menuItems = getPlannerItems();
	
	var labels = "";
	
	for( var i = 0; i<mealTitle.length; i++ ) {
		
		if( labels == "" ) labels = mealTitle[i];
		else labels = labels + "," + mealTitle[i];
		
		} //end of for loop 
		
	ajaxPost( "php/writePlanner.php?name="+plannerName+"&mealLabels="+labels+"&data="+menuItems, "No Message", 
		"Error", function(data) {
		
			func( data );
			
			});

	} //end of function
//***********************************************//

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
		
			for( var k = mealSchedule[i].length-1; k>=0; k-- ) {
			
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