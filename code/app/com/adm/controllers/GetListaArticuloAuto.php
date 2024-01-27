<?php 
class GetListaArticuloAuto extends Controlador
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
 			$data['art_kycom'] = $_SESSION['com']['com_kycom'];
 			$data['pagerows'] = 10;

			$data = $this->run("adm/GetListaArticulo",$data);
			
			$listaAutocomplete = Array();
			foreach ($data['lista']['items'] as $fila)
			{
			  $prueba = $this->util->redStrPrec($fila['art_pund']);
				switch ($this->util->get($data,"campo")){
					case "art_combo":
					  $strArtDscr = $this->util->llenarCaracter($fila['art_sact'], 4)." | ".
					  $this->util->llenarCaracter($fila['art_nomb'], 70)." | ".
            $this->util->llenarCaracter($fila['art_marc'], 12)." | ".
            $this->util->llenarCaracter($this->util->redStrPrec($fila['art_pund']), 6, "D")." | ";

					  $strArtNomb = $fila['art_nomb']." : ".$fila['art_marc'];
						
						$label = $strArtDscr;
						break;
					default:
						$label = $fila[$data['campo']];
						break;
				}
				$listaAutocomplete[] = array('label' => $label, 'value' => Array(
				  'art_combo' => $strArtNomb,
				  'art_kyart' => $fila['art_kyart'],
				  'art_codi' => $fila['art_codi'],
				  'art_iden' => $fila['art_iden'],
				  'art_nomb' => $fila['art_nomb'],
				  'art_marc' => $fila['art_marc'],
				  'art_clas' => $fila['art_clas'],
				  'art_dscr' => $fila['art_dscr'],
				  'art_pres' => $fila['art_pres'],
				  'art_conc' => $fila['art_conc'],
				  'art_titu' => $fila['art_titu'],
				  'art_frsn' => date("Y-m-d", strtotime($fila['art_frsn'])),
				  'art_unid' => $fila['art_unid'],
				  'art_sact' => $fila['art_sact'],
				  'art_pcos' => $fila['art_pcos'],
				  'art_pund' => $fila['art_pund']));
			}
			$result = $listaAutocomplete;	
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>