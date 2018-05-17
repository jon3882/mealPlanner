//**************************************************************************************//
//JavaScript used to create the HTML used to display the planner and populates the 
//HTML with the values from the global datastructures.  The totals for the calculated
//values is also written.
//**************************************************************************************//

//***********************************************//
//Function creates the HTML for the planner
//***********************************************//
function drawPlanner() {
	
	var rowString = "<tr><td></td><td class=\"dTitle\" id=\"sunTitle\">Sunday</td><td class=\"dTitle\""+ 
		"id=\"monTitle\">Monday</td><td class=\"dTitle\" id=\"tueTitle\">Tuesday</td>"+
		"<td class=\"dTitle\" id=\"wedTitle\">Wednesday</td><td class=\"dTitle\" id=\"thuTitle\">Thursday</td>"+
		"<td class=\"dTitle\" id=\"friTitle\">Friday</td><td class=\"dTitle\" id=\"satTitle\">Saturday</td>"+
		"</tr>";
	
	for( var i = 0; i<mealTitle.length; i++ ) {
		
		rowString = rowString + "<tr id=\"row"+i+"\">";
		rowString = rowString + "<td class=\"mTitle mealName\" id=\"mea"+ i +"\">"+mealTitle[i]+"</td><td class=\"sq\" id=\"sun"+i+"\"></td>"+
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
	
	document.getElementById( "planner" ).innerHTML = rowString;
	
	//table#planner tbody tr#row2
	//$("table#planner tbody tr#row2 *").css("background-color", "red");
	
	} //end of function
//***********************************************//
	
	
//***********************************************//
//Function iterates through the mealSchedule array
//and writes each of the cells of the planner.
//***********************************************//
function populateCalendar() {

	var temp = "";
	
	for( var i = 0; i<mealSchedule.length; i++ ) {
	
		var mealBlock = document.getElementById(getMealPlannerDayId(i));
		
		temp = temp + ", " + i + ":" + getMealPlannerDayId(i) + "<br>";

		if( mealSchedule[i] != undefined ) {
			
			var mealFoodList = "";

			for( var k = 0; k<mealSchedule[i].length; k++ ) { 

				
				mealFoodList = mealFoodList + 
					"<table style='width:100%'><tr><td style='padding-left:2px'>&#8226&nbsp</td><td>" +
					mealSchedule[i][k].foodDesc +
					" (" + parseFloat(mealSchedule[i][k].servingSize*mealSchedule[i][k].multiplier).toFixed(1) + " " + mealSchedule[i][k].measurement + ")" + 
					"</td></tr></table>";
						

				} //end of for loop
				
			mealBlock.innerHTML = mealFoodList;

			} else { mealBlock.innerHTML = ""; 
				} //end of if statement

		} //end of for loop
		
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
			
	var totalObj = {};
	totalObj.cal = cal;
	totalObj.fat = fat;
	totalObj.carb = carb;
	totalObj.protein = protein;
	
	return totalObj;
	
	} //end of function
//***********************************************//