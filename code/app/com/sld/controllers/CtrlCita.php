<?php 
class CtrlCita extends Controlador
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
 			$data = $this->getFiltro($data);
 			$this->dbcn->iniciarTransaccion($data);
 			$data['cit_kycom'] = $_SESSION['com']['com_kycom'];
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"cit_kycit","0")=="0")
 			{
 				$dtmp = Array();
 				$dtmp['cit_fini'] = $this->util->get($data, "cit_fini");

 				$dtmp = $this->run("sld/GetListaCita",$dtmp);

 				if(count($dtmp['lista']['items'])>0)
 				{
 				    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
 				    $data['cit_kycit'] = $dtmp['lista']['items'][0]['cit_kycit'];
 				    $data['cit'] = $dtmp['lista']['items'][0];
 				}
 				else{$data['msg'] = Array("type"=>"success","text"=>"Clase : ".get_class($this)."\nExito");}
 				
  				if($data['msg']['type']=="success")
 				{
					$data = $this->insert($data, "sld_cita");
					$data['cit'] = $this->dbcn->getObjectFromData($data, "sld_cita");
 				}//if($data['msg']['type']=="success")
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"cit_kycit")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"cit_kycit")!="0")
 			{
				if($this->util->get($data,"where")=="")
				{
					$data['where'] = "where cit_kycit='".$data['cit_kycit']."'";
				}
				$data = $this->update($data, "sld_cita");
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"cit_kycit")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
 			{
 				foreach ($data['lisKy'] as $key=>$val)
 				{
 					if($this->util->get($data,"where")=="")
 					{
 						$data['where'] = "where cit_kypdr = '".$val['ky']."'";
 						$data = $this->delete($data, "adm_propiedad");
 				
 						$data['where'] = "where cit_kycit = '".$val['ky']."'";
 						$data = $this->delete($data, "adm_propiedad");
 					}
 				}//foreach ($data['lisPrp'] as $key=>$val)
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
 			}

 			$result['msg'] = $data['msg'];
 			$result['cit_kycit'] = $this->util->get($data, "cit_kycit");
 			$result['prp'] = $this->util->get($data, "prp");
 			
 			$this->dbcn->finalizarTransaccion($data);
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>