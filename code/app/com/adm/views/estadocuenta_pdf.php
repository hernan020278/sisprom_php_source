<?php
require_once BASEPATH."/lib/Pdf.php";
setlocale(LC_ALL,'es_ES');

class estadocuenta_pdf extends Controlador
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
			/** *************************
			 * Configuracion de pagina  *
			 ** *************************/
			if (ob_get_contents()) ob_end_clean();
			$this->pdf = new Pdf("P","mm",Array($ancho, $alto));
			$this->pdf->AddFont('MS Reference Sans Serif','','MS Reference Sans Serif.php');
			$this->pdf->AddFont('MS Reference Sans SerifB','','MS Reference Sans SerifB.php');
			$this->pdf->AddFont('Bookman Old Style','','Bookman Old Style.php');
			$this->pdf->AddFont('Bookman Old StyleI','','Bookman Old StyleI.php');
			$this->pdf->SetAutoPageBreak(false);
			$this->pdf->AddPage();
			$this->pdf->AliasNbPages();

			/** *************************
			 * Encabezado de documento  *
			 ** *************************/
			$this->pdf->SetFillColor(255, 255, 255);
// 			$this->pdf->RoundedRect(3, 3, 154, 98, 3, '1234', 'DF');//BORDE PRINCIPAL
			$this->pdf->RoundedRect(3, 3, 130, 23, 3, '1234', 'DF');//BORDE ENCABEZADO
				
			$x=0;
			$y=5;

			$this->pdf->SetTextColor(73,73,73);
			$this->pdf->SetFont('Ms Reference Sans Serif', '', 11);
			$this->pdf->setXY($x+4,$y);$this->pdf->Multicell(30,5,'Nombre ','','L');
			
			$this->pdf->SetTextColor(0,0,0);
			$this->pdf->SetFont('Bookman Old StyleI', '', 11);
			$this->pdf->setXY($x+34,$y);$this->pdf->Multicell(85,5, $data['reporte'][0]['usu_nomb'],'','L');
			$this->pdf->Line($x+34,$y+5,$x+119,$y+5);
			
			$y+=7;
			
			$this->pdf->SetTextColor(73,73,73);
			$this->pdf->SetFont('Ms Reference Sans Serif', '', 11);
			$this->pdf->setXY($x+4,$y);$this->pdf->Multicell(30,5,'Direccion ','','L');
			
			$this->pdf->SetTextColor(0,0,0);
			$this->pdf->SetFont('Bookman Old StyleI', '', 11);
			$this->pdf->setXY($x+34,$y);$this->pdf->Multicell(90,5, $data['reporte'][0]['usu_dire'] ,'','L');
			$this->pdf->Line($x+34,$y+5,$x+119,$y+5);
					
			$y+=7;
			
			$this->pdf->SetTextColor(73,73,73);
			$this->pdf->SetFont('Ms Reference Sans Serif', '', 11);
			$this->pdf->setXY($x+4,$y);$this->pdf->Multicell(30,5,'Fecha Inicio ','','L');
			$this->pdf->setXY($x+65,$y);$this->pdf->Multicell(30,5,'Fecha Final ','','L');
			
			$this->pdf->SetTextColor(0,0,0);
			$this->pdf->SetFont('Bookman Old StyleI', '', 11);
			$this->pdf->setXY($x+34,$y);$this->pdf->Multicell(30,5, date('d-m-Y', strtotime($data['reporte'][0]['prp_fini'])) ,'','L');
			$this->pdf->Line($x+34,$y+5,$x+57,$y+5);
			$this->pdf->setXY($x+96,$y);$this->pdf->Multicell(30,5, date('d-m-Y', strtotime($data['reporte'][0]['prp_ffin'])) ,'','L');
			$this->pdf->Line($x+96,$y+5,$x+119,$y+5);
					
			$this->pdf->loadImage("erp/logo.jpg",$x+174,3,30,23,'','', $data);
				
			/** **************************
			 * RESUMEN GENERAL DASHBOARD *
			 ** **************************/
			$y+=9;
			$x=1;
			$this->pdf->SetFillColor(206, 242, 249);
			$this->pdf->SetTextColor(73,73,73);
			$this->pdf->SetFont('Ms Reference Sans Serif', '', 10);
			$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(25,6,'Anterior','1','C', true);
			$this->pdf->setXY($x+27,$y);$this->pdf->Multicell(25,6,'Ingresos','1','C', true);
			$this->pdf->setXY($x+52,$y);$this->pdf->Multicell(25,6,'Egresos','1','C', true);
			$this->pdf->setXY($x+77,$y);$this->pdf->Multicell(25,6,'Dias','1','C', true);
			$this->pdf->setXY($x+102,$y);$this->pdf->Multicell(25,6,'Int/A�o','1','C', true);
			$this->pdf->setXY($x+127,$y);$this->pdf->Multicell(25,6,'Int/Dia','1','C', true);
			$this->pdf->setXY($x+152,$y);$this->pdf->Multicell(25,6,'Imp-Int','1','C', true);
			$this->pdf->setXY($x+177,$y);$this->pdf->Multicell(25,6,'Total','1','C', true);
			
			$y+=6;
			$this->pdf->SetFillColor(255, 255, 255);
			$this->pdf->SetTextColor(0,0,0);
			$this->pdf->SetFont('Bookman Old Style', '', 8);
			$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(25,6,number_format($data['reporte'][0]['bal_ante'], 2),'1','C');
			$this->pdf->setXY($x+27,$y);$this->pdf->Multicell(25,6,number_format($data['reporte'][0]['bal_ingr'], 2),'1','C');
			$this->pdf->setXY($x+52,$y);$this->pdf->Multicell(25,6,number_format($data['reporte'][0]['bal_cost'], 2),'1','C');
			$this->pdf->setXY($x+77,$y);$this->pdf->Multicell(25,6,$data['reporte'][0]['prp_dias'],'1','C');
			$this->pdf->setXY($x+102,$y);$this->pdf->Multicell(25,6,$data['reporte'][0]['prp_iano'],'1','C');
			$this->pdf->setXY($x+127,$y);$this->pdf->Multicell(25,6,$data['reporte'][0]['prp_idia'],'1','C');
			$this->pdf->setXY($x+152,$y);$this->pdf->Multicell(25,6,$data['reporte'][0]['prp_inte'],'1','C');
			$this->pdf->setXY($x+177,$y);$this->pdf->Multicell(25,6,number_format(doubleval($data['reporte'][0]['bal_util']), 2),'1','C');

			/** *************************
			 * OPERACIONES DEUDA
			 ** *************************/
			if(isset($data['reporte'][0]['lista']['INGRESO']))
			{
				if($this->pdf->GetY()>=($alto-9))
				{
					$this->pdf->AddPage();
					$y=3;
				}
				else
				{
					$y+=9;
				}
				$x=1;

				$this->pdf->SetFillColor(206, 242, 249);
				$this->pdf->SetTextColor(73,73,73);
				$this->pdf->SetFont('Ms Reference Sans Serif', '', 10);
				$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(203,6,'Lista de Ingresos','1','C', true);
				$y+=6;
				$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(18,6,'Fecha','1','C', true);
				$this->pdf->setXY($x+20,$y);$this->pdf->Multicell(20,6,'Origen','1','C', true);
				$this->pdf->setXY($x+40,$y);$this->pdf->Multicell(20,6,'Destino','1','C', true);
				$this->pdf->setXY($x+60,$y);$this->pdf->Multicell(20,6,'Operacion','1','C', true);
				$this->pdf->setXY($x+80,$y);$this->pdf->Multicell(105,6,'Descripcion','1','C', true);
				$this->pdf->setXY($x+185,$y);$this->pdf->Multicell(20,6,'Importe','1','C', true);

				$totalIngreso = 0;
				foreach ($data['reporte'][0]['lista']['INGRESO'] as $key=>$val)
				{
					$y+=6;
					$this->pdf->SetFillColor(255, 255, 255);
					$this->pdf->SetTextColor(51, 204, 51);
					$this->pdf->SetFont('Bookman Old Style', '', 7);
					$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(18,6,date('d/m/Y',strtotime($val['ope_freg'])),'1','C');
					$this->pdf->setXY($x+20,$y);$this->pdf->Multicell(20,6,$val['usu_nomb'],'1','C');
					$this->pdf->setXY($x+40,$y);$this->pdf->Multicell(20,6,$val['erf_nomb'],'1','C');
					$this->pdf->setXY($x+60,$y);$this->pdf->Multicell(20,6,$val['ope_tope'],'1','C');
					$this->pdf->setXY($x+80,$y);$this->pdf->Multicell(105,6,$val['ope_pobs'],'1','L');
					$this->pdf->setXY($x+185,$y);$this->pdf->Multicell(20,6,number_format($val['ope_oimp'], 2),'1','R');
					
					$totalIngreso += $val['ope_oimp'];
					
					if($this->pdf->GetY()>=($alto-9))
					{
						$this->pdf->AddPage();
						$y=3;
						$x=1;
						$this->pdf->SetFillColor(206, 242, 249);
						$this->pdf->SetTextColor(73,73,73);
						$this->pdf->SetFont('Ms Reference Sans Serif', '', 10);
						$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(203,6,'Lista de Ingresos','1','C', true);
						$y+=6;
						$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(18,6,'Fecha','1','C', true);
						$this->pdf->setXY($x+20,$y);$this->pdf->Multicell(20,6,'Origen','1','C', true);
						$this->pdf->setXY($x+40,$y);$this->pdf->Multicell(20,6,'Destino','1','C', true);
						$this->pdf->setXY($x+60,$y);$this->pdf->Multicell(20,6,'Operacion','1','C', true);
						$this->pdf->setXY($x+80,$y);$this->pdf->Multicell(105,6,'Descripcion','1','C', true);
						$this->pdf->setXY($x+185,$y);$this->pdf->Multicell(20,6,'Importe','1','C', true);
					}
				}//foreach ($data['reporte'][0]['lista'] as $key=>$val)
				$y+=6;
				$this->pdf->setXY($x+185,$y);$this->pdf->Multicell(20,6,number_format($totalIngreso, 2),'1','R', true);
			}//if(isset($data['reporte'][0]['lista']['INGRESO']))

			if(isset($data['reporte'][0]['lista']['EGRESO']))
			{
				if($this->pdf->GetY()>=($alto-9))
				{
					$this->pdf->AddPage();
					$y=3;
				}
				else
				{
					$y+=9;
				}
				$x=1;
								
				$this->pdf->SetFillColor(206, 242, 249);
				$this->pdf->SetTextColor(73,73,73);
				$this->pdf->SetFont('Ms Reference Sans Serif', '', 10);
				$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(203,6,'Lista de Egresos','1','C', true);
				$y+=6;
				$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(18,6,'Fecha','1','C', true);
				$this->pdf->setXY($x+20,$y);$this->pdf->Multicell(20,6,'Origen','1','C', true);
				$this->pdf->setXY($x+40,$y);$this->pdf->Multicell(20,6,'Destino','1','C', true);
				$this->pdf->setXY($x+60,$y);$this->pdf->Multicell(20,6,'Operacion','1','C', true);
				$this->pdf->setXY($x+80,$y);$this->pdf->Multicell(105,6,'Descripcion','1','C', true);
				$this->pdf->setXY($x+185,$y);$this->pdf->Multicell(20,6,'Importe','1','C', true);

				$totalEgreso = 0;
				
				foreach ($data['reporte'][0]['lista']['EGRESO'] as $key=>$val)
				{
					$y+=6;
					$this->pdf->SetFillColor(255, 255, 255);
					$this->pdf->SetTextColor(255, 0, 0);
					$this->pdf->SetFont('Bookman Old Style', '', 7);
					$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(18,6,date('d/m/Y',strtotime($val['ope_freg'])),'1','C');
					$this->pdf->setXY($x+20,$y);$this->pdf->Multicell(20,6,$val['usu_nomb'],'1','C');
					$this->pdf->setXY($x+40,$y);$this->pdf->Multicell(20,6,$val['erf_nomb'],'1','C');
					$this->pdf->setXY($x+60,$y);$this->pdf->Multicell(20,6,$val['ope_tope'],'1','C');
					$this->pdf->setXY($x+80,$y);$this->pdf->Multicell(105,6,$val['ope_pobs'],'1','L');
					$this->pdf->setXY($x+185,$y);$this->pdf->Multicell(20,6,number_format($val['ope_oimp']*-1, 2),'1','R');
					
					$totalEgreso += $val['ope_oimp'];
					
					if($this->pdf->GetY()>=($alto-9))
					{
						$this->pdf->AddPage();
						$y=3;
						$x=1;
						$this->pdf->SetFillColor(206, 242, 249);
						$this->pdf->SetTextColor(73,73,73);
						$this->pdf->SetFont('Ms Reference Sans Serif', '', 10);
						$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(204,6,'Lista de Egresos','1','C', true);
						$y+=6;
						$this->pdf->setXY($x+2,$y);$this->pdf->Multicell(18,6,'Fecha','1','C', true);
						$this->pdf->setXY($x+20,$y);$this->pdf->Multicell(20,6,'Origen','1','C', true);
						$this->pdf->setXY($x+40,$y);$this->pdf->Multicell(20,6,'Destino','1','C', true);
						$this->pdf->setXY($x+60,$y);$this->pdf->Multicell(20,6,'Operacion','1','C', true);
						$this->pdf->setXY($x+80,$y);$this->pdf->Multicell(105,6,'Descripcion','1','C', true);
						$this->pdf->setXY($x+185,$y);$this->pdf->Multicell(20,6,'Importe','1','C', true);
					}
				}//foreach ($data['reporte'][0]['lista'] as $key=>$val)
				$y+=6;
				$this->pdf->setXY($x+185,$y);$this->pdf->Multicell(20,6,number_format($totalEgreso, 2),'1','R', true);
			}//if(isset($data['reporte'][0]['lista']['INGRESO']))				
			
			/** *************************
			 * Pie de documento         *
			 ** *************************/
