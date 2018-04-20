//**************************************************************************************//
//Creates attaches the star that is used to select a favorite or remove a favorite
//food item.
//**************************************************************************************//


var favoriteObj;

//***********************************************//
//Function changes whether a food is included
//in the favorites list or not.  The state of
//of the food element is toggled.
//***********************************************//
function changeFavoriteStatus( container, id, foodTable ) {
	
		document.getElementById( container + id + foodTable ).innerHTML = "<div><span style=\"width:100%;\" class=\"fa-stack fa-1x\">"
				+"<i class=\"fa fa-spinner fa-spin fa-stack-1x fa-fw\"" 
				+" style=\"width:100%;color:#4682B4\"></i><span></div>";
	
		ajaxPost( "php/favorite.php?foodID="+id+"&foodTable="+foodTable, "No Message", "Error retriving favorites database.", 
		function(data) {
	
			document.getElementById( container + id + foodTable ).innerHTML = "<div class=\"userDefinedHover\"><span class=\"fa-stack fa-1x\"><i class=\"fa fa-star-o fa-stack-2x\"  aria-hidden=\"true\" style=\"color:#4682B4\"></i></span></div>";
	
			if( data != "0 results" ) { 
	
				favoriteObj = jQuery.parseJSON( data );		
				writeFavorites( container, foodTable );
				
				} //end of if statement
		
		});
	
	
	} //end of function
//***********************************************//

function getFavorites( containerPrefix, foodTable) {
	
	ajaxPost( "php/favorite.php", "No Message", "Error retriving favorites database.", 
		function(data) {
	
	if( data != "0 results" ) { 
	
		favoriteObj = jQuery.parseJSON( data );
		writeFavorites( containerPrefix, foodTable );
		
		} //end of if statement
	
		});
	
	} //end of function 

//***********************************************//
//function changes favorite indicator empty blue 
//star (default).  To gold star if the food item
//is already a favorite. 
//***********************************************//
function writeFavorites( containerPrefix, foodTable ) {
	
	for( var i =0; i<favoriteObj.length; i++ ) {
		
		if( document.getElementById( containerPrefix + favoriteObj[i].foodID + foodTable ) != null ) {
		
			document.getElementById( containerPrefix + favoriteObj[i].foodID + foodTable ).innerHTML = "<div class=\"userDefinedHover\"><span class=\"fa-stack fa-1x\">"+
			"<i class=\"fa fa-star fa-stack-2x\" style=\"color:#ffff4d\"></i>"+
			"<i class=\"fa fa-star-o fa-stack-2x\" style=\"color:#4682B4\"></i></div>"+
			"</span>";
				
			} //end of if statement
		
		} //end of for loop
	
	} //end of function