<?php 
class brw_matr extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['obtenerRowCount'] = true;
// 			$data['mtr_kycom'] = $_SESSION['com']['com_kycom'];
 			$data = $this->run("clg/GetListaMatricula",$data);

 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>