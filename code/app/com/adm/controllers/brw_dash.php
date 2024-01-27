<?php 
class brw_dash extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['obtenerRowCount'] = true;
 			$data['ope_kycom'] = $_SESSION['com']['com_kycom'];
 			$data['pagerows'] = 20;
 			$data = $this->run("adm/GetListaDashboard",$data);

 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>