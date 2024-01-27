<?php 
class GetListaViewkardex extends Controlador
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
			
			if($this->util->exist($data,'art_kyart')){$where.=" and vwkar.art_kyart='".$data['art_kyart']."'";}
			if($this->util->exist($data,'suc_kysuc')){$where.=" and vwkar.suc_kysuc='".$data['suc_kysuc']."'";}
			
			if($this->util->get($data,'main_sel_sucu')!=""){$where.=" and vwkar.suc_kysuc='".$data['main_kysuc']."'";}
			
			if($this->util->get($data,'art_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'art_esta') && $this->util->get($data,'art_esta')!="TODOS")
				{
					$where.=" and vwkar.art_esta = '".$data['art_esta']."'";
				}
				else{$where.=" and vwkar.art_esta = '0001'";}
			}

			if($this->util->get($data,'text')!=""){$where.=" and (vwkar.art_nomb='".$data['text']."')";}
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "select vwkar.* from view_kardex vwkar ".$where;
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