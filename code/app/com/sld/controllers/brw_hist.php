<?php 
class brw_hist extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['obtenerRowCount'] = true;
 			$data['cit_kycom'] = $_SESSION['com']['com_kycom'];
 			$data = $this->run("sld/GetListaHistoria",$data);

 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>