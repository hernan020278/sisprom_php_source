<?php 
class GetListaAplicacionXComunidad extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";

			$where = "where 1=1 and usu.usu_esta='0001'";
			if($this->util->exist($data,'usu_kyusu')){$where.=" and (usu.usu_kyusu = '".$data['usu_kyusu']."')";}
			if($this->util->exist($data,'pol_kypol')){$where.=" and (app.pol_kypol = '".$data['pol_kypol']."')";}
			if($this->util->exist($data,'com_kycom')){$where.=" and (reg.reg_kycom = '".$data['com_kycom']."')";}
				
			$data['sql'] = "select cap.* from cmn_comapp cap ".
			"inner join cmn_usuario usu on usu.usu_kyusu=cap.cap_kyusu ".
			"inner join cmn_apps app on app.pol_kypol=cap.cap_kyapp ".
			"inner join cmn_comunidad com on com.com_kycom=cap.cap_kycom ".$where;

			$data = $this->getLista($data);

			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>