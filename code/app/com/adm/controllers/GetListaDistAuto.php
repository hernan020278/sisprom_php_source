<?php 
class GetListaDistAuto extends Controlador
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
 			$data['pagerows'] = 10;
 			$data['suc_kycom'] = $_SESSION['com']['com_kycom'];
 			$data['lug_dist'] = $data['term'];
			$data = $this->run("adm/GetListaLugar",$data);

			$listaAutocomplete = Array();
			foreach ($data['listaLugar']['items'] as $fila)
			{
				$listaAutocomplete[] = array('label' => $fila['lug_dist'], 'value' => Array('lug_kylug' => $fila['lug_kylug'],'lug_dist' => $fila['lug_dist']));
			}
			$result = $listaAutocomplete;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>