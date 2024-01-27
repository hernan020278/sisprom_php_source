<?php 
class rep_ect extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function printReport($data)
 	{
 		$result = null;
 		try
 		{
 			$usu_kyusu = (isset($data['usu_kyusu'])?$data['usu_kyusu']:"");
 			
 			$modulo = $data['modulo'];
 			$reportName = $data['reportName'];
 			$reportTitle = $data['reportTitle'];
 			$format = $data['optFormat'];
 			
 			$reportData = Array();
 			
 			$reportData['data']['tipOpe'] = $this->util->tipOpe;
 			$reportData['data']['tipDoc'] = $this->util->tipDoc;
 			$select="select doc.id_docu, doc.tope doc_tope, doc.tdoc doc_tdoc, doc.ndoc doc_ndoc, doc.nref doc_nref, doc.enom, doc.femi doc_femi, doc.freg doc_freg, doc.tota, doc.esta, doc.fpag, doc.tmon, ope.*,
				(select case when sum(ope.mimp) is null then 0.00 else sum(ope.mimp) end from erp_operacion ope where ope.id_docu=doc.id_docu) scan,
				(doc.tota - (select case when sum(ope.mimp) is null then 0.00 else sum(ope.mimp) end from erp_operacion ope where ope.id_docu=doc.id_docu)) spag,
				tra.ndoc tra_ndoc, tra.nomb tra_nomb, tra.ape1 tra_apel, tra.ape2 tra_ape2,
				ctc.banc ctc_banc";
 			$from = "from erp_sucursal suc 
			left join erp_aperturacierre apc on apc.id_sucu=suc.id_sucu
			left join erp_operacion ope on ope.id_apci=apc.id_apci
			left join erp_documento doc on doc.id_docu=ope.id_docu
			left join erp_entidad ent on doc.id_enti=ent.id_enti
			left join erp_entidad tra on doc.id_trab=tra.id_enti
			left join erp_ctacorriente ctc on ope.id_ccor=ctc.id_ccor";
 			$where="1=1 and (ope.esta='0001')";
 			if(!empty($usu_kyusu)){$where.=" and ( doc.id_enti='".$usu_kyusu."' )";}
 			$reportData['data']['lista']=$this->operacion->getLista("SELECT", 0, 2000,$select, $from, $where);
			$data['data']=$reportData['data'];
			
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>