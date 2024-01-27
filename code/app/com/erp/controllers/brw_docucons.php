<?php 
class brw_docucons extends Controlador
{
	public function __construct() {parent::__construct();}

	public function ordename ($a, $b) {
		return $a['freg'] - $b['freg'];
	}
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data = $this->input->post();
 			
 			$data['page'] = 1;
 			$data['pagerows'] = 9999999;
 			
 			/**********************************************
 			 * LISTA DE COLUMNAS PARA FILTRAR EN LA BROSE *
 			**********************************************/
 			$data['main_sel_sucu'] = ((isset($data['main_sel_sucu']))?$data['main_sel_sucu']:"");
 			$data['main_kysuc'] = ((isset($data['main_kysuc']))?$data['main_kysuc']:"0");
 			$select = "";
 			foreach ($data as $key=>$value)
 			{
 				$test=strpos($key, "filter_");
 				if (strpos($key, "filter_")>-1)
 				{
 					$keyTmp = str_replace('filter_','',$key);
 					$data[$keyTmp] = $data[$key];
 					unset($data[$key]);
 					$select .=" ". str_replace('_','.',$keyTmp)." as ".$keyTmp.",";
 				}
 			}
 			$select = substr($select, 0, strlen($select)-1)." ";
 			
 			/**************************
 			 * CONFIGURANDO EL SQL1   *
 			 **************************/
 			$where = "where 1=1 and doc.esta!='0000' and doc.kycom=".kycom." and art.tipo='SERVICIO' and doc.canj!=1";
 			if($this->util->exist($data,'main_kysuc')){$where.=" and (doc.id_sucu=".$data['main_kysuc'].")";}
 	
 			if($this->util->exist($data,'usu_kyusu')){$where.=" and (doc.id_enti = ".$data['usu_kyusu'].")";}
 			if($this->util->exist($data,'cli_kyusu')){$where.=" and (pdr.id_enti = ".$data['cli_kyusu'].")";}
 			if($this->util->exist($data,'suc_kysucu')){$where.=" and (doc.id_sucu = ".$data['suc_kysucu'].")";}
 			if($this->util->exist($data,'gru_kycate')){$where.=" and (gru.id_cate = ".$data['gru_kycate'].")";}
 			if($this->util->exist($data,'art_kyarti')){$where.=" and (art.id_arti = ".$data['art_kyarti'].")";}
 	
 			if($this->util->exist($data,'tope')){$where.=" and (doc.tope = '".$data['tope']."')";}
 			if($this->util->exist($data,'doc_fini') && $this->util->exist($data,'doc_ffin')){$where.=" and ( doc.freg>='".$data['doc_fini']."' and doc.freg<='".$data['doc_ffin']."' )";}
 	
 			/****************
 			 * SETTING SQL  *
 			 ****************/
 			$sql1 = "select date(doc.freg) doc_freg, doc.canj doc_canj, art.id_arti art_kyarti, art.tipo art_tipo, art.nomb art_nomb, sum(ddo.cant) ddo_cant, '' cnj_nomb, 0 cnj_cant
 			from erp_entidad ent
			inner join erp_documento doc on doc.id_enti=ent.id_enti 
			inner join erp_detdocumento ddo on ddo.id_docu=doc.id_docu
			inner join erp_articulo art on art.id_arti=ddo.id_arti
			left join erp_categoria gru on gru.id_cate=ent.id_grup
			left join erp_entidad pdr on pdr.id_enti=ent.id_padr ". 
 			$where." group by date(doc.freg), doc.canj, art.id_arti, art.tipo, art.nomb";

 			/*************************
 			 * CONFIGURANDO EL SQL2  *
 			 *************************/
 			$where = "where 1=1";
 			$where.= " and doc.esta!='0000' and doc.kycom=".kycom." and art.tipo='SERVICIO' and doc.canj=1";
 			if($this->util->exist($data,'main_kysuc')){$where.=" and (doc.id_sucu=".$data['main_kysuc'].")";}
 			
 			if($this->util->exist($data,'usu_kyusu')){$where.=" and (doc.id_enti = ".$data['usu_kyusu'].")";}
 			if($this->util->exist($data,'cli_kyusu')){$where.=" and (pdr.id_enti = ".$data['cli_kyusu'].")";}
 			if($this->util->exist($data,'suc_kysucu')){$where.=" and (doc.id_sucu = ".$data['suc_kysucu'].")";}
 			if($this->util->exist($data,'gru_kycate')){$where.=" and (gru.id_cate = ".$data['gru_kycate'].")";}
 			if($this->util->exist($data,'art_kyarti')){$where.=" and (art.id_arti = ".$data['art_kyarti'].")";}
 			
