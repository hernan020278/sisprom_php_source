<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class pdfListaVenta extends Controlador {
	function __construct() {
		parent::__construct();
		$this->load->library('fpdf');
		$this->load->model('erp/ventas');
	}
	public function index(){
		$this->fpdf->Open();
		$this->fpdf->AddPage('P','A4');
		$this->fpdf->SetFont('Arial','',16);
		
		$fini=date('Y-m-d',strtotime($this->input->get('fini')));
		$ffin=date('Y-m-d',strtotime($this->input->get('ffin')));
		

		$where=Array();
		if(isset($fini)&&$fini!=''){
			$where['date(ven.creacion_fecha)>='] = $fini;
			if(isset($ffin)&&$ffin!=''){
				$where['date(ven.creacion_fecha)<='] = $ffin;
			}
		}

// 		echo var_dump($where);
// 		die();

		$m=5;
		$x=0;
		$y=10;
		$w1=30;$w2=20;$w3=20;$w4=20;$w5=70;$w6=20;$w7=20;
		$this->fpdf->setXY(5,$y);$this->fpdf->MultiCell(200,5,'Lista de Ventas ','0','C');
		
		$this->fpdf->SetFont('Arial','',6);
		
		$y=20;
		$x1=$m+$x;
		$x2=$m+$x+$w1;
		$x3=$m+$x+$w1+$w2;
		$x4=$m+$x+$w1+$w2+$w3;
		$x5=$m+$x+$w1+$w2+$w3+$w4;
		$x6=$m+$x+$w1+$w2+$w3+$w4+$w5;
		$x7=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6;
		
		$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,'Local','1','L');
		$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'Numero','1','C');
		$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'Fecha','1','C');
		$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'Prov-Doc','1','C');
 		$this->fpdf->setXY($x5,$y);$this->fpdf->MultiCell($w5,5,'Cliente','1','L');
 		$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,'Importe','1','R');
 		$this->fpdf->setXY($x7,$y);$this->fpdf->MultiCell($w7,5,'Ganancia','1','R');

		/*
		 * LISTA DE INGRESOS
		 */
		$x=0;
		$y+=5;
		$respNiv1=$this->ventas->listaMix($where);
		$flag=true;
		$total=0.00;
		$gtotal=0.00;
		if($respNiv1!=false){
			foreach($respNiv1 as $fil1){
/*				$x1=$m+$x;
				$x2=$m+$x+$w1;
				$x3=$m+$x+$w1+$w2;
				$x4=$m+$x+$w1+$w2+$w3;
				$x5=$m+$x+$w1+$w2+$w3+$w4;
*/
				$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,$fil1->nomb,'1','L');
				$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,$fil1->cod,'1','L');
				$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,$fil1->creacion_fecha,'1','C');
				$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,$fil1->clie_doc,'1','C');
 				$this->fpdf->setXY($x5,$y);$this->fpdf->MultiCell($w5,5,$fil1->clie_nomb,'1','L');
 				$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,$fil1->total,'1','R');
 				$this->fpdf->setXY($x7,$y);$this->fpdf->MultiCell($w7,5,$fil1->gtotal,'1','R');
 				$total+=$fil1->total;	
 				$gtotal+=$fil1->gtotal;
 				$y+=5;
 				if($this->fpdf->getY()>=275){$this->fpdf->AddPage();$this->fpdf->columnHeader($data);}
			}//foreach($respNiv1 as $fil1){			
		}//if(count($respNiv1)>0){

		$y+=5;

		$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1+$w2+$w3+$w4+$w5,5,'Total de Venta ','1','L');
		$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,$total,'1','R');
		$this->fpdf->setXY($x7,$y);$this->fpdf->MultiCell($w7,5,$gtotal,'1','R');

		$this->fpdf->Output();
	}
}
?>