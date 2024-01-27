<?php 
class ctg_acrd extends Controlador
{
	public function __construct() {parent::__construct();}

	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data['acr_kycom'] = $_SESSION['com']['com_kycom'];

			$selectIn = "";
			$arrNota = explode(":",$data['ltr_dscr']);
			if( trim(strtoupper($arrNota[0]))=="RASGUEO"){
				$arrNota = explode("-", $arrNota[1]);
				foreach ( $arrNota as $key => $val ){
					if(!empty($val)){
						$selectIn .= "'".trim($val)."',";
					}
				}
				$selectIn = substr($selectIn, 0, strlen($selectIn)-1);
				$selectIn = "(".$selectIn.")";
				$data['acr_dscr_in'] = $selectIn;
			}
			
			$data['acr_nota'] = ( ( $this->util->get($data,"acr_nota")=='Todos' ) ? '' : $data['acr_nota'] );
// 			$data['acr_tono'] = ( ( $this->util->get($data,"acr_tono")=='Todos' ) ? '' : $data['acr_tono'] );
// 			$data['acr_vers'] = ( ( $this->util->get($data,"acr_vers")=='Todos' ) ? '' : $data['acr_vers'] );
			$data = $this->run("mus/GetListaAcorde",$data);
			
			$dataTmp = Array();
			$dataTmp['sql'] = "SELECT acr_nota, acr_tono, acr_vers FROM mus_acorde GROUP BY acr_nota, acr_tono, acr_vers";
			$dataTmp = $this->run("mus/GetListaAcorde",$dataTmp);		
			$lista = $dataTmp['lista']['items'];
			
			if(count($lista)>0){
				foreach($lista as $item){
					$item = (Array) $item;
						
					$data['lista']['listaNota'][$item['acr_nota']]['acr_nota']=$item['acr_nota'];
					$data['lista']['listaTono'][$item['acr_tono']]['acr_tono']=$item['acr_tono'];
					$data['lista']['listaVers'][$item['acr_vers']]['acr_vers']=$item['acr_vers'];
				}//foreach($list as $item){
			}//if(count($list)>0){

			$result = $data['lista'];
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>