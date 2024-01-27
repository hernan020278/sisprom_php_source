<?php
//require_once BASEPATH."/lib/Pdf.php";
require_once(BASEPATH.'/lib/tcpdf/tcpdf.php');
setlocale(LC_ALL,'es_ES');

class recibo_pdf extends Controlador
{
	var $pdf;
	
	public function __construct() {parent::__construct();}

	public function index($data)
	{
		return $this->ejecutar($data);
	}

	public function ejecutar($data)
	{
		$result = null;		
		try
		{
			/** *************************
			 * Configuracion de pagina  *
			 ** *************************/
		    $this->pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
		    $this->pdf->SetCreator(PDF_CREATOR);
		    
		    $this->pdf->SetPrintHeader(false);
		    $this->pdf->SetPrintFooter(false);
		    
		    $this->pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
		    $this->pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
		    $this->pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
		    $this->pdf->setJPEGQuality(75);
		    
		    $this->pdf->AddPage();
		    
		    /*	    
			if (ob_get_contents()) ob_end_clean();
			$this->pdf = new Pdf("L","mm",Array(160, 105));
			$this->pdf->AddFont('MS Reference Sans Serif','','MS Reference Sans Serif.php');
			$this->pdf->AddFont('MS Reference Sans SerifB','','MS Reference Sans SerifB.php');
			$this->pdf->AddFont('Bookman Old Style','','Bookman Old Style.php');
			$this->pdf->AddFont('Bookman Old StyleI','','Bookman Old StyleI.php');
			$this->pdf->SetAutoPageBreak(false);
			$this->pdf->AddPage();
			$this->pdf->AliasNbPages();
            */
		    
			/** *************************
			 * Encabezado de documento  *
			 ** *************************/
			$this->pdf->SetFillColor(255, 255, 255);
			$this->pdf->RoundedRect(4, 4, 152, 97, 3, '1234', 'DF');
			$this->pdf->RoundedRect(77, 8, 75, 22, 3, '1234', 'DF');
			$this->pdf->RoundedRect(8, 69, 144, 9, 3, '1234', 'DF');
				
			$x=0;
			$y=3;
			$y+=8;
			//$this->pdf->loadImage("erp/logo.jpg",$x+10,6,32,26,'','', $data);
			$this->pdf->Image("erp/logo.jpg", $x+10, 6, 32, 26, 'JPG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 1, false, false, false);
			
			//$this->pdf->SetFont('Ms Reference Sans Serif', '', 20);
			$this->pdf->setXY($x+77,$y);$this->pdf->Multicell(75,8,$this->util->tipDoc[$data['ope_tdoc']],'','C');
			
			$y+=8;
			//$this->pdf->SetFont('Ms Reference Sans Serif', '', 16);
			$this->pdf->setXY($x+77,$y);$this->pdf->Multicell(75,8,$data['ope_ndoc'],'','C');
			
			$y+=6;
			
			/** *************************
			 * Cuerpo del Recibo        *
			 ** *************************/
			
			$y+=9;
			
			if($data['ope_tope']=="TRANSFERENCIA" || $data['ope_tope']=="COSTO" || $data['ope_tope']=="GASTO")
			{
				$this->pdf->SetTextColor(73,73,73);
				$this->pdf->SetFont('Ms Reference Sans Serif', '', 12);
				$this->pdf->setXY($x+10,$y);$this->pdf->Multicell(90,5,'Emitido por','','L');
			
				$this->pdf->SetTextColor(0,0,0);
				$this->pdf->SetFont('Bookman Old StyleI', '', 11);
				$this->pdf->setXY($x+38,$y);$this->pdf->Multicell(90,5,( ( $data['ope_otip']=="EGRESO") ? ( $data['emi_nomb']." ".$data['emi_apel']." ".$data['emi_ape2'] ) : ( $data['rec_nomb']." ".$data['rec_apel']." ".$data['rec_ape2'] ) ) ,'','L');
			}
			if($data['ope_tope']=="COBRO")
			{
				$this->pdf->SetTextColor(73,73,73);
				$this->pdf->SetFont('Ms Reference Sans Serif', '', 12);
				$this->pdf->setXY($x+10,$y);$this->pdf->Multicell(90,5,'Recibido por','','L');
			
				$this->pdf->SetTextColor(0,0,0);
				$this->pdf->SetFont('Bookman Old StyleI', '', 11);
				$this->pdf->setXY($x+38,$y);$this->pdf->Multicell(90,5, $data['emi_nomb']." ".$data['emi_apel']." ".$data['emi_ape2'] ,'','L');
			}
			
			$this->pdf->Line($x+38,$y+6,$x+151,$y+6);
			
			$y+=9;
			$this->pdf->SetTextColor(73,73,73);
			$this->pdf->SetFont('Ms Reference Sans Serif', '', 12);
			$this->pdf->setXY($x+10,$y);$this->pdf->Multicell(90,5,'La Cantidad de S/.','0','L');
			
			$this->pdf->SetTextColor(0,0,0);
			$this->pdf->SetFont('Bookman Old StyleI', '', 11);
			$this->pdf->setXY($x+53,$y);$this->pdf->Multicell(26,5,number_format($data['ope_oimp'],2),'0','L');
			$this->pdf->Line($x+53,$y+6,$x+81,$y+6);
			
			$this->pdf->SetTextColor(73,73,73);
			$this->pdf->SetFont('Ms Reference Sans Serif', '', 12);
			$this->pdf->setXY($x+82,$y);$this->pdf->Multicell(24,5,'Operacion','','L');
			
			$this->pdf->SetTextColor(0,0,0);
			$this->pdf->SetFont('Bookman Old StyleI', '', 11);
			$this->pdf->setXY($x+107,$y);$this->pdf->Multicell(46,5,$this->util->tipOpe[$data['ope_tope']],'','L');
			$this->pdf->Line($x+107,$y+6,$x+152,$y+6);
			
			$y+=9;
			
			if($data['ope_tope']=="TRANSFERENCIA")
			{
				$this->pdf->SetTextColor(73,73,73);
				$this->pdf->SetFont('Ms Reference Sans Serif', '', 12);
				$this->pdf->setXY($x+10,$y);$this->pdf->Multicell(90,5,'Recibido por','','L');
			
				$this->pdf->SetTextColor(0,0,0);
				$this->pdf->SetFont('Bookman Old StyleI', '', 11);
				$this->pdf->setXY($x+38,$y);$this->pdf->Multicell(90,5,( ( $data['ope_otip']=="EGRESO") ? ( $data['rec_nomb']." ".$data['rec_apel']." ".$data['rec_ape2'] ) : ( $data['emi_nomb']." ".$data['emi_apel']." ".$data['emi_ape2'] ) ),'','L');
				$this->pdf->Line($x+38,$y+6,$x+146,$y+6);
			}
			else{$this->pdf->setXY($x+10,$y);$this->pdf->Multicell(90,5,'','','L');}
			
			$y+=9;
			$this->pdf->SetTextColor(73,73,73);
			$this->pdf->SetFont('Ms Reference Sans Serif', '', 12);
			$this->pdf->setXY($x+10,$y);$this->pdf->Multicell(19,5,'Periodo','','L');
			
			$this->pdf->SetTextColor(0,0,0);
			$this->pdf->SetFont('Bookman Old StyleI', '', 10);
			$this->pdf->setXY($x+30,$y);$this->pdf->Multicell(38,5,$this->util->meses[intval(strftime("%m", strtotime($data['ope_peri'])))]." de ".strftime("%Y", strtotime($data['ope_peri'])),'','L');
			$this->pdf->Line($x+30,$y+6,$x+68,$y+6);
			
			$this->pdf->SetTextColor(73,73,73);
			$this->pdf->SetFont('Ms Reference Sans Serif', '', 12);
			$this->pdf->setXY($x+69,$y);$this->pdf->Multicell(40,5,'Fecha Emision','','L');
			
			$this->pdf->SetTextColor(0,0,0);
			$this->pdf->SetFont('Bookman Old StyleI', '', 10);
			$this->pdf->setXY($x+103,$y);$this->pdf->Multicell(46,5,strftime("%d", strtotime($data['ope_freg']))." de ".$this->util->meses[intval(strftime("%m", strtotime($data['ope_freg'])))]." de ".strftime("%Y", strtotime($data['ope_freg'])),'','L');
			$this->pdf->Line($x+103,$y+6,$x+149,$y+6);
			
			$y+=10;
			$this->pdf->SetTextColor(0,0,0);
			$this->pdf->SetFont('Bookman Old StyleI', '', 11);
			$this->pdf->setXY($x+10,$y);$this->pdf->Multicell(140,5,$data['ope_pobs'],'','L');
			
			/** *************************
			 * Firmas de documento      *
			** *************************/
			$y+=8;
			$data['tra_firm'] = ((!$data['tra_firm']=="")?$data['tra_firm']:"app/com/erp/images/administrador.png");
			$data['emi_firm'] = ((!$data['emi_firm']=="")?$data['emi_firm']:"app/com/erp/images/".(($data['ope_otip']=="EGRESO")?"emisor":"receptor").".png");
			$data['rec_firm'] = ((!$data['rec_firm']=="")?$data['rec_firm']:"app/com/erp/images/".(($data['ope_otip']=="EGRESO")?"receptor":"emisor").".png");
			$this->pdf->Image($data['tra_firm'],$x+10,$y,31,16);
// 			if($data['ope_otip']=="EGRESO")
// 			{
// 				if($data['ope_esta']=="0001"){$this->pdf->Image($data['emi_firm'], $x+70,$y,31,16);}
// 				if($data['orf_esta']=="0001"){$this->pdf->Image($data['rec_firm'], $x+118,$y,31,16);}
// 			}
// 			if($data['ope_otip']=="INGRESO")
// 			{
// 				if($data['ope_esta']=="0001"){$this->pdf->Image($data['emi_firm'], $x+118,$y,31,16);}
// 				if($data['orf_esta']=="0001"){$this->pdf->Image($data['rec_firm'], $x+70,$y,31,16);}
// 			}
			$y+=10;
			$this->pdf->Line($x+10,$y+6,$x+41,$y+6);
			$this->pdf->Line($x+70,$y+6,$x+101,$y+6);
			$this->pdf->Line($x+118,$y+6,$x+149,$y+6);
			
			$y+=6;
			$this->pdf->SetFont('MS Reference Sans Serif', '', 8);
			$this->pdf->setXY($x+10,$y);$this->pdf->Multicell(31,5,'Administrador','','C');
			$this->pdf->SetFont('MS Reference Sans Serif', '', 8);
			$this->pdf->setXY($x+70,$y);$this->pdf->Multicell(31,5,'Emite','','C');
			$this->pdf->SetFont('MS Reference Sans Serif', '', 8);
			$this->pdf->setXY($x+118,$y);$this->pdf->Multicell(31,5,'Recibe','','C');

			/** *************************
			 * Generar archivo PDF      *
			 ** *************************/
			if($this->util->get($data,"comandoPdf")=="IMPRIMIR"){$this->pdf->Output($data['nombPdfFile'], 'I');}
			if($this->util->get($data,"comandoPdf")=="GENERAR"){$this->pdf->Output($data['nombPdfFile'], 'F');}
			setlocale(LC_ALL,'US');
				
			$result = $data;
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>