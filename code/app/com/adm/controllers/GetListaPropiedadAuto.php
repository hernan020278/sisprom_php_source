<?php 
class GetListaPropiedadAuto extends Controlador
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
	 		$data['prp_kycom'] = $_SESSION['com']['com_kycom'];
// 			$data['prp_nive'] = $this->util->get($data,"prp_nive", 2);
			$data = $this->run("adm/GetListaPropiedad",$data);

			$listaAutocomplete = Array();
			foreach ($data['lista']['items'] as $fila)
			{
			    $listaAutocomplete[] = array('label' => $fila[$data['campo']], 'value' => Array('prp_kyprp' => $fila['prp_kyprp'],'prp_secc' => $fila['prp_secc'],'prp_codi' => $fila['prp_codi'], 'prp_prop' => $fila['prp_prop'], 'prp_valu' => $fila['prp_valu'], 'prp_dscr' => $fila['prp_dscr']));
			}
			$result = $listaAutocomplete;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>