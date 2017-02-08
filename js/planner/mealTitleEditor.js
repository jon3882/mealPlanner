//*******************************************************************************//
//Functions within this file are used to create the meal modification window
//and execute meal modification changes specified in the window.
//*******************************************************************************//

//***********************************************//
//Function generates the HTML for the meal modification
//window.
//***********************************************//
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
//Function writes titles listed in the meal modification
//window to the mealTitleTemp global datastructure
//***********************************************//	
function writeTempMealTitlesFromModWindow() {

	for( var k = 0; k<mealTitleTemp.length; k++ ) {
		mealTitleTemp[k] = document.getElementById( "modMTitle"+k ).value;
		} //end of for loop
	
	} //end of function 