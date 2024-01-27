<?php 
class brw_canc extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['obtenerRowCount'] = true;
// 			$data['cnc_kycom'] = $_SESSION['com']['com_kycom'];
 			$data = $this->run("mus/GetListaCancion",$data);

 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>