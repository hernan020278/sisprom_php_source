<?php 
class brw_myapps extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['com_kycom'] = $data['kycom'];
 			$data = $this->run("cmn/GetListaAppsByUsuario",$data);
 			$result=$data['lista'];
 			
 			$data['msg'] = ((count($data['lista']) > 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
 			
 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>