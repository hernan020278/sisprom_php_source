<?php 
class CtrlCatalogo extends Controlador
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
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"ctl_kyctl","0")=="0")
 			{
 				$this->dbcn->iniciarTransaccion($data);

 				$dtmp = Array();
 				$dtmp['ctl_kyusu'] = $this->util->get($data, "ctl_kyusu");
 				$dtmp['ctl_kyart'] = $this->util->get($data, "ctl_kyart");
 				
 				$dtmp = $this->run("erp/GetListaCatalogo",$dtmp);
 				
 				if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\Registro existe");}
 				else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");}
 				
 				if($data['msg']['type']=="success")
 				{
 					$data['ctl_fing'] = date('Y-m-d H:i:s');
 					$data['ctl_esta'] = $this->util->get($data, "ctl_esta", "0001");
 				
 					$data = $this->insert($data, "sex_catalogo");
 					$data['ctl_kyctl'] = $data['ctl_kyctl'];
 				}//if($data['msg']['type']=="success")

 				$this->dbcn->finalizarTransaccion();
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"ope_kyope")!="0")
 			{
				$data['where'] = "where ctl_kyctl = '".$data['ctl_kyctl']."'";
				$data = $this->update($data, "adm_articulo");
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")	
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ctl_kyctl")!="0")
 			{
 				foreach ($data['lisKy'] as $key=>$val)
 				{
 					if($this->util->get($data,"where")=="")
 					{
 						$data['where'] = "where ctl_kyctl = '".$val['ky']."'";
 					}
 					$data = $this->delete($data, "erp_catalogo");
 				}//foreach ($data['lisPrp'] as $key=>$val)
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
 			else if($this->util->get($data,"comando") == "IMPRIMIR" && $this->util->get($data,"ctl_kyctl")!="0")
 			{
 				$data['comandoPdf'] = "IMPRIMIR";
				$data = $this->generarPdf($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nNo hay comando accion o verificar clave");
 			}

 			$result['msg'] = $data['msg'];
 			$result['ctl_kyctl'] = $this->util->get($data,"ctl_kyctl");
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>