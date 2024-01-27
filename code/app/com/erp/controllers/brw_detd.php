<?php 
class brw_detd extends Controlador
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
 			$data['obtenerRowCount'] = true;
 			$data['dtd_kycom'] = $_SESSION['com']['com_kycom'];
 			$data = $this->run("erp/GetListaDetdocumento",$data);
 			
 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>