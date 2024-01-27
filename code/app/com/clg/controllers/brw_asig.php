<?php 
class brw_asig extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['obtenerRowCount'] = true;
// 			$data['usu_kycom'] = $_SESSION['com']['com_kycom'];
 			$data['mtr_kysuc'] = $data['main_kysuc'];
 			 			
 			$data = $this->run("clg/GetListaAsignatura",$data);

 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>