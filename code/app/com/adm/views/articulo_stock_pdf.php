<?php
//require_once BASEPATH."/lib/Pdf.php";
require_once(BASEPATH.'/lib/tcpdf/tcpdf.php');
setlocale(LC_ALL,'es_ES');

class articulo_stock_pdf extends Controlador
{
	var $pdf;
	var $anchoPagina = 210;
	var $altoPagina = 297;
	var $anchoEtiqueta = 27;
	var $altoEtiqueta = 16;
	var $posX = 2;
	var $posY = 2;

	
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
		    
				//convert TTF font to TCPDF format and store it on the fonts folder
				$fontname = TCPDF_FONTS::addTTFfont('lib/tcpdf/fonts/cour.ttf', 'TrueTypeUnicode', '', 96);
				// use the font
				$this->pdf->SetFont($fontname, '', 14, '', false);

		  /*
			//----------------------------
			//SE CONFIGURA TIPOS DE LETRAS
			//----------------------------
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
			//$this->pdf->SetFillColor(255, 255, 255);
			//$this->pdf->RoundedRect(1, 1, 208, 295, 1, '1234', 'DF');
				
			$this->posX=2;
			$this->posY=2;

			// set a barcode on the page footer
			$this->pdf->setBarcode(date('Y-m-d H:i:s'));
			//$this->pdf->SetFont('courier new', '', 10);

			//define barcode style
			/*
			$style = array(
					'position' => 'bottom',
					'align' => 'C',
					'stretch' => true,
					'fitwidth' => true,
					'cellfitalign' => '',
					'border' => true,
					'hpadding' => '1',
					'vpadding' => '1',
					'fgcolor' => array(0,0,0),
					'bgcolor' => false, //array(255,255,255),
					'text' => true,
					'font' => 'helvetica',
					'fontsize' => 8,
					'stretchtext' => 4
			);
			$this->pdf->write1DBarcode('00001', 'EAN5', $this->posX+2, $this->posY, 10, 8, 0.4, $style, 'N');*/
			
			if (isset($data['lista']) && count($data['lista']['items']) > 0) 
			{
				for($idxArt=0; $idxArt < count($data['lista']['items']); $idxArt++)
				{
					$item = $data['lista']['items'][$idxArt];
					if ($data['comando'] == "IMPRIMIR_LISTA") 
					{
						$this->setCodigoBarra($idxArt + 1, $item['art_nomb'], str_pad($item['art_kyart'], 5, "0", STR_PAD_LEFT), $this->pdf);
					} 
					else if ($data['comando'] == "IMPRIMIR_STOCK") 
					{
						for($idx=0; $idx < $item['art_sact']; $idx++)
						{
							$this->setCodigoBarra($idx + 1, $item['art_nomb'], str_pad($item['art_kyart'], 5, "0", STR_PAD_LEFT), $this->pdf);
						}	
					}
				}	
			}

			/*
			$this->posY+=10;
			$this->pdf->SetFont('', '', 6);$this->pdf->setXY($this->posX+2,$this->posY);$this->pdf->Multicell(25,8,'RASTRILLO RECTO DE 16 DIENTES, MANGO DE MADERA',1,'C');
			$this->posY+=8;
			$this->pdf->SetFont('', '', 10);$this->pdf->setXY($this->posX+2,$this->posY);$this->pdf->Multicell(25,4,'00001',1,'C');
			*/
			//$this->pdf->SetFillColor(255, 255, 255);
			//$this->pdf->RoundedRect($this->posX+10, $this->posY, 10, 8, 1, '0000', 'DF');
			//$this->pdf->Line($this->posX+10,$this->posY+6,$this->posX+41,$this->posY+6);
			
			//$this->posY+=6;
			//$this->pdf->SetFont('MS Reference Sans Serif', '', 8);
			//$this->pdf->setXY($this->posX+10,$this->posY);$this->pdf->Multicell(31,5,'Administrador','','C');

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

	public function setCodigoBarra($numItem, $nombre, $codigo, $libTcpPdf) {

		$anchoItem = $this->anchoEtiqueta - 2 - 16;
		$anchoCodigo = $this->anchoEtiqueta - 2 - 9;

		$libTcpPdf->SetFont('', '', 6);
		$libTcpPdf->setXY($this->posX, $this->posY);
		$libTcpPdf->Multicell($this->anchoEtiqueta - 2,9, substr($nombre, 0, 53), 1, 'C');
		
		$libTcpPdf->SetFont('', '', 10);
		$libTcpPdf->setXY($this->posX, $this->posY + 9);
		$libTcpPdf->Multicell($anchoItem, 4, $numItem, 1, 'C');

		$libTcpPdf->SetFont('', '', 10);
		$libTcpPdf->setXY($this->posX + $anchoItem, $this->posY + 9);
		$libTcpPdf->Multicell($anchoCodigo, 4, $codigo, 1, 'C');
		/************************************************
		 * VERIFICAR CAMBIO DE COLUMNA Y FILA EN LA HOJA
		 * Y UBICAR NUEVA POSICION X, Y EN LA HOJA
		 ************************************************/
		$this->posX = $this->posX + $this->anchoEtiqueta;
		if($this->posX + $this->anchoEtiqueta > $this->anchoPagina) 
		{
			$this->posX = 2;
			$this->posY = $this->posY + $this->altoEtiqueta;
		}
		if($this->posY + $this->altoEtiqueta > $this->altoPagina) 
		{
			$this->pdf->AddPage();
			$this->posX = 2;
			$this->posY = 2;
		}

	}
}
?>