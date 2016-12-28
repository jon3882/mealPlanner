<?php

//**************************************************************************************//
//PHP that is accessed through AJAX requests.  PHP file provides the function of creating
//a pdf file of the user's meal plan.  Variables are passed post array.  Two variables are
//passed to the PHP file.  The first variable is the HTML used to create the PDF 
//Dompdf library is used to create the pdf from HTML.  The second variable is an image of
//the meal plan that is coded in base64.  The base64 code is used to create an image that
//is referenced in the HTML that is used to create the PDF.  The image is blown up four 
//times the original size and then shunk back down to improve resolution for printing.
//**************************************************************************************//

include('../pdf/Dompdf/autoload.inc.php');
use Dompdf\Dompdf;

if( isset($_POST["pdfHTML"]) ) $html = $_POST["pdfHTML"];
if( isset($_POST["planImage"]) ) $data = $_POST["planImage"];

$data = explode(";", $data);
$data = $data[1];
$data = explode(",", $data);
$data = base64_decode($data[1]);

file_put_contents("../pdf/image.png", $data);


list($width, $height) = getimagesize("../pdf/image.png");

$width = $width*.25;
$height = ($height*.25);

$dompdf = new Dompdf();
$dompdf->load_html( utf8_decode($html) );

$paper_orientation = 'landscape';
$customPaper = array(0,0,$height,$width);
$dompdf->set_paper($customPaper,$paper_orientation);
$dompdf->render();

$output = $dompdf->output();
file_put_contents("../pdf/plan.pdf", $output);

?>