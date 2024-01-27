<?php 
class GetListaPropiedad extends Controlador
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
			
			$where = "where 1=1 AND prp.prp_kycom = '".$_SESSION['com']['com_kycom']."'";
			
			if($this->util->exist($data,'prp_kyprp')){$where.=" and (prp.prp_kyprp = '".$data['prp_kyprp']."')";}
			if($this->util->exist($data,'prp_nive')){$where.=" and (prp.prp_nive = '".($data['prp_nive'])."')";}
 			if($this->util->exist($data,'prp_codi')){$where.=" and (prp.prp_codi = '".$data['prp_codi']."')";}
 			if($this->util->exist($data,'prp_secc')){$where.=" and (prp.prp_secc = '".$data['prp_secc']."')";}
 			if($this->util->exist($data,'prp_prop')){$where.=" and (prp.prp_prop = '".$data['prp_prop']."')";}
			if($this->util->exist($data,'prp_valu')){$where.=" and (prp.prp_valu = '".$data['prp_valu']."')";}
			if($this->util->exist($data,'prp_dscr')){$where.=" and (prp.prp_dscr = '".$data['prp_dscr']."')";}

			if($this->util->get($data,'prp_tipo')=="UNICO")
			{
				if($this->util->exist($data,'prp_kypdr')){$where.=" and (prp.prp_kyprp = '".$data['prp_kypdr']."')";}
			}
			else
			{
				if($this->util->exist($data,'prp_kypdr')){$where.=" and (prp.prp_kypdr = '".$data['prp_kypdr']."')";}
			}
			if($this->util->get($data,'prp_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'prp_esta') && $this->util->get($data,'prp_esta')!="TODOS")
				{
					$where.=" and prp.prp_esta = '".$data['prp_esta']."'";
				}
			}	
 			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (prp.".$data['campo']." like '%')";
						break;
					default:
						$where.=" and (prp.".$data['campo']." like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}
			if($this->util->get($data,'sql')=="")
			{
					$data['sql'] = "SELECT pdr.prp_kyprp pdr_kyprp, pdr.prp_nive pdr_nive, pdr.prp_secc pdr_secc, pdr.prp_codi pdr_codi, pdr.prp_prop pdr_prop,
					prp.prp_kypdr, prp.prp_kyprp, prp.prp_nive, prp.prp_secc, prp.prp_codi, prp.prp_prop, prp.prp_valu, prp.prp_dscr, prp.prp_freg, prp.prp_esta,
					(SELECT COUNT(prp_kyprp) FROM adm_propiedad hij WHERE hij.prp_kypdr=prp.prp_kyprp) prp_nopc
				    FROM adm_propiedad prp LEFT JOIN adm_propiedad pdr ON pdr.prp_kyprp=prp.prp_kypdr ".$where;
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("prp_kyprp"=>"", "prp_secc"=>"Seleccione", "prp_codi"=>"Seleccione", "prp_prop"=>"Seleccione", "prp_valu"=>"Seleccione", "prp_dscr"=>"Seleccione");
					array_push($lista, $obj);
					if(count($data['lista']['items'])>0){$data['lista']['items'] = array_merge($lista,$data['lista']['items']);}
					else{$data['lista']['items']=$lista;}
					if(strlen($this->util->get($data,'term')) >= 3 && count($data['lista']['items']) == 1 ){$data['lista']['items'] = Array();}
				}//if($data['mostrarSeleccion'])
				else{if(strlen($this->util->get($data,'term')) >= 3 && count($data['lista']['items']) == 0 ){$data['lista']['items'] = Array();}}
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