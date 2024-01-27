<?php 
class GetListaPoliticaAuto extends Controlador
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
			$data = $this->run("cmn/GetListaPolitica",$data);

			$listaAutocomplete = Array();
			foreach ($data['lista']['items'] as $fila)
			{
				switch ($this->util->get($data,"campo")){
					case "pol_dscr":
						$label = $fila['pol_dscr'];
						break;
					default:
						$label = $fila['pol_nomb'];
						break;
				}
				$listaAutocomplete[] = Array('label' => $label, 'value' => Array('pol_kypol' => $fila['pol_kypol'], 'pol_tipo' => $fila['pol_tipo'], 'pol_nomb' => $fila['pol_nomb'], 'pol_dscr' => $fila['pol_dscr'], 'pol_link' => $fila['pol_link']));
			}
			$result = $listaAutocomplete;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>