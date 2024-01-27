<?php 
class GetListacancion extends Controlador
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
			
			if($this->util->exist($data,'cnc_kyalb')){$where.=" and (cnc.cnc_kyalb = '".$data['cnc_kyalb']."')";}
			if($this->util->exist($data,'cnc_kycnc')){$where.=" and (cnc.cnc_kycnc = '".$data['cnc_kycnc']."')";}
			if($this->util->exist($data,'cnc_nomb')){$where.=" AND (cnc.cnc_nomb LIKE '%".$data['cnc_nomb']."%')";}
			if($this->util->exist($data,'cnc_auto')){$where.=" and (cnc.cnc_auto = '".$data['cnc_auto']."')";}
			
			$estadoCancion = Array(
  	    "0001"=>'RESUELTOS',
  	    "0002"=>'PENDIENTES',
  	    "0003"=>'VARIOS',
  	    "0004"=>'ENSAYO'
			);
			if($this->util->get($data,'cnc_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'cnc_esta') && $this->util->get($data,'cnc_esta')!="TODOS")
				{
				  $where.=" and cnc.cnc_esta = '".$this->util->getKeyFromValue($estadoCancion, $data['cnc_esta'])."'";
				}
				else{$where.=" and cnc.cnc_esta = '0001'";}
			}
				
			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (cnc.cnc_nomb like '%')";
						break;
					default:
						$where.=" and (cnc.cnc_nomb like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "select cnc_kycnc, cnc_kyalb, cnc_nomb, cnc_auto, cnc_urla, cnc_urlb, cnc_urlc, cnc_urld, cnc_urle, cnc_urlf, cnc_urlg, cnc_urlh, cnc_urli, cnc_urlj, cnc_esta, cnc_vers from mus_cancion cnc ".$where. " order by cnc.cnc_nomb asc";
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("cnc_kycnc"=>"", "cnc_nomb"=>"Seleccione", "cnc_nomb"=>"", "cnc_auto"=>"");
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