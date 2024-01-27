<?php 
class GetListaOperacion extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index($data)
	{
		return $this->ejecutar($data);
	}
	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";
			
			$where = "where 1=1";
			
			if($this->util->esdato($data,'ope_kycom')){$where.=" AND ope.ope_kycom='".$data['ope_kycom']."'";}
			if($this->util->esdato($data,'ope_kyope')){$where.=" AND ope.ope_kyope='".$data['ope_kyope']."'";}
			if($this->util->esdato($data,'ope_kydoc')){$where.=" AND ope.ope_kydoc='".$data['ope_kydoc']."'";}
			if($this->util->esdato($data,'apc_kyapc')){$where.=" AND apc.apc_kyapc='".$data['apc_kyapc']."'";}
			if($this->util->esdato($data,'suc_kysuc')){$where.=" AND apc.apc_kysuc='".$data['suc_kysuc']."'";}
			if($this->util->esdato($data,'tra_kyusu')){$where.=" AND tra.usu_kyusu='".$data['tra_kyusu']."'";}
			
			if($this->util->esdato($data,'cco_kycco')){$where.=" AND cco.cco_kycco='".$data['cco_kycco']."'";}
			if($this->util->esdato($data,'ope_rubr')){$where.=" AND ope.ope_rubr='".$data['ope_rubr']."'";}
			if($this->util->esdato($data,'ope_clas')){$where.=" AND ope.ope_clas='".$data['ope_clas']."'";}
			
			if($this->util->esdato($data,'usu_nomb')){$where.=" AND ent.usu_nomb like '%".$data['usu_nomb']."%'";}
			if($this->util->esdato($data,'erf_nomb')){$where.=" AND erf.usu_nomb like '%".$data['erf_nomb']."%'";}
			
			if($this->util->esdato($data,'ope_tope')){$where.=" AND ope.ope_tope = '".$data['ope_tope']."'";}
			if($this->util->esdato($data,'ope_otip')){$where.=" AND ope.ope_otip = '".$data['ope_otip']."'";}
			if($this->util->esdato($data,'ope_fpag')){$where.=" AND ope.ope_fpag = '".$data['ope_fpag']."'";}
			if($this->util->esdato($data,'ope_tdoc')){$where.=" AND ope.ope_tdoc = '".$data['ope_tdoc']."'";}
			if($this->util->esdato($data,'ope_ndoc')){$where.=" AND ope.ope_ndoc = '".$data['ope_ndoc']."'";}
			
			if($this->util->get($data,'ope_esta','TODOS')!="TODOS")
			{
				if($this->util->esdato($data,'ope_esta') && $this->util->get($data,'ope_esta')!="TODOS")
				{
					$where.=" AND ope.ope_esta = '".$data['ope_esta']."'";
				}
				else{$where.=" AND ope.ope_esta = '0001'";}
			}
			
			if($this->util->esdato($data,'ope_pobs')){$where.=" AND ope.ope_pobs like '%".$data['ope_pobs']."%'";}
			
			if( $this->util->esdato($data,'ope_pini') && $this->util->esdato($data,'ope_pfin') && !$this->util->esdato($data,'ope_freg') )
			{
				$where.=" AND DATE(ope.ope_freg)>='".$data['ope_pini']."' AND DATE(ope.ope_freg)<='".$data['ope_pfin']."'";
			}
			else if($this->util->esdato($data,'ope_pini') && $this->util->esdato($data,'ope_pfin') && $this->util->esdato($data,'ope_freg'))
			{
			    $where.=" AND DATE(ope.ope_freg)>='".$data['ope_pini']."' AND DATE(ope.ope_freg)<='".$data['ope_pfin']."' AND DATE(ope.ope_freg) = '".date('Y-m-d',strtotime ($data['ope_freg']))."'";
			}
			else if($this->util->esdato($data,'ope_pini') && !$this->util->esdato($data,'ope_pfin'))
			{
			    $where.=" AND DATE(ope.ope_freg)<'".$data['ope_pini']."'";
			}
			
			if($this->util->get($data,'ope_tipo')=="COPEANT"){$where.=" AND ope.ope_tipo='INGRESO'";}
			if($this->util->get($data,'ope_tipo')=="COPETRA"){$where.=" AND ope.ope_tipo='INGRESO'";}
			if($this->util->get($data,'text')!=""){$where.=" AND (doc.tdoc='".$data['text']."' or doc.ndoc='".$data['text']."' or doc.enom='".$data['text']."' or doc.esta='".$data['text']."')";}
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT DISTINCT ope.*,
				apc.apc_kyapc, apc.apc_fini, apc.apc_ffin, caj.suc_kysuc, caj.suc_nomb,
				ent.usu_kyusu, ent.usu_nomb, ent.usu_tipo, ent.usu_mail,
				IFNULL(erf.usu_kyusu,'') erf_kyusu, IFNULL(erf.usu_nomb,'') erf_nomb,
				concat(ent.usu_nomb,'-',bnc.prp_prop) cco_nomb, cco.cco_kycco, cco.cco_ndoc, cco.cco_dscr,
				tra.usu_kyusu tra_kyusu, tra.usu_nomb tra_nomb
				from adm_operacion ope
				INNER JOIN adm_ctacorriente cco ON cco.cco_kycco=ope_kycco
				INNER JOIN adm_propiedad bnc ON bnc.prp_kyprp=cco.cco_kybnc
				INNER JOIN cmn_usuario ent ON ent.usu_kyusu=cco.cco_kyusu
				INNER JOIN adm_aperturacierre apc ON apc.apc_kyapc=ope.ope_kyapc
				INNER JOIN adm_sucursal caj ON caj.suc_kysuc=apc.apc_kysuc
				INNER JOIN cmn_usuario tra ON tra.usu_kyusu=apc.apc_kyusu
				LEFT JOIN adm_operacion orf ON orf.ope_kyope=ope.ope_kyorf
				LEFT JOIN adm_ctacorriente crf ON crf.cco_kycco=orf.ope_kycco
				LEFT JOIN cmn_usuario erf ON erf.usu_kyusu=crf.cco_kyusu ".$where;
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);

			$result = $data;
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>