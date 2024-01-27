<?php 
class brw_oper extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['obtenerRowCount'] = true;
 			$data['ope_kycom'] = isset($_SESSION['com']) ? $_SESSION['com']['com_kycom'] : $data['kycom'];
 			$data = $this->run("adm/GetListaOperacion",$data);
 			
 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>