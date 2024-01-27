<?php 
class GetListaCedulaAuto extends Controlador
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
	 		$data['cdu_kycom'] = $_SESSION['com']['com_kycom'];
			$data = $this->run("clg/GetListaCedula",$data);

			$listaAutocomplete = Array();
			foreach ($data['lista']['items'] as $fila)
			{
				$listaAutocomplete[] = array('label' => $fila['cdu_prof'], 'value' => Array('cdu_kycdu' => $fila['cdu_kycdu'],'cdu_prof' => $fila['cdu_prof'],'cdu_asig' => $fila['cdu_asig']));
			}
			$result = $listaAutocomplete;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>