//**************************************************************************************//
//JavaScript is used to create the context menu and execute changes to the planner
//as specified in the context menu.
//**************************************************************************************//

//***********************************************//
//Creates the context menu and attaches it the 
//cells of the meal planner.
//***********************************************//
 		$(function() {
			$.contextMenu({
				selector: '.sq, .mealName', 
				autoHide: false,
				positionSubmenu: function( $menu ) {
				
						$menu.css( "width", "80px" );
						$( $menu ).position({
								"my": "left top",
								"at": "right top",
								"of": this
								});
				
							},
				events: {
				show : function(options){
            
							setMealIndex( options.$trigger.attr('id') );
					
							},
				hide : function(options){
		   
							if( mealIndex < 0 ) mealIndex = -mealIndex;
							unHighlight( getHighLightID( mealIndex, "cell") );
							unHighlight( getHighLightID( mealIndex, "row") );
					
							document.getElementById("contextrn").value = "";
							document.getElementById("contextAb").value = "";
							document.getElementById("contextBe").value = "";
							}},
				items: {
						"edit": {  
							name: "<div style='text-align:left;width:100%;padding-left: 8px'>Edit</div>",
							icon: "edit",
							isHtmlName: true,
							callback: function(key, opt) {
						
											setMealIndex( opt.$trigger.attr('id') );
											opt.$trigger.click();
						
											}},
						"copy": {name: "<div style='text-align:left;width:100%;padding-left: 8px'>Copy</div>", 
							icon: "copy", 
							isHtmlName: true,
							disabled: function(key, opt) {
								
										if( opt.$trigger.attr('class').includes("mealName") ) return true;
										if( mealSchedule[mealIndex].length == 0 ) {
										return true;
										}}, 
							callback: function(key, opt) {
										clipBoardFunctions( "copy" )
										}}, 
						"cut": {name: "<div style='text-align:left;width:100%;padding-left: 8px'>Cut</div>", 
							icon: "cut", 
							isHtmlName: true,
							disabled: function(key, opt) {
							
										if( opt.$trigger.attr('class').includes("mealName") ) return true;
										if(mealSchedule[mealIndex].length == 0) {
										return true;
							
										}}, 
							callback: function(key, opt) {
									
										clipBoardFunctions( "copy" );
										clipBoardFunctions( "clear" );
										
										}},
                "paste": {name: "<div style='text-align:left;width:100%;padding-left: 8px'>Paste</div>", 
					icon: "paste", 
					isHtmlName: true,
					disabled: function(key, opt) {
					if( clipboardData == "" ) return true;
					if( opt.$trigger.attr('class').includes("mealName") ) return true;
					}
					, callback: function(key, opt) {
						clipBoardFunctions( "paste" )
					}},					
				"clear": {name: "<div style='text-align:left;width:100%;padding-left: 8px'>Clear</div>", 
					icon: "delete", 
					isHtmlName: true,
					disabled: function(key, opt) {
					if( opt.$trigger.attr('class').includes("mealName") ) return true;
					if( mealSchedule[mealIndex].length == 0 ) {
					return true;
					}
					
					}, callback: function(key, opt) {
						clipBoardFunctions( "clear" )
					}},				
				"sep1": "---------",
				"rename": {name: "<div style='text-align:left;width:100%;padding-left: 8px'>Rename Meal</div>",
					icon: "edit", 
					isHtmlName: true,
					items: {
						"mealInput1": {
						type: "html",
						html: "<div  style='text-align: left;'><input id=\"contextrn\" type=\"text\""+
						"style='width:80%; height=100%' placeholder=\"\">"+
						"<span style='height=100%; padding-left: 5px'>"+  
						"<i class=\"fa fa-pencil-square fa-lg mealModBtn\" onclick='"+
						"contextMenuMealModification( \"rn\", document.getElementById(\"contextrn\").value )'>"+
						"</i></span></div>",
						}}}, 
				"addabove": {name: "<div style='text-align:left;width:100%;padding-left: 8px'>Add Above</div>",
					icon: "add", 
					isHtmlName: true,
					items: {
						"mealInput1": {
						type: "html",
						html: "<div  style='text-align: left;'><input id=\"contextAb\" type=\"text\""+
						"style='width:80%; height=100%' placeholder=\"New Meal\">"+
						"<span style='height=100%; padding-left: 5px'>"+  
						"<i class=\"fa fa-plus-square fa-lg mealModBtn\" onclick='"+
						"contextMenuMealModification( \"ab\", document.getElementById(\"contextAb\").value )'>"+
						"</i></span></div>",
						}}}, 
				"addbelow": {name: "<div style='text-align:left;width:100%;padding-left: 8px'>Add Below</div>", 
					icon: "add", 
					isHtmlName: true,
					items: {
						"mealInput1": {
						type: "html",
						html: "<div  style='text-align: left;'><input id=\"contextBe\" type=\"text\""+
						"style='width:80%; height=100%' placeholder=\"New Meal\">"+
						"<span style='height=100%; padding-left: 5px'>"+  
						"<i class=\"fa fa-plus-square fa-lg mealModBtn\" onclick='"+
						"contextMenuMealModification( \"be\", document.getElementById(\"contextBe\").value)'>"+
						"</i></span></div>",
						}}}, 
				 "delete": {name: "<div style='text-align:left;width:100%;padding-left: 8px'>Delete Meal</div>", 
					icon: "add", 
					isHtmlName: true,
					items: {
						"mealInput1": {
						type: "html",
						html: "<div  style='text-align: left;'>Highlighted data will be lost."+
						"<span style='height=100%; padding-left: 5px'>"+  
						"<i class=\"fa fa-times fa-lg mealModBtnDel\" onclick='"+
						"contextMenuMealModification( \"de\", \"\" )'>"+
						"</i></span></div>",	
						}}}, 
                "sep2": "---------",
				"undo": {name: "<div style='text-align:left;width:100%;padding-left: 8px'>Undo</div>",
					icon: "fa-undo", 
					isHtmlName: true,
					disabled: function(key, opt) {
					if( undoActions.length < 1 ) {
					return true;
					}
					}, callback: function(key, opt) {
							popUndoActions();
							}},
                
            }
        });	 
	});  
