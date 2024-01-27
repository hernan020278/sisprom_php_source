<?php 
class GetListaPolitica extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = Array();
		$data['pol_kypol'] = 11;
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
			if($this->util->exist($data,'pol_kypol')){$where.=" AND (pol.pol_kypol='".$data['pol_kypol']."')";}
			if($this->util->exist($data,'pol_tipo')){$where.=" AND (pol.pol_tipo='".$data['pol_tipo']."')";}
			if($this->util->exist($data,'pol_nive')){$where.=" AND (pol.pol_nive='".$data['pol_nive']."')";}
			if($this->util->exist($data,'pol_nomb')){$where.=" AND (pol.pol_nomb='".$data['pol_nomb']."')";}
			if($this->util->exist($data,'pol_esta')){$where.=" AND (pol.pol_esta='".$data['pol_esta']."')";}
			if($this->util->get($data,'pol_nive') == "1")
			{
			    if($this->util->exist($data,'pol_kypdr')){$where.=" AND (pol.pol_kypol = '".$data['pol_kypdr']."')";}
			}
			else
			{
			    if($this->util->exist($data,'pol_kypdr')){$where.=" AND (pol.pol_kypdr = '".$data['pol_kypdr']."')";}
			}
			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
			    switch(strlen($this->util->get($data,'term'))){
			        case 1:
			            $where.=" AND (pol.".$data['campo']." like '%')";
			            break;
			        default:
			            $where.=" AND (pol.".$data['campo']." like '%".$data['term']."%')";
			            break;
			    }//switch(strlen($this->util->get($data,'term'))){
			}
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT pdr.pol_kypol pdr_kypol, pdr.pol_nomb pdr_nomb, pdr.pol_dscr pdr_dscr, pol.pol_clas, pol.pol_kypol, pol.pol_kypdr, pol.pol_tipo, pol.pol_nomb, pol.pol_dscr, pol.pol_nive, pol.pol_orde, pol.pol_link, pol.pol_imin, pol.pol_imax, '' pol_html, pol.pol_trig, pol.pol_esta,
				(SELECT COUNT(pol_kypol) FROM cmn_politica hij WHERE hij.pol_kypdr=pol.pol_kypol) pol_nopc
				FROM cmn_politica pol 
				LEFT JOIN cmn_politica pdr ON pdr.pol_kypol=pol.pol_kypdr
				".$where.
				" ORDER BY pol.pol_orde ASC";
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