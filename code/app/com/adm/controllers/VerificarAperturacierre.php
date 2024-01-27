<?php 
class VerificarAperturacierre extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = Array();
		$data['usu_kyusu'] = 199;
		$data = $this->run("adm/VerificarAperturacierre",$data);
		var_dump($data);
	}
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data = $this->getFiltro($data);//Inicio 
 			if($this->util->get($data,"apc_kyapc","0")=="0")
 			{
 				$dtmp = Array();
 				$dtmp['apc_kycom'] = $this->util->get($data,"apc_kycom");
 				$dtmp['apc_kysuc'] = $this->util->get($data,"apc_kysuc");
 				$dtmp['apc_kyusu'] = $this->util->get($data,"apc_kyusu");
 				$dtmp['suc_tipo'] = "CAGE";
				$dtmp = $this->run("adm/GetListaAperturacierre",$dtmp);

				if(count($dtmp['lista']['items'])>0){$data['apc_kyapc']=$dtmp['lista']['items'][0]['apc_kyapc'];$data['msg'] = Array("type"=>"error","text"=>"Registro existe");}
				else{$data['msg'] = Array("type"=>"success","text"=>"Exito");}
 				 				
 				if($data['msg']['type']=="success")
 				{
 					$dtmp = Array();
 					
 					$data = $this->insert($data, "adm_aperturacierre");
 					
 					$data['ope_kycom'] = $data['apc_kycom'];
 					$data['ope_kyapc'] = $data['apc_kyapc'];
 					$data['ope_peri'] = $data['apc_fini'];;
 					$data['ope_freg'] = $data['apc_fini'];
 					$data['ope_fope'] = $data['apc_fini'];
 					$data['ope_fpag'] = $data['apc_fini'];
 					$data['ope_tope'] = "APERTURA";//[0019: APERTURA]
 					$data['ope_tdoc'] = "0029";//[0029: RECIBO CAJA]
 					$data['ope_ndoc'] = '0-0';
 					$data['ope_otip'] = "APERTURA";
 					$data['ope_mmon'] = "0001";
 					$data['ope_mimp'] = 0.00;
 					$data['ope_tcam'] = "CANCELA";
 					$data['ope_debe'] = 0.00;
 					$data['ope_habe'] = 0.00;
 					$data['ope_pobs'] = "APERTURA DE CAJA";
 					$data = $this->insert($data, "adm_operacion");
 				}
 			}
 			else
 			{
				$data['where'] = "where apc_kyapc = '".$data['apc_kyapc']."'";
				$data = $this->update($data, "adm_aperturacierre");
 			}
 			
 			$result['msg'] = $data['msg'];
 			$result['apc_kyapc'] = $this->util->get($data,"apc_kyapc");
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>