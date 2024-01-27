<?php 
class CtrlPerfil extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index($data)
	{
		return $this->ejecutar($data);
	}
	public function uploadFile($data)
	{
		$data['modulo'] = "images";
		$data['pathFile']=$this->upload($data);
		$data["msg"]=array("type"=>"success","text"=>"Archivo subido satisfactorio");
		echo json_encode($data);
	}
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data = $this->getFiltro($data);//Inicio 
 			
 			$this->dbcn->iniciarTransaccion($data);
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prf_kyprf","0")=="0")
 			{
 				$dtmp = Array();
 				$dtmp['prf']['prf_nomb'] = $data['prf']['prf_nomb'];
 				$dtmp = $this->run("cmn/GetListaPerfil",$dtmp['prf']);
 				
 				if(count($dtmp['lista']['items'])>0)
 				{
			    $data['prf_kyprf'] = $dtmp['lista']['items'][0]['prf_kyprf'];
			    $data['prf'] = $dtmp['lista']['items'][0];
			    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
 				}
 				else
 				{
 				  $dtmp = Array();
 				  $dtmp['prf'] = $data['prf'];
 				  $dtmp = $this->insert($dtmp['prf'], "cmn_perfil");
 				  $data['prf']['prf_kyprf'] = $dtmp['prf_kyprf'];
 				  $data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito"); 				  
 				}//if($data['msg']['type']=="success")
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prf_kyprf")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prf_kyprf")!="0")
 			{
				$data['where'] = "where prf_kyprf='".$data['prf']['prf_kyprf']."'";
				$data = $this->update($data, "cmn_perfil");
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prf_kyprf")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"prf_kyprf")!="0")
 			{
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where prf_kyprf='".$val['ky']."'";
					}
					$data = $this->delete($data, "cmn_perfil");
				}//foreach ($data['lisPrp'] as $key=>$val)
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"prf_kyprf")!="0")
 			else if($this->util->get($data,"comando") == "IMPRIMIR" && $this->util->get($data,"prf_kyprf")!="0")
 			{
 				$data['comandoPdf'] = "IMPRIMIR";
				$data = $this->generarPdf($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"prf_kyprf")!="0")
 			else if ( $this->util->get($data,"comando")=="ENVIAR_MAIL" && $this->util->get($data,"prf_kyprf")!="0" )
 			{
 				$data = $this->enviarOperacionMail($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"prf_kyprf")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nNo hay comando accion o verificar clave");
 			}
 			$result['msg'] = $data['msg'];
 			$result['prf_kyprf'] = $this->util->get($data,"prf_kyprf");
 			$result['prf'] = $this->util->get($data,"prf");
 			
 			$this->dbcn->finalizarTransaccion();
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>