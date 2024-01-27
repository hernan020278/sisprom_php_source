<?php 
class GetListaComunidad extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			$data['dbResp'] = "LISTA";
			
			if($this->util->get($data,'sql')=="")
			{
				$where = "where 1=1 and com.com_esta='0001'";
				if($this->util->exist($data,'usu_kyusu')){$where.=" and (usu.usu_kyusu = '".$data['usu_kyusu']."')";}
				if($this->util->exist($data,'com_kycom')){$where.=" and (com.com_kycom = '".$data['com_kycom']."')";}
				if($this->util->exist($data,'com_ndoc')){$where.=" and (com.com_ndoc = '".$data['com_ndoc']."')";}
				if($this->util->exist($data,'com_nomb')){$where.=" and (com.com_nomb = '".$data['com_nomb']."')";}
				if($this->util->exist($data,'usu_mail')){$where.=" and (usu.usu_mail = '".$data['usu_mail']."')";}
				if($this->util->exist($data,'usu_pass')){$where.=" and (usu.usu_pass = '".$data['usu_pass']."')";}
					
				$data['sql'] = "select com.com_kyusu, com.com_kycom, com.com_ndoc, com.com_nomb from cmn_comunidad com ".$where;
			}
			$data = $this->getLista($data);
			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>