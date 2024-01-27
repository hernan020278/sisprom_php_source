<?php 
class ActualizarUsuario extends Controlador
{
	public function __construct() {parent::__construct();}
	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['where'] = "where usu_kyusu='".$data['usu_kyusu']."'";
							 				
			$data = $this->update($data, "cmn_usuario");
			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>