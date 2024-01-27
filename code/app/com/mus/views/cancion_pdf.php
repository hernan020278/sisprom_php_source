<?php
//require_once BASEPATH."/lib/Pdf.php";
require_once(BASEPATH.'/lib/tcpdf/tcpdf.php');
setlocale(LC_ALL,'es_ES');

class cancion_pdf extends Controlador
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
		$ancho = 210;
		$alto = 297;
		try
		{
		    $this->pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
		    $this->pdf->SetCreator(PDF_CREATOR);

		    $this->pdf->SetPrintHeader(false);
		    $this->pdf->SetPrintFooter(false);
		    
		    $this->pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
		    $this->pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
		    $this->pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
		    $this->pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
		    
		    $this->pdf->AddPage();
		    
		    /** *************************
		     * Encabezado de documento  *
		     ** *************************/
		    
		     $altoLinea = 5;
		     $anchoLinea = 206;
		     $tamanoLetra = 13;
		     $x=5;
		     $y=5;
		     
		    $this->pdf->setFontSubsetting(true);
		    $this->pdf->SetFont('Courier', '', $tamanoLetra+4, '', true);
		    $this->pdf->SetXY($x,$y-3);
		    $this->pdf->writeHTMLCell($anchoLinea, $altoLinea, '', '', $data['cnc_auto']." - ".$data['cnc_nomb'], 0, 1, 0, true, 'L', true);
		    
		    $this->pdf->Line($x+1,$y+$altoLinea+2,$x+$anchoLinea-6,$y+$altoLinea+2);
		     
           /************************
            * Cuerpo del documento *
            ************************/
                        
		    $y += 4;
            foreach ($data['listaLetra'] as $keyLtr => $valLtr){
                if ($this->pdf->GetY() >= ($alto - 9)){
                    $this->pdf->AddPage();
                    $y = $altoLinea;
                } else {
                    $y += $altoLinea;
                }
                $this->pdf->SetFont('Courier', '', $tamanoLetra, '', true);
                $this->pdf->SetTextColor(73, 73, 73);
                $this->pdf->SetXY($x, $y);
                
                $respHtml = "";
                $arrLtrDscr = explode(" ", $valLtr['ltr_dscr']);
                foreach($arrLtrDscr as $key=>$value)
                {
                    if(strpos($arrLtrDscr[$key], "á")>-1 || strpos($arrLtrDscr[$key], "é")>-1 || strpos($arrLtrDscr[$key], "í")>-1 || strpos($arrLtrDscr[$key], "ó")>-1 || strpos($arrLtrDscr[$key], "ú")>-1  || strpos($arrLtrDscr[$key], "ý")>-1 )
                    {
                        $respHtml.= '<span style="color:rgb(0, 144, 35);">'.$arrLtrDscr[$key].' </span>';
                    }
                    else if (ctype_upper($arrLtrDscr[$key]) || is_numeric($arrLtrDscr[$key]) )
                    {
                        $respHtml.= '<span style="color:rgb(13, 147, 6);">'.$arrLtrDscr[$key].' </span>';
                    }
                    else
                    {
                        $respHtml.= '<span style="color:black;">'.$arrLtrDscr[$key].' </span>';
                    }
                }
                
                $respHtml = substr($respHtml, 0, strlen($respHtml)-8)."</span>";
                if($valLtr['ltr_link'] != "")
                {
                    $respHtml = '<a style="text-decoration:none" href="'.$valLtr['ltr_link'].'" target="_blank">'.$respHtml.'&#187;</a>';
                }
                $this->pdf->writeHTMLCell($anchoLinea, 5, '', '', $respHtml, 0, 1, 0, true, '', true);
//              $this->pdf->Cell(205, 5, $valLtr['ltr_dscr'], '', 'L');

                if ($valLtr['ltr_tnta'] == 'S') {
                    if (count($valLtr['listaNota']) > 0) {
                        $y += $altoLinea;
                        foreach ($valLtr['listaNota'] as $keyNta => $valNta) {
                            $this->pdf->SetTextColor(255, 0, 0);
                            $this->pdf->SetFont('Courier', '', $tamanoLetra);
                            $this->pdf->SetXY(($x + 5 + $valNta['nta_ejex']) / 2.50, $y);
                            //$this->pdf->Multicell(21, 5, $valNta['acr_nomb'], '', 'L');
                            $this->pdf->writeHTMLCell(15, 5, '', '', $valNta['acr_nomb'], 0, 1, 0, true, '', true);
                        }
                    }
                }
            }
		    /**********************
		     * Pie de documento   *
		     **********************/

            /** *************************
             * Estructura de la cancion *
             ** *************************/
            $this->pdf->AddPage();
            
            $altoLinea = 9;
            $anchoLinea = 206;
            $tamanoLetra = 15;
            $x=5;
            $y=5;
            
            $this->pdf->setFontSubsetting(true);
            $this->pdf->SetFont('Courier', '', $tamanoLetra+4, '', true);
            $this->pdf->SetXY($x,$y-1);
            $this->pdf->writeHTMLCell($anchoLinea, $altoLinea, '', '', "Estructura integrantes", 0, 1, 0, true, 'L', true);
            
            $this->pdf->Line($x+1,$y+$altoLinea,$x+$anchoLinea-6,$y+$altoLinea);

            $y += $altoLinea + 2;
            $this->pdf->SetXY($x,$y);
            $this->pdf->writeHTMLCell($anchoLinea, $altoLinea, '', '', $data['cnc_urlb'], 0, 1, 0, true, 'L', true);
            $y += $altoLinea;
            $this->pdf->SetXY($x,$y);
            $this->pdf->writeHTMLCell($anchoLinea, $altoLinea, '', '', $data['cnc_urlc'], 0, 1, 0, true, 'L', true);
            $y += $altoLinea;
            $this->pdf->SetXY($x,$y);
            $this->pdf->writeHTMLCell($anchoLinea, $altoLinea, '', '', $data['cnc_urld'], 0, 1, 0, true, 'L', true);
            $y += $altoLinea;
            $this->pdf->SetXY($x,$y);
            $this->pdf->writeHTMLCell($anchoLinea, $altoLinea, '', '', $data['cnc_urle'], 0, 1, 0, true, 'L', true);
            $y += $altoLinea;
            $this->pdf->SetXY($x,$y);
            $this->pdf->writeHTMLCell($anchoLinea, $altoLinea, '', '', $data['cnc_urlf'], 0, 1, 0, true, 'L', true);
            $y += $altoLinea;
            $this->pdf->SetXY($x,$y);
            $this->pdf->writeHTMLCell($anchoLinea, $altoLinea, '', '', $data['cnc_urlg'], 0, 1, 0, true, 'L', true);
            
            
            /**************************************************************
		     * Generar archivo PDF                                        *
		     * IMPRIMIR.- Genera el archivo pdf en el viewer del navegador*
		     * GENERAR .- Genera un archivo en la ruta del servidor       *
		     **************************************************************/
            if($this->util->get($data,"comandoPdf")=="IMPRIMIR"){$this->pdf->Output($data['nombPdfFile'], 'I');}
            if($this->util->get($data,"comandoPdf")=="GENERAR"){$this->pdf->Output($data['nombPdfFile'], 'F');}
            
			$result = $data;
			
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>