<?php 
class CtrlComunidad extends Controlador
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
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"com_kycom","0")=="0")
 			{
 				$this->dbcn->iniciarTransaccion($data);

 				$dtmp = Array();
 				$dtmp['com']['com_kyusu'] = $data['com']['com_kyusu'];
 				$dtmp['com']['com_ndoc'] = $data['com']['com_ndoc'];
 				$dtmp['com']['com_nomb'] = $data['com']['com_nomb'];

 				$dtmp = $this->run("cmn/GetListaComunidad",$dtmp['com']);

 				if(count($dtmp['lista']['items'])>0)
 				{
 				    $data['com_kycom'] = $dtmp['lista']['items'][0]['com_kycom'];
 				    $data['com'] = $dtmp['lista']['items'][0];
 				    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
 				}
 				else
 				{
 				  $dtmp = Array();
 				  $dtmp['com'] = $data['com'];
 				  $dtmp = $this->insert($dtmp['com'], "cmn_comunidad");
 				  $data['com']['com_kycom'] = $dtmp['com_kycom'];
 				  $data['msg'] = Array("type"=>"success","text"=>"Clase : ".get_class($this)."\nExito");
 				}
 				$this->dbcn->finalizarTransaccion();
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"com_kycom")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"com_kycom")!="0")
 			{
				$this->dbcn->iniciarTransaccion($data);
				
				$data['where'] = "where com_kycom = '".$data['com_kycom']."'";
				$data = $this->update($data, "cmn_comunidad");
				
				$this->dbcn->finalizarTransaccion();
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"com_kycom")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"com_kycom")!="0")
 			{
				$this->dbcn->iniciarTransaccion($data);
				
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where com_kycom = '".$val['ky']."'";
					}
					$data = $this->delete($data, "cmn_comunidad");
				}//foreach ($data['lisPrp'] as $key=>$val)
					
				$this->dbcn->finalizarTransaccion();

 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"com_kycom")!="0")
 			else if($this->util->get($data,"comando") == "IMPRIMIR" && $this->util->get($data,"com_kycom")!="0")
 			{
 				$data['comandoPdf'] = "IMPRIMIR";
				$data = $this->generarPdf($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"com_kycom")!="0")
 			else if ( $this->util->get($data,"comando")=="ENVIAR_MAIL" && $this->util->get($data,"com_kycom")!="0" )
 			{
 				$data = $this->enviarOperacionMail($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"com_kycom")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nNo hay comando accion o verificar clave");
 			}
 			$result['msg'] = $data['msg'];
 			$result['com'] = $this->util->get($data, "com");
 			$result['com_kycom'] = $this->util->get($data,"com_kycom");
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>