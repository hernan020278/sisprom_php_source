<?php 
class GetListaDetkardex extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index($data)
	{
		return $this->ejecutar($data);
	}
	
	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";
			
			$where = "where 1=1";
			
			if($this->util->exist($data,'dtk_kykar')){$where.=" and dtk.dtk_kykar='".$data['dtk_kykar']."'";}
			
// 			if($this->util->get($data,'dtd_esta','TODOS')!="TODOS")
// 			{
// 				if($this->util->exist($data,'dtd_esta') && $this->util->get($data,'dtd_esta')!="TODOS")
// 				{
// 					$where.=" and doc.dtd_esta = '".$data['dtd_esta']."'";
// 				}
// 				else{$where.=" and doc.dtd_esta = '0001'";}
// 			}
			
			if($this->util->get($data,'text')!=""){$where.=" and (dtk.dtk_dscr='".$data['text']."')";}
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "select dtk.* from erp_detkardex dtk ".$where;
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