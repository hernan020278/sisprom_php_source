<?php 
class GetListaDashboardGeneral extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";
			
			$where = "where 1=1 and ope.ope_esta='0001'";
			
			if($this->util->esdato($data,'ope_kycom')){$where.=" and ope.ope_kycom='".$data['ope_kycom']."'";}
			if($this->util->esdato($data,'apc_kyapc')){$where.=" and apc.apc_kyapc='".$data['apc_kyapc']."'";}
			if($this->util->esdato($data,'suc_kysuc')){$where.=" and apc.apc_kysuc='".$data['suc_kysuc']."'";}
			
			if($this->util->esdato($data,'cco_kycco')){$where.=" and ope.ope_kycco='".$data['cco_kycco']."'";}
			if($this->util->esdato($data,'ope_rubr')){$where.=" and ope.ope_rubr='".$data['ope_rubr']."'";}
			if($this->util->esdato($data,'ope_clas')){$where.=" and ope.ope_clas='".$data['ope_clas']."'";}
			if($this->util->esdato($data,'ope_tope')){$where.=" and ope.ope_tope='".$data['ope_tope']."'";}
			
			if($this->util->esdato($data,'ope_otip') && $this->util->get($data,'ope_otip')!='ANTERIOR'){$where.=" and ope.ope_otip='".$data['ope_otip']."'";}
			if($this->util->esdato($data,'ope_pini') && $this->util->esdato($data,'ope_pfin'))
			{
				if($this->util->get($data,'ope_otip')=="ANTERIOR")
				{
				    $where.=" and date(ope.ope_freg)<'".$data['ope_pini']."'";
				}
				else
				{
				    if( $this->util->esdato($data,'ope_pini') && $this->util->esdato($data,'ope_pfin') )
				    {
				        $where.=" and date(ope.ope_freg)>='".$data['ope_pini']."' and date(ope.ope_freg)<='".$data['ope_pfin']."'";
				    }
				}
			
				
			}
			
      if(count($data['listaNombre'])==3)
			{
			    if($data['listaNombre'][0]=="Cuenta" && $data['listaNombre'][1]=="Rubro" && $data['listaNombre'][2]=="Clase")
			    {
			        $data['sql'] ="select
					cco.cco_kycco nva_kyniv, CONCAT(SUBSTRING(ent.usu_nomb,1,3),SUBSTRING(cco.cco_dscr,1,3),SUBSTRING(cco.cco_ndoc,-4)) nva_nomb,
					ope.ope_rubr nvb_kyniv, ope.ope_rubr nvb_nomb,
					ope.ope_clas nvc_kyniv, ope.ope_clas nvc_nomb,";
			    }
			    if($data['listaNombre'][0]=="Cuenta" && $data['listaNombre'][1]=="Clase" && $data['listaNombre'][2]=="Rubro")
			    {
  		      $data['sql'] ="select
   					cco.cco_kycco nva_kyniv, CONCAT(SUBSTRING(ent.usu_nomb,1,3),SUBSTRING(cco.cco_dscr,1,3),SUBSTRING(cco.cco_ndoc,-4)) nva_nomb,
            ope.ope_clas nvb_kyniv, ope.ope_clas nvb_nomb,
            ope.ope_rubr nvc_kyniv, ope.ope_rubr nvc_nomb,";
			    }
			}
			
			$data['sql'] .= "ope.ope_otip, ope.ope_oimp, prp.prp_prop ope_omon
				from adm_operacion ope
				inner join adm_ctacorriente cco on cco.cco_kycco=ope_kycco
				inner join cmn_usuario ent on ent.usu_kyusu=ope.ope_kyusu
				inner join adm_propiedad prp on prp.prp_prop=ope.ope_omon and prp.prp_secc='TIPMON'
				".$where. " GROUP BY ope.ope_kyope, cco.cco_kycco";
			
			$data = $this->getLista($data);

			$result = $data;
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>