//***********************************************//
	
//***********************************************//
//Highlights a given cell or row depending on the
//selected option from the context menu
//***********************************************//	
function doHighlight( contextFocus, selIndex ) {
	
		if( contextFocus == "Edit" ) {
			if( selIndex > 0 ) highlight( getHighLightID( selIndex, "cell"), "#4682B4", "#eaf08f", "#4682B4"  );		
			} //end of if statement				
		if( contextFocus == "Copy" ) {
			highlight( getHighLightID( selIndex, "cell"), "#4682B4", "#eaf08f", "#4682B4"  );
			} //end of if statement
		if( contextFocus == "Cut" ) {
			highlight( getHighLightID( selIndex, "cell"), "white", "#C34A47", "#C34A47"  );
			} //end of if statement
		if( contextFocus == "Paste" ) {
			highlight( getHighLightID( selIndex, "cell"), "#4682B4", "#eaf08f", "#4682B4"  );
			} //end of if statement
		if( contextFocus == "Clear" ) {
			highlight( getHighLightID( selIndex, "cell"), "white", "#C34A47", "#C34A47"  );
			} //end of if statement
		if( contextFocus == "Add Above" ) {
			var temp = selIndex;
			if( temp < 0 ) temp = -selIndex;
			highlight( getHighLightID( temp, "row"), "#4682B4", "#eaf08f", "#4682B4"  );
			} //end of if statement
		if( contextFocus == "Add Below" ) {
			var temp = selIndex;
			if( temp < 0 ) temp = -selIndex;	
			highlight( getHighLightID( temp, "row"), "#4682B4", "#eaf08f", "#4682B4"  );
			} //end of if statement
		if( contextFocus == "Delete Meal" ) {
			var temp = selIndex;
			if( temp < 0 ) temp = -selIndex;
			if( selIndex < 0 ) temp = -selIndex;	
			highlight( getHighLightID( temp, "row"), "white", "#C34A47", "#C34A47"  );
			} //end of if statement
		if( contextFocus == "Rename Meal" ) {
			var temp = selIndex;
			if( temp < 0 ) temp = -selIndex;
			if( selIndex < 0 ) temp = -selIndex;	
			highlight( getHighLightID( temp, "meal"), "#4682B4", "#eaf08f", "#4682B4");
			document.getElementById("contextrn").placeholder = mealTitle[temp%mealTitle.length];
			} //end of if statement
	
	} //end of function
//***********************************************//

//***********************************************//
//Functions called to modifiy clipboard data
//and cell data.
//***********************************************//	
function clipBoardFunctions( func ) {
	
	if( func == "copy" ) {
		
		clipboardData = JSON.stringify(mealSchedule[mealIndex]);
		
		} //end of if statement

	if( func == "clear" ) {
		
		pushUndoActions();
		mealSchedule[mealIndex] = new Array();	
		if( !undoActionsMealPlannerChangedState() ) undoActions.pop();
		writePlanner( "workingDraft", function(data){ loadDatabaseData(true, false, false); });
		
		
		} //end of if statement
	
	if( func == "paste" ) {
		
		pushUndoActions();
		mealSchedule[mealIndex] = JSON.parse( clipboardData );
		if( !undoActionsMealPlannerChangedState() ) undoActions.pop();
		writePlanner( "workingDraft", function(data){ loadDatabaseData(true, false, false); });
		
		} //end of if statement
	
	} //end of function
	
