<?php 
class GetListaArticuloFoto extends Controlador
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
			
			if($this->util->get($data,'text')!=""){$where.=" and (art.art_nomb like '%".$data['text']."%')";}
			
 			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (art.art_codi like '%' or art.art_nomb like '%')";
						break;
					default:
						$where.=" and art.art_ptag like '".$data['term']."%'";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}			
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "select art.*
				from sex_articulo art ".$where;
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("art_kyart"=>"", "art_nomb"=>"Seleccione", "art_codi"=>"Seleccione", "art_tipo"=>"PRODUCTO", "art_dscr"=>"", "art_ptag"=>"");
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