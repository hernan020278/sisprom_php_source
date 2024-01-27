<?php 
class brw_dash_gene extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = Array();
		$data['kycom'] = 250;
		$data = $this->run("brw_dash_gene",$data);
		$data['msg'] = Array("type"=>"success","text"=>"Exito");
		echo json_encode($data);
	}
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['obtenerRowCount'] = true;
 			$data['ope_kycom'] = $_SESSION['com']['com_kycom'];
 			$data['pagerows'] = 1000;
 			$data = $this->run("adm/GetListaDashboardGeneral",$data);

 			$rpta = array();
 			if(count($data['lista']['items'])>0)
 			{
				/** *********************************************
 				 ** AGRUPAR DATA POR : CUENTA - ENTIDAD - CLASE *
 				 ** *********************************************/
 				foreach($data['lista']['items'] as $item){
 					$item = (Array) $item;
					
 					if(!isset($rpta['items'][$item['nva_kyniv']]))
 					{
 						$rpta['items'][$item['nva_kyniv']] = Array();
 						$rpta['items'][$item['nva_kyniv']]['items'] = Array();
 						$rpta['items'][$item['nva_kyniv']]['nva_tota'] = 0;
 					}
 					$rpta['items'][$item['nva_kyniv']]['nva_kyniv']=$item['nva_kyniv'];
 					$rpta['items'][$item['nva_kyniv']]['nva_nomb']=$item['nva_nomb'];
 					$rpta['items'][$item['nva_kyniv']]['nva_omon']=$item['ope_omon'];
 					$rpta['items'][$item['nva_kyniv']]['nva_otip']=$item['ope_otip'];
 					$rpta['items'][$item['nva_kyniv']]['nva_tota']+=( ($item['ope_otip']=="EGRESO") ? (-1*$item['ope_oimp']) : $item['ope_oimp'] );
 			
 					if(!isset($rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]))
 					{
 						$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']] = Array();
 						$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['items'] = Array();
 						$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['nvb_tota'] = 0;
 					}
 					$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['nvb_kyniv']=$item['nvb_kyniv'];
 					$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['nvb_nomb']=$item['nvb_nomb'];
 					$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['nvb_omon']=$item['ope_omon'];
 					$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['nvb_otip']=$item['ope_otip'];
 					$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['nvb_tota']+=( ($item['ope_otip']=="EGRESO") ? (-1*$item['ope_oimp']) : $item['ope_oimp'] );
 			
 					if(isset($item['nvc_kyniv']))
 					{
 						if(!isset($rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['items'][$item['nvc_kyniv']]))
 						{
 							$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['items'][$item['nvc_kyniv']]=Array();
 							$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['items'][$item['nvc_kyniv']]['items']=Array();
 							$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['items'][$item['nvc_kyniv']]['nvc_tota'] = 0;
 						}
 						$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['items'][$item['nvc_kyniv']]['nvc_kyniv']=$item['nvc_kyniv'];
 						$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['items'][$item['nvc_kyniv']]['nvc_nomb']=$item['nvc_nomb'];
 						$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['items'][$item['nvc_kyniv']]['nvc_omon']=$item['ope_omon'];
 						$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['items'][$item['nvc_kyniv']]['nvc_otip']=$item['ope_otip'];
 						$rpta['items'][$item['nva_kyniv']]['items'][$item['nvb_kyniv']]['items'][$item['nvc_kyniv']]['nvc_tota']+=( ($item['ope_otip']=="EGRESO") ? (-1*$item['ope_oimp']) : $item['ope_oimp'] );
 					}//if(isset($item['nvc_kyniv']))
 				}//foreach($list as $item){
 				 		
 				$data['lista']['items'] = $rpta['items'];
 			}//if(count($list)>0){ 			
 			$data['lista']['msg'] = Array("type"=>"success","text"=>"Exito");
			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	} 	
}
?>