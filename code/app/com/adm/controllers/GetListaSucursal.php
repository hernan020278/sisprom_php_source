<?php 
class GetListaSucursal extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		return $this->ejecutar($data);
	}
	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp']="LISTA";

			$where = "WHERE 1=1 AND suc.suc_esta='0001'";
			
			if($this->util->exist($data,'suc_kysuc')){$where.=" AND (suc.suc_kysuc = '".$data['suc_kysuc']."')";}
			if($this->util->exist($data,'suc_kycom')){$where.=" AND (suc.suc_kycom = '".$data['suc_kycom']."')";}
			if($this->util->exist($data,'suc_kyusu')){$where.=" AND (suc.suc_kyusu = '".$data['suc_kyusu']."')";}
			if($this->util->exist($data,'suc_nomb')){$where.=" AND (suc.suc_nomb = '".$data['suc_nomb']."')";}

			if($this->util->get($data,'suc_tipo')=="SUCU"){$where.=" AND (suc.suc_tipo='0001' or suc.suc_tipo='0004' or suc.suc_tipo='0005')";}
			else if($this->util->get($data,'suc_tipo')=="LOCA"){$where.=" AND (suc.suc_tipo='0007')";}
			else if($this->util->get($data,'suc_tipo')=="CAGE"){$where.=" AND (suc.suc_tipo='0001')";}
			else if($this->util->get($data,'suc_tipo')=="CABA"){$where.=" AND (suc.suc_tipo='0001' or suc.suc_tipo='0002' or suc.suc_tipo='0003' or suc.suc_tipo='0006')";}
			else if($this->util->get($data,'suc_tipo')=="CACO"){$where.=" AND (suc.suc_tipo='0001' or suc.suc_tipo='0002' or suc.suc_tipo='0003' or suc.suc_tipo='0006')";}
			else if($this->util->exist($data,'suc_tipo')){$where.=" AND (suc.suc_tipo='".$data['suc_tipo']."')";}

			$data['sql'] = "SELECT suc.* FROM cmn_comunidad com 
        INNER JOIN adm_sucursal suc ON suc.suc_kycom = com.com_kycom $where
			  GROUP BY suc.suc_kysuc";

			$data = $this->getLista($data);

			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>