// 			$y+=8;
// 			$data['tra_firm'] = ((!$data['tra_firm']=="")?$data['tra_firm']:"app/com/erp/images/administrador.png");
// 			$data['emi_firm'] = ((!$data['emi_firm']=="")?$data['emi_firm']:"app/com/erp/images/".(($data['ope_otip']=="EGRESO")?"emisor":"receptor").".png");
// 			$data['rec_firm'] = ((!$data['rec_firm']=="")?$data['rec_firm']:"app/com/erp/images/".(($data['ope_otip']=="EGRESO")?"receptor":"emisor").".png");
// 			$this->pdf->Image($data['tra_firm'],$x+10,$y,31,16);
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
// 			$y+=10;
// 			$this->pdf->Line($x+10,$y+6,$x+41,$y+6);
// 			$this->pdf->Line($x+70,$y+6,$x+101,$y+6);
// 			$this->pdf->Line($x+118,$y+6,$x+149,$y+6);
			
// 			$y+=6;
// 			$this->pdf->SetFont('MS Reference Sans Serif', '', 8);
// 			$this->pdf->setXY($x+10,$y);$this->pdf->Multicell(31,5,'Administrador','','C');
// 			$this->pdf->SetFont('MS Reference Sans Serif', '', 8);
// 			$this->pdf->setXY($x+70,$y);$this->pdf->Multicell(31,5,'Emite','','C');
// 			$this->pdf->SetFont('MS Reference Sans Serif', '', 8);
// 			$this->pdf->setXY($x+118,$y);$this->pdf->Multicell(31,5,'Recibe','','C');

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