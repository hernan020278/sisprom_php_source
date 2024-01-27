<?php 
class rep_cta extends Controlador
{
	public function __construct() {parent::__construct();}
	
 	public function printReport($data)
 	{
 		$result = null;
 		try
 		{
 			$usu_kyusu = (isset($data['usu_kyusu'])?$data['usu_kyusu']:"");
 			
 			$modulo = $data['modulo'];
 			$reportName = $data['reportName'];
 			$reportTitle = $data['reportTitle'];
 			$format = $data['optFormat'];
 			
 			$reportData = Array();
 			
 			$reportData['data']['tipOpe'] = $this->util->tipOpe;
 			$reportData['data']['tipDoc'] = $this->util->tipDoc;

 			$where="1=1 and cco.esta='0001'";
 			if(!empty($usu_kyusu)){$where.=" and ( cco.id_enti='".$usu_kyusu."' )";}
 			$reportData['data']['lista']=$this->ctacorriente->getLista("SELECT", 0, 2000, $where);
			$data['data']=$reportData['data'];
			
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>