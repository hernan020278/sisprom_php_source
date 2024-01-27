<?php 
class GetListaCtacorrienteAuto extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index($data)
	{
		return $this->ejecutar($data);
	}//public function index()
	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['cco_kycom'] = $_SESSION['com']['com_kycom'];
 			$data['pagerows'] = 10;
 			$data['sql'] = "select ent.usu_kyusu, ent.usu_nomb, cco.cco_kycco, cco.cco_tcta, bnc.prp_prop bnc_prop, cco.cco_ndoc, cco.cco_tmon
				from adm_ctacorriente cco
				inner join cmn_usuario ent on ent.usu_kyusu=cco.cco_kyusu
				inner join adm_propiedad bnc on bnc.prp_kyprp=cco.cco_kybnc ";
 			$data = $this->run("adm/GetListaCtacorriente",$data);

 			$listaAutocomplete = Array();
 			foreach ($data['lista']['items'] as $fila)
 			{
 			  $label = (($fila['usu_nomb']=="Seleccione")?$fila['usu_nomb']:substr($fila['usu_nomb'],0,3).substr($fila['bnc_prop'],0,3).substr($fila['cco_ndoc'],-4).substr($fila['cco_tcta'],0,3).substr($fila['cco_tmon'],0,3));
 				$listaAutocomplete[] = array('label' => $label, 'value' => Array('usu_kyusu'=>$fila['usu_kyusu'], 'cco_kycco'=>$fila['cco_kycco'], 'usu_nomb'=>$label, 'bnc_prop'=>$fila['bnc_prop']));
 			}
 			$result = $listaAutocomplete;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	} 	
}
?>