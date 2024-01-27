<?php 
class brw_usua extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 		    $data['obtenerRowCount'] = true;
 		    
 			$data = $this->run("cmn/GetListaUsuario",$data);

 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>