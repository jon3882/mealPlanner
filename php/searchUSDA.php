<?php 

//**************************************************************************************//
//PHP that is accessed through AJAX requests.  PHP file provides the function of returning
//a json object of the USDA foods that match the text input by a user.
//**************************************************************************************//

include('../../../private/connectDB.php');
include('phpFunctionLoginProtect.php');

if( isset($_GET["text"]) ) $userText = $_GET["text"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//**************************************************************************************//
//Creates JSON object from the usdanutrientdb table and returns it to the requestor.
//**************************************************************************************//

//$sql = "SELECT * FROM usdanutrientdb WHERE MATCH foodDesc AGAINST( '".$userText."' ) ORDER BY foodDesc";

$userTextArray = explode( " ", $userText );
$threeLetterWordExists = false;

//Ensure the search text sent has a three character search term included.

for( $i=0;$i<sizeof($userTextArray);$i++) {
	if( strlen( $userTextArray[$i] ) > 2 ) {
		$threeLetterWordExists = true;
		}
	} //end of for loop
	
if( !$threeLetterWordExists ) $userText = "#############";
$userTextArray = explode( " ", $userText );


$sql = "";

for( $i=0;$i<sizeof($userTextArray);$i++) {
    
	if( $i == 0 ) {
		
		$firstSearchWord = substr( $userText, 0, strpos( $userText, " " ) );
		if ($firstSearchWord == "" ) $firstSearchWord = $userText;
		$sql = "SELECT * FROM usdanutrientdb WHERE foodDesc LIKE '%".$firstSearchWord."%'";
		
		} else {
		
		if( substr_count( $userText, " " ) > 0 && strlen( $userTextArray[$i] ) > 0 ) 
			$sql = "SELECT * FROM (".$sql.") AS sq".$i." WHERE foodDesc LIKE '%".$userTextArray[$i]."%'";
		
		} //end of if statement 
	} //end of foreach loop

//echo $sql;
//$sql = "SELECT * FROM usdanutrientdb WHERE foodDesc LIKE '%".$userText."%'";
$result = $conn->query( $sql ) or die ( mysqli_error($conn) );

if ($result->num_rows > 0) {
    // output data of each row
$str = "[";

    while($row = $result->fetch_assoc()) {
        if( $str == "[" ) $str = $str . json_encode( $row );
        else $str = $str . "," . json_encode( $row );
    }

$str = $str . "]";

print $str;

} else {
    echo "0 results";
}

mysqli_close( $conn );

?>