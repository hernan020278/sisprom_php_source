<?php 
class GetListaProvAuto extends Controlador
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
 			$data['groupby'] = "group by lug_prov";
 			$data['lug_prov'] = $data['term'];
			$data = $this->run("GetListaLugar",$data);

			$listaAutocomplete = Array();
			foreach ($data['listaLugar']['items'] as $fila)
			{
				$listaAutocomplete[] = array('label' => $fila['lug_prov'], 'value' => Array('lug_kylug' => $fila['lug_kylug'],'lug_prov' => $fila['lug_prov']));
			}
			$result = $listaAutocomplete;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>