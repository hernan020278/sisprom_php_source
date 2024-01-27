<?php 
class brw_artifoto extends Controlador
{
	public function __construct() {parent::__construct();}

	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data['art_kycom'] = $_SESSION['com']['com_kycom'];
			$data = $this->run("GetListaArticuloFoto",$data);
	
			$result = $data['lista'];
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>