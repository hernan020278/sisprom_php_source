<?php 
class GetListaAlbum extends Controlador
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
			
			if($this->util->exist($data,'alb_kyalb')){$where.=" and (alb.alb_kyalb = '".$data['alb_kyalb']."')";}
			if($this->util->exist($data,'alb_kycom')){$where.=" and (alb.alb_kycom = '".$data['alb_kycom']."')";}
			if($this->util->exist($data,'alb_nomb')){$where.=" and (alb.alb_nomb = '".$data['alb_nomb']."')";}
			if($this->util->exist($data,'alb_dscr')){$where.=" and (alb.alb_dscr = '".$data['alb_dscr']."')";}
			
			if($this->util->get($data,'alb_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'alb_esta') && $this->util->get($data,'alb_esta')!="TODOS")
				{
					$where.=" and alb.alb_esta = '".$data['alb_esta']."'";
				}
				else{$where.=" and alb.alb_esta = '0001'";}
			}
				
			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (alb.alb_nomb like '%')";
						break;
					default:
						$where.=" and (alb.alb_nomb like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}			
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "select * from mus_album alb ".$where. " order by alb.alb_nomb asc";
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("alb_kyalb"=>"", "alb_nomb"=>"Seleccione", "alb_nomb"=>"", "alb_dscr"=>"");
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