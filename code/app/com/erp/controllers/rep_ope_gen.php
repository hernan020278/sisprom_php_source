<?php 
class rep_ope_gen extends Controlador
{
	public function __construct() {parent::__construct();}

	public function test()
	{
		$data = Array("ope_pini"=>"2016-01-01", "ope_pfin"=>"2016-01-01");
		$data = $this->printReport($data);
		echo json_encode($data);
	}
 	public function printReport($data)
 	{
 		$result = null;
 		try
 		{
 			$data['suc_kysucu'] = ((isset($data['suc_kysucu']))?$data['suc_kysucu']:"");
 			$data['usu_kyusu'] = ((isset($data['usu_kyusu']))?$data['usu_kyusu']:"");
 			$data['ope_pini'] = ((isset($data['ope_pini'])) ? date('Y-m-d', strtotime($data['ope_pini'])) : date('Y-m-d'));
 			$data['ope_pfin'] = ((isset($data['ope_pfin'])) ? date('Y-m-d', strtotime($data['ope_pfin'])) : date('Y-m-d'));
 			$data['ope_fini'] = ((isset($data['ope_fini']))?$data['ope_fini']:date('Y-m-d'));
 			$data['doc_ffin'] = ((isset($data['ope_ffin']))?$data['ope_ffin']:date('Y-m-d'));
 			
 			$data['amb_nomb'] = ((isset($data['amb_nomb']))?$data['amb_nomb']:"");
 			$data['cla_nomb'] = ((isset($data['cla_nomb']))?$data['cla_nomb']:"");

 			$data['pagerows'] = 9999999;
 			$data['page'] = 1;
 			
//  		$modulo = $data['modulo'];
//  		$reportName = $data['reportName'];
//  		$reportTitle = $data['reportTitle'];
//  		$format = $data['optFormat'];
 			$data['tipOpe'] = $this->util->tipOpe;
 			$data['tipDoc'] = $this->util->tipDoc;
 			$data['estado'] = $this->util->estado;
 			
 			$data['select']	= "select ope.freg ope_freg, ope.peri, ope.otip, amb.nomb amb_nomb, ent.id_enti, ent.nomb usu_nomb, cla.nomb cla_nomb, ope.oimp ";
 			$data['from']	= "from erp_operacion ope
			inner join erp_categoria amb on amb.id_cate=ope.id_ambi 
			inner join erp_categoria cla on cla.id_cate=ope.id_clas
			inner join erp_ctacorriente cco on cco.id_ccor=ope.id_ccor
			inner join erp_entidad ent on ent.id_enti=cco.id_enti";
 			
 			$data['data'] = $data;
 			$data = $this->oper->lista($data, true);
 			
//  		$oper='INGRESO';
//  		$lista=$this->operacion->listaMixOpe($oper,'','',$data['ope_pini'],$data['ope_pfin']);
 			$rpta = array();
 			if(count($data['data']['items'])>0){
 				foreach($data['data']['items'] as $item){
 					$item = (Array) $item;
 					if(!isset($rpta[$item['otip']]))
 					{
 						$rpta[$item['otip']]['lisAmb']=Array();
 						$rpta[$item['otip']]['nomb']=$item['otip'];
 						$rpta[$item['otip']]['total']=0;
 					}
					if(!isset($rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]))
					{
						$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['lisEnt']=Array();
 						$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['nomb']=$item['amb_nomb'];
 						$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['total']=0;
 					}
 					if(!isset($rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['lisEnt'][$item['usu_nomb']]))
 					{
 						$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['lisEnt'][$item['usu_nomb']]['lisCla']=Array();
 						$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['lisEnt'][$item['usu_nomb']]['nomb']=$item['usu_nomb'];
 						$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['lisEnt'][$item['usu_nomb']]['total']=0;
 					}
 					if(!isset($rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['lisEnt'][$item['usu_nomb']]['lisCla'][$item['cla_nomb']]))
 					{
 						//$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['lisEnt'][$item['usu_nomb']]['lisCla'][$item['cla_nomb']]=Array();
 						$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['lisEnt'][$item['usu_nomb']]['lisCla'][$item['cla_nomb']]['nomb']=$item['cla_nomb'];
 						$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['lisEnt'][$item['usu_nomb']]['lisCla'][$item['cla_nomb']]['total']=0;
 					}
 					
 					
 					$rpta[$item['otip']]['total']+=$item['oimp'];
 					$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['total']+=$item['oimp'];
 					$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['lisEnt'][$item['usu_nomb']]['total']+=$item['oimp'];
 					$rpta[$item['otip']]['lisAmb'][$item['amb_nomb']]['lisEnt'][$item['usu_nomb']]['lisCla'][$item['cla_nomb']]['total']+=$item['oimp'];
 				}
 			}

//  		$reportData['data']['lista']=$this->operacion->getListaMix("SELECT", 0, 2000, "", "", $where, "", "", "");
			//$data['data'] = $data;
			$data['data']['items']=$rpta; 
			
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>