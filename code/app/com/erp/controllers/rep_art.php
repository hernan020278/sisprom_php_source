<?php 
class rep_art extends Controlador
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
			$reportData['data']['reportName'] = $reportName;
			$reportData['data']['reportTitle'] = $reportTitle;
 			
 			$where="1=1 and art.tipo='PRODUCTO'";
 			if(!empty($suc_nomb)){$where.=" and art.nomb like '%".$suc_nomb."%'";}
 			$reportData['data']['lista']=$this->articulo->getLista("SELECT", 0, 2000, $where);
			$data['data']=$reportData['data'];
			
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>