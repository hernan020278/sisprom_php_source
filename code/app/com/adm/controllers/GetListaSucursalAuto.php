<?php 
class GetListaSucursalAuto extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		return $this->ejecutar($data);
	}//public function index()
	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['suc_kycom'] = $_SESSION['com']['com_kycom'];
			$data = $this->run("adm/GetListaSucursal",$data);

			$listaAutocomplete = Array();
			foreach ($data['lista']['items'] as $fila)
			{
				$listaAutocomplete[] = array('label' => $fila['suc_nomb'], 'value' => Array('suc_kysuc' => $fila['suc_kysuc'],'suc_tipo' => $fila['suc_tipo'],'suc_nomb' => $fila['suc_nomb']));
			}
			$result = $listaAutocomplete;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>