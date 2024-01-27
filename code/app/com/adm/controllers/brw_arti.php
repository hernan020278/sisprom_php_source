<?php 
class brw_arti extends Controlador
{
	public function __construct() {parent::__construct();}

	public function ejecutar($data)
	{
		$result = null;
		try
		{
		  $data['obtenerRowCount'] = true;
			$data['art_kycom'] = $_SESSION['com']['com_kycom'];
			$data = $this->run("adm/GetListaArticulo",$data);
	
			$result = $data['lista'];
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>