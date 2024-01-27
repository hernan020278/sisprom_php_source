<?php 
class CtrlComapp extends Controlador
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
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"cap_kycap","0")=="0")
 			{
 				$this->dbcn->iniciarTransaccion($data);

 				$dtmp = Array();
 				$dtmp['cap']['cap_kyusu'] = $data['cap']['cap_kyusu'];
 				$dtmp['cap']['cap_kycom'] = $data['cap']['cap_kycom'];
 				$dtmp['cap']['cap_kyapp'] = $data['cap']['cap_kyapp'];
 					
 				$dtmp = $this->run("cmn/GetListaComapp",$dtmp['cap']);
 				
 				if(count($dtmp['lista']['items'])>0)
 				{
 				    $data['cap_kycap'] = $dtmp['lista']['items'][0]['cap_kycap'];
 				    $data['cap'] = $dtmp['lista']['items'][0];
 				    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
 				}
 				else
 				{
 				  $dtmp = Array();
 				  $dtmp['cap'] = $data['cap'];
 				  $dtmp = $this->insert($dtmp['cap'], "cmn_comapp");
 				  $data['cap']['cap_kycap'] = $dtmp['cap_kycap'];
 				  $data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");
 				}
 				
 				$this->dbcn->finalizarTransaccion();
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"cap_kycap")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"cap_kycap")!="0")
 			{
				$this->dbcn->iniciarTransaccion($data);
				
				$data['where'] = "where cap_kycap = '".$data['cap_kycap']."'";
				$data = $this->update($data, "cmn_comapp");
				
				$this->dbcn->finalizarTransaccion();
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"cap_kycap")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"cap_kycap")!="0")
 			{
				$this->dbcn->iniciarTransaccion($data);
				
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where cap_kycap = '".$val['ky']."'";
					}
					$data = $this->delete($data, "cmn_comapp");
				}//foreach ($data['lisPrp'] as $key=>$val)
					
				$this->dbcn->finalizarTransaccion();

 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"cap_kycap")!="0")
 			else if($this->util->get($data,"comando") == "IMPRIMIR" && $this->util->get($data,"cap_kycap")!="0")
 			{
 				$data['comandoPdf'] = "IMPRIMIR";
				$data = $this->generarPdf($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"cap_kycap")!="0")
 			else if ( $this->util->get($data,"comando")=="ENVIAR_MAIL" && $this->util->get($data,"cap_kycap")!="0" )
 			{
 				$data = $this->enviarOperacionMail($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"cap_kycap")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nNo hay comando accion o verificar clave");
 			}
 			$result['msg'] = $data['msg'];
 			$result['cap_kycap'] = $this->util->get($data,"cap_kycap");
 			$result['cap'] = $this->util->get($data,"cap");
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>