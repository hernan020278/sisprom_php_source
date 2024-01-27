<?php 
class brw_albm extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['obtenerRowCount'] = true;
 			$data['alb_kycom'] = $_SESSION['com']['com_kycom'];
 			$data = $this->run("mus/GetListaAlbum",$data);

 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>