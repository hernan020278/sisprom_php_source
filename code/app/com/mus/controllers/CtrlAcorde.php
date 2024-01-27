<?php 
class CtrlAcorde extends Controlador
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
 			$data['acr_kycom'] = $this->util->get($data,"kycom");
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"acr_kyacr","0")=="0")
 			{
 				$this->dbcn->iniciarTransaccion($data);
 				
 				$dtmp = Array();
 				$dtmp['acr_kycom'] = $data['acr_kycom'];
 				$dtmp['acr_nomb'] = $data['acr_nomb'];
 				$dtmp['acr_inst'] = $data['acr_inst'];
 				$dtmp['acr_nota'] = $data['acr_nota'];
 				$dtmp['acr_tono'] = $data['acr_tono'];
 				$dtmp['acr_vers'] = $data['acr_vers'];

 				$dtmp = $this->run("GetListaAcorde",$dtmp);

 				if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");}
 				else{$data['msg'] = Array("type"=>"success","text"=>"Clase : ".get_class($this)."\nExito");}
 				
  				if($data['msg']['type']=="success")
 				{
 					$data['acr_esta'] = "0001";
 					$data = $this->insert($data, "mus_acorde");
 				}//if($data['msg']['type']=="success")

 				$this->dbcn->finalizarTransaccion();
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"acr_kyacr")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"acr_kyacr")!="0")
 			{
				$this->dbcn->iniciarTransaccion($data);
				
				$data['where'] = "where acr_kyacr = '".$data['acr_kyacr']."'";
				$data = $this->update($data, "mus_acorde");
				
				$this->dbcn->finalizarTransaccion();
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"acr_kyacr")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"acr_kyacr")!="0")
 			{
				$this->dbcn->iniciarTransaccion($data);
				
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where acr_kypdr = '".$val['ky']."'";
						$data = $this->delete($data, "mus_acorde");

						$data['where'] = "where acr_kyacr = '".$val['ky']."'";
						$data = $this->delete($data, "mus_acorde");
					}
					
				}//foreach ($data['lisPrp'] as $key=>$val)
					
				$this->dbcn->finalizarTransaccion();

 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"acr_kyacr")!="0")
 			else if($this->util->get($data,"comando") == "IMPRIMIR" && $this->util->get($data,"acr_kyacr")!="0")
 			{
 				$data['comandoPdf'] = "IMPRIMIR";
				$data = $this->generarPdf($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"acr_kyacr")!="0")
 			else if ( $this->util->get($data,"comando")=="ENVIAR_MAIL" && $this->util->get($data,"acr_kyacr")!="0" )
 			{
 				$data = $this->enviarOperacionMail($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"acr_kyacr")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nNo hay comando accion o verificar clave");
 			}
 			$result['msg'] = $data['msg'];
 			$result['acr_kyacr'] = $this->util->get($data,"acr_kyacr");
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>