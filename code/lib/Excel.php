<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
// Incluimos el archivo fpdf
require_once BASEPATH."/lib/PHPExcel.php";
 
//Extendemos la clase Pdf de la clase fpdf para que herede todas sus variables y funciones
class Excel extends PHPExcel {
	public function loadImage($sheet, $page, $x=null, $y=null, $h=0, $c="A1", $data)
	{
		if(!defined('KYCAP') && $this->input->post('kycap')){define('KYCAP',$this->input->post('kycap'));}
		elseif(!defined('KYCAP') &&  $this->input->get('kycap')){define('KYCAP',$this->input->get('kycap'));}
		if( defined('KYCAP') && !isset($GLOBALS['mainEmp']) ){$this->load->model('erp/empresa');$GLOBALS['mainEmp']=$this->empresa->getByCommunity(KYCAP);$GLOBALS['mainEmp']=$GLOBALS['mainEmp'];}
		if(isset($GLOBALS['mainEmp']) && isset($GLOBALS['mainEmp']->nomb)){$mainEmp=strtolower($GLOBALS['mainEmp']->nomb);}else{$mainEmp="";}
		
		$arrPage=explode('/', $page);
		$app=((isset($data['app']) && !empty($data['app']))?$data['app']:((count($arrPage)==2)?$arrPage[0]:""));
		$archivo=((count($arrPage)==1)?$arrPage[0]:$arrPage[1]);
			
		$dataPage['app']=$app;
		$dataPage['modulo']= "images";
		$dataPage['mainEmp']=$mainEmp;
		$dataPage['archivo']=$archivo;
		
		$dataPage = Util::getInst()->getPath($dataPage);
		
		$objDrawing = new PHPExcel_Worksheet_Drawing();
		$objDrawing->setName('Imagen');
		$objDrawing->setDescription('Descripcion Imagen');

// 		$folder="sinfolder";
// 		if(isset($emp) && isset($emp->empNomb)){$folder=strtolower($emp->empNomb);}
// 		$filePath="images/".$folder."/".$file;
// 		if ( ! file_exists($filePath))
// 		{
// 			$filePath="images/".$file;
// 			if ( ! file_exists($filePath))
// 			{
// 				$filePath="images/erp/pregunta.png";
// 			}
// 		}
		
// 		$logo = 'images/logo.jpg'; // Provide path to your logo file
		$objDrawing->setPath($dataPage['path']);
		$objDrawing->setOffsetX($x);    // setOffsetX works properly
		$objDrawing->setOffsetY($y);  //setOffsetY has no effect
		$objDrawing->setCoordinates($c);
// 		$objDrawing->setWidth($w); // logo height
	 	$objDrawing->setHeight($h); // logo height
		$objDrawing->setWorksheet($sheet);
	}
}
?>