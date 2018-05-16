<?php

require '../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;

$file = "../userDownload/template.xlsx";
$inputFileType = "Xlsx";
$reader = IOFactory::createReader( $inputFileType );
//$reader->setLoadSheetsOnly($sheetname);
$spreadsheet = $reader->load( $file );

$sheet = $spreadsheet->getActiveSheet();
$sheet->setCellValue('A1', 'Hello World !');

$writer = new Xlsx($spreadsheet);
$writer->save('../userDownload/planner.xlsx');

?>