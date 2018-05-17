<?php

require '../vendor/autoload.php';

if( isset($_GET["mealLabels"]) ) $labels = $_GET["mealLabels"];
if( isset($_GET["data"]) ) $plannerData = json_decode( $_GET["data"] );
if( isset($_GET["totals"]) ) $totals = json_decode( $_GET["totals"] );

$labels = explode( ",", $labels);

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

$file = "../userDownload/template.xlsx";
$inputFileType = "Xlsx";
$reader = IOFactory::createReader( $inputFileType );
//$reader->setLoadSheetsOnly($sheetname);
$spreadsheet = $reader->load( $file );

$sheet = $spreadsheet->getActiveSheet();

$styleArrayMealTitle = [
    'font' => [
        'name' => 'arial',
		'size' => '9',
		'bold' => false,
    ],
	'borders' => [
        'top' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
			'color' => [
			'argb' => '00D9D9D9',
			],
        ],
		'bottom' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
			'color' => [
			'argb' => '00D9D9D9',
			],
        ],
		'left' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
			'color' => [
			'argb' => '00D9D9D9',
			],
        ],
		'right' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
			'color' => [
			'argb' => '00D9D9D9',
			],
        ],	
		],
    'alignment' => [
        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
		'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
    ],
    'fill' => [
        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
        'startColor' => [
            'argb' => '00FFFF00',
        ],      
    ],
];

$alteratingColors = explode( ",", "00FFFF00,0000FF00,00FF0000,0000FFFF" );

//create the number of rows needed for the meals
$sheet->insertNewRowBefore(3, count($labels));

$index = 3;
$colorIndex = 0;
foreach ($labels as $value) {
	
	$cell = 'B'.$index;
	$sheet->getStyle( $cell )->applyFromArray($styleArrayMealTitle);
	$sheet->getStyle( $cell )->getAlignment()->setWrapText(true);
		
	$sheet->setCellValue( $cell, $value );
	$index++;
	$colorIndex++;
	
	$newColorAssigned = $colorIndex%4;
	$styleArrayMealTitle[ 'fill' ]['startColor'][ 'argb' ] = $alteratingColors[ $newColorAssigned ];
	
	} //end of for loop
	
$cellData = makeSheetMealArray( $plannerData );

for( $i = 0; $i<count($cellData); $i++) {

	$cell = getCellAssignment( $i, count($labels) );
	$styleArrayMealTitle[ 'fill' ]['startColor'][ 'argb' ] = "00FFFFFF";
	$styleArrayMealTitle[ 'alignment' ]['horizontal'] = \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT;
	$sheet->getStyle( $cell )->applyFromArray($styleArrayMealTitle);
	$sheet->getStyle( $cell )->getAlignment()->setIndent(10);
	$sheet->getStyle( $cell )->getAlignment()->setWrapText(true);
	$sheet->setCellValue( $cell, $cellData[$i] );
	
	} //end of for loop

//$sheet->setCellValue('A1', 'Hello World !');

//print_r(  );
for($index = 0;$index<7; $index++) {
	
	$column = $index;
	if( $column == 0 ) $column = "C";
	if( $column == 1 ) $column = "D";
	if( $column == 2 ) $column = "E";
	if( $column == 3 ) $column = "F";
	if( $column == 4 ) $column = "G";
	if( $column == 5 ) $column = "H";
	if( $column == 6 ) $column = "I";
		
	$row = count($labels)+3;	
	$cell = $column.$row;
	
	//echo $cell."-".$value['cal'][$index];
	$styleArrayMealTitle[ 'alignment' ]['horizontal'] = \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER;
	$styleArrayMealTitle[ 'font' ]['bold'] = true;
	$sheet->getStyle( $cell )->applyFromArray($styleArrayMealTitle);
	$sheet->setCellValue( $cell, number_format(floatval($totals->cal[$index]), 1) );
	
	} //end of for loop


$writer = new Xlsx($spreadsheet);
$writer->save('../userDownload/planner.xlsx');

function getCellAssignment( $index, $rowNumber ) {

	$column = intval($index / $rowNumber);
	$row = ($index % $rowNumber) + 3;
	
	if( $column == 0 ) $column = "C";
	if( $column == 1 ) $column = "D";
	if( $column == 2 ) $column = "E";
	if( $column == 3 ) $column = "F";
	if( $column == 4 ) $column = "G";
	if( $column == 5 ) $column = "H";
	if( $column == 6 ) $column = "I";
	
	return $column.$row;

	} //end of function

function makeSheetMealArray( $data ) {
	
	$cellArray = [];
	
	for( $i = 0; $i<count($data); $i++ ) {
		
		if( $data[$i] == null ) {
			$cellArray[$i] = null;
			$meal = [];
			} else $meal = $data[$i];
				
				
		
		$mealInfo = "";
		
		for( $k = 0; $k<count($meal); $k++) {
			
			$serving = number_format(floatval($meal[$k]->servingSize)*floatval($meal[$k]->multiplier), 1).
				" ".$meal[$k]->measurement;
			
			if( $k == 0 ) $foodItem = $meal[$k]->foodDesc." (".$serving.")";
			else $foodItem = "\n".$meal[$k]->foodDesc." (".$serving.")";
			
			$mealInfo = $mealInfo.$foodItem;
		
			} //end of for loop
			
		if( count($meal) != 0 ) array_push($cellArray, $mealInfo);
		
		} //end of for loop
		
	return $cellArray;
	
	}//end of function
