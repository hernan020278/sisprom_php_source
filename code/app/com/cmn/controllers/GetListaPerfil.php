<?php 
class GetListaPerfil extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 

			$data['dbResp']="LISTA";

			$where = "WHERE 1=1";
			
			if($this->util->exist($data,'prf_kyprf')){$where.=" AND (prf.prf_kyprf = '".$data['prf_kyprf']."')";}
			if($this->util->exist($data,'prf_nomb')){$where.=" AND (prf.prf_nomb = '".$data['prf_nomb']."')";}
				
			$data['sql'] = "SELECT prf.prf_kyprf, prf.prf_nomb, prf_dscr FROM cmn_perfil prf ".$where;

			$data = $this->getLista($data);

			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>