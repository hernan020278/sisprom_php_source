<?php 
class GetListaCatalogo extends Controlador
{
	public function __construct() {parent::__construct();}
	
	public function index($data)
	{
		return $this->ejecutar($data);
	}//public function index()
	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";
			
			$where = "where 1=1 and ctl.ctl_esta='0001'";
			if($this->util->exist($data,'ctl_kyctl')){$where.=" and ctl.ctl_kyctl = '".$data['ctl_kyctl']."'";}
			if($this->util->exist($data,'ctl_nomb')){$where.=" and ctl.ctl_nomb = '".$data['ctl_nomb']."'";}
			if($this->util->get($data,'text')!=""){$where.=" and ctl.ctl_nomb like '%".$data['text']."%'";}
			
			$data['sql'] = "select * from erp_catalogo ctl ".$where;
			$data = $this->getLista($data);
			
			$result = $data;
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>