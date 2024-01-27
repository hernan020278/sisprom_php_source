<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class pdfOper extends Controlador {
	function __construct() {
		parent::__construct();
		$this->load->library('fpdf');
		$this->load->model('erp/operacion');
	}
	public function index(){
		$this->fpdf->Open();
		$this->fpdf->AddPage('L','A4');
		$this->fpdf->SetFont('Arial','',6);

		$m=5;
		$x=0;
		$y=10;
		$w1=49;$w2=15;$w3=15;$w4=15;
		$this->fpdf->setXY(5,$y);$this->fpdf->MultiCell(287,5,'Periodo del '.$this->input->get('perini').' al '.$this->input->get('perfin'),'1','C');
		
		$x=0;
		$y=15;
		$x1=$m+$x;
		$x2=$m+$x+$w1;
		$x3=$m+$x+$w1+$w2;
		$x4=$m+$x+$w1+$w2+$w3;
		$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,'Ingresos','1','C');
		$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'Tipo','1','C');
		$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'Entidad','1','C');
		$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'Categoria','1','C');
		
		$x=94+2;
		$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;$x4=$m+$w1+$w2+$w3+$x;
		$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,'Egresos','1','C');
		$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'Tipo','1','C');
		$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'Entidad','1','C');
		$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'Categoria','1','C');
				
		$x=191+2;
		$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;$x4=$m+$w1+$w2+$w3+$x;
		$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,'Costos','1','C');
		$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'Tipo','1','C');
		$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'Entidad','1','C');
		$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'Categoria','1','C');
		
		$perIni=date('Y-m-d',strtotime($this->input->get('perini')));
		$perFin=date('Y-m-d',strtotime($this->input->get('perfin')));
		
		/*
		 * LISTA DE INGRESOS
		 */
		$x=0;
		$y=20;
		$oper='INGRESO';
		$respNiv1=$this->operacion->listaMix($oper,'','',$perIni,$perFin);
		$dd = count($respNiv1);
		if($respNiv1!=false){
			foreach($respNiv1 as $fil1){
				$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;$x4=$m+$w1+$w2+$w3+$x;
				$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,$fil1->nomb,'1','L');
				$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'','1','R');
				$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'','1','R');
				$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,number_format($fil1->total,2),'1','R');
			
				$y+=5;
				$respNiv2=$this->operacion->listaMix($oper,$fil1->id_cate,'',$perIni,$perFin);
				if($respNiv2!=false){
					foreach($respNiv2 as $fil2){
						$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;$x4=$m+$w1+$w2+$w3+$x;
						$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell(5,5,'','1','L');
						$this->fpdf->setXY($x1+5,$y);$this->fpdf->MultiCell($w1-5,5,$fil2->nomb,'1','L');
						$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'','1','R');
						$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,number_format($fil2->total,2),'1','R');
						$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'','1','R');
							
						$y+=5;
						$respNiv3=$this->operacion->listaMix($oper,$fil2->id_cate,$fil2->id_enti,$perIni,$perFin);
						if($respNiv3!=false){
							foreach($respNiv3 as $fil3){
								$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;$x4=$m+$w1+$w2+$w3+$x;
								$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell(5,5,'','1','L');
								$this->fpdf->setXY($x1+5,$y);$this->fpdf->MultiCell(5,5,'','1','L');
								$this->fpdf->setXY($x1+10,$y);$this->fpdf->MultiCell($w1-10,5,$fil3->nomb,'1','L');
								$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,number_format($fil3->total,2),'1','R');
								$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'','1','R');
								$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'','1','R');
								$y+=5;
							}//foreach($respNiv3 as $fil3){
						}//if($respNiv3!=false){
					}//foreach($respNiv2 as $fil2){
				}//if($respNiv2!=false){
			}//foreach($respNiv1 as $fil1){			
		}//if(count($respNiv1)>0){
	    /*
		 * LISTA DE EGRESOS
		 */
		$x=94+2;
		$y=20;
		$oper='EGRESO';
		$respNiv1=$this->operacion->listaMix($oper,'','',$perIni,$perFin);
		$dd = count($respNiv1);
		if($respNiv1!=false){
			foreach($respNiv1 as $fil1){
				$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;$x4=$m+$w1+$w2+$w3+$x;
				$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,$fil1->nomb,'1','L');
				$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'','1','R');
				$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'','1','R');
				$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,number_format($fil1->total,2),'1','R');
			
				$y+=5;
				$respNiv2=$this->operacion->listaMix($oper,$fil1->id_cate,'',$perIni,$perFin);
				if($respNiv2!=false){
					foreach($respNiv2 as $fil2){
						$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;$x4=$m+$w1+$w2+$w3+$x;
						$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell(5,5,'','1','L');
						$this->fpdf->setXY($x1+5,$y);$this->fpdf->MultiCell($w1-5,5,$fil2->nomb,'1','L');
						$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'','1','R');
						$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,number_format($fil2->total,2),'1','R');
						$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'','1','R');
							
						$y+=5;
						$respNiv3=$this->operacion->listaMix($oper,$fil2->id_cate,$fil2->id_enti,$perIni,$perFin);
						if($respNiv3!=false){
							foreach($respNiv3 as $fil3){
								$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;$x4=$m+$w1+$w2+$w3+$x;
								$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell(5,5,'','1','L');
								$this->fpdf->setXY($x1+5,$y);$this->fpdf->MultiCell(5,5,'','1','L');
								$this->fpdf->setXY($x1+10,$y);$this->fpdf->MultiCell($w1-10,5,$fil3->nomb,'1','L');
								$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,number_format($fil3->total,2),'1','R');
								$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'','1','R');
								$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'','1','R');
								$y+=5;
							}//foreach($respNiv3 as $fil3){
						}//if($respNiv3!=false){
					}//foreach($respNiv2 as $fil2){
				}//if($respNiv2!=false){
			}//foreach($respNiv1 as $fil1){			
		}//if(count($respNiv1)>0){
	    /*
		 * LISTA DE COSTOS
		 */
		$x=191+2;
		$y=20;
		$oper='COSTO';
		$respNiv1=$this->operacion->listaMix($oper,'','',$perIni,$perFin);
		$dd = count($respNiv1);
		if($respNiv1!=false){
			foreach($respNiv1 as $fil1){
				$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;$x4=$m+$w1+$w2+$w3+$x;
				$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell($w1,5,$fil1->nomb,'1','L');
				$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'','1','R');
				$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'','1','R');
				$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,number_format($fil1->total,2),'1','R');
			
				$y+=5;
				$respNiv2=$this->operacion->listaMix($oper,$fil1->id_cate,'',$perIni,$perFin);
				if($respNiv2!=false){
					foreach($respNiv2 as $fil2){
						$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;$x4=$m+$w1+$w2+$w3+$x;
						$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell(5,5,'','1','L');
						$this->fpdf->setXY($x1+5,$y);$this->fpdf->MultiCell($w1-5,5,$fil2->nomb,'1','L');
						$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,'','1','R');
						$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,number_format($fil2->total,2),'1','R');
						$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'','1','R');
							
						$y+=5;
						$respNiv3=$this->operacion->listaMix($oper,$fil2->id_cate,$fil2->id_enti,$perIni,$perFin);
						if($respNiv3!=false){
							foreach($respNiv3 as $fil3){
								$x1=$m+$x;$x2=$m+$w1+$x;$x3=$m+$w1+$w2+$x;$x4=$m+$w1+$w2+$w3+$x;
								$this->fpdf->setXY($x1,$y);$this->fpdf->MultiCell(5,5,'','1','L');
								$this->fpdf->setXY($x1+5,$y);$this->fpdf->MultiCell(5,5,'','1','L');
								$this->fpdf->setXY($x1+10,$y);$this->fpdf->MultiCell($w1-10,5,$fil3->nomb,'1','L');
								$this->fpdf->setXY($x2,$y);$this->fpdf->MultiCell($w2,5,number_format($fil3->total,2),'1','R');
								$this->fpdf->setXY($x3,$y);$this->fpdf->MultiCell($w3,5,'','1','R');
								$this->fpdf->setXY($x4,$y);$this->fpdf->MultiCell($w4,5,'','1','R');
								$y+=5;
							}//foreach($respNiv3 as $fil3){
						}//if($respNiv3!=false){
					}//foreach($respNiv2 as $fil2){
				}//if($respNiv2!=false){
			}//foreach($respNiv1 as $fil1){			
		}//if(count($respNiv1)>0){
		$this->fpdf->Output();
	}
}
?>