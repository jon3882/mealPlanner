//**************************************************************************************//
//JavaScript used to maintain array of global datastructure states, so as the user
//can return to those states by utilizing the undo button.
//**************************************************************************************//

//***********************************************//
//Creates copy of global data structures and 
//stores them before they are changed.
//***********************************************//
function pushUndoActions() {

	var tempUndo = new Array();
	tempUndo[0] = JSON.parse(JSON.stringify(mealTitle));
	tempUndo[1] = JSON.parse(JSON.stringify(mealSchedule));
	undoActions.push( tempUndo );

	} //end of function
//***********************************************//

//***********************************************//
//Pulls the last stored version of the global
//data structures and restores the pulled values
//***********************************************//	
function popUndoActions() {
	
	var temp = undoActions.pop();
	mealTitle = JSON.parse(JSON.stringify(temp[0]));
	mealSchedule = JSON.parse(JSON.stringify(temp[1]));
	writePlanner( "workingDraft", function(data){ loadDatabaseData(true, false, false); });
	
	} //end of function
//***********************************************//

//***********************************************//
//Checks whether the global data structures have 
//changed (returns true if they have and false
//if not). 
//***********************************************//	
function undoActionsMealPlannerChangedState() {
	var index;
	if( undoActions.length > 0 ) index = undoActions.length-1;
	else return true;
	
	var temp1Label = JSON.stringify(undoActions[index][0]);
	var temp2Label = JSON.stringify(mealTitle);
	var temp1Elements = JSON.stringify(undoActions[index][1]);
	var temp2Elements = JSON.stringify(mealSchedule);
	
	if(temp1Label != temp2Label)  return true;
	if(temp1Elements != temp2Elements ) return true;

	return false;	
	} //end of function
//***********************************************//