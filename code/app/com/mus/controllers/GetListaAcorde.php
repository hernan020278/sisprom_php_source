<?php 
class GetListaAcorde extends Controlador
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
			
			$where = "where 1=1 AND "." acr.acr_kycom='".$_SESSION['com']['com_kycom']."'";
			
			if($this->util->exist($data,'acr_kyacr')){$where.=" and (acr.acr_kyacr = '".$data['acr_kyacr']."')";}
			if($this->util->exist($data,'acr_nota')){$where.=" and (acr.acr_nota LIKE '%".$data['acr_nota']."%')";}
// 			if($this->util->exist($data,'acr_tono')){$where.=" and (acr.acr_tono = '".$data['acr_tono']."')";}
// 			if($this->util->exist($data,'acr_vers')){$where.=" and (acr.acr_vers = '".$data['acr_vers']."')";}
			if($this->util->exist($data,'acr_dscr_in')){$where.=" and (acr.acr_dscr IN ".$data['acr_dscr_in'].")";}
			
			if($this->util->get($data,'acr_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'acr_esta') && $this->util->get($data,'acr_esta')!="TODOS")
				{
					$where.=" and acr.acr_esta = '".$data['acr_esta']."'";
				}
				else{$where.=" and acr.acr_esta = '0001'";}
			}
				
			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (acr.acr_dscr like '%')";
						break;
					default:
						$where.=" and (acr.acr_dscr like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}			
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT acr_kyacr, acr_inst, acr_nomb, acr_nota, acr.acr_dscr, acr_tono, acr.acr_capo, acr.acr_tras, acr.acr_trsx, acr.acr_trsa, acr.acr_trsb, acr.acr_trsc, acr.acr_trsd, acr.acr_trse, acr.acr_trsf, acr.acr_foto, acr.acr_vers FROM mus_acorde acr ".$where. " ORDER BY acr.acr_nomb ASC";
			}
			else{$data['sql'] = $data['sql'];}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("acr_kycrd"=>"", "acr_dscr"=>"Seleccione", "acr_dscr"=>"", "acr_auto"=>"");
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