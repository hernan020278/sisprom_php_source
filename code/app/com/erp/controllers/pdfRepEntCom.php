<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class pdfRepEntCom extends Controlador {
	function __construct() {
		parent::__construct();
		$this->load->library('fpdf');
		$this->load->model('erp/documento');
	}
	public function index(){
		$this->fpdf->Open();
		$this->fpdf->AddPage('L','A4');
		$this->fpdf->SetFont('Arial','',6);

		$m=5;
		$x=0;
		$y=10;
		$w1=40;$w2=30;$w3=20;$w4=50;$w5=15;$w6=50;$w7=15;$w8=15;$w9=15;$w10=15;$w11=15;
		$this->fpdf->setXY(5,$y);$this->fpdf->MultiCell(287,5,'Periodo del '.$this->input->get('fini').' al '.$this->input->get('ffin'),'1','C');
		
		$x=0;
		$y=15;
		$x1=$m+$x;
		$x2=$m+$x+$w1;
		$x3=$m+$x+$w1+$w2;
		$x4=$m+$x+$w1+$w2+$w3;
		$x5=$m+$x+$w1+$w2+$w3+$w4;
		$x6=$m+$x+$w1+$w2+$w3+$w4+$w5;
		$x7=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6;
		$x8=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7;
		$x9=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7+$w8;
		$x10=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7+$w8+$w9;
		$x11=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7+$w8+$w9+$w10;
		
		$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,'OPERACION','1','C');
		$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'DOCUMENTO','1','C');
		$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'NUMERO','1','C');
		$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'CLIENTE/PROVEEDOR','1','C');
		$this->fpdf->setXY($x5,$y);$this->fpdf->MultiCell($w5,5,'FEC-REG','1','C');
		$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,'ARTICULO','1','C');
		$this->fpdf->setXY($x7,$y);$this->fpdf->MultiCell($w7,5,'CANT','1','C');
		$this->fpdf->setXY($x8,$y);$this->fpdf->MultiCell($w8,5,'CCOT','1','C');
		$this->fpdf->setXY($x9,$y);$this->fpdf->MultiCell($w9,5,'CPED','1','C');
		$this->fpdf->setXY($x10,$y);$this->fpdf->MultiCell($w10,5,'CENT','1','C');
		$this->fpdf->setXY($x11,$y);$this->fpdf->MultiCell($w11,5,'CFACT','1','C');
		
		$id_sucu = $this->input->get('id_sucu');
		$id_enti = $this->input->get('id_enti');
			
		$tpag = $this->input->get('tpag');
		$fpag = $this->input->get('fpag');
		
		$fini = date('Y-m-d',strtotime($this->input->get('fini')));
		$ffin = date('Y-m-d',strtotime($this->input->get('ffin')));
		
		/*
		 * LISTA DE INGRESOS
		 */
		$x=0;
		$y=20;
		$oper='INGRESO';
		$tipOpe = $this->util->tipOpe;
		$tipDoc = $this->util->tipDoc;
		$respNiv1=$this->documento->listaMix( $id_sucu, $id_enti, '', '0001', $fini, $ffin);
		if($respNiv1!=false){
			foreach($respNiv1 as $fil1){
				$x1=$m+$x;
				$x2=$m+$x+$w1;
				$x3=$m+$x+$w1+$w2;
				$x4=$m+$x+$w1+$w2+$w3;
				$x5=$m+$x+$w1+$w2+$w3+$w4;
				$x6=$m+$x+$w1+$w2+$w3+$w4+$w5;
				$x7=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6;
				$x8=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7;
				$x9=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7+$w8;
				$x10=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7+$w8+$w9;
				$x11=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7+$w8+$w9+$w10;
				$x12=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7+$w8+$w9+$w10+$w11;
				
				$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,$tipOpe[$fil1->tope],'1','L');
				$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,$tipDoc[$fil1->tdoc],'1','R');
				$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,$fil1->ndoc,'1','R');
				$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,$fil1->enom,'1','R');
				$this->fpdf->setXY($x5,$y);$this->fpdf->MultiCell($w5,5,$fil1->freg,'1','R');
				$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,$fil1->dscr,'1','R');
				$this->fpdf->setXY($x7,$y);$this->fpdf->MultiCell($w7,5,number_format($fil1->cant,2),'1','R');
				$this->fpdf->setXY($x8,$y);$this->fpdf->MultiCell($w8,5,number_format($fil1->ccot,2),'1','R');
				$this->fpdf->setXY($x9,$y);$this->fpdf->MultiCell($w9,5,number_format($fil1->cped,2),'1','R');
				$this->fpdf->setXY($x10,$y);$this->fpdf->MultiCell($w10,5,number_format($fil1->cent,2),'1','R');
				$this->fpdf->setXY($x11,$y);$this->fpdf->MultiCell($w11,5,number_format($fil1->cfac,2),'1','R');
							
				$y+=5;
				if($this->fpdf->getY()>=275){$this->fpdf->AddPage();$this->fpdf->columnHeader($data);}
				$respNiv2=$this->documento->listaMix($id_sucu, $id_enti, $fil1->id_docu, '0007', $fini, $ffin);
				if($respNiv2!=false){
					foreach($respNiv2 as $fil2){
						$x1=$m+$x;
						$x2=$m+$x+$w1;
						$x3=$m+$x+$w1+$w2;
						$x4=$m+$x+$w1+$w2+$w3;
						$x5=$m+$x+$w1+$w2+$w3+$w4;
						$x6=$m+$x+$w1+$w2+$w3+$w4+$w5;
						$x7=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6;
						$x8=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7;
						$x9=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7+$w8;
						$x10=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7+$w8+$w9;
						$x11=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7+$w8+$w9+$w10;
						$x12=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6+$w7+$w8+$w9+$w10+$w11;
						
						$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell(5,5,'','1','L');
						$this->fpdf->setXY($x1+5,$y);$this->fpdf->MultiCell($w1-5,5,$tipOpe[$fil2->tope],'1','L');
						$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,$tipDoc[$fil2->tdoc],'1','R');
						$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,$fil2->ndoc,'1','R');
						$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,$fil2->enom,'1','R');
						$this->fpdf->setXY($x5,$y);$this->fpdf->MultiCell($w5,5,$fil2->freg,'1','R');
						$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,$fil2->dscr,'1','R');
						$this->fpdf->setXY($x7,$y);$this->fpdf->MultiCell($w7,5,number_format($fil2->cant,2),'1','R');
						$this->fpdf->setXY($x8,$y);$this->fpdf->MultiCell($w8,5,number_format($fil2->ccot,2),'1','R');
						$this->fpdf->setXY($x9,$y);$this->fpdf->MultiCell($w9,5,number_format($fil2->cped,2),'1','R');
						$this->fpdf->setXY($x10,$y);$this->fpdf->MultiCell($w10,5,number_format($fil2->cent,2),'1','R');
						$this->fpdf->setXY($x11,$y);$this->fpdf->MultiCell($w11,5,number_format($fil2->cfac,2),'1','R');
						$y+=5;
						if($this->fpdf->getY()>=275){$this->fpdf->AddPage();$this->fpdf->columnHeader($data);}
					}//foreach($respNiv2 as $fil2){
				}//if($respNiv2!=false){
			}//foreach($respNiv1 as $fil1){			
		}//if(count($respNiv1)>0){
		$this->fpdf->Output();
	}
}
?>