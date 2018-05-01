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
function changeFavoriteStatus( id, foodTable ) {
	
		$( "#fav"+foodTable+id ).attr("src", "img/smallLoader.gif");
	
		ajaxPost( "php/favorite.php?foodID="+id+"&foodTable="+foodTable, "No Message", "Error retriving favorites database.", 
		function(data) {
	
			favoriteObj = null;
			if( data != "0 results" ) favoriteObj = jQuery.parseJSON( data );
			writeFavorites();
		
		});
	
	
	} //end of function
//***********************************************//

function getFavorites( containerPrefix, foodTable) {
	
	ajaxPost( "php/favorite.php", "No Message", "Error retriving favorites database.", 
		function(data) {
	
	favoriteObj = null;
	if( data != "0 results" ) favoriteObj = jQuery.parseJSON( data );
	writeFavorites();
	
		});
	
	} //end of function 

//***********************************************//
//function changes favorite indicator empty blue 
//star (default).  To gold star if the food item
//is already a favorite. 
//***********************************************//
function writeFavorites() {
	
	$(".favoriteIcon").attr("src", "img/notFavorite.png");
	
	if( favoriteObj != null ) {
	
	for( var i =0; i<favoriteObj.length; i++ ) {
		
		$( "#favuser"+favoriteObj[i].id ).attr("src", "img/favorite.png");
		$( "#favusda"+favoriteObj[i].id ).attr("src", "img/favorite.png");

		} //end of for loop
		
		} //end of if statement
	
	} //end of function