<?php 
class rep_com extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function printReport($data)
 	{
 		$result = null;
 		try
 		{
 			$usu_nomb = (isset($data['usu_nomb'])?$data['usu_nomb']:"");
 			
 			$modulo = $data['modulo'];
 			$reportName = $data['reportName'];
 			$reportTitle = $data['reportTitle'];
 			$format = $data['optFormat'];
 			
 			$reportData = Array();
 			
 			$reportData['data']['tipOpe'] = $this->util->tipOpe;
 			$reportData['data']['tipDoc'] = $this->util->tipDoc;

 			$where="1=1 and ent.tipo='COM'";
 			if(!empty($usu_nomb)){$where.=" and ent.nomb like '%".$usu_nomb."%'";}
 			$reportData['data']['lisEnt']=$this->entidades->getListaWithCategoriaSucursal("SELECT", 0, 10000, $where);
			$data['data']=$reportData['data'];
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>