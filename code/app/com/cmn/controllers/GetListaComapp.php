<?php 
class GetListaComapp extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = Array();
		$data['pol_kypol'] = 11;
		$data = $this->ejecutar($data);
		var_dump($data);
	}	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";

			$where = "where 1=1";
			if($this->util->exist($data,'cap_kyusu')){$where.=" and (cap.cap_kyusu='".$data['cap_kyusu']."')";}
			if($this->util->exist($data,'cap_kycom')){$where.=" and (cap.cap_kycom='".$data['cap_kycom']."')";}
			if($this->util->exist($data,'cap_kyapp')){$where.=" and (cap.cap_kyapp='".$data['cap_kyapp']."')";}
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "select cap.cap_kycap, cap.cap_kyusu, cap.cap_kycom, cap.cap_kyapp from cmn_comapp cap ".$where;
			}
			else{$data['sql'] = $data['sql']." ".$where;}
				
			$data = $this->getLista($data);

			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>