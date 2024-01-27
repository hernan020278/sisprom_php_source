<?php 
class brw_vwkar extends Controlador
{
	public function __construct() {parent::__construct();}

	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data['art_kycom'] = $_SESSION['com']['com_kycom'];
			$data = $this->run("GetListaViewkardex",$data);
	
			$result = $data['lista'];
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>