<?php 
class GetListaHistoria extends Controlador
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
			
			$where = "WHERE 1=1 AND his.his_esta='0001'";
			if($this->util->esdato($data,'usu_nomb')){$where.=" AND (usu.usu_nomb = '".$data['his_kyhis']."')";}
			if($this->util->esdato($data,'his_kycom')){$where.=" AND (his.his_kycom = '".$data['his_kycom']."')";}
			if($this->util->esdato($data,'his_kyhis')){$where.=" AND (his.his_kyhis = '".$data['his_kyhis']."')";}
			if($this->util->esdato($data,'his_kypac')){$where.=" AND (his.his_kypac = '".$data['his_kypac']."')";}
 			if($this->util->esdato($data,'his_fini')){$where.=" AND (his.his_fini = '".$data['his.his_fini']."')";}
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT usu.usu_kyusu, usu.usu_nomb, his.his_kyhis, his.his_kypac, his.his_kycom, his.his_kyusu, his.his_kysuc, 
        his.his_fini, his.his_ffin, his.his_esta, his.his_vers
        FROM cmn_usuario usu INNER JOIN sld_historia his ON his.his_kyusu=usu.usu_kyusu ".$where;
			}
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				$lista = Array();
				$obj = Array("his_kyhis"=>"", "his_dscr"=>"Seleccione");
				array_push($lista, $obj);
				if(count($data['lista']['items'])>0){$data['lista']['items'] = array_merge($lista,$data['lista']['items']);}
				else{$data['lista']['items']=$lista;}
			}//if($this->util->get($data,'term')=="Seleccione")
					
			$data['msg'] = ((count($data['lista']) > 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
			
			$result = $data;			
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>