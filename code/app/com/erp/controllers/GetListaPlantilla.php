<?php 
class GetListaPlantilla extends Controlador
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
			
			if($this->util->exist($data,'art_kycom')){$where.=" and art.art_kycom='".$data['art_kycom']."'";}
			if($this->util->exist($data,'art_codi')){$where.=" and art.art_codi='".$data['art_codi']."'";}
			if($this->util->exist($data,'art_codi')){$where.=" and art.art_codi='".$data['art_codi']."'";}
			if($this->util->exist($data,'art_iden')){$where.=" and art.art_iden='".$data['art_iden']."'";}
			if($this->util->exist($data,'art_nomb')){$where.=" and art.art_nomb='".$data['art_nomb']."'";}
			
			if($this->util->get($data,'art_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'art_esta') && $this->util->get($data,'art_esta')!="TODOS")
				{
					$where.=" and art.art_esta = '".$data['art_esta']."'";
				}
				else{$where.=" and art.art_esta = '0001'";}
			}
			
 			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (ent.usu_nomb like '%' or ent.usu_ndoc like '%')";
						break;
					default:
						$where.=" and (ent.usu_nomb like '%".$data['term']."%' or ent.usu_ndoc like '%".$data['term']."%')";
						break;
					
				}
			}			
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "select art.*, mrc.prp_dscr mrc_nomb, cat.prp_dscr cat_nomb, und.prp_dscr und_nomb
				from erp_articulo art
				inner join erp_propiedad mrc on mrc.prp_kyprp=art.art_kymrc
				inner join erp_propiedad cat on cat.prp_kyprp=art.art_kycat
				inner join erp_propiedad und on und.prp_kyprp=art.art_kyund ".$where;
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				$lista = Array();
				$obj = Array("usu_kyusu"=>"", "usu_nomb"=>"Seleccione", "usu_ndoc"=>"Seleccione", "usu_tipo"=>"EMP", "usu_tdoc"=>"DNI");
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