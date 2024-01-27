<?php 
class GetListaPolitica extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = Array();
		$data['tar_kytar'] = 11;
		$data = $this->ejecutar($data);
		var_dump($data);
	}	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";

			$where = "WHERE 1=1";
			if($this->util->exist($data,'tar_kytar')){$where.=" AND (tar.tar_kytar='".$data['tar_kytar']."')";}
			if($this->util->exist($data,'tar_tipo')){$where.=" AND (tar.tar_tipo='".$data['tar_tipo']."')";}
			if($this->util->exist($data,'tar_nive')){$where.=" AND (tar.tar_nive='".$data['tar_nive']."')";}
			if($this->util->exist($data,'tar_nomb')){$where.=" AND (tar.tar_nomb='".$data['tar_nomb']."')";}
			if($this->util->exist($data,'tar_esta')){$where.=" AND (tar.tar_esta='".$data['tar_esta']."')";}
			if($this->util->get($data,'tar_nive') == "1")
			{
			    if($this->util->exist($data,'tar_kypdr')){$where.=" AND (tar.tar_kytar = '".$data['tar_kypdr']."')";}
			}
			else
			{
			    if($this->util->exist($data,'tar_kypdr')){$where.=" AND (tar.tar_kypdr = '".$data['tar_kypdr']."')";}
			}
			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
			    switch(strlen($this->util->get($data,'term'))){
			        case 1:
			            $where.=" AND (tar.".$data['campo']." like '%')";
			            break;
			        default:
			            $where.=" AND (tar.".$data['campo']." like '%".$data['term']."%')";
			            break;
			    }//switch(strlen($this->util->get($data,'term'))){
			}
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT pdr.tar_kytar pdr_kypol, pdr.tar_nomb pdr_nomb, pdr.tar_dscr pdr_dscr, tar.tar_clas, tar.tar_kytar, tar.tar_kypdr, tar.tar_tipo, tar.tar_nomb, tar.tar_dscr, tar.tar_nive, tar.tar_orde, tar.tar_link, tar.tar_imin, tar.tar_imax, '' tar_html, tar.tar_trig, tar.tar_esta,
				(SELECT COUNT(tar_kytar) FROM cmn_tarea hij WHERE hij.tar_kypdr=tar.tar_kytar) tar_nopc
				FROM cmn_tarea tar 
				LEFT JOIN cmn_tarea pdr ON pdr.tar_kytar=tar.tar_kypdr
				".$where.
				" ORDER BY tar.tar_orde ASC";
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