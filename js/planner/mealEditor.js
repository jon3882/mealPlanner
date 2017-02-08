//******************************************************************************************************//
//Meal Editor dialog is created and logic for functionality is included.
//******************************************************************************************************//

//***********************************************//
//Functions that open and close the meal editor
//dialog.
//***********************************************//
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
//***********************************************//

//***********************************************//
//Function cancels the editor and closes the 
//dialog (no changes to the meal planner)
//***********************************************//
function pressCancelMealDialogue() {

	displayMessageToUser("", "Are you sure you want to exit the meal editor?" +
	"  All changes will be lost.", 
				"okc", cancelMealDialogue, hideMessageToUser);

	} //end of if statement
//***********************************************//
	
//***********************************************//
//Changes committed to the planner.
//***********************************************//
function pressSaveMealDialogue() {

	displayMessageToUser("", "Are you sure you want to save the changes you have made? "+ 
		"The working copy of this meal plan will be modified.", "okc", 
	function() { 
		saveMealDialogue(); 
		writePlanner( "workingDraft", function(data){ loadDatabaseData(true, false, false); });
		hideMessageToUser();
	
		}, hideMessageToUser);

	} //end of if statement
//***********************************************//


//***********************************************//
//Processes a cancelled meal editor dialog
//***********************************************//
function cancelMealDialogue(){

	hideMessageToUser();
	hideDialogueBox();
	clearMealTable();
	$("#foodType").val('1');
	
	} //end of function
//***********************************************//

//***********************************************//
//Functions hide and show the meal editor 
//dialog
//***********************************************//
// opens the meal dialogue box
function showDialogueBox(){
	$(".dialogueBox").fadeIn();
	$("#planner").hide();
	} //end of function

function hideDialogueBox(){
	$(".dialogueBox").hide();
	$("#planner").fadeIn(); 
	} //end of function
//***********************************************//

//***********************************************//
//Insert Food functions for the meal editor
//***********************************************//
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
   
    foodDesc.innerHTML = foodElement.foodDesc;
    servingSize.innerHTML = "<input class ='servingInput' id='" + foodElement.id + "' value=" + 
		servingUserInput + " oninput='updateMacros()'> &nbsp" + foodElement.measurement; 
    calories.innerHTML = parseFloat(foodElement.cal).toFixed(1);
    fat.innerHTML = parseFloat(foodElement.fat).toFixed(1);
    carbs.innerHTML = parseFloat(foodElement.carb).toFixed(1);
    protein.innerHTML = parseFloat(foodElement.protein).toFixed(1);
    deleteBtn.innerHTML = "<button class='deleteBtn' onclick= 'deleteRow(this)'>X</button>";
    updateTotals();     
}//end of function
//***********************************************//


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
	
	
//***********************************************//
///Functions that organize food objects and
// populates listboxes.
//***********************************************//
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
			} //end of if statement
		} //end of for loop
		
	return organizedFoods;
	
	} //end of function
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
//This function generates the totals for 
//totals table.
//***********************************************//
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
//***********************************************//


//***********************************************//
//Function to validate serving size inputs
//***********************************************//
function isNumber(e){
	if (isNaN(e)){
			return "";
		}else if (e <= 0 || e > 1000){
			return "";
		}else{
			return e;
		} //end of if statement
	} //end of function
//***********************************************//	


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
//Creates array of food objects that is passed
//to planner.  Array of food elements is 
//written to the database and associated 
//with the index of the selected cell.
//***********************************************//
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
	
	pushUndoActions();
	mealSchedule[ mealIndex ] = finalMeal;
	if( !undoActionsMealPlannerChangedState() )	undoActions.pop();	 
	populateCalendar();
	updatePlannerTotals();

	} //end of function
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