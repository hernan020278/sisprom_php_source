<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class pdfStockAlmacen extends Controlador {
	function __construct() {
		parent::__construct();
		$this->load->library('fpdf');
		$this->load->model('erp/kardex');
	}
	public function index(){
		$this->fpdf->Open();
		$this->fpdf->AddPage('P','A4');
		$this->fpdf->SetFont('Arial','',16);
		
		$id_loc=$this->input->get('id_loc');
		$id_alm=$this->input->get('id_alm');

		$where=Array();
		if(isset($id_loc)&&$id_loc!='0'&&$id_loc!=''){
			$where['loc.id_local'] = $id_loc;
			if(isset($id_alm)&&$id_alm!='0'&&$id_alm!=''){
				$where['alm.id_almacen'] = $id_alm;
			}
		}

// 		echo var_dump($where);
// 		die();
		
		$pag=1;
		$m=5;
		$x=0;
		$y=10;
		$w1=20;$w2=12;$w3=35;$w4=35;$w5=35;$w6=10;
		$this->fpdf->SetFont('Arial','',6);
		$this->fpdf->setXY(5,5);$this->fpdf->MultiCell(30,5,'Pagina : '.$pag,'0','C');
		$this->fpdf->SetFont('Arial','',16);
		$this->fpdf->setXY(5,$y);$this->fpdf->MultiCell(200,5,'Lista de Stock de Productos ','0','C');
		
		$this->fpdf->SetFont('Arial','',6);
		
		$y=20;
		$x1=$m+$x;
		$x2=$m+$x+$w1;
		$x3=$m+$x+$w1+$w2;
		$x4=$m+$x+$w1+$w2+$w3;
		$x5=$m+$x+$w1+$w2+$w3+$w4;
		$x6=$m+$x+$w1+$w2+$w3+$w4+$w5;
		
		$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,'Codigo','1','C');
		$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'Unidad','1','C');
		$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3+$w4+$w5,5,'Producto','1','C');
// 		$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'Local','1','C');
// 		$this->fpdf->setXY($x5,$y);$this->fpdf->MultiCell($w5,5,'Almacen','1','C');
		$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,'Stock','1','C');
		/*
		 * LISTA DE INGRESOS
		 */
		$get=$this->input->get();
		$filter=Array(
			'cat.id_cat'=>$this->input->get('id_cat'),
			'tip.id_tip'=>$this->input->get('id_tip'),
			'ent.id_ent'=>$this->input->get('id_ent'),
			'ope.oper'=>$this->input->get('oper')
		);
		$perini=date('Y-m-d',strtotime($this->input->get('perini')));
		$perfin=date('Y-m-d',strtotime($this->input->get('perfin')));
		
		$x=0;
		$y+=5;
		$respNiv1=$this->kardex->listaMix("",$where);
		$flag=true;
		if($respNiv1!=false){
			foreach($respNiv1 as $fil1){
				$x1=$m+$x;
				$x2=$m+$x+$w1;
				$x3=$m+$x+$w1+$w2;
				$x4=$m+$x+$w1+$w2+$w3;
				$x5=$m+$x+$w1+$w2+$w3+$w4;
				$x6=$m+$x+$w1+$w2+$w3+$w4+$w5;

				$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,$fil1->cod,'1','C');
				$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,$fil1->undNomb,'1','C');
				$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3+$w4+$w5,5,$fil1->prdNomb,'1','L');
// 				$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'','1','C');
// 				$this->fpdf->setXY($x5,$y);$this->fpdf->MultiCell($w5,5,'','1','L');
				$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,$fil1->stock,'1','L');
				$flag=false;

				$y+=7;
				$respNiv2=$this->kardex->listaMix($fil1->id_producto,$where);
				if($respNiv2!=false){
					foreach($respNiv2 as $fil2){
// 						$x1=$m+$x;
// 						$x2=$m+$x+$w1;
// 						$x3=$m+$x+$w1+$w2;
// 						$x4=$m+$x+$w1+$w2+$w3;
// 						$x5=$m+$x+$w1+$w2+$w3+$w4;
// 						$x6=$m+$x+$w1+$w2+$w3+$w4+$w5;
						$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,'','0','C');
						$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2+$w3,5,$fil2->locNomb,'0','L');
// 						$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,,'0','C');
						$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,$fil2->almNomb,'0','L');
						$this->fpdf->setXY($x5,$y);$this->fpdf->MultiCell($w5,5,$fil2->stock,'0','L');
						$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,'','0','L');
						if($y>=260){
							$this->fpdf->AddPage();$y=20;
							$pag+=1;
							$this->fpdf->setXY(5,$y);$this->fpdf->MultiCell(5,5,'Pagina : '.$pag,'0','C');
							$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,'Codigo','1','C');
							$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'Unidad','1','C');
							$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3+$w4+$w5,5,'Producto','1','C');
					// 		$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'Local','1','C');
					// 		$this->fpdf->setXY($x5,$y);$this->fpdf->MultiCell($w5,5,'Almacen','1','C');
							$this->fpdf->setXY($x6,$y);$this->fpdf->MultiCell($w6,5,'Stock','1','C');
						}
						else{$y+=5;}
					}//foreach($respNiv2 as $fil2){
				}//if($respNiv2!=false){
				$y+=2;				
			}//foreach($respNiv1 as $fil1){			
		}//if(count($respNiv1)>0){
		$this->fpdf->Output();
	}
}
?>