<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class pdfOperResumen extends Controlador {
	function __construct() {
		parent::__construct();
		$this->load->library('fpdf');
		$this->load->model('erp/operacion');
	}
	public function index(){
		$this->fpdf->Open();
		$this->fpdf->AddPage('P','A4');
		$this->fpdf->SetFont('Arial','',6);

		$m=5;
		$x=0;
		$y=10;
		$w1=15;$w2=12;$w3=20;$w4=20;$w5=50;$w6=70;$w7=15;
		$this->fpdf->setXY(5,$y);$this->fpdf->MultiCell(200,5,'Periodo del '.$this->input->get('perini').' al '.$this->input->get('perfin'),'0','C');
		
		$y=30;
		$x1=$m+$x;
		$x2=$m+$x+$w1;
		$x3=$m+$x+$w1+$w2;
		$x4=$m+$x+$w1+$w2+$w3;
		$x5=$m+$x+$w1+$w2+$w3+$w4;
		$x6=$m+$x+$w1+$w2+$w3+$w4+$w5;
		$x7=$m+$x+$w1+$w2+$w3+$w4+$w5+$w6;
		
		$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,'Fecha','1','C');
		$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'Operacion','1','C');
		$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'Categoria','1','C');
		$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'Tipo','1','C');
		$this->fpdf->setXY($x5,$y);$this->fpdf->MultiCell($w5,5,'Entidad','1','C');
		$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,'Descripcion','1','C');
		$this->fpdf->setXY($x7,$y);$this->fpdf->MultiCell($w7,5,'Importe','1','C');
		/*
		 * LISTA DE INGRESOS
		 */
		$get=$this->input->get();
		$filter=Array(
			'cat.id_cate'=>$this->input->get('id_cate'),
			'tip.id_tipo'=>$this->input->get('id_tipo'),
			'ent.id_enti'=>$this->input->get('id_enti'),
			'ope.oper'=>$this->input->get('oper')
		);
		$perini=date('Y-m-d',strtotime($this->input->get('perini')));
		$perfin=date('Y-m-d',strtotime($this->input->get('perfin')));
		
		$x=0;
		$y+=5;
		$respNiv1=$this->operacion->listaOperacion($perini,$perfin,$filter);
		$flag=true;
		if($respNiv1!=false){
			foreach($respNiv1 as $fil1){
				if($flag==true){$this->fpdf->setXY(5,20);$this->fpdf->MultiCell(40,5,'Operacion : '.( ( $this->input->get('oper')=='' ) ? '' : $fil1->oper ),'1','L');}
				if($flag==true){$this->fpdf->setXY(45,20);$this->fpdf->MultiCell(40,5,'Categoria : '.( ( $this->input->get('id_cate')=='' ) ? '' : $fil1->catNomb ),'1','L');}
				if($flag==true){$this->fpdf->setXY(85,20);$this->fpdf->MultiCell(40,5,'Entidad : '.( ( $this->input->get('id_enti')=='' ) ? '' : $fil1->nombre ),'1','L');}
				if($flag==true){$this->fpdf->setXY(125,20);$this->fpdf->MultiCell(40,5,'Tipo : '.( ( $this->input->get('id_tipo')=='' ) ? '' : $fil1->tipNomb ),'1','L');}
				
				//$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;
				$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,$fil1->freg,'1','C');
				$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,$fil1->oper,'1','C');
				$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,$fil1->catNomb,'1','C');
				$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,$fil1->tipNomb,'1','C');
				$this->fpdf->setXY($x5,$y);$this->fpdf->MultiCell($w5,5,$fil1->nombre,'1','L');
				$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,$fil1->dscr,'1','L');
				$this->fpdf->setXY($x7,$y);$this->fpdf->MultiCell($w7,5,$fil1->impo,'1','R');
				$flag=false;
				$y+=5;
			}//foreach($respNiv1 as $fil1){			
		}//if(count($respNiv1)>0){
		$this->fpdf->Output();
	}
}
?>