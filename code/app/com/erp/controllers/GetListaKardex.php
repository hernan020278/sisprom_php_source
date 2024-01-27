<?php 
class GetListaKardex extends Controlador
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
			
			if($this->util->exist($data,'kar_kykar')){$where.=" and kar.kar_kykar='".$data['kar_kykar']."'";}
			if($this->util->exist($data,'kar_kycom')){$where.=" and kar.kar_kycom='".$data['kar_kycom']."'";}
			if($this->util->exist($data,'kar_kypdr')){$where.=" and kar.kar_kypdr='".$data['kar_kypdr']."'";}
			if($this->util->exist($data,'kar_kyusu')){$where.=" and kar.kar_kyusu='".$data['kar_kyusu']."'";}
			if($this->util->exist($data,'kar_kysuc')){$where.=" and kar.kar_kysuc='".$data['kar_kysuc']."'";}
			if($this->util->exist($data,'kar_tope')){$where.=" and kar.kar_tope='".$data['kar_tope']."'";}
			if($this->util->exist($data,'kar_tdoc')){$where.=" and kar.kar_tdoc='".$data['kar_tdoc']."'";}
			if($this->util->exist($data,'kar_ndoc')){$where.=" and kar.kar_ndoc='".$data['kar_ndoc']."'";}
			
			if($this->util->get($data,'main_sel_sucu')!=""){$where.=" and kar.kar_kysuc='".$data['main_kysuc']."'";}
			
			if($this->util->get($data,'kar_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'kar_esta') && $this->util->get($data,'kar_esta')!="TODOS")
				{
					$where.=" and kar.kar_esta = '".$data['kar_esta']."'";
				}
				else{$where.=" and kar.kar_esta = '0001'";}
			}

			if($this->util->get($data,'text')!=""){$where.=" and (kar.kar_tdoc='".$data['text']."' or kar.kar_ndoc='".$data['text']."' or kar.kar_enom='".$data['text']."' or kar.kar_esta='".$data['text']."')";}
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "select kar.* from erp_kardex kar ".$where;
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