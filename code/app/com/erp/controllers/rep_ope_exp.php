<?php 
class rep_ope_exp extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function printReport($data)
 	{
 		$result = null;
 		try
 		{
 			$data['suc_kysucu'] = ((isset($data['suc_kysucu']))?$data['suc_kysucu']:"");
 			$data['usu_kyusu'] = ((isset($data['usu_kyusu']))?$data['usu_kyusu']:"");
 			$data['doc_fini'] = ((isset($data['doc_fini']))?$data['doc_fini']:date('Y-m-d'));
 			$data['doc_ffin'] = ((isset($data['doc_ffin']))?$data['doc_ffin']:date('Y-m-d'));

 			$data['pagerows'] = 9999999;
 			$data['page'] = 1;
 			
//  			$modulo = $data['modulo'];
//  			$reportName = $data['reportName'];
//  			$reportTitle = $data['reportTitle'];
//  			$format = $data['optFormat'];
 			
 			$data['tipOpe'] = $this->util->tipOpe;
 			$data['tipDoc'] = $this->util->tipDoc;
 			$data['estado'] = $this->util->estado;
 			
 			$data = $this->oper->lista($data, true);
 			
//  		$reportData['data']['lista']=$this->operacion->getListaMix("SELECT", 0, 2000, "", "", $where, "", "", "");
// 			$data['data']=$reportData['data'];
			
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>