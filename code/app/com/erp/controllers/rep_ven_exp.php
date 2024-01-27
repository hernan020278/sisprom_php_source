<?php 
class rep_ven_exp extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function printReport($data)
 	{
 		$result = null;
 		try
 		{
			$suc_kysucu = ((isset($data['suc_kysucu']))?$data['suc_kysucu']:"");
 			$usu_kyusu = ((isset($data['usu_kyusu']))?$data['usu_kyusu']:"");
 			$usu_tipo = ((isset($data['usu_tipo']))?$data['usu_tipo']:"");
 			$doc_kaut = ((isset($data['doc_kaut']))?$data['doc_kaut']:"");
 			$doc_fini = ((isset($data['doc_fini']))?$data['doc_fini']:date('Y-m-d'));
 			$doc_ffin = ((isset($data['doc_ffin']))?$data['doc_ffin']:date('Y-m-d'));
 			
 			$modulo = $data['modulo'];
 			$reportName = $data['reportName'];
 			$reportTitle = $data['reportTitle'];
 			$format = $data['optFormat'];
 			
 			$reportData = Array();
 			
 			$reportData['data']['fini']=$doc_fini;
 			$reportData['data']['ffin']=$doc_ffin;
 			
 			$reportData['data']['tipOpe'] = $this->util->tipOpe;
 			$reportData['data']['tipDoc'] = $this->util->tipDoc;
 			$reportData['data']['estado'] = $this->util->estado;
 			
 			$where = "doc.esta!='0000' and doc.esta!='0003' and art.tipo='SERVICIO'";
 			
 			if(!empty($suc_kysucu)){$where.=" and doc.id_sucu=".$suc_kysucu;}
 			if(!empty($usu_kyusu))
 			{
 				if(!empty($usu_tipo) && $usu_tipo=="TRA"){$where.=" and doc.id_trab=".$usu_kyusu;}
 				if(!empty($usu_tipo) && ( $usu_tipo=="CLI" || $usu_tipo=="PRO" ) ){$where.=" and doc.id_enti=".$usu_kyusu;}
 			}
 			if(!empty($doc_fini) && !empty($doc_ffin)){$where.=" and (date(doc.freg)>='".$doc_fini."' and date(doc.freg)<='".$doc_ffin."')";}
 			if(!empty($doc_kaut)){$where.=" and doc.tope='0008' and doc.todr='0002'";}
 			else{$where.=" and doc.tope='0002'";}
 			
 			$reportData['data']['lista']=$this->documento->listaExport("SELECT", 0, 10000, $where, "");
			$data['data']=$reportData['data'];
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>