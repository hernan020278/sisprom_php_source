<?php 
class GetListaCita extends Controlador
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
			
			$where = "where 1=1 AND cit.cit_kycom = '".$_SESSION['com']['com_kycom']."'";
			
			if($this->util->exist($data,'kyprp')){$where.=" and (cit.cit_kyprp = '".$data['cit_kyprp']."')";}
			if($this->util->exist($data,'cit_nive')){$where.=" and (cit.cit_nive = '".($data['cit_nive'])."')";}

			if($this->util->exist($data,'cit_fini') && $this->util->exist($data,'cit_ffin'))
			{
			    $where.=" AND DATE(cit.cit_fini)>='".$data['cit_fini']."' AND DATE(cit.cit_fini)<='".$data['cit_ffin']."'";
			}
			
			if($this->util->get($data,'cit_tipo')=="UNICO")
			{
				if($this->util->exist($data,'cit_kycit')){$where.=" and (cit.cit_kycit = '".$data['cit_kycit']."')";}
			}
			else
			{
				if($this->util->exist($data,'cit_kypdr')){$where.=" and (cit.cit_kycit = '".$data['cit_kycit']."')";}
			}
			if($this->util->get($data,'cit_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'cit_esta') && $this->util->get($data,'cit_esta')!="TODOS")
				{
					$where.=" and cit.cit_esta = '".$data['cit_esta']."'";
				}
			}	
 			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (cit.".$data['campo']." like '%')";
						break;
					default:
						$where.=" and (cit.".$data['campo']." like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}
			if($this->util->get($data,'sql')=="")
			{
					$data['sql'] = "SELECT cit_kycit,cit_kyhis,cit_kydoc,cit_kytra,cit_kycom,cit_fini,cit_ffin,cit_diag,cit_moti,cit_prob,cit_esta,cit_vers FROM sld_cita cit ".$where;
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("cit_kyprp"=>"", "cit_secc"=>"Seleccione", "cit_codi"=>"Seleccione", "cit_prop"=>"Seleccione", "cit_valu"=>"Seleccione", "cit_dscr"=>"Seleccione");
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