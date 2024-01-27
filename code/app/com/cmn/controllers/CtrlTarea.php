<?php 
class CtrlTarea extends Controlador
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
 			
 			$this->dbcn->iniciarTransaccion($data);
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"tar_kytar","0")=="0")
 			{
 				$dtmp = Array();
 				$dtmp['tar_tipo'] = $data['tar_tipo'];
 				$dtmp['tar_nomb'] = $data['tar_nomb'];
 				$dtmp = $this->run("cmn/GetListaTarea",$dtmp);

 				if(count($dtmp['lista']['items'])>0)
 				{
 				    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
 				    $data['tar_kytar'] = $dtmp['lista']['items'][0]['tar_kytar'];
 				    $data['tar'] = $dtmp['lista']['items'][0];
 				}else{$data['msg'] = Array("type"=>"success","text"=>"Clase : ".get_class($this)."\nExito");}
 				
  				if($data['msg']['type']=="success")
 				{
 					$data = $this->insert($data, "cmn_tarea");
 				}//if($data['msg']['type']=="success")
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"tar_kytar")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"tar_kytar")!="0")
 			{
				$data['where'] = "where tar_kytar = '".$data['tar_kytar']."'";
				$data = $this->update($data, "cmn_tarea");
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"tar_kytar")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"tar_kytar")!="0")
 			{
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where tar_kypdr = '".$val['ky']."'";
						$data = $this->delete($data, "cmn_tarea");

						$data['where'] = "where tar_kytar = '".$val['ky']."'";
						$data = $this->delete($data, "cmn_tarea");
					}
				}//foreach ($data['lisPrp'] as $key=>$val)
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"tar_kytar")!="0")
 			else if($this->util->get($data,"comando") == "IMPRIMIR" && $this->util->get($data,"tar_kytar")!="0")
 			{
 				$data['comandoPdf'] = "IMPRIMIR";
				$data = $this->generarPdf($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"tar_kytar")!="0")
 			else if ( $this->util->get($data,"comando")=="ENVIAR_MAIL" && $this->util->get($data,"tar_kytar")!="0" )
 			{
 				$data = $this->enviarOperacionMail($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"tar_kytar")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nNo hay comando accion o verificar clave");
 			}
 			$result['msg'] = $data['msg'];
 			$result['tar_kytar'] = $this->util->get($data,"tar_kytar");
 			$result['tar'] = $this->util->get($data,"tar");
 			
 			$this->dbcn->finalizarTransaccion();
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>