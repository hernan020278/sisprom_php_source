<?php 
class GetListaCtadocumento extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";
			
			$where = "where 1=1 and apc.apc_esta!='0000'";
			
			if($this->util->exist($data,'cco_kycco')){$where.=" and (cco.cco_kycco='".$data['cco_kycco']."')";}
			if($this->util->get($data,'text')!=""){$where.=" and cco.cco_banc like '%".$data['text']."%'";}
			
			$data['sql'] = "select apc.apc_kysuc, apc.apc_kyapc, apc.apc_fini, apc.apc_ffin, cco.cco_kycco, ent.usu_nomb, cco.cco_tcta, cco.cco_ndoc, cco.cco_fpag, cco.cco_tmon, cco.cco_freg, cco.cco_tota, cco.cco_esta,
			ifnull((select sum(opeTmp.ope_debe) from erp_operacion opeTmp where opeTmp.ope_kycco=cco.cco_kycco and opeTmp.ope_kycom='".$data['ope_kycom']."' and opeTmp.ope_ctip='INGRESO'),0.00) cco_sant,
			ifnull((select sum(opeTmp.ope_habe) from erp_operacion opeTmp where opeTmp.ope_kycco=cco.cco_kycco and opeTmp.ope_kycom='".$data['ope_kycom']."' and opeTmp.ope_ctip='EGRESO'),0.00) cco_scan,
			ifnull((select sum(opeTmp.ope_debe)-sum(opeTmp.ope_habe) from erp_operacion opeTmp where opeTmp.ope_kycco=cco.cco_kycco and (opeTmp.ope_ctip='INGRESO' or opeTmp.ope_ctip='EGRESO') and opeTmp.ope_kycom='".$data['ope_kycom']."'),0.00) cco_spag
			from erp_entidad ent 
			inner join erp_ctacorriente cco on cco.cco_kyusu=ent.usu_kyusu ".$where;
			
			$data = $this->getLista($data);

			$result = $data;
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>