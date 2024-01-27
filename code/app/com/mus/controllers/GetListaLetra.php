<?php 
class GetListaLetra extends Controlador
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
			
			if($this->util->exist($data,'ltr_kycnc')){$where.=" and (ltr.ltr_kycnc = '".$data['ltr_kycnc']."')";}
			if($this->util->exist($data,'ltr_kyltr')){$where.=" and (ltr.ltr_kyltr = '".$data['ltr_kyltr']."')";}
			if($this->util->exist($data,'ltr_dscr')){$where.=" and (ltr.ltr_dscr = '".$data['ltr_dscr']."')";}
			
			if($this->util->get($data,'ltr_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'ltr_esta') && $this->util->get($data,'ltr_esta')!="TODOS")
				{
					$where.=" and ltr.ltr_esta = '".$data['ltr_esta']."'";
				}
				else{$where.=" and ltr.ltr_esta = '0001'";}
			}
				
			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (ltr.ltr_dscr like '%')";
						break;
					default:
						$where.=" and (ltr.ltr_dscr like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}			
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT * FROM mus_letra ltr ".$where. " ORDER BY ltr.ltr_orde ASC";
			}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("ltr_kyltr"=>"", "ltr_dscr"=>"Seleccione", "ltr_dscr"=>"", "ltr_auto"=>"");
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