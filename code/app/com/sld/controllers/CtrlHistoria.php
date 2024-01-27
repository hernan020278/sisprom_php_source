<?php 
class CtrlHistoria extends Controlador
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
 			$data['his_kycom'] = $_SESSION['com']['com_kycom'];
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"his_kyhis","0")=="0")
 			{
 				$dtmp = Array();
 				$dtmp['his_kyusu'] = $this->util->get($data, "his_kyusu");

 				$dtmp = $this->run("sld/GetListaHistoria",$dtmp);

 				if(count($dtmp['lista']['items'])>0)
 				{
 				    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
 				    $data['his_kyhis'] = $dtmp['lista']['items'][0]['his_kyhis'];
 				    $data['his'] = $dtmp['lista']['items'][0];
 				}
 				else{$data['msg'] = Array("type"=>"success","text"=>"Clase : ".get_class($this)."\nExito");}
 				
  				if($data['msg']['type']=="success")
 				{
					$data = $this->insert($data, "sld_historia");
					$data['his'] = $this->dbcn->getObjectFromData($data, "sld_historia");
 				}//if($data['msg']['type']=="success")
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"his_kycit")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"his_kyhis")!="0")
 			{
				if($this->util->get($data,"where")=="")
				{
					$data['where'] = "where his_kycit='".$data['his_kycit']."'";
				}
				$data = $this->update($data, "sld_cita");
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"his_kycit")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
 			{
 				foreach ($data['lisKy'] as $key=>$val)
 				{
 					if($this->util->get($data,"where")=="")
 					{
 						$data['where'] = "where his_kypdr = '".$val['ky']."'";
 						$data = $this->delete($data, "adm_propiedad");
 				
 						$data['where'] = "where his_kycit = '".$val['ky']."'";
 						$data = $this->delete($data, "adm_propiedad");
 					}
 				}//foreach ($data['lisPrp'] as $key=>$val)
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
 			}

 			$result['msg'] = $data['msg'];
 			$result['his_kycit'] = $this->util->get($data, "his_kycit");
 			$result['prp'] = $this->util->get($data, "prp");
 			
 			$this->dbcn->finalizarTransaccion($data);
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>