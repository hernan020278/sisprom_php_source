<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class come extends Controlador {
	
	function __construct() {
		parent::__construct();
	}
	public function edit(){
		$this->vista('sex/come');
	}
	public function lista($data=Array(), $return=false)
	{
		$result = null;
		try
		{
			$data["msg"]=array("type"=>"success","text"=>"Inicio operacion!!!");

			/*************************************
			 * Configuracion de paginacion MYSQL *
			 *************************************/
			$data['page'] = floatval($data['page'])-1;
			$data['data']['paging']['pagerows'] = $data['pagerows'];
			$data['per_page'] = $data['pagerows'];
			$data['page_mysql'] = $data['page']*$data['per_page'];

			$data['select'] = ((isset($data['select']))?$data['select']:"");
			$data['from'] = ((isset($data['from']))?$data['from']:"");
			$data['groupby'] = ((isset($data['groupby']))?$data['groupby']:"");
			$data['where'] = ((isset($data['where']))?$data['where']:"");
			$data['having'] = ((isset($data['having']))?$data['having']:"");
			$data['orderby'] = ((isset($data['orderby']))?$data['orderby']:"");
			
			/**************************
			 * Configuracion de WHERE *
			 **************************/
			$where="1=1";
			if(!empty($data['apc_kyapci'])){$where.=" and apc.id_apci=".$data['apc_kyapci'];}
		 	if(!empty($data['suc_kysucu'])){$where.=" and apc.id_sucu=".$data['suc_kysucu'];}
 			if(!empty($data['usu_kyusu'])){$where.=" and tra.id_enti=".$data['usu_kyusu'];}
 			if(!empty($data['ope_kyapci'])){$where.=" and ope.id_apci=".$data['ope_kyapci'];}
 			
 			if(!empty($data['ope_freg'])){$where.=" and ope.freg like '%".$data['ope_freg']."%'";}
 			if(!empty($data['usu_nomb'])){$where.=" and ent.nomb like '%".$data['usu_nomb']."%'";}
 			if(!empty($data['ope_tope'])){$where.=" and ope.tope like '%".$data['ope_tope']."%'";}
 			if(!empty($data['ope_fpag'])){$where.=" and ope.fpag like '%".$data['ope_fpag']."%'";}
 			if(!empty($data['ope_otip'])){$where.=" and ope.otip like '%".$data['ope_otip']."%'";}
 			if(!empty($data['ope_tdoc'])){$where.=" and ope.tdoc like '%".$data['ope_tdoc']."%'";}
 			if(!empty($data['ope_ndoc'])){$where.=" and ope.ndoc like '%".$data['ope_ndoc']."%'";}
 			if(!empty($data['ope_esta'])){$where.=" and ope.esta like '%".$data['ope_esta']."%'";}
 			if(!empty($data['ope_pobs'])){$where.=" and ope.pobs like '%".$data['ope_pobs']."%'";}
 			
			if(!empty($data['ope_pini']) && !empty($data['ope_pfin'])){$where.=" and (date(ope.peri)>='".$data['ope_pini']."' and date(ope.peri)<='".$data['ope_pfin']."')";}
			if(!empty($data['ope_fini']) && !empty($data['ope_ffin'])){$where.=" and (date(ope.freg)>='".$data['ope_fini']."' and date(ope.freg)<='".$data['ope_ffin']."')";}
			
 			if(!empty($data['tipo']) && $data['tipo']=="COPEANT"){$where.=" and ope.ctipo='INGRESO'";}
 			if(!empty($data['tipo']) && $data['tipo']=="COPETRA"){$where.=" and ( ope.ctipo='INGRESO' or ope.ctipo='EGRESO' )";}
 			if(!empty($data['text'])){$where.=" and (doc.tdoc='".$data['text']."' or doc.ndoc='".$data['text']."' or doc.enom='".$data['text']."' or doc.esta='".$data['text']."')";}
 			if(!empty($data['orderColumn']) && !empty($data['orderType'])){$data['orderby']=" order by ".$data['orderColumn']." ".$data['orderType'];}else{$data['orderby']="";}
 			
			$lista = $this->operacion->getListaMix("COUNT", $data['page_mysql'], $data['per_page'], $data['select'], $data['from'], $where, $data['groupby'], $data['having'], $data['orderby']);
			$data['data']['paging']['rowcount'] = $lista[0]->rowCount;
			$data['data']["items"] = $this->operacion->getListaMix("SELECT", $data['page_mysql'], $data['per_page'], $data['select'], $data['from'], $where, $data['groupby'], $data['having'], $data['orderby']);
			
 			$data['data']['paging']['pagerows'] = count($data['data']['items']);
 			$data['data']['paging']['pagecount'] = ceil($data['data']['paging']['rowcount']/$data['data']['paging']['pagerows']);
 			if($data['data']['paging']['pagecount']<1)$data['data']['paging']['pagecount']=1;
 			$data['data']['paging']['page'] = $data['page']+1;
			
			$result=$data;
			if($return){return $result;}
			else{echo json_encode($result);}
		} 
		catch (Exception $e) 
		{
			$result["msg"]=array("type"=>"error","text"=>$e);
			return $result;
		}
	}
	public function lista_tran()
	{
		$data = $this->input->post();
		
		$data['pagerows'] = 9999999;
		$data['per_page'] = 9999999;
		
		$data['apc_kyapci'] = ((isset($data['id_apci']))?$data['id_apci']:"");
		$data['text'] = ((isset($data['text']))?$data['text']:"");
		$data['tipo'] = ((isset($data['tipo']))?$data['tipo']:"");

		$data = $this->lista($data, true);
		echo json_encode($data['data']);
	}
}
?>