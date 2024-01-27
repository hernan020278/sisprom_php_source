<?php 
class rep_venbyart extends Controlador
{
	public function __construct() {parent::__construct();}
	
 	public function printReport($data)
 	{
 		$result = null;
 		try
 		{
 			$id_sucu = ((isset($data['suc_kysucu']))?$data['suc_kysucu']:"");
 			$id_enti = ((isset($data['usu_kyusu']))?$data['usu_kyusu']:"");
 			
 			$modulo = $data['modulo'];
 			$reportName = $data['reportName'];
 			$reportTitle = $data['reportTitle'];
 			$format = $data['optFormat'];
 			
 			$fini = date('Y-m-d',strtotime($data['doc_fini']));
 			$ffin = date('Y-m-d',strtotime($data['doc_ffin']));
 			
 			$reportData = Array();
 			
 			$reportData['data']['fini']=$fini;
 			$reportData['data']['ffin']=$ffin;
 			
 			$reportData['data']['tipOpe'] = $this->util->tipOpe;
 			$reportData['data']['tipDoc'] = $this->util->tipDoc;
 			
 			$where="1=1 and tope='0002'";
 			if(!empty($id_sucu)){$where.=" and doc.id_sucu=".$id_sucu;}
 			if(!empty($id_enti)){$where.=" and doc.id_enti=".$id_enti;}
 			if(!empty($fini) && !empty($fini)){$where.=" and date(freg)>='".$fini."' and date(freg)<='".$ffin."'";}
 			
 			$lisVenbyart=(Array)$this->documento->getListaVentaByArticulo("SELECT", 0, 2000, $where);
 				
 			$rpta = array();
 			if(count($lisVenbyart)>0){
 				foreach($lisVenbyart as $item){
 					$item=(Array) $item;
 					if(!isset($rpta[$item['id_enti']]))
 					{
 						$rpta[$item['id_enti']]['cliente']=$item['enom'];
 						$rpta[$item['id_enti']]['lisDdo']=array();
 						$rpta[$item['id_enti']]['total']=0.00;
 					}
 					$rpta[$item['id_enti']]['lisDdo'][$item['id_ddoc']] = $item;
 					$rpta[$item['id_enti']]['total']+=$item['cant'];
 				}
 			}
 			
 			$reportData['data']['lisVenbyart']=$rpta;
			$data['data']=$reportData['data'];
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>