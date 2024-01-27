<?php 
class GetListaReglaAuto extends Controlador
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
//  		$data['usu_kycom'] = $_SESSION['com']['com_kycom'];
			$data = $this->run("cmn/GetListaRegla",$data);
			
			$listaAutocomplete = Array();
			foreach ($data['listaRegla']['items'] as $fila)
			{
				$listaAutocomplete[] = array('label' => $fila['usu_nomb'], 'value' => Array('usu_kyusu' => $fila['usu_kyusu'],'usu_nomb' => $fila['usu_nomb']));
			}
			$result = $listaAutocomplete;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>