<?php 
class rep_caj extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function printReport($data)
 	{
 		$result = null;
 		try
 		{
 			$suc_nomb = (isset($data['suc_nomb'])?$data['suc_nomb']:"");
 			
 			$modulo = $data['modulo'];
 			$reportName = $data['reportName'];
 			$reportTitle = $data['reportTitle'];
 			$format = $data['optFormat'];
 			
 			$reportData = Array();
 			
 			$reportData['data']['tipOpe'] = $this->util->tipOpe;
 			$reportData['data']['tipDoc'] = $this->util->tipDoc;

 			$where="1=1 and suc.esta='0001' and suc.tipo='0001' or suc.tipo='0002' or suc.tipo='0003' or suc.tipo='0006'";
 			if(!empty($suc_nomb)){$where.=" and suc.nomb like '%".$suc_nomb."%'";}
 			$reportData['data']['lista']=$this->sucursal->getLista("SELECT", 0, 2000, $where);
			$data['data']=$reportData['data'];
			
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>