 			if($this->util->exist($data,'tope')){$where.=" and (doc.tope = '".$data['tope']."')";}
 			if($this->util->exist($data,'doc_fini') && $this->util->exist($data,'doc_ffin')){$where.=" and ( doc.freg>='".$data['doc_fini']."' and doc.freg<='".$data['doc_ffin']."' )";}
 			
 			/****************
 			 * SETTING SQL  *
 			 ****************/
 			$sql2 = "select date(doc.freg) doc_freg, doc.canj doc_canj, art.id_arti art_kyarti, art.tipo art_tipo, '' art_nomb, 0 ddo_cant, concat('CANJE_',art.nomb) cnj_nomb, sum(ddo.cant) cnj_cant
 			from erp_entidad ent
			inner join erp_documento doc on doc.id_enti=ent.id_enti
			inner join erp_detdocumento ddo on ddo.id_docu=doc.id_docu
			inner join erp_articulo art on art.id_arti=ddo.id_arti
			left join erp_categoria gru on gru.id_cate=ent.id_grup
			left join erp_entidad pdr on pdr.id_enti=ent.id_padr ". 
 			$where." group by date(doc.freg), doc.canj, art.id_arti, art.tipo, art.nomb";
 			
 			$data['sql'] = $sql1." union ".$sql2;
//  			error_log($data['sql']."\n", 3, "error.log");
 			$data['data'] = $this->getLista($data);
 	
 			if($this->util->exist($data,'doc_fini') && $this->util->exist($data,'doc_ffin'))
 			{
 				$fini = new DateTime(date('Y-m-d',strtotime($data['doc_fini'])));;
 				$ffin = new DateTime(date('Y-m-d',strtotime($data['doc_ffin'])));
 				$diff = $fini->diff($ffin);
 				$numDias =$diff->d;
 				$lista = Array();
 				
 				$lisServ = $this->arti->listaTipo(Array("art_tipo"=>"SERVICIO",), true);
 				
 				for($iteDia = 0; $iteDia <= $numDias; $iteDia++)
 				{
 					$fecTmp = $fecHorFin = date('Y-m-d',strtotime ( '+'.$iteDia.' day' , strtotime ( $fini->format('Y-m-d') )));
 					foreach($lisServ['items'] as $keySer=>$valSer)
 					{
 						$objReq = Array("doc_freg"=>$fecTmp,
 								"doc_canj"=>$valSer->canj,
 								"art_kyarti"=>$valSer->id_arti,
 								"art_tipo"=>$valSer->tipo,
 								"art_nomb"=>$valSer->nomb,
 								"ddo_cant"=>"0");
 						array_push($lista, (Object)$objReq);
 					}//foreach($lisServ as $keySer=>$valSer)
 				}//for($iteDia = 0; $iteDia <= $numDias; $iteDia++)
 					
 				foreach($data['data']['items'] as $key=>$val)
 				{
 					foreach($lista as $keyLis=>$valLis)
 					{
 						if($val->doc_freg == $valLis->doc_freg && $val->art_kyarti==$valLis->art_kyarti && $val->doc_canj==$valLis->doc_canj)
 						{
 							$objReq = Array("doc_freg"=>$val->doc_freg,
 									"doc_canj"=>$val->doc_canj,
 									"art_kyarti"=>$val->art_kyarti,
 									"art_tipo"=>$val->art_tipo,
 									"art_nomb"=>($val->doc_canj==0)?$val->art_nomb:$val->cnj_nomb,
 									"ddo_cant"=>($val->doc_canj==0)?$val->ddo_cant:$val->cnj_cant);
 							$lista[$keyLis] = (Object) $objReq;
 							break;
 						}
 					}
 				}
 				$rpta = array();
 				if(count($lista)>0){
 					foreach($lista as $item){
 						$item = (Array) $item;
 						if(!isset($rpta[$item['doc_freg']]))
 						{
 							$rpta[$item['doc_freg']]['doc_freg']=$item['doc_freg'];
 							$rpta[$item['doc_freg']]['lisArt']=Array();
 						}
 						$codi = $item['art_kyarti'].'_'.$item['doc_canj'];
 						$rpta[$item['doc_freg']]['lisArt'][$codi]=$item;
 					}//foreach($list as $item){
 				}//if(count($list)>0){
 				 		
 				$data['data']['items'] = $rpta;
 			}//if($this->util->exist($data,'doc_fini') && $this->util->exist($data,'doc_ffin'))
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>