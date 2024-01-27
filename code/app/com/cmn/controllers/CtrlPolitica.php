<?php 
class CtrlPolitica extends Controlador
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
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"pol_kypol","0")=="0")
 			{
 				$dtmp = Array();
 				$dtmp['pol']['pol_tipo'] = $data['pol']['pol_tipo'];
 				$dtmp['pol']['pol_nomb'] = $data['pol']['pol_nomb'];
 				$dtmp = $this->run("cmn/GetListaPolitica",$dtmp['pol']);

 				if(count($dtmp['lista']['items'])>0)
 				{
 				    $data['pol_kypol'] = $dtmp['lista']['items'][0]['pol_kypol'];
 				    $data['pol'] = $dtmp['lista']['items'][0];
 				    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
 				}
 				else
 				{
 				  $dtmp = Array();
 				  $dtmp['pol'] = $data['pol'];
 				  $dtmp = $this->insert($dtmp['pol'], "cmn_politica");
 				  $data['pol']['pol_kypol'] = $dtmp['pol_kypol'];
 				  $data['msg'] = Array("type"=>"success","text"=>"Clase : ".get_class($this)."\nExito");
 				}
 			}
 			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"pol_kypol")!="0")
 			{
				$data['where'] = "where pol_kypol = '".$data['pol']['pol_kypol']."'";
				$data = $this->update($data, "cmn_politica");
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"pol_kypol")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"pol_kypol")!="0")
 			{
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where pol_kypdr = '".$val['ky']."'";
						$data = $this->delete($data, "cmn_politica");

						$data['where'] = "where pol_kypol = '".$val['ky']."'";
						$data = $this->delete($data, "cmn_politica");
					}
				}//foreach ($data['lisPrp'] as $key=>$val)
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"pol_kypol")!="0")
 			else if($this->util->get($data,"comando") == "IMPRIMIR" && $this->util->get($data,"pol_kypol")!="0")
 			{
 				$data['comandoPdf'] = "IMPRIMIR";
				$data = $this->generarPdf($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"pol_kypol")!="0")
 			else if ( $this->util->get($data,"comando")=="ENVIAR_MAIL" && $this->util->get($data,"pol_kypol")!="0" )
 			{
 				$data = $this->enviarOperacionMail($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"pol_kypol")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nNo hay comando accion o verificar clave");
 			}
 			$result['msg'] = $data['msg'];
 			$result['pol_kypol'] = $this->util->get($data,"pol_kypol");
 			$result['pol'] = $this->util->get($data,"pol");
 			
 			$this->dbcn->finalizarTransaccion();
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>