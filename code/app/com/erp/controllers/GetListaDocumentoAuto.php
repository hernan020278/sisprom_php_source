<?php 
class GetListaDocumentoAuto extends Controlador
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
 			$data['doc_kycom'] = $_SESSION['com']['com_kycom'];
 			$data['pagerows'] = 10;
			$data = $this->run("erp/GetListaDocumento",$data);
			
			$listaAutocomplete = Array();
			foreach ($data['lista']['items'] as $fila)
			{
			  
				switch ($this->util->get($data,"campo")){
					case "doc_combo":
						break;
					default:
						$label = $fila[$data['campo']];
						break;
				}
				$listaAutocomplete[] = array('label' => $label, 'value' => Array(
				  'doc_kydoc' => $fila['doc_kydoc'],
				  'doc_tope' => $fila['doc_tope'],
				  'doc_tdoc' => $fila['doc_tdoc'],
				  'doc_ndoc' => $fila['doc_ndoc'],
				  'doc_enom' => $fila['doc_enom'],
				  'doc_tota' => $fila['doc_tota'],
				  'doc_tpag' => $fila['doc_tpag']));
			}
			$result = $listaAutocomplete;	
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>