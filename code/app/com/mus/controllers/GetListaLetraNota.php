<?php 
class GetListaLetraNota extends Controlador 
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		return $this->ejecutar($data);
	}
	
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio
				
			$data['sql'] = "SELECT ltr.ltr_kyltr, ltr.ltr_kycnc, ltr.ltr_dscr, ltr_tnta, ltr.ltr_link, ltr.ltr_esta, ltr.ltr_orde, 
				nta.nta_kynta, acr.acr_nomb, nta.nta_ejex
				FROM mus_letra ltr 
				LEFT JOIN mus_nota nta ON nta.nta_kyltr=ltr.ltr_kyltr
				LEFT JOIN mus_acorde acr ON acr.acr_kyacr=nta.nta_kyacr
				WHERE 1= 1";
			if($this->util->exist($data,'ltr_kycnc')){$data['sql'].=" and (ltr.ltr_kycnc = '".$data['ltr_kycnc']."')";}
			$data['sql'].=" ORDER BY ltr.ltr_orde ASC";

			$data = $this->run("mus/GetListaLetra",$data);

			$list = $data['lista']['items'];
			$rpta = array();
			if(count($list)>0){
				foreach($list as $item){
					$item = (Array) $item;
			
					if(!isset($rpta['listaLetra'][$item['ltr_orde']]))
					{
						$rpta['listaLetra'][$item['ltr_orde']]=Array();
						$rpta['listaLetra'][$item['ltr_orde']]['listaNota']=Array();
					}
					$rpta['listaLetra'][$item['ltr_orde']]['ltr_kyltr']=$item['ltr_kyltr'];
					$rpta['listaLetra'][$item['ltr_orde']]['ltr_kycnc']=$item['ltr_kycnc'];
					$rpta['listaLetra'][$item['ltr_orde']]['ltr_dscr']=$item['ltr_dscr'];
					$rpta['listaLetra'][$item['ltr_orde']]['ltr_tnta']=$item['ltr_tnta'];
					$rpta['listaLetra'][$item['ltr_orde']]['ltr_link']=$item['ltr_link'];
					$rpta['listaLetra'][$item['ltr_orde']]['ltr_orde']=$item['ltr_orde'];
					$rpta['listaLetra'][$item['ltr_orde']]['ltr_esta']=$item['ltr_esta'];
						
					if( isset($item['nta_kynta']) )
					{
						if(!isset($rpta['listaLetra'][$item['ltr_orde']]['listaNota'][$item['nta_kynta']]))
						{
							$rpta['listaLetra'][$item['ltr_orde']]['listaNota'][$item['nta_kynta']]=Array();
						}
						$rpta['listaLetra'][$item['ltr_orde']]['listaNota'][$item['nta_kynta']]['nta_kynta']=$item['nta_kynta'];
						$rpta['listaLetra'][$item['ltr_orde']]['listaNota'][$item['nta_kynta']]['acr_nomb']=$item['acr_nomb'];
						$rpta['listaLetra'][$item['ltr_orde']]['listaNota'][$item['nta_kynta']]['nta_ejex']=$item['nta_ejex'];
					}
				}//foreach($list as $item){
			}//if(count($list)>0){

			$data['msg'] = ( ( isset($rpta['listaLetra']) && count($rpta['listaLetra']) > 0 ) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
			
			$result['msg'] = $data['msg'];
			$result['lista']['items'] = ( isset($rpta['listaLetra']) ? $rpta['listaLetra'] : Array() );
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}	
}
?>