//***********************************************//
//Highlights a row or cell associated with an
//id.
//***********************************************//
function highlight( id, c, bc, brdc ) {
	
	$(id).css("color", c);
	$(id).css("backgroundColor", bc);
	$(id).css("border-color", brdc);
	
	$(id+" *").css("color", c);
	$(id+" *").css("backgroundColor", bc);
	$(id+" *").css("border-color", brdc);
	
	//$(id).fadeTo(10,0.8);
	
	} //end of function
//***********************************************//


//***********************************************//
//Removes highlighting from context menu option
//focus
//***********************************************//
function unHighlight( id ) {

	$(id).css("color", "#4682B4");
	$(id).css("backgroundColor", "white");
	$(id).css("border-color", "#4682B4");
	
	$(id+" *").css("color", "#4682B4");
	$(id+" *").css("backgroundColor", "white");
	$(id+" *").css("border-color", "#4682B4");
	
	$(".mTitle").css("color", "white");
	$(".mTitle").css("backgroundColor", "#4682B4");
	$(".mTitle").css("border-color", "#4682B4");
	
	//$(id).fadeTo(10,1);
	
	} //end of function
//***********************************************//


//***********************************************//
//Creates the HTML id used for highlighting based
//on the index and the type of highlighting
//(cell or row).
//***********************************************//	
function getHighLightID( i, item) {
	
	var mIndex = i%mealTitle.length;
	
	if( item == "cell" ) {
		
		var dayIndex = parseInt( i/mealTitle.length );
		
		if( dayIndex == 0 ) dayIndex = "sun";
		if( dayIndex == 1 ) dayIndex = "mon";
		if( dayIndex == 2 ) dayIndex = "tue";
		if( dayIndex == 3 ) dayIndex = "wed";
		if( dayIndex == 4 ) dayIndex = "thu";
		if( dayIndex == 5 ) dayIndex = "fri";
		if( dayIndex == 6 ) dayIndex = "sat";
		
		//alert( dayIndex + mIndex );
		
		return "#"+dayIndex+mIndex;
		
		} //end of if statement
	
	if( item == "row" ) {
		
		return "#row"+mIndex;
		
		} //end of if statement 
		
	if( item == "meal" ) {
		
		return "#mea"+mIndex;
		
		} //end of if statement 	
		
	} //end of function
//***********************************************//

//***********************************************//
//Executes changes made by the context menu to the
//meals displayed in the planner.
//***********************************************//	
function contextMenuMealModification( modType, mealLabel ) {
	
	$('.context-menu-list').trigger('contextmenu:hide');
	var mIndex = mealIndex%mealTitle.length;
	
	if( mealLabel == "" && modType != "rn" ) mealLabel = "New Meal";
	mealLabel = makeInputSafe( mealLabel );
	
	if( modType == "ab" ) {
		
		pushUndoActions();
		addMealAbove( mIndex, mealLabel );
		mealTitle = mealTitleTemp;							
		mealSchedule = mealScheduleTemp;
		if( !undoActionsMealPlannerChangedState() ) undoActions.pop();
		writePlanner( "workingDraft", function(data){ loadDatabaseData(true, false, false); });
		
		} //end of if statement
		
	if( modType == "be" ) {
		
		pushUndoActions();
		addMealBelow( mIndex, mealLabel );
		mealTitle = mealTitleTemp;							
		mealSchedule = mealScheduleTemp;	
		if( !undoActionsMealPlannerChangedState() ) undoActions.pop();
		writePlanner( "workingDraft", function(data){ loadDatabaseData(true, false, false); });
		
		} //end of if statement

	if( modType == "de" ) {
		
		pushUndoActions();
		deleteMeal( mIndex );
		mealTitle = mealTitleTemp;							
		mealSchedule = mealScheduleTemp;
		if( !undoActionsMealPlannerChangedState() ) undoActions.pop();
		writePlanner( "workingDraft", function(data){ loadDatabaseData(true, false, false); });
		
		} //end of if statement
		
	if( modType == "rn" ) {
		
		pushUndoActions();
		if( mealLabel != "" ) mealTitle[mIndex] = mealLabel;							
		if( !undoActionsMealPlannerChangedState() ) undoActions.pop();
		writePlanner( "workingDraft", function(data){ loadDatabaseData(true, false, false); });
		
		} //end of function
		
	} //end of function
//***********************************************//	
	
	
	