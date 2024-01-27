<?php 
class GetListaUsuarioAuto extends Controlador
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
 			$data['pagerows'] = 5;
 			$data['com_kycom'] = $_SESSION['com']['com_kycom'];
			$data = $this->run("cmn/GetListaUsuario",$data);

			$listaAutocomplete = Array();
			foreach ($data['lista']['items'] as $fila)
			{
				switch ($this->util->get($data,"campo")){
				    case "usu_nomb":
				      $label = $fila['usu_nomb'];
				      break;
				    default:
						  $label = $fila[$data['campo']];
						break;
				}
				$listaAutocomplete[] = array('label' => $label, 'value' => Array(
				  'usu_kyusu' => $fila['usu_kyusu'],
				  'usu_nomb' => $fila['usu_nomb'],
				  'usu_ndoc' => $fila['usu_ndoc'],
				  'usu_tdoc' => $fila['usu_tdoc'],
				  'usu_dire' => $fila['usu_dire'],
				  'usu_foto' => $fila['usu_foto']));
			}
			$result = $listaAutocomplete;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>