<?php 
class rep_cmp extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function printReport($data)
 	{
 		$result = null;
 		try
 		{
 			$suc_kysucu = ((isset($data['suc_kysucu']))?$data['suc_kysucu']:"");
 			$usu_kyusu = ((isset($data['usu_kyusu']))?$data['usu_kyusu']:"");
 			$doc_tope = ((isset($data['doc_tope']))?$data['doc_tope']:"");
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
 			
 			$where = "1=1";
 			
 			if(!empty($suc_kysucu)){$where.=" and doc.id_sucu=".$suc_kysucu;}
 			if(!empty($usu_kyusu)){$where.=" and doc.id_sucu=".$suc_kysucu;}
 			if(!empty($doc_fini) && !empty($doc_ffin)){$where.=" and (date(doc.freg)>='".$doc_fini."' and date(doc.freg)<='".$doc_ffin."')";}

 			$select = "";
 			$from="";
 			if(!empty($doc_tope) && $doc_tope=='0007')
 			{
 				$select = "select doc.*, suc.nomb sucNomb, tra.nomb traNomb, tra.ape1 traApe1, tra.ape2 traApe2,
				(select case when sum(ope.mimp) is null then 0.00 else sum(ope.mimp) end from erp_operacion ope where ope.id_docu=doc.id_docu and ope.dtip='EGRESO') scan,
				(
	    			doc.tota -
	    			(select case when sum(ope.mimp) is null then 0.00 else sum(ope.mimp) end from erp_operacion ope where ope.id_docu=doc.id_docu and ope.dtip='EGRESO')
	    		) spag"; 
 				if(!empty($doc_kaut))
 				{
 					$from = "from erp_sucursal suc
	 					inner join erp_documento doc on doc.id_sucu = suc.id_sucu
	 					inner join erp_documento pdr on pdr.id_docu = doc.id_padr
	 					left join erp_entidad tra on tra.id_enti = doc.id_trab";
// 						inner join erp_detdocumento ddo on doc.id_docu = ddo.id_docu
// 						inner join erp_articulo art on art.id_arti = ddo.id_arti";
 					$where.=" and pdr.tope='0001' and pdr.esta='0001' and doc.tope='0007' and doc.esta='0001'";
 				}
 				else{$where.=" and doc.tope='0007' and (doc.esta!='0000' or doc.esta!='0003')";}	
 			}
 			else
 			{
 				$select = "select doc.kycom kycom, suc.id_sucu, suc.nomb sucNomb, tra.nomb traNomb, tra.ape1 traApe1, tra.ape2 traApe2,
					doc.id_enti, doc.id_docu, doc.id_dref, doc.esta, doc.tope, doc.tdoc, doc.ndoc, doc.nref, doc.etdo, doc.enom, doc.endo, doc.freg, doc.tota, doc.stot, doc.igve,
					(select case when sum(ope.mimp) is null then 0.00 else sum(ope.mimp) end from erp_operacion ope where ope.id_docu=doc.id_docu and ope.dtip='EGRESO') 
					scan,
					(doc.tota -(select case when sum(ope.mimp) is null then 0.00 else sum(ope.mimp) end from erp_operacion ope where ope.id_docu=doc.id_docu and ope.dtip='EGRESO')) spag";
 				if(!empty($doc_kaut))
 				{
 					$from = "from erp_sucursal suc
	 					inner join erp_documento doc on doc.id_sucu = suc.id_sucu
	 					inner join erp_documento hij on hij.id_padr = doc.id_docu
	 					left join erp_entidad tra on tra.id_enti = doc.id_trab";
// 						inner join erp_detdocumento ddo on doc.id_docu = ddo.id_docu
// 						inner join erp_articulo art on art.id_arti = ddo.id_arti"; 
 					$where.=" and doc.tope='0001' and doc.esta='0001' and hij.tope='0007' and hij.esta='0001'";					
 				}
 				else{$where.=" and doc.tope='0001' and (doc.esta!='0000' or doc.esta!='0003')";}
 			}
 			
 			$reportData['data']['respNiv1']=$this->documento->getListaMix("SELECT", 0, 10000, $select, $from, $where, "", "", "");
 			if($data['moda']=='DETALLADO'){
 				foreach($reportData['data']['respNiv1'] as $i=>$item){
 					$reportData['data']['respNiv1'][$i]->detalle=$this->detdocumento->get_lista($item->id_docu);
 				}
 			}
			$data['data']=$reportData['data'];
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>