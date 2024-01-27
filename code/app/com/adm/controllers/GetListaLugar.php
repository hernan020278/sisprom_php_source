<?php 
class GetListaLugar extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		return $this->ejecutar($data);
	}//public function index()
	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp']="LISTA";

			$where = "where 1=1";
			
			if($this->util->exist($data,'lug_depa')){$where.=" and (lug.lug_depa like '%".$data['lug_depa']."%')";}
			if($this->util->exist($data,'lug_prov')){$where.=" and (lug.lug_prov like '%".$data['lug_prov']."%')";}
			if($this->util->exist($data,'lug_dist')){$where.=" and (lug.lug_dist like '%".$data['lug_dist']."%')";}
				
			$data['sql'] = "select * from erp_lugar lug ".$where;
			
			if($this->util->exist($data,'groupby')){$data['sql'].=" ".$data['groupby'];}

			$data = $this->getLista($data);

			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>