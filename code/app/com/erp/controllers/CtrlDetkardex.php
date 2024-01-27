<?php 
class CtrlDetkardex extends Controlador
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

 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"dtk_kydtk","0")=="0")
 			{
				$data = $this->insert($data, "erp_detkardex");
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"dtd_kydtd")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR")
 			{
				if($this->util->get($data,"where")=="")
				{
					$data['where'] = "where dtk_kydtk='".$data['dtk_kydtk']."'";
				}
				$data = $this->update($data, "erp_detkardex");
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"dtd_kydtd")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
 			{
 				$this->dbcn->iniciarTransaccion($data, "erp");
 				
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where dtk_kydtk = '".$val['ky']."'";
					}
					$data = $this->delete($data, "adm_detkardex");
				}//foreach ($data['lisPrp'] as $key=>$val)
					
				$this->dbcn->finalizarTransaccion();

 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
 			}
 			
 			$result['msg'] = $data['msg'];
 			$result['dtk_kydtk'] = $this->util->get($data,"dtk_kydtk");
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>