<?php 
class CtrlSucursal extends Controlador
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

 			$data['suc'] = Array();
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"suc_kysuc","0")=="0")
 			{
 			  $dtmp = Array();
 			 	$dtmp['suc_kycom'] = $this->util->get($data,"suc_kycom");
				$dtmp['suc_kyusu'] = $this->util->get($data,"suc_kyusu");
				$dtmp['suc_nomb'] = $this->util->get($data,"suc_nomb");
				$dtmp['suc_tipo'] = $this->util->get($data,"suc_tipo");
				
				$dtmp = $this->run("adm/GetListaSucursal",$dtmp);
				 		 	
				if(count($dtmp['lista']['items'])>0)
				{
				    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
				    $data['suc'] = $dtmp['lista']['items'][0];
				}
				else{$data['msg'] = Array("type"=>"success","text"=>"Clase : ".get_class($this)."\nExito");}
				
 				if($data['msg']['type']=="success")
 				{
 					$data['suc_esta'] = "0001";
 					$data = $this->insert($data, "adm_sucursal");
 					$data['suc'] = $this->dbcn->getObjectFromData($data, "adm_sucursal");
 				}				
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR")
 			{
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
 			{	
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where suc_kysuc = '".$val['ky']."'";
					}
					$data = $this->delete($data, "adm_sucursal");
				}//foreach ($data['lisPrp'] as $key=>$val)

 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
 			}
 			$result['msg'] = $data['msg'];
 			$result['suc'] = $data['suc'];
 			$result['suc_kysuc'] = $data['suc_kysuc'];
 			$this->dbcn->finalizarTransaccion();
 			 			
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>