<?php 
class brw_comm extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['obtenerRowCount'] = true;
 			$data = $this->run("cmn/GetListaComunidad",$data);
 			
 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>